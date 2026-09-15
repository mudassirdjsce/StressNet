# StressNet — Final Prototype Implementation Plan
## PS-First | UI/UX Simulation | Existing Figma Make App

---

## 0. Executive Decision

The final product should **not** be a generic multi-group lender dashboard.

The primary experience is a **single group-level financial stress investigation**:

> One borrower starts showing financial stress. StressNet examines that borrower’s own financial signals, the borrower’s relationships with other group members, and shared external conditions to determine whether the problem appears contained, may be network/group-driven, or may be part of an external shock. It then simulates what could happen next and recommends targeted support without unnecessarily penalizing healthy members.

The current app can keep a lender/portfolio shell as secondary context, but the PS story must dominate the UI.

### The main story

**Group looks healthy → one borrower changes → investigate why → test what may spread → decide who actually needs support → protect healthy borrowers.**

---

# 1. PS Interpretation

The PS is fundamentally asking for a system that can distinguish **three different explanations for a financial stress signal**:

### 1. Individual / contained difficulty
The borrower's own finances deteriorate, but there is little evidence that connected borrowers are being affected.

### 2. Network / group vulnerability
A borrower's stress matters because of relationships such as shared guarantees, group lending, common financial dependencies, or other connected exposure, and connected borrowers may therefore become vulnerable.

### 3. External / common shock
Multiple borrowers are affected by a broader condition such as a local economic disruption, common market problem, seasonality, weather-related event, or other outside factor.

The system then needs a **what-if propagation view** and an **intervention view**.

The prototype should therefore not merely show a risk score. It should show the reasoning chain:

**Signal → Evidence → Explanation → Potential impact → Intervention**

---

# 2. Research-Grounded Design Principles

Use the following principles when constructing the synthetic scenarios:

1. Group lending can create shared repayment responsibility and peer-monitoring relationships, so network links should have an economic reason rather than being decorative.
2. Shared/common exposure can make several borrowers vulnerable at once.
3. Group membership does **not** prove that one borrower caused another borrower's stress.
4. A borrower's own past deterioration can be a stronger explanation than contagion in some real microfinance settings.
5. Common external shocks can create simultaneous stress across many borrowers.
6. Therefore, the prototype must compare alternative explanations instead of assuming propagation.
7. The interface should favor targeted, supportive action over blanket treatment of the whole group.

The simulation is synthetic and illustrative. These research principles are design grounding, not claims that the prototype has validated predictive power.

---

# 3. Core Product Concept

## Product name

**StressNet**

## Positioning

**Network-aware early warning for group microfinance**

## Primary question

**“One borrower is showing stress. Is it contained, or could the group be vulnerable?”**

## Secondary questions

- Why is the borrower stressed?
- Which relationships matter?
- Who could be affected next?
- Is the pattern individual, network-driven, or external?
- What is the least disruptive support action?
- Which healthy borrowers should remain untouched?

---

# 4. Product Hierarchy

The prototype must follow this priority:

### Tier 1 — The actual PS

1. One group
2. One initiating borrower
3. Borrower-level evidence
4. Relationship graph
5. Competing stress explanations
6. Hypothetical propagation
7. Targeted intervention
8. Healthy-member protection

### Tier 2 — StressNet differentiators

9. Stress Immune Memory
10. Stress Passport

Tier 2 is supporting functionality.

Do not let Memory or Passport become more visually important than the core group-stress investigation.

---

# 5. Fix to the Current Prototype

The existing prototype can be retained as a visual foundation, but its information architecture should be changed.

## Keep

- current Figma Make project;
- current framework and package manager;
- existing reusable UI components;
- visual assets that fit the new story;
- useful navigation patterns;
- synthetic/demo approach.

## Change

### Reduce
- portfolio-first dashboard emphasis;
- excessive multi-group navigation;
- large KPI-card collections;
- unrelated analytics.

### Reframe
- Dashboard → **Group Overview**
- Network Intelligence → **Group Stress Investigation**
- Stress Propagation → **Scenario / Propagation Simulator**
- Stress Attribution → **Why Is This Happening?**
- Intervention Center → **Targeted Response**
- Stress Immune Memory → **History / Resilience Context**
- Stress Passport → **Event Record**

### Do not delete working components blindly.

Repurpose them where practical.

---

# 6. Primary Synthetic Case

