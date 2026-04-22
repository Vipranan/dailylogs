# Skynet AI Rostering & Dispatch Engine PRD Framework

**Product:** Skynet  
**Module:** AI Rostering & Dispatch Engine  
**Version:** 1.0  
**Prepared For:** Full Stack Developers, Solutions Architect, AI/ML Engineer  
**Prepared By:** AIRMAN  
**Context:** Flight Training Organizations (FTOs), Ground Schools, Type Rating Institutes, Aeronautical Training Academies

---

# 1. Purpose

The Skynet AI Rostering & Dispatch Engine is designed to move FTO scheduling and dispatch operations from **basic rule-based assignment** to **intelligence-led operational optimization**.

The system must not only answer:

- Is this assignment possible?
- Is this dispatch legal and feasible?

It must also answer:

- Is this the best assignment within the operating envelope?
- Is this schedule stable under expected disruptions?
- Is workload distributed intelligently?
- Is student progression protected?
- Is dispatch likely to remain resilient through the day or week?

This engine should function as a **5-layer intelligence stack** tailored specifically for flight training operations.

---

# 2. Core Product Vision

Skynet should become an **AI-powered operational intelligence layer** for FTOs that works across:

- Instructor rostering
- Student scheduling
- Aircraft allocation
- Simulator allocation
- Dispatch planning
- Maintenance-aware operational balancing
- Disruption recovery
- Progression-aware sortie prioritization

The product should not be positioned as only an automatic scheduler.  
It should be positioned as an **intelligent scheduling and dispatch optimization system** that improves:

- Schedule quality
- Dispatch stability
- Student progression continuity
- Instructor load balance
- Aircraft utilization quality
- Operational resilience

---

# 3. Primary Objectives

## 3.1 Functional Objectives

- Generate feasible schedules for instructors, students, aircraft, and simulators
- Enforce hard constraints across operations, qualifications, maintenance, and syllabus progression
- Rank feasible assignment combinations using multi-objective optimization
- Predict fragile schedules before operational breakdown occurs
- Support dispatch teams with live recovery recommendations
- Improve training continuity and sortie completion rates
- Reduce last-minute reassignment cascades
- Improve operational visibility for FTO management

## 3.2 Business Objectives

- Reduce cancellations
- Reduce dispatch chaos
- Improve aircraft and instructor resource quality, not just raw usage
- Improve student throughput and progression continuity
- Improve instructor fairness and workload balance
- Improve on-time sortie execution
- Create a competitive AI layer differentiated from traditional scheduling software

## 3.3 AI Objectives

- Predict operational risk, not just validate constraints
- Learn historical disruption behavior
- Support probabilistic decision-making
- Continuously improve recommendations through feedback loops
- Provide explainable ranked options rather than black-box decisions

---

# 4. Scope

This module covers:

- AI rostering
- AI dispatch assistance
- Predictive operational scoring
- Recovery recommendations
- Historical disruption intelligence
- Buffer and reserve planning
- Instructor load and performance-aware scheduling
- Student progression-aware prioritization

This module does **not** initially aim to:

- Replace all human dispatch decision-making
- Claim formal airline-grade fatigue science
- Operate as a fully autonomous scheduling authority in MVP
- Replace regulatory compliance systems
- Replace maintenance systems, CRM, or accounting systems

Instead, it augments those systems.

---

# 5. Users / Roles

## Primary Users

- Ops Manager
- Chief Flight Instructor
- Dispatch Officer
- Scheduling Officer
- Fleet / Maintenance Coordinator
- Training Manager
- Admin / Super Admin

## Secondary Users

- Instructors
- Students / Cadets
- Compliance Officer
- Accounts / Management dashboards only

---

# 6. Five-Layer Intelligence Architecture

---

## Layer 1 — Constraint Engine

**Goal:** Ensure legality, feasibility, and operational validity.

This layer answers:
- Can this assignment be made?
- Is it valid under all hard constraints?

### Responsibilities

