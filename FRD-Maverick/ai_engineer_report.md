---
pdf_options:
  format: A4
  margin: 20mm 15mm 20mm 15mm
  displayHeaderFooter: true
  headerTemplate: '<div></div>'
  footerTemplate: '<div style="width:100%; text-align:center; font-size:9px; color:#666; font-family:Arial,sans-serif;">Page <span class="pageNumber"></span> of <span class="totalPages"></span> &nbsp;|&nbsp; MAVERICK &nbsp;|&nbsp; AI Engineer Technical Report</div>'
stylesheet: https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css
body_class: markdown-body
css: |-
  @page {
    border: 3px double #0d3b2e;
    padding: 10mm;
  }
  body {
    border: 3px double #0d3b2e;
    padding: 20px 25px;
    margin: 0;
    font-family: 'Inter', 'Segoe UI', sans-serif;
    font-size: 11px;
    line-height: 1.6;
    color: #1a1a1a;
  }
  h1 {
    color: #0d3b2e;
    border-bottom: 3px solid #0d3b2e;
    padding-bottom: 8px;
    font-size: 24px;
    text-align: center;
  }
  h2 {
    color: #135946;
    border-bottom: 2px solid #23856d;
    padding-bottom: 5px;
    margin-top: 30px;
    font-size: 18px;
  }
  h3 {
    color: #23856d;
    font-size: 15px;
    margin-top: 20px;
  }
  h4 {
    color: #29a083;
    font-size: 13px;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 12px 0;
    font-size: 10.5px;
  }
  th {
    background-color: #0d3b2e;
    color: white;
    padding: 8px 10px;
    text-align: left;
    font-weight: 600;
    border: 1px solid #0d3b2e;
  }
  td {
    padding: 6px 10px;
    border: 1px solid #d0d7de;
  }
  tr:nth-child(even) {
    background-color: #f6f8fa;
  }
  ul li {
    margin-bottom: 4px;
  }
  blockquote {
    border-left: 4px solid #23856d;
    background-color: #f0f9f6;
    padding: 10px 15px;
    margin: 10px 0;
    color: #0d3b2e;
  }
  code {
    background-color: #f0f9f6;
    padding: 4px 6px;
    border-radius: 4px;
    font-size: 10.5px;
    color: #0d3b2e;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  }
  pre {
    background-color: #f6f8fa;
    border: 1px solid #d0d7de;
    padding: 10px;
    border-radius: 6px;
    overflow-x: auto;
  }
  pre code {
    background-color: transparent;
    padding: 0;
    color: #24292f;
    font-size: 10px;
    line-height: 1.4;
  }
  .highlight {
    font-weight: bold;
    color: #d13415;
  }
---

# MAVERICK — AI Engineer Technical Report

## 1. Current AI/ML Implementation — What Exists Today

Maverick currently uses AI in 5 areas. All are powered by a single RAG pipeline.

| # | Feature | What It Does | AI Technology Used |
|---|---------|--------------|--------------------|
| 1 | Captain MAVE (Chatbot) | 24/7 AI aviation assistant — answers questions, gives study guidance, helps with flight planning | RAG + Claude Sonnet 3.5 v2 (Bedrock) |
| 2 | PDF Study Assistant | Student highlights text in study PDFs → asks questions → AI answers with citations | RAG + Claude Sonnet 3.5 v2 |
| 3 | Quiz & Flashcard Generation | AI auto-generates quizzes and flashcards from study material | LLM (Claude via Bedrock) |
| 4 | Adaptive Learning Paths | Analyzes student progress & weak areas → suggests personalized study sequences | AI recommendation logic |
| 5 | Weight & Balance Recommendations | AI-powered safety recommendations during flight planning performance calculations | LLM analysis |

> **Key Observation:**
> All 5 features run through one single pipeline — the RAG system. There is no separate ML model, no fine-tuned model, no custom-trained model. Everything is prompt engineering + retrieval on top of Claude Sonnet 3.5 v2.

## 2. AI/ML Tech Stack — Detailed Breakdown

### 2.1 RAG Pipeline Architecture

```text
┌──────────────────────────────────────────────────────────┐
│                      RAG PIPELINE                        │
│                                                          │
│  ┌─────────┐    ┌──────────┐    ┌───────────────────┐    │
│  │ Aviation│    │ Chunking │    │  Embedding Model  │    │
│  │  Docs   │───▶│ & Parse  │───▶│     (Bedrock)     │    │
│  │  (S3)   │    │          │    │                   │    │
│  │ 10-12 GB│    └──────────┘    └────────┬──────────┘    │
│  └──────────┘                            │               │
│       │                                  │               │
│       ▼                                  │               │
│  ┌────────────────┐                      │               │
│  │   OpenSearch   │                      │               │
│  │   Serverless   │                      │               │
│  │ (Vector Store) │                      │               │
│  └────────┬───────┘                      │               │
│           │                              │               │
│  ┌──────────┐   ┌──────────────┐         │               │
│  │   User   │   │   FastAPI    │◄────────┘               │
│  │  Query   │──▶│ (ECS Fargate)│                         │
│  └──────────┘   │              │───▶ Claude Sonnet 3.5v2 │
│                 └──────────────┘       (AWS Bedrock)     │
│                        │                                 │
│                        ▼                                 │
│                 ┌──────────────┐                         │
│                 │  Response +  │                         │
│                 │   Citations  │                         │
│                 └──────────────┘                         │
└──────────────────────────────────────────────────────────┘
```

### 2.2 AI/ML Component Stack

| Component | Technology | Version / Model | Purpose |
|-----------|------------|-----------------|---------|
| **LLM** | Claude Sonnet 3.5 v2 | `anthropic.claude-3-5-sonnet-v2` | Core AI brain — generates answers, quizzes, study plans, recommendations |
| **Managed LLM Access** | AWS Bedrock | Managed service | API access to Claude — no GPU management needed |
| **Embedding Model** | Amazon Titan / Cohere | Bedrock Embeddings | Converts text chunks into vectors for similarity search |
| **Vector Database** | Amazon OpenSearch Serverless | Managed | Stores & searches document embeddings (vector similarity) |
| **Document Store** | Amazon S3 | — | Stores raw aviation docs (10-12 GB of textbooks, manuals, specs) |
| **Backend API** | FastAPI (Python) | Python 3.x | Orchestrates RAG — receives query → retrieves docs → calls LLM → returns response |
| **Serverless Compute** | ECS Fargate | containers | Runs FastAPI backend without server management |
| **Frontend Chat** | React Chat UI | TypeScript | Chat interface for Captain MAVE, PDF assistant |

### 2.3 RAG Pipeline Flow (Step-by-Step)

**Ingestion (One-Time):**

| Step | What Happens | Tech |
|---|---|---|
| 1 | Aviation documents uploaded | S3 |
| 2 | PDF parsing & text extraction | Python (PyPDF2 / LangChain loaders) |
| 3 | Text chunking (split into small pieces) | LangChain / custom splitter |
| 4 | Each chunk → embedding vector | Bedrock embedding model |
| 5 | Vectors stored with metadata | OpenSearch Serverless |

**Query (Real-Time):**

| Step | What Happens | Tech |
|---|---|---|
| 1 | User asks a question | React Chat UI |
| 2 | Query sent to FastAPI backend | HTTPS / API |
| 3 | Query converted to embedding vector | Bedrock embedding model |
| 4 | Vector similarity search — find top-K relevant chunks | OpenSearch (k-NN) |
| 5 | Retrieved chunks + user query → prompt | Prompt template |
| 6 | Prompt sent to Claude Sonnet 3.5 v2 | AWS Bedrock API |
| 7 | Claude generates grounded answer with citations | LLM inference |
| 8 | Response returned to user | FastAPI → React |

## 3. AWS Tech Stack — Separated by Category

### 3.1 AI/ML Specific AWS Services

| AWS Service | What It Does for AI | Maverick Usage |
|---|---|---|
| **AWS Bedrock** | Managed LLM access (Claude, Titan, etc.) | Runs all LLM calls — Captain MAVE, quiz generation, recommendations. Also provides embedding models |
| **Amazon OpenSearch Serverless** | Vector database with k-NN search | Stores 10-12 GB of aviation knowledge as embeddings. Performs similarity search on every user query |
| **Amazon S3** | Object storage | Stores raw aviation documents (textbooks, specs, manuals) — the knowledge base source |
| **AWS Lambda** | Serverless functions | Event-driven tasks — document processing triggers, webhook handling |

### 3.2 Compute & Networking AWS Services

| AWS Service | Purpose |
|---|---|
| **Amazon ECS (Fargate)** | Runs FastAPI (RAG backend) + React app as serverless containers |
| **ALB (Application Load Balancer)** | Distributes traffic across ECS containers, health checks |
| **Amazon ECR** | Stores Docker images for deployment |
| **Amazon EC2** | Reserved for workloads needing persistent compute |
| **VPC** | Private network — 3 subnet tiers: public, app (private), database |
| **NAT Gateway** | Allows private containers to call external APIs (Bedrock, weather) |
| **Internet Gateway** | Connects VPC to public internet |

### 3.3 Database & Storage AWS Services

| AWS Service | Purpose |
|---|---|
| **Amazon RDS (PostgreSQL)** | Primary database — users, flights, logbooks, training progress. Multi-AZ |
| **Amazon S3** | Document storage (knowledge base + logbook attachments) |
| **Amazon OpenSearch Serverless** | Vector DB for RAG pipeline |

### 3.4 Security AWS Services

| AWS Service | Purpose |
|---|---|
| **AWS WAF** | Firewall — blocks SQL injection, XSS, DDoS, bot attacks |
| **AWS KMS** | Encryption key management — encrypts DB, S3, configs |
| **AWS GuardDuty** | AI-powered threat detection — monitors for suspicious activity |
| **Security Groups + NACLs** | Resource-level and subnet-level firewall rules |

### 3.5 DevOps & Monitoring AWS Services

| AWS Service | Purpose |
|---|---|
| **AWS CodePipeline** | CI/CD orchestration — GitHub → Build → Test → Deploy |
| **AWS CodeBuild** | Builds code, runs tests, creates Docker images |
| **AWS CodeDeploy** | Zero-downtime rolling deployment to ECS |
| **Amazon CloudWatch** | Logs, metrics, alarms — monitors container health, API latency |
| **AWS CloudTrail** | Audit log — tracks all AWS API activity |
| **AWS Config** | Infrastructure compliance checking |

### 3.6 Content Delivery

| AWS Service | Purpose |
|---|---|
| **CloudFront (CDN)** | Caches static assets globally — fast load times worldwide |
| **Route 53 (DNS)** | Domain management, health checks, traffic routing |

## 4. Where AI is Used — Feature-by-Feature Map

| App Module | AI Used? | What AI Does | AI Tech |
|---|---|---|---|
| **Captain MAVE** | ✅ Yes | Answers questions, study plans, flight planning help, citations | RAG + Claude |
| **Learning Hub — PDF Study** | ✅ Yes | Context-aware Q&A on highlighted text | RAG + Claude |
| **Learning Hub — Quizzes** | ✅ Yes | Auto-generates MCQ from study material | Claude (prompt-based) |
| **Learning Hub — Flashcards** | ✅ Yes | Auto-generates flip cards from content | Claude (prompt-based) |
| **Adaptive Paths** | ✅ Yes | Recommends next topics based on progress/weaknesses | AI recommendation logic |
| **Flight Planning — W&B** | ✅ Yes | Safety recommendations for weight & balance | Claude analysis |
| **Flight Planning — OFP** | ❌ No | Static form + calculation — | — |
| **Logbook** | ❌ No | Manual 8-step entry, no AI assistance — | — |
| **Community** | ❌ No | Manual messaging, no AI moderation or summarization | — |
| **Voice Rooms** | ❌ No | Raw WebRTC audio (LiveKit), no AI processing | — |
| **Weather & NOTAMs** | ❌ No | Raw METAR/TAF display, no AI interpretation — | — |
| **Fleet Management** | ❌ No | Manual CRUD operations — | — |
| **Roster (Scheduling)** | ❌ No | Manual sortie creation — | — |
| **Dispatch** | ❌ No | Manual checklist-based release, no AI risk scoring | — |
| **Training Report** | ❌ No | Auto-calculation (rule-based, not AI) — | — |

**Summary:**
* AI Active: 6 out of 15 modules
* AI Absent: 9 modules — all use manual or rule-based logic
* All AI runs through one LLM (Claude Sonnet 3.5 v2) — no separate ML models

## 5. AI Engineer Assessment — What's Good & What Needs Work

### ✅ What's Working Well

| Area | Assessment |
|---|---|
| **RAG Architecture** | Solid foundation — S3 → Embeddings → OpenSearch → Claude → FastAPI is a proven pattern |
| **LLM Choice** | Claude Sonnet 3.5 v2 is strong for knowledge-heavy Q&A tasks, good reasoning |
| **Managed Infrastructure** | Bedrock + OpenSearch Serverless + Fargate = zero GPU/server management |
| **Knowledge Base Size** | 10-12 GB is manageable — large enough for depth, small enough for efficient indexing |
| **Citation Support** | Grounding responses in source documents = trust & accuracy |

### ⚠ What Needs Attention

| Area | Issue | Risk |
|---|---|---|
| **Single LLM dependency** | Everything runs on Claude Sonnet 3.5 v2 — no fallback | If Bedrock has an outage or Anthropic changes pricing, all AI features go down |
| **No model evaluation** | No metrics on response quality, hallucination rate, retrieval accuracy | Can't measure if AI is actually helping users or giving wrong answers |
| **No caching** | Every query hits Bedrock API — even repeated common questions | Unnecessary cost and latency |
| **No prompt versioning** | Prompts likely hardcoded in FastAPI — no A/B testing or version control | Can't iterate on prompt quality safely |
| **Chunking strategy unknown** | How documents are chunked directly affects retrieval quality | Bad chunks = bad retrieval = bad answers, regardless of LLM quality |

## 6. Prioritized Recommendations — Improvements & Cost Optimization

### 🔴 Priority 1 — Do First (Cost Saving + Immediate Impact)

#### 1.1 Add Semantic Caching for Repeated Queries
**Problem:** Every user query hits Bedrock API. Aviation students ask similar questions ("What is METAR?", "Explain crosswind landing"). Each call costs money.
**Solution:** Add a semantic cache layer before calling Bedrock.
```text
User Query → Embedding → Check Cache (similarity > 0.95)
 ├── Cache HIT → Return cached response (FREE, instant)
 └── Cache MISS → Normal RAG pipeline → Store result in cache
```

| Aspect | Detail |
|---|---|
| **Tech** | Redis + vector similarity or GPTCache |
| **Cost Saving** | 30-50% reduction in Bedrock API calls (aviation queries are repetitive) |
| **Latency Saving**| Cache hit = <100ms vs RAG pipeline = 3-5 seconds |
| **Effort** | 1-2 weeks |
| **Priority** | 🔴 Do first — biggest cost/performance win |

#### 1.2 Switch to Claude Haiku for Simple Tasks
**Problem:** Claude Sonnet 3.5 v2 is used for everything — including simple tasks like flashcard generation and basic Q&A. Sonnet is expensive for simple tasks.
**Solution:** Route queries by complexity — use cheaper models for simple tasks.

| Task | Current Model | Recommended Model | Cost Change |
|---|---|---|---|
| Complex aviation Q&A | Claude Sonnet 3.5 v2 (keep) | Claude Sonnet 3.5 v2 | Same |
| PDF text Q&A (context already provided) | Claude Sonnet 3.5 v2 | Claude Haiku 3.5 | ~75% cheaper per token |
| Quiz generation | Claude Sonnet 3.5 v2 | Claude Haiku 3.5 | ~75% cheaper per token |
| Flashcard generation | Claude Sonnet 3.5 v2 | Claude Haiku 3.5 | ~75% cheaper per token |
| Study plan suggestions | Claude Sonnet 3.5 v2 | Claude Haiku 3.5 | ~75% cheaper per token |

**How to implement:**
```text
User Query → Query Classifier (rule-based or lightweight model)
 ├── Complex/Safety-critical → Claude Sonnet 3.5 v2
 └── Simple/Generative task → Claude Haiku 3.5
```

| Aspect | Detail |
|---|---|
| **Cost Saving** | 40-60% reduction in Bedrock costs overall |
| **Quality Impact**| Minimal — Haiku handles simple generation well |
| **Effort** | 1 week (add routing logic in FastAPI) |
| **Priority** | 🔴 Do first — easy win, big savings |

#### 1.3 Add Response Quality Monitoring
**Problem:** No way to know if Captain MAVE is giving correct answers or hallucinating. No retrieval accuracy metrics.
**Solution:** Add evaluation layer.

| Metric | How to Measure | Tool |
|---|---|---|
| **Retrieval Relevance** | Are the top-K chunks actually relevant to the query? | RAGAS framework or custom scoring |
| **Answer Faithfulness** | Is the answer grounded in retrieved documents (not hallucinated)? | LLM-as-judge (separate Claude call) or RAGAS |
| **User Satisfaction** | Thumbs up/down on each response | Frontend UI + Supabase logging |
| **Response Latency** | Time from query to response | CloudWatch metrics |
| **Citation Accuracy** | Do citations point to correct source sections? | Automated validation script |

| Aspect | Detail |
|---|---|
| **Cost** | Low — mostly logging + occasional eval LLM calls |
| **Effort** | 2 weeks |
| **Priority** | 🔴 Do first — you can't improve what you can't measure |

### 🟡 Priority 2 — Do Next (Feature Enhancement)

#### 2.1 AI-Powered Dispatch Risk Assessment
*Current:* Dispatch officers manually check weather, NOTAMs, aircraft status, FDTL, and assign risk level (GREEN/AMBER/RED).
*Improvement:* Feed all dispatch data into an LLM/rules hybrid to auto-score risk.

| Input | Source |
|---|---|
| METAR/TAF weather data | Weather API |
| Active NOTAMs | NOTAM API |
| Aircraft status & hours | Fleet module (Supabase) |
| Instructor FDTL status | Roster module (Supabase) |
| Student experience level | Training report (Supabase) |

*Output:* Risk score (GREEN/AMBER/RED) + plain-English explanation of each risk factor.

| Aspect | Detail |
|---|---|
| **Tech** | Claude Haiku (structured output) + rules engine for hard limits |
| **Why Haiku** | Risk assessment is structured analysis, not creative — Haiku handles it well at lower cost |
| **Impact** | Safety — reduces human error in flight release decisions |
| **Effort** | 2-3 weeks |

#### 2.2 Smart Weather Briefing
*Current:* Raw METAR/TAF text displayed as-is. Pilots must decode manually.
*Improvement:* AI parses METAR/TAF → generates plain-English briefing + safety flags.
```text
Raw: METAR VOBL 041200Z 27008KT 6000 FEW040 32/18 Q1012 NOSIG
↓
AI: "Bangalore (VOBL) at 12:00Z — Winds from west at 8 knots, visibility 6km, few clouds at 4000ft, temp 32°C. 
⚠ Visibility below 8km — brief VFR minimums with students. 
✅ Winds within limits for all training aircraft."
```

| Aspect | Detail |
|---|---|
| **Tech** | Claude Haiku + METAR/TAF parsing library + prompt template |
| **Why Haiku** | METAR decoding is formulaic — doesn't need Sonnet |
| **Cost** | Minimal per call (small input/output) |
| **Effort** | 1-2 weeks |

#### 2.3 Intelligent Logbook Auto-Fill
*Current:* Pilots manually fill all 8 steps of logbook entry after every flight.
*Improvement:* When a sortie completes (status = COMPLETED), AI pre-fills logbook entry from sortie data.

| Logbook Field | Auto-Fill Source |
|---|---|
| Date, departure, arrival | Sortie record |
| Aircraft | Sortie → `aircraft_id` |
| Pilot function | Sortie → role assignment |
| Times | `block_off_at`, `block_on_at` from sortie |
| Instructor/student names | Sortie → linked profiles |
| Remarks | AI-generated from flight context (weather, lesson type, duration) |

| Aspect | Detail |
|---|---|
| **Tech** | Supabase trigger + Claude Haiku for remarks generation |
| **Cost** | Very low — one small LLM call per flight |
| **Impact** | Saves 5-10 min per flight per pilot. Reduces human error |
| **Effort** | 2 weeks |

### 🟢 Priority 3 — Future Improvements

#### 3.1 Predictive Training Analytics
Train an ML model on historical training data to predict:
- Which students are at risk of failing exams
- Who needs extra flying hours
- Optimal lesson sequencing

| Aspect | Detail |
|---|---|
| **Tech** | Scikit-learn / XGBoost classification model. Features: quiz scores, study hours, flight hours, lesson completion rate |
| **Data Needed** | Historical student training records (need 500+ students for meaningful model) |
| **Infra** | SageMaker or simple Lambda-based inference |
| **Effort** | 4-6 weeks |

#### 3.2 Semantic Search Across Platform
Let users search across everything — lessons, community posts, logbooks, flight plans — using natural language.

| Aspect | Detail |
|---|---|
| **Tech** | Extend OpenSearch index to cover all content types (not just aviation docs) |
| **Effort** | 3-4 weeks |

#### 3.3 AI Flight Debrief
After each flight → AI analyzes flight data and generates structured debrief report.

| Aspect | Detail |
|---|---|
| **Tech** | Claude Haiku + flight data (times, weather during flight, lesson objectives) |
| **Effort** | 2-3 weeks |

## 7. Cost Optimization Summary — What to Change & Why

**Current Cost Structure (Estimated)**

| Cost Component | What Drives Cost | Estimated Impact |
|---|---|---|
| **Bedrock API (Claude Sonnet)** | Every query = input tokens + output tokens | 💰 💰 💰 Highest AI cost |
| **Bedrock API (Embeddings)** | Every query = embedding call for similarity search | 💰 Low per call |
| **OpenSearch Serverless** | Always-on compute units (OCU) — minimum 2 OCUs even idle | 💰 💰 Fixed monthly cost |
| **ECS Fargate (FastAPI)** | Container running 24/7 for RAG backend | 💰 💰 Moderate |
| **S3 Storage** | 10-12 GB knowledge base | 💰 Very low |

**Recommended Cost Optimizations — Ranked**

| # | Action | Estimated Saving | Effort | Priority |
|---|---|---|---|---|
| 1 | **Model routing — Haiku for simple tasks** | 40-60% Bedrock cost reduction | 1 week | 🔴 Do now |
| 2 | **Semantic caching** | 30-50% fewer API calls | 1-2 weeks | 🔴 Do now |
| 3 | **Response streaming** | Better UX (no cost saving, but perceived faster) | 1 week | 🟡 Next |
| 4 | **OpenSearch → Pinecone/Qdrant evaluation** | OpenSearch Serverless has high minimum cost (2 OCU = ~$700/mo idle). Pinecone Starter is free for small scale. Evaluate if switching vector DB saves cost | 2 weeks (evaluation) | 🟡 Evaluate |
| 5 | **Batch embedding ingestion** | Run embedding jobs during off-hours via Lambda (not ECS) | 1 week | 🟢 Later |
| 6 | **Prompt optimization — reduce token count**| 10-20% token reduction by trimming prompt templates | 3 days | 🟢 Later |

**Alternative Model Comparison (Within Bedrock)**

| Model | Speed | Quality (Aviation Q&A) | Cost per 1M tokens (Input / Output) | Best For |
|---|---|---|---|---|
| **Claude Sonnet 3.5 v2** | Medium | ⭐ ⭐ ⭐ ⭐ ⭐ Excellent answers | $$$ (Higher) | Complex Q&A, safety-critical |
| **Claude Haiku 3.5** | Fast | ⭐ ⭐ ⭐ ⭐ Good Q&A, structured | $ (Much cheaper) | Quiz gen, flashcards, simple tasks |
| **Amazon Titan** | Fast | ⭐ ⭐ Okay | $ (Cheapest) | Basic text generation, summarization |
| **Llama 3.1 (via Bedrock)** | Medium | ⭐ ⭐ ⭐ ⭐ Good | $$ (Mid) | Alternative if Anthropic pricing changes |

*Recommendation:* Use Sonnet for Captain MAVE core Q&A (needs accuracy + reasoning) and Haiku for everything else (quiz, flashcard, study plan, weather briefing, remarks generation).

**Alternative Vector DB Comparison**

| Vector DB | Hosting | Minimum Cost | Scaling | Best For |
|---|---|---|---|---|
| **OpenSearch Serverless (current)** | AWS managed | ~$700/mo (2 OCU min) | Auto-scales OCUs | Large scale, AWS-native |
| **Pinecone** | Managed SaaS | Free tier available, then ~$70/mo based | Pod-setup | Small-mid scale, easy |
| **Qdrant** | Self-hosted on ECS or managed | ~$25/mo (self-hosted) | Manual | Cost-sensitive, technical team |
| **pgvector (PostgreSQL extension)** | Use existing RDS | $0 extra (already paying for RDS) | With RDS | Small knowledge base, fewer features |

*Recommendation:* For current scale (10-12 GB docs, likely <100K vectors), pgvector on existing RDS could eliminate OpenSearch cost entirely. Evaluate retrieval quality first — if similar, switch to pgvector and save ~$700/mo.

## 8. Key Metrics to Track

| Metric | Target | Tool |
|---|---|---|
| **Bedrock API cost / month** | Reduce 40% from baseline | AWS Cost Explorer |
| **Average response latency** | < 3 seconds | CloudWatch |
| **Cache hit rate** | > 30% after 1 month | Redis metrics |
| **Retrieval relevance score** | > 0.8 (RAGAS) | Evaluation pipeline |
| **Answer faithfulness** | > 0.9 (RAGAS) | Evaluation pipeline |
| **User satisfaction (thumbs up %)** | > 80% | Supabase analytics |
| **Hallucination rate** | < 5% | Spot-check + automated eval |

## 9. Summary — AI Engineer Quick View

```text
┌────────────────────────────────────────────────────────────┐
│          MAVERICK AI — Current vs Recommended              │
├────────────────────────────────────────────────────────────┤
│                                                            │
│ CURRENT STATE:                                             │
│ • 1 LLM (Claude Sonnet 3.5 v2) for everything              │
│ • 1 Vector DB (OpenSearch Serverless)                      │
│ • No caching, no monitoring, no model routing              │
│ • 6/15 modules use AI                                      │
│ • All AI = prompt engineering (no custom ML models)        │
│                                                            │
│ RECOMMENDED STATE:                                         │
│ • 2 LLMs — Sonnet (complex) + Haiku (simple tasks)         │
│ • Semantic cache layer (Redis)                             │
│ • Quality monitoring (RAGAS + user feedback)               │
│ • 9/15 modules use AI (add Weather, Logbook, Dispatch)     │
│ • Evaluate pgvector to replace OpenSearch (save ~$700/mo)  │
│ • Prompt versioning + A/B testing                          │
│                                                            │
│ COST IMPACT:                                               │
│ • 40-60% Bedrock cost reduction (model routing + cache)    │
│ • Potential ~$700/mo saving (vector DB switch)             │
│ • Better UX with streaming responses                       │
│                                                            │
│ TOP 3 ACTIONS:                                             │
│ 1. Add Haiku routing for simple tasks (Week 1)             │
│ 2. Add semantic caching (Week 2-3)                         │
│ 3. Add quality monitoring (Week 1-2)                       │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---
*Written from AI Engineer perspective based on Maverick FRD, Tech Deep Dive, AWS Architecture, Data Flow, and Logbook Logic documents.*
*Date: March 2026*