Use one group throughout the main demo:

## Group G-07

Five borrowers:

| Borrower | Role in demo | Key relationship |
|---|---|---|
| Asha | Initiating borrower | Stress originates here |
| Meera | Exposed member | Shared guarantee |
| Kavita | Exposed member | Group lending |
| Farah | Shared economic exposure | Common market/income source |
| Lata | Healthy control | Low exposure / stable |

The fifth borrower, Lata, is important.

She provides the visual proof that:

**“The system does not punish everyone just because one person is stressed.”**

---

# 7. Do Not Make the Graph Arbitrary

Every edge needs a reason.

Use four relationship types:

### Shared guarantee
Connection created by guarantee/joint responsibility.

### Group lending
Connection through group repayment structure.

### Common income source
Borrowers depend on the same market, employer, customers, supply chain, crop, etc.

### Local economic exposure
Borrowers are exposed to the same area-level condition.

Each relationship should display:

- relationship type;
- exposure strength;
- one-line explanation.

Example:

**Asha ↔ Meera**
Shared guarantee  
High repayment exposure

**Asha ↔ Kavita**
Group lending  
Direct group repayment dependency

**Asha ↔ Farah**
Common market  
Shared income vulnerability

**Farah ↔ Lata**
Local economic exposure  
Moderate common-shock exposure

---

# 8. The Most Important UX Pattern

Do not start with:

> “Here are 14 groups and 72 metrics.”

Start with:

> **Group G-07 looks healthy overall. One borrower is showing an emerging stress signal.**

Then:

**Investigate Asha**

The judge should understand the problem before seeing the advanced features.

---

# 9. Screen 1 — Demo Entry

Purpose:

Get into the prototype quickly.

Content:

**StressNet**
Network-aware financial stress investigation

Small text:

**Synthetic demonstration data**

Primary CTA:

**Enter Demo**

Optional:

**Replay Guided Case**

No real credentials.

No real authentication.

---

# 10. Screen 2 — Group Overview

This replaces the old portfolio-first dashboard as the main starting point.

## Header

**Group G-07**

**5 borrowers · 4 stable · 1 emerging concern**

## Main visual

A compact group health summary.

Example:

- Group condition: **Stable — under observation**
- Emerging stress: **Asha**
- Potentially exposed: **3 members**
- Healthy / low exposure: **Lata**

## Main alert

**Asha — emerging financial stress**

Evidence:
- income trend ↓
- repayment pressure ↑
- cash buffer ↓

CTA:

**Investigate stress**

## Secondary context

A small strip may say:

**4 groups monitored · synthetic demo data**

But this must remain secondary.

---

# 11. Screen 3 — Group Stress Investigation

This is the core screen of the entire prototype.

## Layout

### Left
Relationship graph.

### Center/right
Selected borrower information.

### Bottom or top
Scenario controls.

## Graph

Show:

Asha  
Meera  
Kavita  
Farah  
Lata

Use stable positioning.

Do not use a complex force-directed graph if it hurts readability.

A fixed SVG layout is preferable for this prototype.

## Borrower states

- Healthy
- Watch
- Stressed
- Critical

Do not communicate state by color alone.

Each node also includes a text state/icon.

## Asha detail panel

Show:

**Observed signals**

- Income trend: declining
- Repayment pressure: rising
- Cash buffer: narrowing

**Network exposure**

- Shared guarantee: Meera
- Group lending: Kavita
- Common market: Farah

**Current question**

> Is Asha’s problem contained, or could the group be vulnerable?

CTA:

**Explore scenarios**

---

# 12. Key Concept: Separate Observation From Simulation

The interface must clearly distinguish:

### Observed / Synthetic baseline

What the mock borrower data currently says.

versus

### Hypothetical simulation

What the system is exploring as a what-if scenario.

Use visible labels such as:

**SYNTHETIC BASELINE**

and

**HYPOTHETICAL SIMULATION**

This prevents the UI from looking like a live prediction engine.

---

# 13. Screen 4 — Scenario Selector

Instead of one generic “simulate contagion” button, provide three explicit scenarios.

## Scenario A
**Individual / Temporary**

Asha's own finances deteriorate temporarily.

Expected result:
Asha stressed; connected members largely stable.

## Scenario B
**Network / Group Vulnerability**

Asha's stress interacts with meaningful group relationships.