- Instructor availability checks
- Student availability checks
- Aircraft availability checks
- Simulator availability checks
- Instructor qualification mapping
- Student lesson prerequisite validation
- Maintenance block enforcement
- Route / lesson type compatibility
- Duty/load cap enforcement
- Turnaround time enforcement
- Stage-check or milestone priority rules
- Weather minima gates
- Dispatch readiness prerequisites

### Output

- A set of feasible candidate assignments and schedules

---

## Layer 2 — Optimization Engine

**Goal:** Rank feasible options using multi-objective optimization.

This layer answers:
- Among valid options, which ones are best?

### Responsibilities

- Multi-objective optimization
- Schedule ranking
- Soft constraint balancing
- Trade-off analysis across efficiency, fairness, continuity, and resilience

### Core Multi-Objective Dimensions

- Student progression value
- Instructor continuity value
- Instructor workload balance
- Aircraft utilization quality
- Dispatch simplicity
- Schedule stability
- Maintenance exposure reduction
- Revenue and sortie completion efficiency
- Fairness across instructors
- Protection of critical milestones

### Output

- Ranked schedule options
- Ranked assignment alternatives
- Optimization score per candidate plan

---

## Layer 3 — Predictive Intelligence Engine

**Goal:** Introduce probabilistic risk modeling.

This layer answers:
- Which valid schedules are fragile?
- Which assignments are most likely to fail?

### Responsibilities

- Predict cancellation likelihood
- Predict no-show likelihood
- Predict instructor delay likelihood
- Predict aircraft snag likelihood
- Predict schedule cascade probability
- Predict weather-induced disruption probability
- Predict student readiness probability
- Predict sortie completion probability

### Output

- Risk scores
- Fragility scores
- Predictive flags
- Recommended protective actions

---

## Layer 4 — Dispatch Co-Pilot / Recovery Engine

**Goal:** Provide real-time operational recovery and dispatch recommendations.

This layer answers:
- What is the best next action when something breaks?

### Responsibilities

- Real-time disruption detection
- Suggest alternative aircraft
- Suggest alternative instructor
- Suggest rescheduling window
- Suggest sim/ground fallback
- Minimize downstream cascade
- Rank recovery plans by impact

### Output

- Recommended recovery plans
- Best substitute options
- Impact estimation
- Dispatch action recommendations

---

## Layer 5 — Learning & Intelligence Feedback Layer

**Goal:** Continuously improve recommendations through outcomes.

This layer answers:
- What actually worked?
- What patterns repeat?
- How should the engine improve over time?

### Responsibilities

- Track accepted vs rejected recommendations
- Learn recurring disruption patterns
- Learn instructor/student/aircraft operational patterns
- Update scoring weights and predictive models
- Improve future schedule robustness

### Output

- Model updates
- Revised optimization weights
- Historical insights
- Ops improvement analytics

---

# 7. Core Inputs

The engine must consume structured data from multiple modules.

## 7.1 Instructor Inputs

- Instructor ID
- Qualifications
- Aircraft ratings
- Lesson/stage authorization
- Availability windows
- Leave / off blocks
- Daily/weekly workload
- Recent sortie count
- Preferred slots
- Student continuity history
- Reliability history
- Delay / no-show history
- Instructional type preference
- Location / base
- Seniority or assignment priority if needed

## 7.2 Student Inputs

- Student ID
- Course type
- Current syllabus stage
- Completed lessons
- Pending prerequisites
- Instructor continuity preference
- Availability windows
- Checkride / solo / stage check proximity
- Readiness status
- Cancellation history
- No-show history
- Preferred slots
- Ground/sim/flying dependencies

## 7.3 Aircraft Inputs

- Aircraft ID / tail number
- Aircraft type
- Availability status
- Airworthiness status
- Scheduled maintenance
- Unscheduled defect status
- TBO / due monitor signals
- Reliability history
- Mission suitability
- Utilization hours today / week
- Dispatch release status
- Base / parking location

## 7.4 Simulator Inputs

- Simulator ID
- Type / supported syllabus stage
- Availability windows
- Maintenance blocks
- Session duration limits
- Instructor requirements
- Technical downtime history

