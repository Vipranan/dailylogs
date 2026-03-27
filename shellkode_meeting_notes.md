# Shellkode Architecture and RAG Implementation Strategy

## Meeting Details
* **Meeting Name:** Shellkode
* **Timing:** 6:00 - 6:50

## Models Used
| Model | Temperature |
| :--- | :--- |
| Minimistral 14B | 0.2 |
| Claude Sonnet 4.5 | 0.7 |

## RAG Architecture
The system employs a **Hybrid RAG** architecture combining both Graph and Vector retrieval methods:

```text
       Hybrid RAG System
               │
       ┌───────┴───────┐
       ▼               ▼
     Graph           Vector
```

## Document Processing
* **Total Documents:** 600+
* **Chunk Size:** 2000
* **Overlap:** 300
* **Data Structuring Model:** Opaus 4.6

## Embedding Model
* **Model:** Amazon Titan Text Embeddings V2
* **Provider:** AWS
* **Features:** Supports configurable output dimensions of 1,024 (default), 512, or 256.
* **Vector RAG Configuration:** Utilizes embeddings and semantic search exclusively.

## Graph RAG System
* **Database Management System:** Neo4j (A leading graph database designed to store, manage, and query highly interconnected data by prioritizing relationships between data points).
* **Entity & Relation Extraction:** Manual extraction method utilizing 30+ defined entities and relations.

## Vector Retrieval Configuration
* **Vector RAG Output:** `TOP_K = 10`
* **Workflow:** Vector retrieval and Graph retrieval operate concertedly in the data extraction phase.

## Result Fusion
* **Algorithm:** Reciprocal Rank Fusion (RRF)
* **Configuration:** Merges the varied retrieval results to output the final `TOP_K = 10` documents.

## Evaluation Observations
* **RAG Evaluation:** Currently, there are no predefined metrics or pipelines in place for evaluating retrieval performance.
* **LLM Evaluation:** There are no current evaluation protocols for measuring or mitigating hallucinations within the LLM.

## Summary
The Shellkode session reviewed the existing Hybrid RAG architecture, which pairs Neo4j for graph relationships with AWS Titan Embeddings V2 for vector semantic search. Despite structuring 600+ documents using Opaus 4.6, the current production environment lacks standardized metrics to monitor RAG accuracy or LLM hallucinations. To address this, the team plans to pivot toward a locally-hosted RAG pipeline driven by Minimistral 14B, targeting an 80% accuracy benchmark. The upcoming architecture will rely on Python, LlamaIndex, LangChain, Hugging Face embeddings, and a local database, utilizing a multi-stage retrieval process including BM25, Cross Encoders, Reranking, and Reciprocal Rank Fusion (RRF).