Expected result:
Connected members become more exposed.

## Scenario C
**External / Common Shock**

A common local/economic event affects multiple members.

Expected result:
Multiple members deteriorate without Asha necessarily being the source.

This is one of the most important improvements.

The product should not assume:

**“Asha is stressed → therefore everyone else is stressed.”**

It should demonstrate that StressNet distinguishes scenarios.

---

# 14. Scenario A — Individual / Temporary

## Initial evidence

Asha:
- income ↓
- repayment pressure ↑
- short-duration business interruption

Other members:
- stable.

## Simulation

Stage 0:
All stable.

Stage 1:
Asha → Stressed.

Stage 2:
No meaningful secondary spread.

Stage 3:
System concludes:

**Likely contained individual stress**

### Key message

**A stressed borrower does not automatically imply a stressed group.**

This is essential to the PS.

---

# 15. Scenario B — Network / Group

## Initial evidence

Asha:
- income ↓
- repayment pressure ↑

Relationships:
- strong shared guarantee with Meera;
- group lending dependency with Kavita;
- common market with Farah.

## Simulation

Stage 0:
Mostly stable.

Stage 1:
Asha → Stressed.

Stage 2:
Meera → Watch.

Reason:
Shared guarantee exposure.

Stage 3:
Kavita → Watch.

Reason:
Group lending dependency.

Stage 4:
Farah → Watch / elevated exposure.

Reason:
Common market.

Stage 5:
Lata remains Healthy.

## System conclusion

**Potential network/group-driven vulnerability**

### Key message

The system is not simply detecting stress.

It is identifying **which relationships make group-level vulnerability plausible**.

---

# 16. Scenario C — External / Common Shock

Example:

**Local market demand falls sharply.**

Affected:
- Asha;
- Farah;
- Lata.

The members deteriorate around the same time.

Asha is not treated as the cause.

## Conclusion

**Potential external/common shock**

## Key message

**When several borrowers move together, the system should consider an outside explanation rather than blaming one borrower.**

---

# 17. Screen 5 — Propagation Simulator

Use a visual timeline.

## Example

**Day 0**
Asha stable → then stressed

**Day 3**
Meera enters Watch

**Day 7**
Kavita enters Watch

**Day 10**
Farah enters Watch

**Day 14**
Lata remains Healthy

Use animated edge pulses to make potential spread visible.

But explicitly label this:

**Hypothetical propagation**

The animation is a communication device, not a real prediction.

---

# 18. Propagation Must Be Scripted, Not Random

Use pre-authored scenario steps.

Example:

```text
Scenario B

t=0      Asha     stressed
t=1200   Meera    watch
t=2400   Kavita   watch
t=3600   Farah    watch
t=4800   Lata     healthy
```

This gives:

- deterministic replay;
- reliable presentation;
- no random demo failures;
- easy testing.

Do not generate random contagion.

---

# 19. Scenario Engine

Create a very small local rule/scenario layer.

Conceptually:

```text
Scenario
  id
  label
  trigger
  initiatingBorrower
  evidence
  attribution
  propagationSteps
  interventionEffect
```

The scenario engine determines the scripted UI outcome.

It does not claim to be ML.

---

# 20. Screen 6 — Stress Attribution / "Why?"

Do not make this merely three colored cards.

Show evidence.

## Example

### Individual
Evidence:
- borrower-specific income deterioration;
- borrower-specific repayment pressure;
- connected members remain stable.

### Network / Group
Evidence:
- initiating borrower stressed first;
- connected members have meaningful exposure;
- connected members deteriorate after the initiating event.

### External
Evidence:
- multiple borrowers change around the same time;
- common external factor is present;
- no single borrower is clearly the source.

## Primary result

Example:

**Network / Group**

**Simulated interpretation**

Then list the evidence.

---

# 21. Important Language Rule

Do not claim:

> Asha caused Meera’s financial distress.

Use:

> Meera shows increased potential exposure following Asha’s stress under the simulated network scenario.

This matters because the prototype is illustrating possible propagation, not proving causal relationships.

---

# 22. Screen 7 — Intervention Comparison

This is the second core proof point after propagation.

Ask:

> **What should we do now?**

Show two choices.

## Option A — Broad response

Potential effect:
- flags/supports many members;
- may unnecessarily affect healthy borrowers.