## 7.5 Operational Inputs

- Daily operating hours
- Slot templates
- Buffer requirements
- Turnaround requirements
- Weather forecast
- Weather minima rules
- Airport / runway constraints
- NOTAMs if integrated
- Dispatch status inputs
- Resource shortage flags
- Reserve / standby policy settings

## 7.6 Training Inputs

- Syllabus rules
- Lesson sequence rules
- Stage gate logic
- Solo eligibility rules
- Checkride priority rules
- Course-specific constraints
- Student recency rules

## 7.7 Historical Inputs

- Cancellations by reason
- Reschedules by reason
- Delay logs
- Instructor substitution patterns
- Aircraft defect and snag history
- Weather-related disruption history
- Student no-show patterns
- Seasonal / weekday / timeslot patterns

---

# 8. Hard Constraints

These constraints must never be violated.

- Resource availability
- Instructor qualification compatibility
- Aircraft compatibility with lesson/sortie type
- Student lesson prerequisites
- Maintenance unavailability
- Simulator unavailability
- Turnaround minimum buffers
- Operational day boundary
- Max instructor load limits
- Required rest/load heuristics
- Solo/stage-check authorization rules
- Dispatch release prerequisites
- Weather minima disqualifiers
- Org-specific compliance rules
- Airport/base-specific restrictions

---

# 9. Soft Constraints

These are desirable but can be traded off.

- Instructor-student continuity
- Preferred time slot alignment
- Load balancing across instructors
- Fair allocation across fleet
- Reduced reassignment likelihood
- Stable weekly lines
- Reduced idle gaps
- Better progression continuity
- Better weather-window matching
- Better reserve protection
- Reduced maintenance risk exposure
- Lower dispatch complexity
- Instructor preference alignment
- Student preference alignment

---

# 10. Optimization Variables

The optimization engine should work on weighted variables.

## 10.1 Resource Variables

- Instructor assignment
- Student assignment
- Aircraft assignment
- Simulator assignment
- Time slot assignment
- Reserve slot retention
- Backup pairing

## 10.2 Quality Variables

- Continuity score
- Progression urgency score
- Load balance score
- Utilization quality score
- Dispatch simplicity score
- Stability score
- Recovery flexibility score

## 10.3 Risk Variables

- Cancellation probability
- No-show probability
- Delay probability
- Snag probability
- Cascade probability
- Weather disruption probability
- Instructor overload risk
- Student readiness risk

---

# 11. Scoring Formula

The engine should use a weighted score per candidate assignment and per full schedule.

## 11.1 Assignment-Level Formula

```text
Assignment Score =
  (W1 × ProgressionValue)
+ (W2 × ContinuityValue)
+ (W3 × InstructorLoadBalanceScore)
+ (W4 × AircraftUtilizationQualityScore)
+ (W5 × DispatchSimplicityScore)
+ (W6 × FairnessScore)
- (W7 × CancellationRisk)
- (W8 × DelayRisk)
- (W9 × SnagRisk)
- (W10 × CascadeRisk)
- (W11 × InstructorStrainRisk)
- (W12 × WeatherRiskPenalty)
```

## 11.2 Schedule-Level Formula

```text
Schedule Score =
  Sum(Assignment Scores)
+ (A × OverallStabilityScore)
+ (B × ReserveCoverageScore)
+ (C × ProgressionProtectionScore)
+ (D × DispatchRecoverabilityScore)
- (E × FragilityScore)
- (F × ReassignmentCascadeExposure)
- (G × ResourceOverconcentrationPenalty)
```

## 11.3 Notes

- All weights should be configurable at org level
- Different organizations may prioritize utilization, student progression, or instructor fairness differently
- Initial weights may be rule-based
- Later weights can be adapted using feedback and outcome data

---

# 12. AI / ML Modules

---

## 12.1 Multi-Objective Optimization Module

**Type:** Optimization / OR + heuristic AI

### Goal

Generate ranked schedule alternatives that optimize several competing goals simultaneously.

### Methods

