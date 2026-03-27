---
pdf_options:
  format: A4
  margin: 30mm 20mm 30mm 20mm
  displayHeaderFooter: true
  headerTemplate: '<div></div>'
  footerTemplate: '<div style="width:100%; text-align:center; font-size:9px; color:#666; font-family:Arial,sans-serif;">Page <span class="pageNumber"></span> of <span class="totalPages"></span> &nbsp;|&nbsp; AIRMAN Maverick – FRD v1.0 &nbsp;|&nbsp; Confidential</div>'
stylesheet: https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css
body_class: markdown-body
css: |-
  @page {
    border: 3px double #1a2744;
    padding: 10mm;
  }
  body {
    border: 3px double #1a2744;
    padding: 20px 25px;
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 11px;
    line-height: 1.6;
    color: #1a1a1a;
  }
  h1 {
    color: #1a2744;
    border-bottom: 3px solid #1a2744;
    padding-bottom: 8px;
    font-size: 24px;
  }
  h2 {
    color: #1a2744;
    border-bottom: 2px solid #3b5998;
    padding-bottom: 5px;
    margin-top: 30px;
    font-size: 18px;
  }
  h3 {
    color: #2c4a7c;
    font-size: 15px;
    margin-top: 20px;
  }
  h4 {
    color: #3b5998;
    font-size: 13px;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 12px 0;
    font-size: 10.5px;
  }
  th {
    background-color: #1a2744;
    color: white;
    padding: 8px 10px;
    text-align: left;
    font-weight: 600;
    border: 1px solid #1a2744;
  }
  td {
    padding: 6px 10px;
    border: 1px solid #d0d7de;
  }
  tr:nth-child(even) {
    background-color: #f6f8fa;
  }
  blockquote {
    border-left: 4px solid #3b5998;
    background-color: #f0f4ff;
    padding: 10px 15px;
    margin: 10px 0;
    color: #1a2744;
  }
  code {
    background-color: #f0f4ff;
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 10px;
    color: #1a2744;
  }
  pre {
    background-color: #f6f8fa;
    border: 1px solid #d0d7de;
    border-radius: 6px;
    padding: 12px;
    overflow-x: auto;
  }
  hr {
    border: none;
    border-top: 2px solid #3b5998;
    margin: 25px 0;
  }
  strong {
    color: #1a2744;
  }
---

# Functional Requirements Document (FRD)

## AIRMAN Maverick – Aviation Training & Flight Management Platform

| Field               | Details                                                      |
|---------------------|--------------------------------------------------------------|
| **Document Title**  | Functional Requirements Document – AIRMAN Maverick           |
| **Version**         | 1.0                                                          |
| **Date**            | 2026-03-06                                                   |
| **Prepared For**    | Airman Aeronautics / Scimplify                               |
| **Prepared By**     | Consolidated from source PDFs (AWS-AIRMAN, Mav-App-Upd, Mav_Repo, Mav_Tech_stack, System Architecture – Maverick vF) |
| **Classification**  | Confidential                                                 |

---

## Table of Contents