## Option B — Targeted response

Target:
- Asha;
- Meera/Kavita only where meaningful exposure exists.

Healthy member:

**Lata — no intervention**

This makes the PS requirement visible.

---

# 23. Intervention Types

Use supportive, non-punitive actions:

### Individual check-in
Recommended when stress appears borrower-specific.

### Repayment flexibility review
Used when the borrower shows short-term cash-flow pressure.

### Group support discussion
Used when network vulnerability is present.

### External-shock support
Used when a common condition affects multiple borrowers.

These are simulated actions only.

---

# 24. Intervention Before / After

Before:

| Member | State |
|---|---|
| Asha | Stressed |
| Meera | Watch |
| Kavita | Watch |
| Farah | Watch |
| Lata | Healthy |

After targeted support:

| Member | State |
|---|---|
| Asha | Support in progress |
| Meera | Lower exposure |
| Kavita | Lower exposure |
| Farah | Monitoring |
| Lata | Healthy |

The visual should explicitly call out:

**Healthy member protected**

---

# 25. Screen 8 — Stress Immune Memory

Keep this feature but reduce its scope.

Show:

## Previous event

**March 2025 — temporary income disruption**

Outcome:
Recovered after supportive intervention.

Group effect:
Contained.

## Current case

Similar early borrower pattern.

But:

Current network exposure:
Higher.

## Interpretation

**Past recovery provides context, but current network evidence remains important.**

This is much more defensible than pretending a “resilience score” is a real ML output.

---

# 26. Memory Interaction

Provide:

**Compare with previous event**

Then show:

| Dimension | Previous | Current |
|---|---|---|
| Income shock | Similar | Similar |
| Repayment pressure | Moderate | Higher |
| Network exposure | Low | High |
| Outcome | Recovered | Needs monitoring |

The visual communicates why memory changes interpretation without claiming prediction accuracy.

---

# 27. Screen 9 — Stress Passport

Keep it as a supporting record.

Example:

**Stress Event**
- Group: G-07
- Borrower: Asha
- Date: Synthetic
- Attribution: Network / Group
- Intervention: Repayment flexibility review
- Status: Simulated

A “tamper-evident” visual can be shown.

However:

Do not make a fake blockchain transaction look real.

Preferred label:

**Conceptual Stress Passport — Prototype**

Avoid fake wallet addresses.

Avoid fake claims such as:

- “On-chain”
- “Blockchain verified”
- “Transaction confirmed”

A visual event ID or checksum-like identifier is acceptable only when clearly labeled cosmetic/mock.

---

# 28. Final User Journey

The main demo should be:

**1. Group Overview**
↓
**2. Asha emerging stress**
↓
**3. Group Stress Investigation**
↓
**4. Select / introduce scenario**
↓
**5. Simulate propagation**
↓
**6. See why: Individual / Network / External**
↓
**7. Compare interventions**
↓
**8. Protect healthy Lata**
↓
**9. Show historical context**
↓
**10. Record simulated event**

This should take 2–3 minutes.

---

# 29. Primary 2-Minute Demo Script

### Opening

“Group G-07 looks healthy overall. StressNet has detected an early stress signal in one member, Asha.”

### Investigation

“Asha’s own income and repayment signals are deteriorating. But she is not isolated — she shares financial relationships with other members.”

### Scenario

“Let's test whether this remains an individual problem or could affect the group.”

### Propagation

“Under the network scenario, Meera and Kavita become exposed through their relationships, while Lata remains healthy.”

### Attribution

“So StressNet isn't just saying ‘risk is high.’ It is asking why the risk appears: individual, network-driven, or external.”

### Intervention

“Instead of treating all five borrowers the same, the system recommends targeted support for the affected/exposed members while leaving Lata untouched.”

### Close

“That is the purpose of StressNet: distinguish an isolated borrower problem from a group vulnerability before the group is treated as one risk.”

---

# 30. Required Mock Data

Use a small fixed dataset.

## Borrower fields

```text
id
name
groupId
stressState
attribution
incomeTrend
repaymentTrend
cashBufferTrend
exposureLevel
history
```

## Relationship fields

```text
id
fromId
toId
type
strength
reason
```

## Scenario fields

```text
id
type
label
originNodeId
evidence
attribution
steps[]
intervention
```

## Intervention fields

