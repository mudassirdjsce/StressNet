# AGENT.md — Final StressNet PS-First Implementation Rules

## 1. Mission

Modify the existing Figma Make export into a **PS-first StressNet prototype**.

The product's primary job is to demonstrate:

> One borrower in one connected microfinance group is showing financial stress. Determine whether that stress appears individual/contained, network/group-driven, or external/common; simulate what could happen next; and show targeted support that reduces wider risk without unnecessarily penalizing healthy borrowers.

This is the product requirement.

Do NOT optimize for a generic lender dashboard.

Read `IMPLEMENTATION_PS_FIRST_FINAL.md` before editing.

---

## 2. Non-Negotiable Priority

### Tier 1 — Must work

1. One primary group.
2. One initiating borrower.
3. Borrower-level stress evidence.
4. Meaningful relationship graph.
5. Individual / Network / External scenarios.
6. Hypothetical propagation.
7. Attribution with evidence.
8. Targeted intervention.
9. Healthy-member protection.

### Tier 2 — Supporting features

10. Stress Immune Memory.
11. Stress Passport.

If a secondary feature conflicts with the clarity of the Tier 1 story, simplify the secondary feature.

---

## 3. Inspect First

Before editing:

1. Inspect the repository tree.
2. Read package manifest.
3. Identify framework/package manager.
4. Identify entry point and routing.
5. Identify styling system and component conventions.
6. Identify existing state approach.
7. Identify available graph/chart/icon dependencies.
8. Run the existing app if possible.
9. Run available checks if possible.
10. Map current screens to the final PS-first IA.

Do not assume the stack.

Do not scaffold a new application.

Do not migrate frameworks.

---

## 4. Audit the Existing Build

Write a short implementation assessment before major changes.

Answer:

- What currently represents a group?
- What currently represents a borrower?
- Does one borrower clearly initiate stress?
- Are relationships meaningful or decorative?
- Does the current UI assume contagion?
- Can it demonstrate contained stress?
- Can it demonstrate network vulnerability?
- Can it demonstrate an external shock?
- Does intervention affect only relevant members?
- Does a healthy borrower remain protected?
- Which screens can be reused?
- Which screens should be merged or repurposed?

---

## 5. Primary Synthetic Case

Use:

**Group G-07**

Members:

- Asha — initiating borrower
- Meera — shared guarantee
- Kavita — group lending
- Farah — common market
- Lata — healthy control / low exposure

All names and financial values are fictional.

Do not randomly replace them.

---

## 6. Information Architecture

Preferred user-facing flow:

1. Demo Entry
2. Group Overview
3. Group Stress Investigation
4. Scenario / Propagation Simulator
5. Attribution
6. Intervention
7. History / Immune Memory
8. Stress Passport

Existing routes may be retained internally.

Merge/reframe screens where necessary.

---

## 7. Group Overview

The first main view must communicate:

> **Group G-07 looks healthy overall, but Asha is showing an emerging stress signal.**

A small portfolio count may remain secondary.

Do not make multi-group analytics the main experience.

---

## 8. Multi-Group Restriction

Other groups are allowed only as background context.

Allowed:

- a small secondary group list;
- a portfolio count;
- hidden/mock data for realism.

Not allowed:

- main demo requiring group switching;
- unrelated group cascades;
- different primary case on different screens.

Main story must remain:

**G-07 → Asha → explanation → simulation → intervention**

---

## 9. Build the Graph Around Financial Meaning

Use five borrower nodes.

Edges must explain their purpose:

- shared guarantee;
- group lending;
- common income/market;
- local economic exposure.

Every edge needs:

- type;
- strength;
- explanation.

Do not draw arbitrary links.

---

## 10. Use a Fixed SVG Layout

For five nodes:

- prefer hand-positioned SVG;
- avoid adding a graph library unless the repository already has one and it materially helps;
- maintain readable edge labels;
- support node selection;
- animate edge paths during propagation.

Do not use a force graph that shifts nodes unpredictably during the demo.

---

## 11. Separate Baseline From Simulation

Every scenario has two conceptual layers:

### Synthetic baseline
What the mock data currently shows.

### Hypothetical scenario
What the scripted simulation shows could happen.

The UI must visibly distinguish the two.

Use labels such as:

- Synthetic baseline
- Hypothetical simulation
- Simulated interpretation

---

## 12. Implement Three Real Scenarios

Do not build one generic contagion animation.

Build three distinct scripted scenario objects.

### Scenario A — Individual / Temporary

Asha deteriorates.

Connected borrowers remain mostly stable.

Result:

**Likely contained individual stress**

### Scenario B — Network / Group

Asha deteriorates first.