1. [Introduction & Purpose](#1-introduction--purpose)
2. [Business Background](#2-business-background)
3. [Target Users & Roles](#3-target-users--roles)
4. [Functional Scope Overview](#4-functional-scope-overview)
5. [Detailed Functional Requirements](#5-detailed-functional-requirements)
   - 5.1 [Onboarding & Authentication](#51-onboarding--authentication)
   - 5.2 [Home Dashboard](#52-home-dashboard)
   - 5.3 [Flight Planning & Dispatch](#53-flight-planning--dispatch)
   - 5.4 [Learning & ADAPT (Academy)](#54-learning--adapt-academy)
   - 5.5 [Digital Logbook](#55-digital-logbook)
   - 5.6 [Community & Messaging](#56-community--messaging)
   - 5.7 [AI Assistant – Captain MAVE](#57-ai-assistant--captain-mave)
   - 5.8 [Settings & Configuration](#58-settings--configuration)
6. [Technology Stack](#6-technology-stack)
7. [System Architecture](#7-system-architecture)
   - 7.1 [High-Level Architecture](#71-high-level-architecture)
   - 7.2 [Client / Frontend Layer](#72-client--frontend-layer)
   - 7.3 [Backend Layer](#73-backend-layer)
   - 7.4 [Data & Storage Layer](#74-data--storage-layer)
   - 7.5 [AI / ML & RAG Architecture](#75-ai--ml--rag-architecture)
8. [AWS Infrastructure Requirements](#8-aws-infrastructure-requirements)
   - 8.1 [Foundation Setup](#81-foundation-setup)
   - 8.2 [Infrastructure Deployment](#82-infrastructure-deployment)
   - 8.3 [CI/CD Pipeline](#83-cicd-pipeline)
   - 8.4 [Monitoring, Logging & Security](#84-monitoring-logging--security)
9. [External Integrations](#9-external-integrations)
10. [Security, Reliability & Scalability](#10-security-reliability--scalability)
11. [Non-Functional Requirements](#11-non-functional-requirements)
12. [Development Status & Gaps](#12-development-status--gaps)
13. [Implementation Timeline](#13-implementation-timeline)
14. [Evolution & Technical Roadmap](#14-evolution--technical-roadmap)
15. [Assumptions, Pre-requisites & Out of Scope](#15-assumptions-pre-requisites--out-of-scope)

---

## 1. Introduction & Purpose

**Maverick** is a mobile-first aviation training and flight management platform developed by **AIRMAN (Airman Aeronautics)** that supports pilots across their entire journey — from student to instructor. The platform provides:

- **Regulatory-aligned learning** for multiple authorities (FAA, EASA, DGCA, UK/TC CAA)
- **Operational flight planning** and logbook management for real-world flying
- **A social learning community** for collaboration and mentorship
- **An AI-powered assistant** (Captain MAVE) that provides contextual aviation support

The goal is to give pilots a single, integrated workspace where they can study efficiently, plan flights safely, track experience accurately, and stay connected with fellow aviators and instructors.

The tagline of the platform is: **"From Classroom → Cockpit → Career"**

---

## 2. Business Background

AIRMAN is committed to transforming aviation technology by integrating intelligence-driven solutions that enhance safety, efficiency, and performance. With no margin for error in aviation, the focus is on delivering:

- **AI-powered decision-making systems**
- **Advanced training platforms**
- **Augmented navigation solutions** tailored for modern aviation needs

The customer's current infrastructure is hosted on a third-party server, limiting scalability, flexibility, and modernization. To overcome these constraints, the plan is to:

1. **Migrate and rebuild** the application on AWS, adopting a serverless, microservices-based architecture
2. **Develop a next-generation learning platform** powered by Generative AI (GenAI) to deliver personalized, adaptive, and intelligent learning experiences

---

## 3. Target Users & Roles

Maverick is designed for three primary user roles, each with a tailored experience:

| Role                | Description                                                                                      |
|---------------------|--------------------------------------------------------------------------------------------------|
| **Student Pilot**   | Pilots in training who need to maintain accurate, regulator-compliant logbooks, prepare for exams and checkrides, and use structured learning content and practice tools |
| **Licensed / Professional Pilot** | Private and commercial pilots who need a single, digital-first place to record flights, track recency, manage certificates, and require reliable exports for authorities, employers, or training organizations |
| **Flight Instructor / Training Organization** | Instructors who want to monitor student progress (logbook, learning, exam readiness); flight schools and ATOs that need an integrated platform for students to log flights and study |
| **Ops Manager**     | Fleet management, roster scheduling, student/instructor oversight for training organizations       |
| **Dispatch Officer**| Dispatch operations, weather/NOTAM review, flight release authority                              |
| **Admin**           | Full system access, user management, organization-level settings                                 |

> **Note:** Pricing is auto-applied based on role selection during onboarding.

---

## 4. Functional Scope Overview

Maverick delivers the following core capabilities:

| Module                        | Key Features                                                                                    |
|-------------------------------|-------------------------------------------------------------------------------------------------|
| **Onboarding & Auth**         | Multi-provider sign-up, magic link, authority & role selection, license upload                   |
| **Home Dashboard**            | Role-aware dashboards, weather/NOTAM cards, compliance status, study queue                      |
| **Flight Planning & Dispatch**| Route planning, W&B calculations, fuel planning, OFP generation, weather integration            |
| **Learning & ADAPT**          | Structured curriculum, quizzes, flashcards, exam scheduler, aptitude testing, resume builder    |
| **Digital Logbook**           | Multi-leg flight entries, aircraft records, currency tracking, certificates, analytics, export  |
| **Community & Messaging**     | Channels, DMs (E2E encrypted), voice rooms, social feed, mentorship, trending topics            |
| **AI Assistant (Captain MAVE)**| Context-aware AI assistant with weather briefing, NOTAM analysis, study plans, flight debrief   |
| **Flight Operations (B2B)**   | Fleet management, flight scheduling (roster), dispatch/flight release, automated training reports|
| **Settings**                  | Account, devices, units, AI personalization, notifications, privacy, system preferences          |

---

## 5. Detailed Functional Requirements

### 5.1 Onboarding & Authentication

#### FR-ONB-001: Splash Screen
- **Description:** Full-screen display of AIRMAN logo with tagline "From Classroom → Cockpit → Career"
- **CTA:** Login / Sign Up button
- **Priority:** High

#### FR-ONB-002: Login / Sign Up
- **Description:** Multi-provider authentication support
- **Sign-up methods:**
  - Google OAuth
  - Apple Sign-In
  - Instagram (social)
  - Phone OTP
  - Email-based AIRMAN Account (email must be unique)
  - Magic Link
- **Link:** "Already have an account? Login"
- **Backend:** AWS Cognito via `amplify_flutter` (Flutter app) / Supabase Auth (web app)
- **Session management:** JWT-based with PKCE support, secure token storage
- **Priority:** High

#### FR-ONB-003: Authority Selection
- **Description:** User selects their regulatory authority
- **Options:** FAA, EASA, DGCA, UK/TC CAA
- **Impact:** Authority sets maps, rules, training hours, syllabus content, and AI response context
- **Priority:** High

#### FR-ONB-004: Role Selection
- **Description:** User selects their role
- **Options:** Student Pilot, Seasoned Pilot, Instructor
- **Impact:** Pricing is auto-applied; dashboard and features are role-aware
- **Priority:** High

#### FR-ONB-005: License Upload
- **Description:** User uploads their aviation license (scan or photo)
- **Provisional access:** Granted until license is verified
- **Storage:** Supabase Storage (pilot-documents bucket) with RLS & path-based policies
- **Priority:** Medium

#### FR-ONB-006: Onboarding Flow
- **Complete flow:** Splash → Login/Signup → Authority Selection → Role Selection → License Upload → Home
- **Guards:** Onboarding guard redirects users to correct step; role guard ensures onboarding is complete before main app access
- **E2E test coverage:** Playwright
- **Status:** ✅ Complete

---

### 5.2 Home Dashboard

#### FR-HOME-001: Pilot Dashboard
- **Description:** Role-aware home screen for pilots
- **Components:**
  - **Top Bar:** Maverick branding, notification bell, profile icon
  - **Weather Card:** ICAO METAR/TAF snapshot
  - **NOTAM Card:** Count of active NOTAMs
  - **Compliance Status:** ✓ indicator
  - **Lesson Card:** Next scheduled lesson with time (e.g., 14:30Z)
  - **Study Queue Card:** Pending modules count
  - **Aptitude Drill Reminder**
  - **Quick Actions Row:** Plan Flight | Study | Logbook
  - **Floating MAVE Dock:** Bottom-right AI assistant access
- **Daily Brief:** Weather, NOTAMs, schedule, and current priorities
- **Priority:** High

#### FR-HOME-002: Instructor Dashboard
- **Description:** Role-aware home screen for instructors
- **Components:**
  - **Student Roster Card:** List of assigned students
  - **Pending Log Sign-Offs:** Awaiting instructor approval
  - **Assigned Aptitude Tests:** Tests assigned to students
  - **Lesson Planning Shortcut:** Quick access to lesson planning
- **Priority:** High

#### FR-HOME-003: General Home Container
- **Description:** Role-based routing logic that renders appropriate dashboard
- **Key Stats:** Hours flown, study streaks, active objectives progress
- **Personalized Objectives:** Tailored to user's role and training stage
- **Status:** ✅ Complete

---

### 5.3 Flight Planning & Dispatch

#### FR-FLT-001: Flight Plan Setup
- **Description:** Multi-step stepper workflow (Setup → W&B → OFP)
- **Setup Form Fields:**
  - Mission Profile: Training / Cross-Country / Airline / Leisure
  - Route: DEP ICAO → ARR ICAO (+Alt/Waypoints)
  - Date/Time Picker
  - Aircraft Dropdown
  - Fuel Policy Dropdown
- **Supporting Elements:**
  - Map Preview Card
  - Weather Strip (METAR/TAF row)
  - NOTAM List
- **Priority:** High

#### FR-FLT-002: Weight & Balance + Performance
- **Description:** W&B calculation with visualization
- **Components:**
  - Fuel Breakdown Form (Trip/Alt/Reserve)
  - Mass & Balance Graph (mini chart with envelope visualizer)
  - Performance Panels: Takeoff / Landing distance calculations
  - Rule Flags (compliance chips)
- **Priority:** High

#### FR-FLT-003: OFP Generation & Sharing
- **Description:** Operational Flight Plan generation
- **Features:**
  - OFP Viewer (PDF preview area)
  - E-Sign capability
  - Share options: QR code, Email
  - Send to XB-70 device
  - PDF export
- **Priority:** High

#### FR-FLT-004: Saved Flight Plans
- **Description:** Local storage management for saved/reusable flight plans
- **Features:** Save, edit, reuse, and refine flight plans
- **Status:** ✅ Complete

#### FR-FLT-005: Weather Integration
- **Description:** Real-time aviation weather for route and aerodrome briefings
- **Data Sources:** NOAA Aviation Weather (METAR, TAF, AIRMET, SIGMET), Tomorrow.io (optional enhanced)
- **Features:** 
  - METAR display — current weather by ICAO code, decoded into readable format
  - TAF display — weather forecast for airports
  - Route weather — weather for all airports along a flight plan
  - Push notifications on significant weather changes
  - Auto-refresh at configurable intervals
  - Interactive weather maps
- **Status:** 🟨 Mock data only (API disabled via feature flag `USE_WEATHER_API`)
- **Priority:** High

#### FR-FLT-006: NOTAM Integration
- **Description:** NOTAMs for relevant airports and routes with AI-assisted risk interpretation
- **Data Source:** FAA NOTAM Service
- **Status:** 🟨 Mock data only (API disabled via feature flag `USE_NOTAM_API`)
- **Priority:** High

---

### 5.4 Learning & ADAPT (Academy)

#### FR-LRN-001: Curriculum Hub
- **Description:** Structured learning platform with course management
- **Courses displayed:** PPL, CPL, ATPL, IR (with progress bars)
- **Subjects:** Air Regulation, Meteorology, Navigation, Aircraft Technical, Flight Planning & Performance, Human Performance, Radio Communications, ADAPT
- **Features:**
  - Continue Module CTA
  - Progress tracking by subject and chapter (completion %, XP system, daily streaks)
  - PDF study mode with integrated AI sidebar for Q&A on highlighted text, plus bookmarks
  - Notes system — tagged notes with Markdown export
  - Offline access for downloaded materials
- **Priority:** High

#### FR-LRN-002: Quizzes & Flashcards
- **Description:** Interactive learning reinforcement tools
- **Quiz features:**
  - MCQ questions with answers, explanations, difficulty tags
  - Quiz scoring and attempt history
  - Timed exams with detailed review of incorrect answers
  - Practice exam assembly
- **Flashcard features:**
  - Spaced repetition with mastery level tracking
  - Fast revision mode
- **Priority:** High

#### FR-LRN-003: Exam Scheduler
- **Description:** Schedule and manage upcoming exams
- **Features:**
  - Select: Course → Module → Date
  - Calendar Picker
  - Add Reminder / Notifications
  - Daily study targets generation
- **Priority:** Medium

#### FR-LRN-004: Resume Builder
- **Description:** Aviation-specific resume generation
- **Features:**
  - Auto-import logbook hours + licenses
  - Editable fields: Skills, Aircraft, Achievements
  - Generate PDF Resume
  - Share / Export
- **AI Integration:** Captain MAVE can draft resumes from logbook totals + certificates
- **Priority:** Medium

#### FR-LRN-005: Aptitude Hub & Testing
- **Description:** Aptitude assessment and readiness evaluation
- **Modes:** Quick Drill | Full Simulation
- **Categories:** Cognitive, Psychomotor, Situational Judgement Tests (SJT)
- **Aptitude Runner:** Adaptive difficulty based on performance, timer display, stimulus box, progress bar
- **Results Overview:** Score breakdown, MAVE Insights, Trend Graph
- **Status:** ✅ Complete
- **Priority:** High

---

### 5.5 Digital Logbook

#### FR-LOG-001: 8-Step Flight Log Entry
- **Description:** Digital replacement for the paper pilot logbook with an 8-step guided entry workflow
- **Workflow Steps:**
  1. **Context:** Date, departure/arrival airports (ICAO), route
  2. **People & Roles:** Pilot function (PIC/SIC/DUAL/INSTRUCTOR/STUDENT), crew names
  3. **Aircraft:** Select from user's registered aircraft
  4. **Times:** Total time (single mode) OR multi-leg mode with per-leg times. PIC, SIC, day, night time
  5. **XC & IFR:** Cross-country time, IFR time, approaches, day/night landings
  6. **Incidents:** Incident flag (if yes → description mandatory), remarks
  7. **Attachments:** Photo uploads (max 10 MB/file, images only)
  8. **Review:** Read-only summary → confirm and submit
- **Time Calculation Logic:**
  - **Total Hours:** `block_on − block_off`
  - **Dual Hours:** Flights with instructor present
  - **Solo Hours:** Flights without instructor
  - **Night Hours:** Flights between 18:00–06:00
- **Validation:** Triple validation — frontend (Zod), backend (Pydantic), DB constraints
- **Priority:** High

#### FR-LOG-002: Aircraft Management
- **Description:** Registry of aircraft with category/class and performance profiles
- **Data:** Aircraft types, performance JSON, category/class
- **Priority:** Medium

#### FR-LOG-003: Currency Tracking
- **Description:** Regulatory recency requirements tracking
- **Features:**
  - Currency summary (e.g., 90-day takeoff/landing, night, IFR)
  - Alerts for expiring currencies and certificates
  - Automatic calculation per authority regulations
- **Priority:** High

#### FR-LOG-004: Certificates & Documents
- **Description:** Management of pilot certificates, licenses, ratings, endorsements, and medical certificates
- **Features:**
  - Store references to documents
  - Expiry warnings
- **Storage:** Supabase Storage (pilot-documents bucket)
- **Priority:** Medium

#### FR-LOG-005: Logbook Analytics & Export
- **Description:** Advanced analytics and reporting
- **Analytics:** Hours by year, aircraft type, category (via `fl_chart`)
- **Export Formats:**
  - CSV
  - PDF
  - DGCA-compliant format
  - FAA/EASA formats (planned)
- **Status:** ✅ Complete
- **Priority:** High

#### FR-LOG-006: Debrief & Replay
- **Description:** Post-flight analysis tools
- **Features:**
  - Map Replay: 2D/3D flight path
  - Timeline of Events
  - AI Debrief Insights (Captain MAVE)
  - Instructor Notes Section
- **Priority:** Medium

#### FR-LOG-007: Offline Sync
- **Description:** Offline-first logbook operations
- **Pattern:**
  1. If online → request goes to FastAPI/Supabase
  2. If offline → data stored locally (IndexedDB) with "sync pending" flag
  3. On reconnect → sync routine batches pending changes to backend
- **Conflict resolution:** Built-in via `offline_sync_service.py`
- **Priority:** High

---

### 5.6 Community & Messaging

#### FR-COM-001: Community Feed
- **Description:** Social feed interface with trending topics
- **Features:**
  - Trending Topics Feed
  - Group Cards (e.g., FAA PPL, Airbus A320, DGCA ATPL)
  - Post Composer: "Share update…"
  - DM Button
- **Priority:** Medium

#### FR-COM-002: Messaging System
- **Description:** WhatsApp-style messaging across channels and DMs
- **Features:**
  - Direct messages — End-to-End (E2E) encrypted 1-on-1 messaging
  - Message threading and reactions
  - File sharing in conversations
  - Voice room integration from text channels
  - Read receipts, Typing indicators, Presence & online status
  - Pinning, Starring, Reporting, Message search & filtering
- **Real-time:** Powered by Supabase Realtime (WebSockets)
- **Status:** 🟨 UI complete, backend integration pending
- **Priority:** Medium

#### FR-COM-003: Voice Rooms
- **Description:** Real-time audio rooms for pilots/students/instructors
- **Infrastructure:** LiveKit (WebRTC)
- **Features:**
  - Create/join rooms, invite codes, lock/unlock rooms
  - Push-to-talk with visual feedback
  - Participant role management (host vs listener)
  - Host controls: mute, kick, promote
- **Tables:** `voice_rooms`, `voice_members`, `voice_room_invites`
- **Status:** 🟨 UI ready, LiveKit credentials feature-flagged
- **Priority:** Low (Phase 2)

#### FR-COM-004: Social Connections
- **Description:** User connection and mentorship graph
- **Features:**
  - Send/accept/reject connection requests
  - Contact discovery via privacy-preserving hashed contact sync
  - Mutual connection suggestions
  - Doubts / Q&A routing to instructors/mentors
- **Priority:** Medium

---

### 5.7 AI Assistant – Captain MAVE

#### FR-AI-001: AI Chat Interface
- **Description:** Floating AI dock available across the app
- **Location:** Bottom-right floating dock on all screens
- **Interface:** Streaming chat with context awareness based on current screen
- **Voice Output/Input:** Voice interaction for hands-free input (Phase 2)
- **Priority:** High

#### FR-AI-002: AI Tools & Capabilities
- **Description:** Specialized AI tools instead of generic chat

| Tool                 | Description                                                                                    |
|----------------------|------------------------------------------------------------------------------------------------|
| `weather_brief`      | METAR/TAF analysis, hazards, VFR/IFR category, recommendations                               |
| `notam_analysis`     | Highlights operationally critical NOTAMs (closures, restrictions)                              |
| `weight_balance`     | Reviews W&B inputs, flags out-of-limit or borderline loading                                  |
| `flight_analysis`    | Post-flight debrief using logbook data                                                         |
| `study_plan`         | Schedule from exam date, weak topics, available time                                           |
| `exam_prep`          | Explanation of answers, auto-generation of quizzes & flashcards from study material            |
| `student_snapshot`   | Instructor summary (study progress + hours + currency)                                         |
| `resume_draft`       | Aviation résumé from logbook totals + certificates                                             |
| `general_chat`       | General aviation Q&A grounded in regulations and training material                             |

- **Priority:** High

#### FR-AI-003: RAG-Based Knowledge Grounding
- **Description:** Retrieval-Augmented Generation over aviation documents
- **Knowledge base:** ~10–12 GB of internal knowledge sources including aircraft documents, pilot specifications, subject walkthroughs, and textbooks
- **Document ingestion pipeline:**
  1. PDFs uploaded to study-materials bucket
  2. Text extracted page-by-page
  3. Chunking: 800–1200 tokens per chunk, 200–300 token overlap
  4. Embedding: BGE-Small-EN, 384-dim embeddings
  5. Storage in `document_embeddings` table (pgvector)
  6. HNSW index for sub-10ms similarity search
- **RAG retrieval flow:**
  1. Embed user query
  2. Similarity search using cosine similarity
  3. Filter & re-rank using metadata (authority, doc_type, aircraft, phase)
  4. Assemble context (top 5–10 chunks + page numbers + doc IDs)
  5. Pass context into LLM with user profile
- **Priority:** High

#### FR-AI-004: Safety Guardrails
- **Description:** Aviation-specific safety constraints for AI
- **Rules:**
  - Provide advisory information only
  - **Proper Aviation Phraseology** enforced in all responses (P0)
  - Always remind users to confirm with official sources (AIP, regulations, instructor)
  - **Citation Support**: Responses must explicitly cite source documents and regulations (P0)
  - Prefer conservative, safety-first interpretations
  - Never give medical/legal advice or hard go/no-go decisions
  - Authority-aware: Tailor answers to user's regulatory authority with specific citations (e.g., "FAR 91.155", "AIM 3-2-3")
  - For currency: Never say "yes you are 100% legal" — instead direct to verify with official sources
  - For weather/NOTAM: Always include observation times and validity; explicitly state go/no-go is pilot's responsibility
  - Prohibited: No medical advice, no aircraft modification guidance, no legal interpretations, no unsafe practices
- **Priority:** Critical

#### FR-AI-005: AI Model Configuration
- **Models:**

| Model                    | Size | Use Case                                  |
|--------------------------|------|-------------------------------------------|
| `open-mistral-nemo`      | 12B  | High-quality, detailed reasoning          |
| `open-mistral-7b`        | 7B   | Faster, cost-efficient for simpler Q&A    |
| Hugging Face (fallback)  | —    | If Mistral is unavailable                 |
| Mock provider (dev/offline)| —  | Safe canned aviation responses            |

- **Config:** Temperature 0.35, top-p 0.9, max tokens 800
- **User control:** Users can select preferred model in Settings
- **Fallback chain:** Mistral → HuggingFace → Mock provider
- **Priority:** High

#### FR-AI-006: Usage Tracking & Quotas
- **Features:**
  - Per-user AI usage tracking (daily/weekly quotas)
  - AI logs: user_id, tool, model_used, response_time_ms, token_count
  - Model comparison logs for internal evaluation
  - Caching: Frequently repeated queries cached for ~1 hour
- **Priority:** Medium

---

### 5.8 Settings & Configuration

#### FR-SET-001: Settings Screen
- **Description:** Comprehensive settings management
- **Sections:**
  - **Account & Subscription:** Profile management, role, authority
  - **Devices:** Pair XB-70, Device Health
  - **Units & Display:** ft/m, lbs/kg, °C/°F
  - **AI Personalization:** Tone setting (mentor vs drill sergeant), model selection
  - **Notifications & Alerts:** Push notification preferences, exam reminders, certificate expiry alerts
  - **Privacy & Security:** DM settings, consent logs, data export, GDPR flows
  - **System:** Language, cache, bug report, updates
- **Theme support:** Light and dark modes
- **Priority:** Medium

---

### 5.9 Flight Operations (B2B Modules)

#### FR-OPS-001: Fleet Management
- **Description:** Core aircraft management and administration for training organizations
- **Features:**
  - **Aircraft registry:** Registration number, type, configuration
  - **Status flow:** `ACTIVE` ↔ `MAINTENANCE` ↔ `INACTIVE`
  - Only `ACTIVE` aircraft available for scheduling
  - **Hours tracking:** Auto-update `hours_since_last_inspection` after each flight
  - **Maintenance scheduling:** Blocks roster during maintenance
  - **Defect reporting:** Log defects with severity and resolution status
  - **Availability calendar**
- **Priority:** High (P0)

#### FR-OPS-002: Roster (Flight Scheduling)
- **Description:** Sortie creation linking students, instructors, aircraft, lessons, and time slots
- **Features:**
  - **Create sortie:** Assign student, instructor, aircraft, lesson, date/time, airport
  - **Aircraft validation:** Only shows ACTIVE aircraft; checks availability
  - **Auto-create link:** Automatically creates Dispatch Plan when sortie is created
  - **Status tracking:** `SCHEDULED → DISPATCHED → IN_FLIGHT → COMPLETED`
  - **Block times:** Recording `block_off_at` and `block_on_at`
  - **Calendar UI:** Calendar view with advanced filters
- **Priority:** High (P0)

#### FR-OPS-003: Dispatch (Flight Release)
- **Description:** Validates all safety and compliance conditions before releasing a flight
- **Features:**
  - **Status flow:** `DRAFT → DATA_READY → UNDER_REVIEW → CLEARED → RELEASED`
  - **Pre-Release validation checklist:**
    1. Aircraft status check (ACTIVE, no critical defects)
    2. Weather (METAR/TAF limits)
    3. NOTAMs (No safety-blocking notices)
    4. Financial clearance (Student balance sufficiency)
    5. FDTL compliance (Instructor duty limits)
    6. DGCA regulatory rules
    7. Overall risk assessment (GREEN/AMBER to pass, RED blocks release)
  - **Behavior:** On release, sortie status updates to `DISPATCHED` and notifies crew. Auto-invalidates if Aircraft goes AOG
- **Priority:** High (P0)

#### FR-OPS-004: Training Report
- **Description:** Auto-calculates student flight hours and progress from completed sorties
- **Features:**
  - Triggers only on `COMPLETED` sorties with both block times
  - **Calculation:** Auto-calculates Total, Dual, Solo, XC, Night hours
  - **Syllabus progress:** Progress % based on completed topics
  - **Milestone tracking:** First solo, first night, check rides
  - Auto-creates digital logbook entries from the completed sortie
  - Assesses readiness status for the next training phase
- **Priority:** High (P0)

---

### 5.10 Cross-Module Data Flow & User Flows

**Flight Operations Workflow Example:**
1. **Ops Manager:** Fleet Check → Create Sortie
   ↳ *System: Auto-creates Dispatch Plan (DRAFT)*
2. **Dispatch Officer:** Review Pre-Release Checklist → Release Flight
   ↳ *System: Sortie status updates to DISPATCHED*
3. **Instructor/Student:** Block Off → Fly → Block On
   ↳ *System: Updates fleet hours, calculates training progress, creates logbook entry*

**State Matrix:**
- Aircraft to `MAINTENANCE` → Flags relevant Sorties → Invalidates related Dispatch Plans
- Flight `COMPLETED` → Updates Fleet Hours → Closes Dispatch Release → Calculates Training Progress

---

## 6. Technology Stack

### 6.1 Frontend – Flutter Mobile App (Primary Mobile Experience)

| Component                  | Technology                                                                |
|----------------------------|---------------------------------------------------------------------------|
| **Framework**              | Flutter (latest stable) — Android & iOS                                  |
| **State Management**       | `flutter_riverpod`                                                       |
| **Architecture**           | Feature-based folder structure (auth, onboarding, home, logbook, learning, flight_plan, profile, settings, legal) |
| **HTTP Client**            | `dio` with auth token interceptor                                        |
| **Authentication**         | AWS Cognito via `amplify_flutter`                                        |
| **Secure Storage**         | `flutter_secure_storage` for tokens; `shared_preferences` for user prefs |
| **Offline Cache**          | `sqflite` for flights, aircraft, profile data                            |
| **Navigation**             | `go_router` (declarative, URL-based)                                     |
| **Charts**                 | `fl_chart` for logbook stats, learning progress                          |
| **PDF Viewer**             | `syncfusion_flutter_pdfviewer`                                           |
| **Animations**             | `flutter_animate`                                                        |
| **Push Notifications**     | `firebase_messaging`                                                     |
| **Testing**                | `flutter_test`, `integration_test`, `mockito`                            |

### 6.2 Frontend – React Web App (PWA + Capacitor)

| Component                  | Technology                                                                |
|----------------------------|---------------------------------------------------------------------------|
| **Framework**              | React 18.3.1 + TypeScript                                               |
| **Build Tool**             | Vite 5.4.1 + SWC                                                        |
| **UI Library**             | shadcn/ui (53+ components) + Radix UI primitives                         |
| **Styling**                | Tailwind CSS                                                             |
| **Animations**             | Framer Motion                                                            |
| **State Management**       | TanStack React Query + React hooks                                       |
| **Forms**                  | React Hook Form + Zod validation                                        |
| **Routing**                | React Router v6 (lazy-loaded routes)                                     |
| **Offline Storage**        | LocalForage (IndexedDB)                                                  |
| **Native Bridge**          | Capacitor (iOS/Android packaging)                                        |
| **Testing**                | Playwright (E2E), Vitest + Testing Library (unit)                        |

### 6.3 Backend

| Component                  | Technology                                                                |
|----------------------------|---------------------------------------------------------------------------|
| **Primary BaaS**           | Supabase (PostgreSQL, Auth, Storage, Edge Functions, Realtime)           |
| **Logbook Microservice**   | FastAPI (Python), SQLAlchemy ORM, Pydantic v2                            |
| **API Base URL**           | `https://api.maverick.theairman.org`                                     |
| **Edge Functions**         | Deno/TypeScript (AI orchestration, link preview, account deletion, voice tokens) |
| **Database**               | PostgreSQL with pgvector extension                                       |
| **Vector Store**           | `document_embeddings` table (384-dim BGE-Small-EN, HNSW index)          |
| **Object Storage**         | Supabase Storage buckets (chat-uploads, pilot-documents, profile-photos, study-materials) |

### 6.4 AI / ML Stack

| Component                  | Technology                                                                |
|----------------------------|---------------------------------------------------------------------------|
| **Primary LLM**            | Mistral AI (open-mistral-nemo 12B, open-mistral-7b)                     |
| **Fallback LLM**           | Hugging Face Inference API                                               |
| **RAG Embedding Model**    | BGE-Small-EN (384 dimensions)                                           |
| **Vector DB**              | pgvector in PostgreSQL (HNSW index, cosine similarity)                   |
| **Orchestration**          | `mave` Supabase Edge Function                                           |
| **Planned (AWS migration)**| Amazon Bedrock (Claude Sonnet 3.5 v2), Amazon OpenSearch Service         |

---

## 7. System Architecture

### 7.1 High-Level Architecture

Maverick is built as a **modular, cloud-native, mobile-first** platform consisting of:

```
┌─────────────────────────────────────────────────┐
│           CLIENT APPLICATIONS                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ Web PWA  │  │ iOS App  │  │ Android  │      │
│  │ (React)  │  │(Capacitor)│ │(Capacitor)│      │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘      │
│       └──────────────┴─────────────┘             │
└──────────────────┬──────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
┌───────────────┐    ┌────────────────┐
│   SUPABASE    │    │    FASTAPI     │
│  (Primary)    │    │  (Logbook MS)  │
│ ┌───────────┐ │    │ ┌────────────┐ │
│ │   Auth    │ │    │ │  Flights   │ │
│ │ PostgreSQL│ │    │ │  Aircraft  │ │
│ │ Realtime  │ │    │ │  Currency  │ │
│ │ Storage   │ │    │ │  Exports   │ │
│ │ Edge Fns  │ │    │ │  Analytics │ │
│ └───────────┘ │    │ └────────────┘ │
└───────┬───────┘    └────────────────┘
        │
        ▼
┌───────────────────┐
│   AI LAYER        │
│ ┌───────────────┐ │
│ │ mave Edge Fn  │ │
│ │ RAG Pipeline  │ │
│ │ pgvector      │ │
│ │ Mistral API   │ │
│ └───────────────┘ │
└───────────────────┘
        │
        ▼
┌───────────────────┐
│ EXTERNAL SERVICES │
│ Weather APIs      │
│ NOTAM Sources     │
│ LiveKit (Voice)   │
│ OAuth Providers   │
└───────────────────┘
```

### 7.2 Client / Frontend Layer

**Key Responsibilities:**
- Building context for AI queries and rendering results
- Offline-first behavior with IndexedDB caching
- Mobile-first UI with touch targets ≥ 44px (iOS HIG compliant)
- Safe area handling for notches & dynamic island
- Custom gesture hooks: `useLongPress`, `useSwipeBack`, `usePullToRefresh`, `useSwipeGesture`

**Performance Optimizations:**
- Lazy loading 15+ routes
- Virtualized lists for logs/messages
- Debounced searches
- Image lazy loading
- Memoization (`useMemo`, `useCallback`, `React.memo`)

**Backend Communication Strategy:**
1. **Supabase Client (Primary):** Auth, real-time messages, DB reads/writes, file uploads, presence tracking
2. **REST API (FastAPI):** Aircraft calculations, DGCA exports, logbook CRUD, currency, analytics
3. **Edge Functions:** AI requests, link previews, account deletion, LiveKit tokens

### 7.3 Backend Layer

**Supabase (Primary Backend):**
- User management & authentication (profiles, settings, onboarding_state)
- Learning/Academy module (subjects, chapters, questions, flashcards, study_progress, quiz_results)
- Community & messaging (communities, channels, messages, DMs, voice rooms)
- Social connections & doubts
- AI data & administration (ai_logs, document_embeddings, moderation)

**FastAPI (Logbook Microservice):**
- Flights CRUD + bulk import
- Aircraft registry & performance
- Currency computations
- DGCA-compliant exports (CSV, PDF)
- Offline sync & conflict resolution
- Statistics & analytics

### 7.4 Data & Storage Layer

**Core Data Domains:**

| Domain                 | Tables/Entities                                                                    |
|------------------------|------------------------------------------------------------------------------------|
| User & Auth            | `profiles`, `user_settings`, `onboarding_state`                                   |
| Learning / Academy     | `subjects`, `chapters`, `questions`, `flashcards`, `study_progress`, `quiz_results`|
| Community & Social     | `communities`, `channels`, `messages`, `dm_threads`, `user_connections`, `doubts`  |
| Flight & Logbook       | `aircraft`, `flights`, `flight_purposes`, `flight_templates`, `pilot_certificates` |
| AI & Analytics         | `ai_logs`, `model_comparison_logs`, `document_embeddings`                          |
| Moderation & Roles     | `moderation_flags`, `server_roles`, `role_permissions`                             |

**Object Storage Buckets:**
- `chat-uploads`: Images, videos, documents, voice notes (public read, authenticated writes)
- `pilot-documents`: Licenses, medical, endorsements (private with RLS)
- `profile-photos`: Avatars (public read, owner upload only)
- `study-materials`: PDF textbooks, manuals, regulations

**On-Device Storage:**
- IndexedDB (LocalForage): Cached flight plans, logbook drafts, learning progress, AI responses (short TTL)
- React Query Cache: In-memory server data with stale-time and automatic refetching
- sqflite (Flutter): Offline caching of flights, aircraft, profile data

### 7.5 AI / ML & RAG Architecture

**AI Request Flow:**
1. Client sends query to `mave` Edge Function
2. Validate auth & inputs
3. Gather context (current subject/chapter, flight plan, weather, user authority/role)
4. Semantic search via pgvector (`document_embeddings`)
5. Build aviation-safe system prompt with safety constraints, regulatory alignment, and formatting rules
6. Call configured Mistral model (or fallback)
7. Log usage (latency, tokens) to `ai_logs`
8. Return structured response + cache for reuse

**Embeddings Table Schema:**
| Column          | Type         | Description                     |
|-----------------|-------------|---------------------------------|
| `id`            | UUID         | Primary key                     |
| `content`       | TEXT         | Original chunk text             |
| `embedding`     | vector(384)  | BGE-Small-EN embedding          |
| `document_id`   | UUID         | Link to source PDF/chapter      |
| `chunk_index`   | INTEGER      | Position within document        |
| `metadata`      | JSONB        | Source, page, section, authority |
| `created_at`    | TIMESTAMP    | Creation timestamp              |

---

## 8. AWS Infrastructure Requirements

> **Context:** As part of the migration from third-party hosting, the application will be rebuilt on AWS using a serverless, microservices-based architecture. This section covers the infrastructure managed by ShellKode.

### 8.1 Foundation Setup

| Requirement ID | Description                                                                   |
|---------------|-------------------------------------------------------------------------------|
| FR-AWS-001    | Set up VPC with public, private (application), and database subnets across 2 Availability Zones |
| FR-AWS-002    | Configure Internet Gateway, NAT Gateways, NACLs, and Route Tables            |
| FR-AWS-003    | Implement Amazon Route 53 for DNS hosting and domain resolution               |
| FR-AWS-004    | Configure IAM roles and policies following least-privilege principles          |
| FR-AWS-005    | Enable AWS WAF to protect web applications from common exploits               |
| FR-AWS-006    | Implement Security Groups and NACLs to isolate workloads                      |

### 8.2 Infrastructure Deployment

| Requirement ID | Description                                                                   |
|---------------|-------------------------------------------------------------------------------|
| FR-AWS-007    | Deploy Amazon ECS on Fargate in private subnets for serverless container orchestration |
| FR-AWS-008    | Configure Application Load Balancer (ALB) for traffic distribution            |
| FR-AWS-009    | Provision Amazon RDS for PostgreSQL in database subnets (multi-AZ, automated backups) |
| FR-AWS-010    | Configure ECS Service Auto Scaling for workload availability                  |

### 8.3 CI/CD Pipeline

| Requirement ID | Description                                                                   |
|---------------|-------------------------------------------------------------------------------|
| FR-AWS-011    | Connect GitHub repository as version control system                           |
| FR-AWS-012    | Configure AWS CodePipeline for continuous integration and deployment           |
| FR-AWS-013    | Use AWS CodeBuild to build and package container images                       |
| FR-AWS-014    | Push container images to Amazon ECR                                           |
| FR-AWS-015    | Deploy microservices to ECS Fargate via CodePipeline                          |
| FR-AWS-016    | Validate application connectivity to RDS and dependent services               |

### 8.4 Monitoring, Logging & Security

| Requirement ID | Description                                                                   |
|---------------|-------------------------------------------------------------------------------|
| FR-AWS-017    | Enable Amazon CloudWatch for log collection, custom metrics, and alarms       |
| FR-AWS-018    | Configure AWS CloudTrail to audit account-level API activity                  |
| FR-AWS-019    | Implement AWS Config to track and enforce compliance of resources              |
| FR-AWS-020    | Enable Amazon GuardDuty for continuous threat detection                       |
| FR-AWS-021    | Integrate CloudWatch and SNS alerts for proactive incident response           |

### AWS Resources Used

| Service              | Purpose                                        |
|----------------------|------------------------------------------------|
| AWS WAF              | Web application firewall                        |
| Internet Gateway     | Public internet access                          |
| NAT Gateway          | Outbound internet for private subnets           |
| AWS ELB (ALB)        | Load balancing                                  |
| AWS ECS (Fargate)    | Container orchestration                         |
| AWS EC2              | Compute instances                               |
| AWS RDS              | Managed PostgreSQL                              |
| AWS ECR              | Container image registry                        |
| AWS GuardDuty        | Threat detection                                |
| Amazon CloudWatch    | Monitoring & logging                            |
| AWS CloudTrail       | API audit trail                                 |
| AWS Config           | Resource compliance                             |
| AWS CodePipeline     | CI/CD orchestration                             |
| AWS CodeBuild        | Build service                                   |
| AWS CodeDeploy       | Deployment service                              |
| AWS CloudFront       | CDN / content delivery                          |
| AWS KMS              | Key management                                  |
| AWS OpenSearch       | Search / vector store for RAG                   |
| AWS Bedrock          | Managed AI/ML service (Claude Sonnet 3.5 v2)   |
| AWS Lambda           | Serverless functions                            |

---

## 9. External Integrations

| Integration              | Provider                       | Purpose                                    | Status                     |
|--------------------------|--------------------------------|--------------------------------------------|-----------------------------|
| AI (Primary LLM)         | Mistral AI                     | Natural language AI for all MAVE actions   | ✅ Active                   |
| AI (Fallback)            | Hugging Face                   | Backup LLM when Mistral unavailable        | ✅ Configured               |
| AI (AWS migration)       | Amazon Bedrock / Claude 3.5    | Target production AI provider              | 🔲 Planned                  |
| Weather                  | NOAA Aviation Weather          | METAR, TAF, AIRMET, SIGMET                 | ✅ Implemented (flag-gated) |
| Weather (Premium)        | Tomorrow.io                    | Hyperlocal forecasts                       | 🔲 Code-ready               |
| NOTAMs                   | FAA NOTAM Service              | Runway closures, airspace restrictions      | ✅ Implemented (flag-gated) |
| Voice                    | LiveKit                        | Real-time audio rooms                      | 🟨 UI ready, feature-flagged|
| Auth                     | Google OAuth / Apple Sign-In   | Social login                               | ✅ Configured               |
| Auth                     | AWS Cognito                    | Mobile app authentication                  | ✅ Active                   |
| Knowledge Base (AWS)     | Amazon OpenSearch Service      | Vector store for RAG                        | 🔲 Planned                  |
| Regulatory               | DGCA / eGCA                   | Indian regulatory exports                  | 🔲 Planned                  |
| Push Notifications       | Firebase Messaging             | Mobile push notifications                  | ✅ Configured               |

---

## 10. Security, Reliability & Scalability

### 10.1 Authentication & Authorization
- **Auth Provider:** Supabase Auth (managed) with JWT-based auth (HS256)
- **Supported flows:** Email/password, Google OAuth, Apple Sign-In, PKCE-based web flows, **Magic Link**
- **Authorization:** RBAC (student, instructor, admin) + RLS at database level
- **Route Guards:** `ProtectedOutlet` for authenticated users, `RoleGuard` for onboarding completion

### 10.2 Input Validation & Security
- **Client-side:** Zod schemas with react-hook-form; type/length/pattern validation
- **Server-side:** FastAPI Pydantic v2 models (structured 422 responses)
- **Sanitization:** `sanitizeInput()` strips HTML tags, `sanitizeHtml()` removes script/iframe tags
- **SQL Injection Protection:** All DB access via Supabase JS client or SQLAlchemy ORM — no dynamic string concatenation

### 10.3 Data Protection
- **Tenant Isolation:** Multi-tenant isolation at database level via `tenant_id`
- **RLS enabled** on all user-specific tables (flights, aircraft, channels, messages, dm_threads, connections)
- **Encryption in transit:** HTTPS/TLS enforced
- **Encryption at rest:** PostgreSQL + Supabase storage encryption
- **End-to-End Encryption:** Applied to 1-on-1 direct messages
- **Content Security:** Strict Content Security Policy (CSP) headers applied across all web clients
- **Secrets management:** Environment variables only — never hardcoded
- **PII Handling:** Logs avoid storing raw PII; `delete-user-account` edge function for GDPR compliance

### 10.4 Reliability & Backup
- **Database backups:** Supabase-managed automated daily backups with point-in-time recovery (PITR)
- **Frontend rollbacks:** Netlify/Vercel instant rollbacks
- **Container rollbacks:** Tag-based image releases
- **AI resilience:** Mistral → HuggingFace → Mock fallback chain

### 10.5 Scalability

| Layer            | Strategy                                                    |
|------------------|-------------------------------------------------------------|
| Frontend         | Static React app served from CDN; scaling = bandwidth       |
| Backend (Supabase) | Edge functions + realtime engine auto-scale; DB vertical scaling + read replicas |
| Backend (FastAPI)| Containerized, horizontally scalable (ECS/Cloud Run)        |
| AI/RAG           | pgvector HNSW indexes for sub-10ms similarity lookups       |
| Storage          | CDN-served static assets and storage files                  |

### 10.6 Performance Targets

| Metric                              | Target              |
|--------------------------------------|---------------------|
| General Q&A (AI)                     | p95 < 1.2s          |
| Heavy AI + RAG (preflight/debrief)   | p95 < 3s            |
| Initial page load (mobile / 3G)      | ≤ 3 seconds         |

### 10.7 Application Routes & Access

| Route               | Page Content            | Auth Required |
|---------------------|-------------------------|---------------|
| `/`                 | Home / Splash Dashboard | No            |
| `/learning`         | Learning Hub            | Yes           |
| `/flight-plan`      | Flight Planning         | Yes           |
| `/logbook`          | Logbook                 | Yes           |
| `/community/rooms`  | Voice Rooms             | Yes           |

---

## 11. Non-Functional Requirements

| ID          | Requirement                                                                      | Target / Priority |
|-------------|---------------------------------------------------------------------------------|-------------------|
| NFR-001     | Mobile-first responsive design across web, iOS, and Android                      | High              |
| NFR-002     | Offline-first architecture — key workflows work without internet                 | High              |
| NFR-003     | Cross-platform: single codebase → Web PWA, iOS, Android                          | High              |
| NFR-004     | Accessibility Standard                                                           | WCAG 2.1 AA       |
| NFR-005     | Touch targets ≥ 44px (iOS HIG compliant)                                        | Medium            |
| NFR-006     | Light and dark theme support                                                     | Medium            |
| NFR-007     | System Availability (Uptime SLA)                                                 | 99.9%             |
| NFR-008     | Web PWA Initial Bundle Size                                                      | < 500 KB          |
| NFR-009     | Scalability (Concurrent Users Support)                                           | 10,000+           |
| NFR-010     | Structured JSON logging with timestamp, level, service, user_id, trace_id       | Medium            |

---

## 12. Development Status & Gaps

### ✅ Fully Working (Ready for Users)

| Feature                          | Status |
|----------------------------------|--------|
| Complete onboarding flow         | ✅      |
| Flight plan creation and export  | ✅      |
| Learning modules and testing     | ✅      |
| Logbook management               | ✅      |
| AI assistant integration         | ✅      |
| Mobile-responsive UI             | ✅      |
| Settings & Configuration         | ✅      |
| Aptitude testing system          | ✅      |

### 🟡 Partially Complete (Core Built, Integration Pending)

| Feature                          | Status    | Notes                                  |
|----------------------------------|-----------|----------------------------------------|
| Community features               | 🟡 UI done | Real-time backend integration pending  |
| Weather/NOTAM integration        | 🟡 Mock   | API keys not connected                  |
| Authentication system            | 🟡 Mock   | Currently using mock auth for dev       |
| Real-time collaboration          | 🟡        | WebSocket infra ready, not utilized     |

### 🔴 Not Started

| Feature                          | Notes                                      |
|----------------------------------|--------------------------------------------|
| Radio communications training    | Stub/placeholder pages only                |
| Real external API integrations   | Weather, NOTAM, flight tracking, airport data |
| Advanced instructor analytics    | —                                          |
| Mobile app deployment            | iOS (.ipa) / Android (.aab) builds         |
| Payment/subscription system      | —                                          |
| Advanced performance monitoring  | —                                          |

---

## 13. Implementation Timeline

> **Duration:** 3–4 weeks (starting 17-09-2025, ending 08-10-2025)
>
> **Implementation Partner:** ShellKode Private Limited
>
> **Funding:** AWS Grant

| Week   | Milestones                                                                     |
|--------|--------------------------------------------------------------------------------|
| **Week 1** | **Foundation Setup & Planning** |
|        | • Create AWS accounts, configure IAM, baseline security guardrails           |
|        | • Provision VPC with subnets across 2 AZs, configure IGW, NAT, Route Tables |
|        | • Set up Route 53 DNS and AWS WAF                                            |
|        | • Finalize RAG chatbot architecture (ingestion pipeline, embedding store, LLM selection) |
|        | • Identify knowledge sources (10–12 GB docs)                                 |
| **Week 2** | **Core Infrastructure & Initial AI Setup** |
|        | • Deploy ECS on Fargate, configure ALB, provision RDS PostgreSQL (multi-AZ)  |
|        | • Connect GitHub to CodePipeline, configure CodeBuild, push to ECR           |
|        | • Data preprocessing & chunking for RAG, build embeddings, store in vector DB |
|        | • Develop initial chatbot interface (web-based UI)                           |
| **Week 3** | **Application Deployment & AI Integration** |
|        | • Deploy microservices to ECS via CodePipeline, enable Auto Scaling          |
|        | • Enable CloudWatch, CloudTrail, AWS Config, GuardDuty, SNS alerts           |
|        | • Integrate LLM with RAG pipeline, connect chatbot to inference layer        |
|        | • Implement quizzes & flashcard module (first version)                       |
|        | • Functional testing with sample queries                                     |
| **Week 4** | **Testing & Hardening** |
|        | • End-to-end testing, load testing on ECS and database                       |
|        | • Final security hardening (review IAM, WAF rules, NACLs)                    |
|        | • Fine-tune prompt design, validate RAG accuracy and response quality        |
|        | • User Acceptance Testing (UAT) with pilot group                             |
|        | • Optimize retrieval latency & chatbot performance                           |

### RACI Matrix

| Activity                    | ShellKode | Airman Aeronautics |
|-----------------------------|-----------|--------------------|
| Foundation Setup            | RA        | CI                 |
| Infrastructure Deployment   | RA        | CI                 |
| CI/CD Application Deployment| RA        | CI                 |
| Monitoring and Logging      | CI        | RA                 |
| GenAI Implementation        | RA        | CI                 |

> **RA** = Responsible & Accountable, **CI** = Consulted & Informed

### Project Personnel

| Role                                | Responsibilities                                                     | Duration (days) |
|-------------------------------------|----------------------------------------------------------------------|-----------------|
| Solutions Architect                 | Define/validate architectures, provide technical leadership           | 5               |
| Cloud Infrastructure / Network Eng. | Infrastructure setup, cloud governance, security, networking          | —               |
| DevOps Engineer                     | CI/CD pipelines, container management, monitoring, scalability        | —               |
| Database Administrator              | Database migration, schema conversions, performance optimization      | 5               |
| Cloud Engineer                      | Infrastructure provisioning and configuration                         | 15              |
| AI Engineer                         | AI/ML model selection, training, fine-tuning, deployment              | 10              |

---

## 14. Evolution & Technical Roadmap

### Near-Term (0–6 months)
- **AI Safety & Evaluation:** Structured evaluation harnesses, automated regression tests for prompts/RAG, expanded observability dashboards
- **Server-Side Rate Limiting:** Server-enforced quotas per user/IP at edge function/gateway layer
- **Flight Planner & Logbook Unification:** Auto-save completed flight plans as logbook entries with AI debrief
- **Voice & Collaboration:** Enable LiveKit voice rooms with "AI in the loop" real-time suggestions

### Mid-Term (6–18 months)
- **Multi-Region & Latency Optimization:** Multi-region Supabase, read replicas for heavy workloads
- **Domain-Specialized Models:** Fine-tuned aviation LLMs for phraseology, performance/flight-planning, exam Q&A
- **Deeper RAG Coverage:** SOPs, checklists, regulatory circulars, aircraft-specific POHs/AFMs, per-aircraft RAG profiles
- **Compliance & Certification:** Full GDPR flows, alignment with emerging aviation AI guidance (EASA, FAA)

### Long-Term Vision
- **Digital "Preflight Copilot":** Captain MAVE evolves from Q&A to full preflight collaborator with real-time weather, NOTAMs, airspace data, structured risk assessment
- **Training Ecosystem Integration:** APIs/SDKs for flight schools, ATOs, external content publishers
- **Research & Data Platform:** Anonymized aggregated data for curriculum optimization, safety research, and AI model improvement

---

## 15. Assumptions, Pre-requisites & Out of Scope

### Pre-requisites & Assumptions
- Customer will provide AWS Account with admin access to ShellKode
- AWS sizing per specification provided before implementation
- Airman Team will share the knowledge base (~10–12 GB)
- Airman Team will provide access to hosting environments, AWS accounts, APIs, and domain access
- The chatbot will support **text-based inputs** in Phase 1
- The chatbot will be deployed on Airman Maverick platform
- The chatbot will store conversations and provide quizzes and flashcards
- DNS changes are the customer's responsibility
- Customer shall designate a single point of contact (SPOC)

### Out of Scope
- ❌ Any products not listed in this document
- ❌ Application / Database setup and management (customer responsibility)
- ❌ Building a community channel (app/web development scope)
- ❌ Issues related to application configuration, setup, stability, and testing
- ❌ Unplanned changes to AWS design, deployment, or infrastructure (change management required)
- ❌ New technology stack support (change request required)
- ❌ Application management (customer responsibility; infra support by ShellKode)
- ❌ Licenses / tools cost not specified in proposal
- ❌ Security / Legal compliance audit
- ❌ On-premises configuration unrelated to scope
- ❌ Domain purchases and license procurement
- ❌ Third-party tool/software installation, configuration, or troubleshooting

---

## Document Sources

This FRD was synthesized from the following source documents:

| # | Document                                  | Pages | Content Summary                                                 |
|---|-------------------------------------------|-------|-----------------------------------------------------------------|
| 1 | `AWS-AIRMAN.pdf`                          | 21    | AWS infra proposal, GenAI implementation scope, timelines, commercials |
| 2 | `Mav-App-Upd.pdf`                        | 8     | Updated mobile wireframe text sketches for all app screens       |
| 3 | `Mav_Repo.pdf`                           | 7     | Development status report with feature completion tracking       |
| 4 | `Mav_Tech_stack.pdf`                     | 7     | Flutter mobile app tech stack, backend API details, use cases    |
| 5 | `System Architecture - Maverick vF.pdf`  | 58    | Complete system architecture covering all layers, security, scalability, roadmap |

---

*This document is confidential and intended for authorized team members only.*