- Constraint programming
- Heuristic search
- Weighted scoring
- Genetic algorithms or metaheuristics in later stages if needed
- Mixed integer optimization if scale requires it

### Outputs

- Ranked assignments
- Ranked schedules
- Trade-off explanations

---

## 12.2 Probabilistic Risk Modeling Module

**Type:** Supervised ML / probabilistic scoring

### Goal

Estimate the probability of operational failure or instability.

### Models

- Cancellation likelihood model
- No-show model
- Delay model
- Aircraft snag risk model
- Cascade risk model
- Student readiness model

### Outputs

- Probability scores
- Risk labels
- Fragility indicators

---

## 12.3 Historical Disruption Patterns Module

**Type:** Pattern mining / analytics / time-series / supervised ML

### Goal

Learn recurring breakdown patterns from operational history.

### Patterns to Learn

- Timeslot-based cancellations
- Weather-linked failures
- Instructor substitution frequency
- Aircraft recurring reliability issues
- Stage-specific disruption frequency
- Seasonal behavior
- Day-of-week patterns

### Outputs

- Disruption trend heatmaps
- Pattern-based warning signals
- Forecast operational fragility

---

## 12.4 Reserve / Buffer Intelligence Module

**Type:** Rule engine + predictive planning

### Goal

Preserve enough slack to absorb disruption without destroying utilization.

### Responsibilities

- Suggest spare instructor buffers
- Suggest spare aircraft or sim buffers
- Protect strategic flex windows
- Recommend standby allocation
- Balance overfill vs resilience

### Outputs

- Reserve recommendations
- Buffer risk score
- Under-buffered day alerts

---

## 12.5 Stability Over Raw Utilization Module

**Type:** Optimization + analytics

### Goal

Prioritize schedule robustness over superficial utilization metrics.

### Responsibilities

- Penalize brittle overpacked schedules
- Reward recoverable schedules
- Score downstream resilience
- Detect over-concentration of dependence on single resources

### Outputs

- Stability score
- Recoverability score
- Fragility ranking

---

## 12.6 Dispatch Recovery Recommendation Module

**Type:** Real-time inference + rules + optimization

### Goal

When disruption occurs, recommend the least damaging recovery path.

### Inputs

- Current disruption event
- Available substitutes
- Downstream commitments
- Priority students / sorties
- Risk model outputs

### Outputs

- Ranked recovery options
- Impact estimates
- Minimal cascade recommendation

---

## 12.7 Explainability Module

**Type:** Rules + feature attribution

### Goal

Ensure AI recommendations are understandable and trusted by ops teams.

### Outputs

- Why this schedule was chosen
- Why this assignment is risky
- Why a reserve buffer is recommended
- Why a substitution is preferred

---

# 13. Dashboard Requirements

---

## 13.1 Ops Control Dashboard

### Purpose

Provide daily operational visibility.

### Widgets

- Today's sortie board
- Instructor status
- Aircraft status
- Simulator status
- Delays / disruptions live feed
- Fragility alerts
- Dispatch readiness status
- Unassigned resources
- Reserve buffer health

---

## 13.2 AI Rostering Dashboard

### Purpose

Visualize schedule quality and optimization performance.

### Widgets

- Ranked roster options
- Assignment score per slot
- Continuity score
- Fairness score
- Utilization quality score
- Stability score
- Suggested improvements
- Predicted fragile assignments

---

## 13.3 Dispatch Recovery Dashboard

### Purpose

Support live recovery.

### Widgets

- Active disruption list
- Suggested substitutes
- Best next action
- Impacted sorties
- Cascade risk estimate
- Recovery plan comparison
- One-click reallocation actions

---

## 13.4 Instructor Load Dashboard

### Purpose

Track human workload distribution.

### Widgets

- Instructor sortie counts
- Back-to-back load
- Heat / strain proxy score
- Continuity distribution
- Fairness trend
- Overload warnings
- Underutilized instructors

---

## 13.5 Student Progression Dashboard

### Purpose

Protect training pipeline continuity.

### Widgets