```text
id
label
targetNodes[]
reason
beforeState
afterState
```

---

# 31. Group Data

Use:

```text
Group G-07
members: Asha, Meera, Kavita, Farah, Lata
overallStatus: stable-with-emerging-stress
```

Keep other groups only as small secondary context.

Example:

```text
G-03
G-07
G-11
G-15
```

But never require the presenter to investigate them during the main story.

---

# 32. Data Relationship Design

Use a graph that makes the three explanatory pathways possible.

Example:

```text
            Meera
           /         guarantee       group lending
         /                Asha -------- Kavita
       |
   common market
       |
     Farah
       |
 local exposure
       |
      Lata
```

The exact visual layout can differ, but the relationship logic must remain understandable.

---

# 33. Technical Architecture

Do not rebuild the framework.

Use the existing application's stack.

Preferred local structure:

```text
src/
  data/
    groups
    borrowers
    relationships
    scenarios
    history

  state/
    demoState
    scenarioState

  components/
    GroupGraph
    BorrowerNode
    RelationshipEdge
    BorrowerPanel
    ScenarioSelector
    PropagationTimeline
    AttributionPanel
    InterventionPanel
    MemoryPanel
    PassportPanel

  views/
    GroupOverview
    Investigation
    Attribution
    Intervention
    History
    Passport
```

Adapt to the repository's actual structure.

This is a conceptual organization, not an instruction to force a specific directory tree.

---

# 34. Graph Technology

Prefer a hand-built SVG graph.

Reasons:

- only five nodes;
- deterministic;
- easy to animate;
- easy to label;
- presentation-friendly;
- avoids unnecessary graph-library complexity.

Use fixed node positions.

Use SVG paths/lines for relationships.

Animate edge strokes or a small moving marker during propagation.

---

# 35. Charts

A small repayment/income trend chart is useful inside the borrower panel.

Use the project's existing chart dependency where available.

Do not add charts merely because the UI has empty space.

The graph and propagation timeline are more important than analytics charts.

---

# 36. State Transitions

Minimum local state:

```text
selectedGroupId
selectedBorrowerId
selectedScenarioId
demoStage
propagationIndex
interventionState
passportEvents
```

Use local `useState`/`useReducer` or the existing application state mechanism.

No backend persistence.

No authentication system.

No real-time data.

---

# 37. Demo Reset

A visible:

**Reset Scenario**

must return:

- all borrowers to baseline;
- timeline to Day 0;
- no intervention applied;
- no newly added passport event;
- default scenario selected.

Also provide:

**Replay Demo**

where practical.

---

# 38. Visual Design

## Primary feeling

Trustworthy institutional fintech.

## Priority

1. Group
2. Borrowers
3. Relationships
4. Evidence
5. Propagation
6. Attribution
7. Intervention
8. History
9. Passport

## Avoid

- crypto aesthetics;
- excessive neon;
- huge AI brain graphics;
- generic dashboard decoration;
- too many cards;
- too many colors;
- visual noise.

---

# 39. Status System

Use:

### Healthy
Stable, no action required.

### Watch
Potential exposure; monitor.

### Stressed
Meaningful current stress.

### Critical
High simulated concern.

Every state has:

- color;
- icon;
- text label.

Do not use red/green alone.

---

# 40. Attribution Badges

Use distinct icon/shape + text.

### Individual
Person icon.

### Network / Group
Connected-nodes icon.

### External
Environment/market icon.

Do not rely only on purple/blue/green.

---

# 41. What NOT to Build

Do not implement:

- real backend;
- production database;
- APIs;
- real borrower ingestion;
- authentication;
- real ML;
- model training;
- statistical calibration;
- blockchain;
- smart contracts;
- wallet;
- actual lender data sharing;
- real notification systems;
- real repayment changes;
- real lending decisions.

The prototype is a simulation.

---

# 42. Honesty Rules

Every place where a user could mistake simulated output for a real financial decision should say:

**Synthetic demo data**

or

**Simulated**

or

**Hypothetical**

Do not claim:

- validated prediction;
- causal inference;
- guaranteed contagion;
- real-time monitoring;
- blockchain verification.

---

# 43. Implementation Phases

## Phase 1 — Codebase audit
Inspect existing Figma Make export.

Deliverable:
Current architecture + reuse plan.