Meaningful relationship exposure causes Meera/Kavita/Farah to become more vulnerable.

Result:

**Potential network/group-driven vulnerability**

### Scenario C — External / Common

Several borrowers deteriorate around the same time from a common external condition.

Result:

**Potential external/common shock**

Changing scenarios must alter:

- evidence;
- node states;
- propagation;
- attribution;
- recommended intervention.

Do not merely change a badge.

---

## 13. Individual Scenario Is Mandatory

The individual scenario exists to prove:

**A stressed borrower is not automatically a group crisis.**

Example evidence:

- Asha income down;
- Asha repayment pressure up;
- other borrowers stable;
- no meaningful secondary exposure.

No propagation should occur beyond Asha.

---

## 14. Network Scenario Is Mandatory

The network scenario exists to prove:

**Relationships can turn an individual problem into broader vulnerability.**

Example:

Asha
→ Meera via shared guarantee
→ Kavita via group lending
→ Farah via common market

Lata remains stable.

This must be visibly connected to the edges.

---

## 15. External Scenario Is Mandatory

The external scenario exists to prove:

**Several borrowers can deteriorate together without one borrower being the cause.**

Use a synthetic local/economic shock.

Example:

Local market demand drops.

Affected:

- Asha;
- Farah;
- Lata.

This should not visually blame Asha.

---

## 16. Propagation Engine

Use scripted steps.

Example:

```text
[
  { t: 0,     node: "asha",   state: "stressed" },
  { t: 1200,  node: "meera",  state: "watch" },
  { t: 2400,  node: "kavita", state: "watch" },
  { t: 3600,  node: "farah",  state: "watch" }
]
```

Use the actual scenario's data structure rather than hardcoding steps in UI components.

The simulation must be:

- deterministic;
- replayable;
- resettable;
- short;
- visually clear.

---

## 17. Propagation Language

Never state that the prototype proved causality.

Preferred:

- potential impact;
- exposed;
- vulnerable;
- associated with;
- hypothetical propagation;
- simulated scenario.

Avoid:

- caused;
- guaranteed;
- proved;
- will default;
- certain contagion.

---

## 18. Attribution

Build evidence-backed attribution.

Conceptual rule:

```text
if borrower-specific deterioration
   and little connected deterioration:
       Individual

if initiating deterioration
   + meaningful relationship exposure
   + subsequent connected deterioration:
       Network / Group

if multiple borrowers deteriorate together
   + shared external factor:
       External
```

This is a deterministic demo rule system.

Do not call it ML.

Do not add probability claims without explicit “Simulated” labeling.

---

## 19. Attribution UI

Do not use only three big colored cards.

Show:

- final simulated category;
- evidence;
- affected members;
- relevant relationships;
- plain-language explanation.

Example:

**Network / Group**

Evidence:
- Asha changed first;
- Meera has shared guarantee exposure;
- Kavita has group-lending exposure;
- secondary exposure increased after the simulated event.

---

## 20. Borrower Detail

When a node is selected, show:

### Identity
Name + role in group.

### Stress evidence
- income trend;
- repayment trend;
- cash buffer.

### Network exposure
List meaningful edges.

### Attribution
Current simulated interpretation.

### Suggested response
Support action.

### History
Only when relevant.

Do not overload the panel with unrelated metrics.

---

## 21. Intervention

The intervention screen must explicitly answer:

> **How can we reduce wider risk without unnecessarily penalizing healthy borrowers?**

Provide two conceptual response paths:

### Broad response
Shows why treating the whole group could be excessive.

### Targeted support
Targets affected/exposed members.

The targeted path should leave Lata unchanged when she is healthy.

---

## 22. Intervention State Update

On confirmation:

- update local node states;
- update simulated exposure;
- append passport event;
- update relevant UI;
- preserve healthy member state.

Example:

Before:
Asha stressed
Meera watch
Kavita watch
Farah watch
Lata healthy

After:
Asha support
Meera lower exposure
Kavita lower exposure
Farah monitoring
Lata healthy

---

## 23. Stress Immune Memory

Implement after the core flow.

Use one historical event.

Example:

Previous:
temporary income shock → support → recovery → contained.

Current:
similar borrower signal + stronger network exposure.

Show a simple comparison.

Do not invent a trained “resilience score” unless clearly presented as a static demo concept.

Prefer:

**Historical context**

over:

**AI has learned this borrower’s resilience**

---

## 24. Stress Passport

Implement after intervention.

Record a local mock event:

- event id;
- group;
- borrower;
- scenario;
- attribution;
- intervention;
- simulated status.

It must be clearly labeled:

**Conceptual Stress Passport — Prototype**

Do not implement:

- blockchain;
- wallet;
- smart contract;
- transaction;
- crypto;
- real sharing.

Do not make cosmetic blockchain details look like real verification.

---

## 25. State Model

Use the existing state mechanism when possible.

Minimum:

```text
selectedGroupId
selectedBorrowerId
selectedScenarioId
demoStage
propagationIndex
interventionState
passportEvents
```

Avoid unnecessary global state libraries.

---

## 26. Data Separation

Keep synthetic data outside presentational components.

Conceptual modules:

```text
groups
borrowers
relationships
scenarios
history
interventions
```

Do not duplicate Asha's data in multiple files.

---

## 27. Primary Controls

Everything important must work.

### Group Overview
- Investigate stress

### Investigation
- Select borrower
- Choose scenario
- Introduce stress
- Simulate propagation
- Reset

### Propagation
- Play
- Pause if practical
- Replay
- Reset

### Attribution
- Scenario switch
- View evidence

### Intervention
- Select action
- Confirm simulated intervention

### History
- View prior event
- Compare current case

### Passport
- View event

No dead buttons.

---

## 28. Reset Behavior

Reset must restore:

- Group G-07 baseline;
- Asha baseline;
- all other borrowers;
- timeline;
- scenario;
- intervention state;
- passport additions.

A reset must make the demo replayable.

---

## 29. Visual Rules

Prioritize:

1. group;
2. borrower;
3. relationships;
4. evidence;
5. simulation;
6. attribution;
7. intervention.

Avoid:

- giant KPI grids;
- multi-group complexity;
- decorative AI;
- crypto aesthetic;
- overuse of cards;
- unreadable graphs.

---

## 30. Accessibility

Do not use color alone.

Every state includes text/icon.

Every relationship must be understandable from text or a detail panel.

Buttons must have accessible labels.

Hover must not be required.

---

## 31. Performance / Reliability

Because this is a live presentation prototype:

- avoid unnecessary dependencies;
- avoid random behavior;
- avoid network calls;
- avoid animations that can fail the scenario;
- ensure every scenario begins from a known state;
- ensure reset is reliable.

The demo must behave the same way every run.

---

## 32. Implementation Order

### Phase 1
Audit codebase.

### Phase 2
Restructure navigation around Group G-07.

### Phase 3
Create centralized mock group/borrower/relationship data.

### Phase 4
Build the investigation graph.

### Phase 5
Build the three scenario definitions.

### Phase 6
Build propagation timeline and graph animation.

### Phase 7
Build evidence-backed attribution.

### Phase 8
Build targeted intervention and healthy-member protection.

### Phase 9
Build historical memory.

### Phase 10
Build Passport.

### Phase 11
Polish.

### Phase 12
Verify the full demo.

---

## 33. Do Not Polish Before Core Validation

Before visual polish, the following must already work:

- one group;
- one initiator;
- relationship graph;
- three scenarios;
- propagation;
- attribution;
- intervention;
- healthy-member protection;
- reset.

Only then polish typography, animation, spacing, and decorative elements.

---

## 34. Required Verification

Actually run the available project checks.

If package scripts contain:

- lint;
- typecheck;
- build;
- tests;

run the applicable ones.

Do not claim success without observing the result.

If no automated tests exist, run the application and manually exercise:

1. Enter demo.
2. Open Group G-07.
3. Select Asha.
4. Run Individual.
5. Reset.
6. Run Network.
7. Observe propagation.
8. Open Attribution.
9. Open Intervention.
10. Apply targeted support.
11. Verify Lata remains healthy.
12. Open Memory.
13. Open Passport.
14. Reset.
15. Run External.
16. Verify several borrowers change together.

---

## 35. Final PS Acceptance Test

Ask:

> Can a judge understand the PS from the first main screen?

Then:

> Can the judge see one borrower's stress?

Then:

> Can the judge see why borrowers are connected?

Then:

> Can the judge see the difference between isolated, network, and external stress?

Then:

> Can the judge see potential propagation?

Then:

> Can the judge see targeted intervention?

Then:

> Can the judge see a healthy member protected?

If any answer is no, continue fixing the core UX before adding more features.

---

## 36. Completion Report

At completion report:

1. Screens retained/merged/repurposed.
2. Core G-07 scenario.
3. Three scenario behaviors.
4. Propagation behavior.
5. Attribution behavior.
6. Intervention behavior.
7. Healthy-member protection.
8. Memory and Passport behavior.
9. Exact commands run.
10. Actual results of checks.
11. Known limitations.
12. Mock-only areas requiring future implementation.

Never claim:

- real ML;
- causal inference;
- blockchain;
- real-time monitoring;
- real borrower data;
- validated prediction.