- Students near solo
- Students near stage check
- Students blocked by cancellations
- Progression urgency ranking
- Continuity breaks
- Missed training opportunity alerts

---

## 13.6 Fleet Stability Dashboard

### Purpose

Track aircraft-related operational stability.

### Widgets

- Aircraft utilization quality
- Snag risk scores
- TBO / due monitor warnings
- Dispatch reliability ranking
- Aircraft substitution frequency
- Fleet fragility map

---

## 13.7 Executive Dashboard

### Purpose

Give management a strategic overview.

### KPIs

- Sortie completion rate
- Cancellation rate
- Instructor utilization quality
- Aircraft utilization quality
- Dispatch recovery time
- Schedule stability score
- Student progression continuity
- AI recommendation acceptance rate
- Reserve sufficiency score
- Revenue impact estimate

---

# 14. Full Rollout Plan

---

## Phase 0 — Data Foundation

### Goal

Prepare clean operational data.

### Deliverables

- Unified scheduling schema
- Resource master tables
- Historical event logging
- Delay / cancellation reason capture
- Availability data normalization
- Maintenance and defect feed linkage
- Weather data input model
- Student progression state model

### Mandatory Before AI

- Clean event logging
- Time-slot normalization
- Reliable assignment history
- Reason-coded disruptions
- Instructor/student/aircraft linkage integrity

---

## Phase 1 — Layer 1 Foundation: Constraint Engine MVP

### Goal

Generate feasible schedules and dispatch-valid assignments.

### Features

- Availability-based assignment
- Qualification matching
- Maintenance block enforcement
- Lesson prerequisite enforcement
- Sim and aircraft conflict prevention
- Basic daily dispatch board
- Manual override support
- Rule violation alerts

### Success Criteria

- Feasible schedule generation works reliably
- No illegal/invalid assignments
- Core dispatch board operational

---

## Phase 2 — Layer 2: Multi-Objective Optimization

### Goal

Rank feasible schedules by operational quality.

### Features

- Weighted scoring engine
- Configurable optimization weights
- Ranked alternatives
- Continuity scoring
- Fairness scoring
- Utilization quality scoring
- Progression urgency scoring
- Soft-constraint balancing

### Success Criteria

- Ops users can compare better vs worse schedules
- Scheduler moves beyond first-feasible assignment
- Quality metrics visible

---

## Phase 3 — Layer 3: Probabilistic Risk Modeling

### Goal

Predict fragile schedules before failure.

### Features

- Cancellation probability model
- No-show likelihood model
- Delay risk model
- Snag risk scoring
- Fragility score per sortie
- Heatmaps of high-risk time/resource combinations
- Historical disruption intelligence

### Success Criteria

- Risk alerts are operationally useful
- Users can identify fragile schedules before the day starts
- Historical pattern learning improves quality

---

## Phase 4 — Layer 4: Reserve / Buffer Intelligence + Recovery Engine

### Goal

Support resilience and live dispatch recovery.

### Features

- Reserve buffer recommendation
- Standby instructor logic
- Standby aircraft logic
- Recovery plan generator
- Ranked substitution options
- Sim/ground conversion fallback logic
- Cascade minimization
- Best next action recommendations

### Success Criteria

- Dispatch can recover faster
- Reassignment cascades reduce
- Buffer decisions become data-backed

---

## Phase 5 — Layer 5: Stability Optimization & Learning Feedback

### Goal

Optimize for long-term schedule robustness and learn from outcomes.

### Features

- Stability-over-utilization scoring
- Recoverability score
- Recommendation acceptance logging
- Outcome feedback loop
- Adaptive weight tuning
- Historical policy insights
- Resource over-concentration penalties
- Org-specific learning profiles

### Success Criteria

- Schedule quality improves month over month
- AI recommendations become more trusted
- Ops resilience measurably improves

---

# 15. Full Feature Set by Capability Theme

---

## A. Multi-Objective Optimization

- Weighted schedule ranking
- Assignment-level score generation
- Student progression-aware prioritization
- Instructor continuity optimization
- Fairness balancing
- Aircraft allocation quality optimization
- Soft-constraint trade-off engine
- Org-customizable strategy weights