## Phase 2 — PS-first information architecture
Repurpose existing navigation and screens.

Deliverable:
Group G-07 is the clear main journey.

## Phase 3 — Data model
Implement the five borrowers, relationships, and scenario data.

Deliverable:
Single source of mock truth.

## Phase 4 — Core group investigation
Build the readable graph + borrower evidence panel.

Deliverable:
A judge can understand the PS from this screen.

## Phase 5 — Scenario system
Implement Individual, Network/Group, External.

Deliverable:
Three materially different outcomes.

## Phase 6 — Propagation
Implement deterministic timeline and animated relationship paths.

Deliverable:
Stress visibly moves through the hypothetical network.

## Phase 7 — Attribution
Implement evidence-backed explanation.

Deliverable:
The system explains “why,” not only “what.”

## Phase 8 — Intervention
Implement targeted before/after support.

Deliverable:
Healthy members remain untouched when appropriate.

## Phase 9 — Memory
Implement historical comparison.

Deliverable:
Previous recovery provides context.

## Phase 10 — Passport
Implement mock event history.

Deliverable:
Intervention creates a visible event record.

## Phase 11 — Polish
Typography, motion, spacing, responsive behavior, accessibility.

## Phase 12 — Verification
Run checks and execute the complete demo several times.

---

# 44. Acceptance Tests

## Test 1 — Group-first comprehension
Open the application.

PASS:
A viewer immediately understands that the focus is one group with an emerging borrower-level issue.

## Test 2 — Borrower initiation
Select Asha.

PASS:
Asha is clearly the initiating borrower.

## Test 3 — Relationship meaning
Select each edge.

PASS:
The viewer can understand why the relationship exists.

## Test 4 — Individual scenario
Run Scenario A.

PASS:
Asha becomes stressed while the group largely remains stable.

## Test 5 — Network scenario
Run Scenario B.

PASS:
Connected members become exposed in a deterministic sequence.

## Test 6 — External scenario
Run Scenario C.

PASS:
Several members deteriorate together without presenting Asha as the definite cause.

## Test 7 — Attribution
Open Attribution.

PASS:
The result includes evidence supporting the category.

## Test 8 — Propagation
Run Scenario B.

PASS:
The timeline and graph visibly show the hypothetical path.

## Test 9 — Intervention
Apply targeted support.

PASS:
Relevant members improve/lower exposure in simulated state.

## Test 10 — Healthy-member protection
Check Lata.

PASS:
Lata remains healthy and does not receive unnecessary intervention.

## Test 11 — Memory
Open previous event.

PASS:
Historical recovery is compared with the current case.

## Test 12 — Passport
Confirm intervention.

PASS:
A mock event is added.

## Test 13 — Reset
Click reset.

PASS:
The entire scenario returns to baseline.

---

# 45. Final Product Acceptance Gate

The prototype is ready only when a judge can understand these six sentences from the interface:

1. **This group looks healthy overall.**
2. **Asha is showing early stress.**
3. **Here are the real reasons she is connected to other borrowers.**
4. **The problem may remain individual, may become network-driven, or may come from an external shock.**
5. **Here is what could happen next under a hypothetical simulation.**
6. **We intervene where risk is meaningful and leave healthy members alone.**

If those six ideas are not obvious, do not spend time polishing secondary features yet.

---

# 46. Final Demo Outcome

The strongest final screen state should communicate:

**Group G-07**

**Emerging stress investigated**

**Attribution:** Network / Group  
**Potentially exposed:** 3 borrowers  
**Healthy / protected:** 1 borrower  
**Intervention:** Targeted support  
**Propagation:** Simulated  
**Outcome:** Monitoring / support in progress

This is the product's proof.

The other features — Immune Memory and Stress Passport — then demonstrate how the concept could mature into a larger system.

---

# 47. Future Architecture (Only Conceptual)

The prototype should leave clear seams for a future real implementation:

```text
Synthetic borrower data
        ↓
Real borrower/repayment/income data
        ↓
Network construction
        ↓
Stress signal detection
        ↓
Attribution model
        ↓
Propagation / stress testing
        ↓
Intervention recommendation
        ↓
Outcome tracking
        ↓
Historical memory
        ↓
Privacy-preserving event record
```

Do not implement this production architecture now.

The hackathon prototype needs to prove the concept visually and interactively first.