---

## B. Probabilistic Risk Modeling

- Cancellation prediction
- Delay prediction
- No-show prediction
- Snag prediction
- Weather disruption probability
- Instructor strain proxy risk
- Schedule fragility scoring
- Cascade risk scoring

---

## C. Historical Disruption Patterns

- Disruption history warehouse
- Reason-coded analytics
- Timeslot risk patterns
- Day-of-week risk patterns
- Weather-linked disruption trends
- Instructor and aircraft historical reliability patterns
- Stage-specific breakdown analysis
- Seasonal trend detection

---

## D. Reserve / Buffer Intelligence

- Recommended spare capacity
- Flexible slot protection
- Buffer sufficiency scoring
- Under-buffered day detection
- Strategic reserve allocation
- Standby instructor coverage logic
- Standby aircraft coverage logic
- Recovery flexibility planning

---

## E. Stability Over Raw Utilization

- Stability score
- Recoverability score
- Overpacking penalty
- Downstream fragility penalty
- Resource concentration penalty
- Robustness-first recommendation mode
- Schedule brittleness visualization
- Better quality utilization metrics

---

# 16. API / System Design Considerations

## Backend Modules

- roster-service
- dispatch-service
- scoring-service
- optimization-service
- ml-inference-service
- disruption-analytics-service
- recommendation-service
- feedback-learning-service

## Key Interfaces

- Scheduling input APIs
- Availability APIs
- Fleet/maintenance sync APIs
- Training progression APIs
- Dispatch event APIs
- Risk scoring APIs
- Recommendation APIs
- Dashboard analytics APIs

## Architecture Guidance

- Keep rule engine separate from ML inference
- Keep optimization service modular
- Keep scoring transparent and auditable
- Build event-driven logging for disruption learning
- Use feature flags to enable higher AI layers progressively

---

# 17. Non-Functional Requirements

- Explainability required for all AI recommendations
- Human override required at all stages
- Audit trail required for assignments and changes
- Latency for live recommendations should be low enough for dispatch use
- Failure-safe fallback must exist to deterministic scheduling
- Role-based access control required
- Multi-tenant support required
- Configuration should be organization-specific

---

# 18. Risks / Cautions

- Do not overclaim fatigue science in MVP
- Do not attempt full autonomy too early
- Poor data quality will weaken AI significantly
- Explainability is essential for ops trust
- Over-optimization for utilization can reduce resilience
- Early versions should focus on decision support before automation

---

# 19. Recommended MVP Definition

## MVP Must Have

- Constraint engine
- Basic scheduling board
- Assignment scoring
- Ranked schedule options
- Basic fragility scoring
- Simple disruption recovery suggestions
- Ops dashboard
- Audit logs
- Manual override

## MVP Should Not Yet Promise

- Fully autonomous scheduling
- Formal fatigue science
- Perfect optimization
- Airline-grade network planning logic

---

# 20. Success Metrics

## Operational KPIs

- Sortie completion rate
- Cancellation rate
- Delay rate
- Reschedule rate
- Recovery time after disruption
- Instructor overload incidents
- Aircraft substitution rate
- Progression delay rate

## AI KPIs

- Recommendation acceptance rate
- Risk model precision / recall
- Forecasted vs actual disruption alignment
- Improvement in schedule stability score
- Reduction in reassignment cascades

## Business KPIs

- Higher resource quality utilization
- Better operational visibility
- Better student throughput
- Higher retention / satisfaction from FTO ops teams
- Reduced manual effort in dispatch and scheduling

---

# 21. Final Product Positioning

Skynet AI Rostering & Dispatch Engine is not just a scheduling tool.

It is an **operational intelligence layer for FTOs** that improves:

- Schedule quality
- Dispatch resilience
- Human workload distribution
- Student progression continuity
- Recovery speed
- Fleet and instructor utilization quality

It works within the real-world operating envelope of flight training organizations and augments human decision-making through intelligent optimization, predictive risk modeling, and operational learning.
