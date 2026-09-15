// ─── StressNet Mock Data ─────────────────────────────────────────────────────
// Single source of truth for all demo data.
// ALL data is synthetic / illustrative. Not real borrower records.

export type RiskState = "Healthy" | "Watch" | "Stressed" | "Critical" | "Support";
export type Screen = "login" | "dashboard" | "network" | "attribution" | "immune-memory" | "intervention" | "passport";
export type ScenarioKey = "individual" | "network" | "external";

// ─── PRIMARY GROUP G-07 ──────────────────────────────────────────────────────

export interface Borrower {
  id: string;
  name: string;
  group: string;
  x: number;
  y: number;
  status: RiskState;
  stressScore: number;
  individual: number;
  network: number;
  external: number;
  connectedAtRisk: number;
  action: string;
  repaymentStatus: string;
  incomeSource: string;
  monthsMissed: number;
  incomeTrend: "stable" | "declining" | "severely-declining";
  repaymentTrend: "stable" | "rising-pressure" | "critical-pressure";
  cashBuffer: "adequate" | "narrowing" | "depleted";
  isInitiator?: boolean;
}

export interface Edge {
  from: string;
  to: string;
  type: "shared-guarantee" | "group-lending" | "common-income" | "local-exposure";
  label: string;
  reason: string;
  strength: "high" | "medium" | "low";
}

// Fixed SVG positions for 5-node graph (640x460 viewBox)
export const g07Borrowers: Borrower[] = [
  {
    id: "G07-A1", name: "Asha",   group: "G-07", x: 320, y: 190,
    status: "Critical", stressScore: 78,
    individual: 42, network: 38, external: 20,
    connectedAtRisk: 3,
    action: "Immediate field officer visit + repayment flexibility review",
    repaymentStatus: "2 months overdue",
    incomeSource: "Vegetable market — Zone 4",
    monthsMissed: 2,
    incomeTrend: "severely-declining",
    repaymentTrend: "critical-pressure",
    cashBuffer: "depleted",
    isInitiator: true,
  },
  {
    id: "G07-A2", name: "Meera",  group: "G-07", x: 135, y: 118,
    status: "Watch", stressScore: 52,
    individual: 18, network: 72, external: 10,
    connectedAtRisk: 1,
    action: "Bi-weekly check-in; review guarantee exposure with Asha",
    repaymentStatus: "1 month overdue",
    incomeSource: "Tailoring — home-based",
    monthsMissed: 1,
    incomeTrend: "declining",
    repaymentTrend: "rising-pressure",
    cashBuffer: "narrowing",
  },
  {
    id: "G07-A3", name: "Kavita", group: "G-07", x: 505, y: 118,
    status: "Watch", stressScore: 46,
    individual: 20, network: 65, external: 15,
    connectedAtRisk: 1,
    action: "Group counseling referral; protect disbursement cycle",
    repaymentStatus: "Current (marginal)",
    incomeSource: "Garment stitching — co-operative",
    monthsMissed: 0,
    incomeTrend: "declining",
    repaymentTrend: "rising-pressure",
    cashBuffer: "narrowing",
  },
  {
    id: "G07-A4", name: "Farah",  group: "G-07", x: 505, y: 340,
    status: "Watch", stressScore: 50,
    individual: 14, network: 26, external: 60,
    connectedAtRisk: 1,
    action: "External shock assessment; monitor market recovery",
    repaymentStatus: "Current (marginal)",
    incomeSource: "Vegetable market — Zone 4",
    monthsMissed: 0,
    incomeTrend: "declining",
    repaymentTrend: "rising-pressure",
    cashBuffer: "narrowing",
  },
  {
    id: "G07-A5", name: "Lata",   group: "G-07", x: 135, y: 340,
    status: "Healthy", stressScore: 19,
    individual: 35, network: 15, external: 50,
    connectedAtRisk: 0,
    action: "No action required — monitor quarterly",
    repaymentStatus: "Current",
    incomeSource: "Domestic services — household",
    monthsMissed: 0,
    incomeTrend: "stable",
    repaymentTrend: "stable",
    cashBuffer: "adequate",
  },
];

export const g07Edges: Edge[] = [
  {
    from: "G07-A1", to: "G07-A2",
    type: "shared-guarantee",
    label: "Shared guarantee",
    reason: "Meera co-signed Asha's loan. If Asha defaults, Meera faces direct repayment liability.",
    strength: "high",
  },
  {
    from: "G07-A1", to: "G07-A3",
    type: "group-lending",
    label: "Group lending",
    reason: "Asha and Kavita are in the same lending cycle. A group-level shortfall may delay Kavita's next disbursement.",
    strength: "high",
  },
  {
    from: "G07-A1", to: "G07-A4",
    type: "common-income",
    label: "Common market",
    reason: "Asha and Farah both sell at Zone 4 vegetable market. A market shock affects both simultaneously.",
    strength: "medium",
  },
  {
    from: "G07-A4", to: "G07-A5",
    type: "local-exposure",
    label: "Local exposure",
    reason: "Farah and Lata share local economic conditions. A broad Zone 4 downturn may reach Lata, though her income source (domestic services) is less directly exposed.",
    strength: "low",
  },
];

export const borrowers = g07Borrowers;
export const edges = g07Edges;

// ─── BACKGROUND GROUPS (secondary context only) ──────────────────────────────
export const backgroundGroups = [
  { id: "G-204", members: 12, stress: "Elevated", propagationRisk: 48, color: "#6C63D9" },
  { id: "G-101", members: 5,  stress: "Stable",   propagationRisk: 8,  color: "#168568"  },
  { id: "G-307", members: 4,  stress: "Stable",   propagationRisk: 5,  color: "#168568"  },
];

export const groups = [
  { id: "G-07",  members: 5,  stress: "Elevated",  propagationRisk: 63, attribution: "Network",    color: "#3157D5" },
  { id: "G-204", members: 12, stress: "Elevated",   propagationRisk: 48, attribution: "Network",    color: "#6C63D9" },
  { id: "G-101", members: 5,  stress: "Stable",     propagationRisk: 8,  attribution: "Individual", color: "#168568" },
  { id: "G-307", members: 4,  stress: "Stable",     propagationRisk: 5,  attribution: "External",   color: "#168568" },
];

// ─── PROPAGATION STAGES (Scenario B — Network) ───────────────────────────────
// Day-labeled per spec §17. Deterministic. Not random.

export const simStages = [
  {
    step: 1, day: "Day 0",
    label: "Asha — Stress Detected",
    borrower: "Asha",
    desc: "SYNTHETIC BASELINE: Asha's income has declined for 2 months. Repayment 2 months overdue. Other members currently stable.",
    affected: ["G07-A1"],
    isHypothetical: false,
  },
  {
    step: 2, day: "Day 3",
    label: "Meera — Guarantee Exposure",
    borrower: "Meera",
    desc: "HYPOTHETICAL SIMULATION: Meera co-signed Asha's guarantee. If Asha's default continues, Meera faces direct repayment liability. Meera enters Watch.",
    affected: ["G07-A1", "G07-A2"],
    isHypothetical: true,
  },
  {
    step: 3, day: "Day 7",
    label: "Kavita — Group Lending Pressure",
    borrower: "Kavita",
    desc: "HYPOTHETICAL SIMULATION: The group lending cycle is affected by Asha's shortfall. Kavita's disbursement is at risk. Kavita enters Watch.",
    affected: ["G07-A1", "G07-A2", "G07-A3"],
    isHypothetical: true,
  },
  {
    step: 4, day: "Day 10",
    label: "Farah — Common Market Impact",
    borrower: "Farah",
    desc: "HYPOTHETICAL SIMULATION: The same Zone 4 market decline affecting Asha may also be reducing Farah's income. Farah enters Watch through common-market exposure.",
    affected: ["G07-A1", "G07-A2", "G07-A3", "G07-A4"],
    isHypothetical: true,
  },
  {
    step: 5, day: "Day 14",
    label: "Lata — Remains Healthy",
    borrower: "Lata",
    desc: "HYPOTHETICAL SIMULATION: Lata's domestic services income is not connected to the market shock or the guarantee chain. She remains Healthy. No intervention required for Lata.",
    affected: ["G07-A1", "G07-A2", "G07-A3", "G07-A4"],
    isHypothetical: true,
    lataProtected: true,
  },
];

// ─── THREE SCENARIOS ─────────────────────────────────────────────────────────
// Each scenario has a distinct borrowerStates map that drives the graph and
// all other screens. Scenarios differ in underlying evidence, not just labels.

export interface BorrowerState {
  status: RiskState;
  note: string;
}

export interface Scenario {
  key: ScenarioKey;
  label: string;
  trigger: string;
  initiatorId: string;
  initiatorName: string;
  attribution: { individual: number; network: number; external: number };
  primaryAttribution: "Individual" | "Network" | "External";
  containment: "Contained" | "May Spread" | "Spreading";
  description: string;
  explanation: string;
  containmentReason: string;
  borrowerStates: Record<string, BorrowerState>;
}

export const scenarios: Scenario[] = [
  {
    // ── SCENARIO A: Individual / Temporary ──────────────────────────────────
    // Asha stressed. Others unchanged. No network co-movement.
    // Key message: a stressed borrower does NOT automatically mean a stressed group.
    key: "individual",
    label: "Scenario A — Individual / Temporary",
    trigger: "Asha experiences a temporary income interruption following a personal health event.",
    initiatorId: "G07-A1",
    initiatorName: "Asha",
    attribution: { individual: 74, network: 14, external: 12 },
    primaryAttribution: "Individual",
    containment: "Contained",
    description: "Asha is stressed. The connected members remain stable. No group-wide action needed.",
    explanation: "Asha's stress signals are concentrated in her own circumstances — a personal health expense reduced her income for one cycle. Meera, Kavita, Farah, and Lata all remain current on repayments. No co-movement is detected. The guarantee between Asha and Meera has not been triggered.",
    containmentReason: "Connected borrowers are stable. No guarantee transmission or group-lending shortfall observed. Individual-level support for Asha is sufficient — penalizing the group would be unjustified.",
    borrowerStates: {
      "G07-A1": { status: "Watch",   note: "Temporary income disruption — personal health event. Stress appears individual." },
      "G07-A2": { status: "Healthy", note: "Current on repayments. Guarantee has not been triggered. No exposure detected." },
      "G07-A3": { status: "Healthy", note: "Current on repayments. Group disbursement unaffected." },
      "G07-A4": { status: "Healthy", note: "Zone 4 market stable in this scenario. No income disruption detected." },
      "G07-A5": { status: "Healthy", note: "Fully stable. Domestic services income unaffected. No action required." },
    },
  },
  {
    // ── SCENARIO B: Network / Group ──────────────────────────────────────────
    // Asha → Meera (guarantee) → Kavita (group lending) → Farah (market).
    // Lata remains Healthy — independent income, not in the exposure chain.
    // Key message: stress moves through specific relationships, not blindly across the whole group.
    key: "network",
    label: "Scenario B — Network / Group Vulnerability",
    trigger: "Asha's stress interacts with active group relationships: guarantee, lending cycle, common market.",
    initiatorId: "G07-A1",
    initiatorName: "Asha",
    attribution: { individual: 22, network: 64, external: 14 },
    primaryAttribution: "Network",
    containment: "May Spread",
    description: "Asha's stress is propagating through guarantee and lending relationships to Meera and Kavita. Farah has common-market exposure. Lata remains healthy.",
    explanation: "Asha is overdue 2 months. Meera, who co-signed Asha's guarantee, is now 1 month overdue — the guarantee is creating direct repayment pressure. Kavita's disbursement cycle is at risk through group lending. Farah faces secondary exposure through the shared market. The co-movement across connected borrowers — while Lata remains stable — indicates network-driven vulnerability, not coincidence.",
    containmentReason: "Meera and Kavita have documented relationship exposure to Asha. Targeted support for Asha + Meera + Kavita can contain the cascade. Lata is fully independent and must not receive a punitive response — Watch status would be unjustified for her in this scenario.",
    borrowerStates: {
      "G07-A1": { status: "Critical", note: "Initiator. 2 months overdue. Income severely declining. Cash buffer depleted." },
      "G07-A2": { status: "Watch",    note: "Shared guarantee with Asha is creating direct repayment exposure. 1 month overdue." },
      "G07-A3": { status: "Watch",    note: "Group lending cycle at risk from Asha's shortfall. Disbursement may be delayed." },
      "G07-A4": { status: "Watch",    note: "Same Zone 4 market as Asha. Common-market exposure may be rising." },
      "G07-A5": { status: "Healthy",  note: "Domestic services income. Not in the guarantee chain or lending cycle. Healthy." },
    },
  },
  {
    // ── SCENARIO C: External / Common Shock ──────────────────────────────────
    // Zone 4 market disruption. Asha AND Farah AND Lata affected simultaneously.
    // Asha is NOT the cause — they share an external shock.
    // Meera and Kavita (different income sources) remain stable.
    // Key message: co-movement may have an external explanation — not network contagion.
    key: "external",
    label: "Scenario C — External / Common Shock",
    trigger: "A Zone 4 market supply disruption simultaneously affects multiple borrowers with common local exposure.",
    initiatorId: "G07-A4",
    initiatorName: "Farah & Asha (common shock — no single source)",
    attribution: { individual: 10, network: 16, external: 74 },
    primaryAttribution: "External",
    containment: "Spreading",
    description: "A regional market shock is simultaneously affecting Asha, Farah, and Lata through shared local economic exposure. No single borrower is the source.",
    explanation: "A supply disruption in Zone 4 has reduced income for both Asha (vegetable market) and Farah (same market) at the same time. Lata, through her local-economic exposure to the same zone, also faces mild pressure. Neither caused the other's stress — the external shock is the common driver. Meera (tailoring) and Kavita (garments co-operative) operate in different markets and remain stable.",
    containmentReason: "The shock is externally driven and market-specific. Meera and Kavita are genuinely unaffected — they are not in the exposed market. Lata faces mild external pressure but does not need punitive action; monitoring is appropriate. Broad group penalties would harm borrowers who are not at risk.",
    borrowerStates: {
      "G07-A1": { status: "Critical", note: "Zone 4 market shock. Income severely reduced. 2 months overdue." },
      "G07-A2": { status: "Healthy",  note: "Tailoring income. Unaffected by Zone 4 market disruption." },
      "G07-A3": { status: "Healthy",  note: "Garments co-operative. Different market. Fully unaffected." },
      "G07-A4": { status: "Watch",    note: "Zone 4 market shock. Same external exposure as Asha. Income declining." },
      "G07-A5": { status: "Watch",    note: "Local economic exposure to Zone 4 area via Farah. Mild external pressure. Monitor only — not a network risk." },
    },
  },
];

// ─── INTERVENTION DATA ───────────────────────────────────────────────────────

export interface InterventionCase {
  id: string;
  group: string;
  stress: string;
  attribution: string;
  priority: string;
  status: string;
  officer: string;
  propagationRisk: number;
  description: string;
  healthyBorrowers: string[];
  affectedBorrowers: string[];
  beforeState: Array<{ name: string; status: RiskState; note: string }>;
  afterBroad:  Array<{ name: string; status: RiskState; note: string; action: string }>;
  afterTargeted: Array<{ name: string; status: RiskState; note: string; action: string }>;
}

export const interventionCases: InterventionCase[] = [
  {
    id: "IC-2026-041",
    group: "G-07",
    stress: "High",
    attribution: "Network",
    priority: "Critical",
    status: "Pending Review",
    officer: "A. Sharma",
    propagationRisk: 63,
    description: "Asha's stress is propagating through the guarantee chain (Meera) and group lending (Kavita). Targeted support for the three exposed members can contain the cascade. Lata remains healthy and must not be penalized.",
    healthyBorrowers: ["Lata — independent income, not in exposure chain, no action needed"],
    affectedBorrowers: ["Asha (initiator)", "Meera (guarantee exposure)", "Kavita (group lending)"],
    beforeState: [
      { name: "Asha",   status: "Critical", note: "2 months overdue. Income severely declining. Cash buffer depleted." },
      { name: "Meera",  status: "Watch",    note: "1 month overdue. Guarantee exposure from Asha." },
      { name: "Kavita", status: "Watch",    note: "Marginal. Group disbursement at risk." },
      { name: "Farah",  status: "Watch",    note: "Common-market exposure. Early pressure." },
      { name: "Lata",   status: "Healthy",  note: "Fully stable. No exposure." },
    ],
    afterBroad: [
      { name: "Asha",   status: "Support",  note: "Repayment review initiated.",          action: "Repayment review" },
      { name: "Meera",  status: "Watch",    note: "Group-wide monitoring applied.",         action: "Group monitoring" },
      { name: "Kavita", status: "Watch",    note: "Group-wide monitoring applied.",         action: "Group monitoring" },
      { name: "Farah",  status: "Watch",    note: "Group-wide monitoring applied.",         action: "Group monitoring" },
      { name: "Lata",   status: "Watch",    note: "⚠ Unnecessarily flagged. No exposure. Broad response penalizes Lata.", action: "Group monitoring — not needed" },
    ],
    afterTargeted: [
      { name: "Asha",   status: "Support",  note: "Repayment restructured. Field officer assigned.",    action: "Repayment restructuring" },
      { name: "Meera",  status: "Watch",    note: "Guarantee pressure reduced. Bi-weekly check-in.",   action: "Bi-weekly check-in" },
      { name: "Kavita", status: "Healthy",  note: "Group disbursement protected. Counseling scheduled.", action: "Group counseling" },
      { name: "Farah",  status: "Watch",    note: "External assessment. Monitor market recovery.",      action: "External monitoring" },
      { name: "Lata",   status: "Healthy",  note: "✓ Unchanged and healthy. No intervention applied.",  action: "None — healthy member protected" },
    ],
  },
];

// ─── PASSPORT DATA ───────────────────────────────────────────────────────────

export const passportEvents = [
  {
    year: "2024",
    date: "Mar 2024",
    type: "Stress Event Detected",
    detail: "Seasonal income disruption — Zone 4 market",
    status: "Verified",
    outcome: "Recovered",
    intervention: "Individual repayment restructuring",
    hash: "SIM-RECORD-A4F2",
  },
  {
    year: "2025",
    date: "Aug 2025",
    type: "External Shock",
    detail: "Harvest supply chain disruption",
    status: "Verified",
    outcome: "Recovered",
    intervention: "Group-level financial counseling",
    hash: "SIM-RECORD-B9D1",
  },
  {
    year: "2026",
    date: "Sep 2026",
    type: "Network Stress Detected",
    detail: "Guarantee-chain exposure — Group G-07 (Asha)",
    status: "Active",
    outcome: "Monitoring",
    intervention: "Targeted group support initiated",
    hash: "SIM-RECORD-C3E7",
  },
];

// ─── IMMUNE MEMORY DATA ──────────────────────────────────────────────────────

export const historyEvents = [
  {
    id: "HE-2024-01",
    year: "2024",
    type: "Seasonal Income Disruption",
    similarity: 78,
    outcome: "Recovered",
    duration: "6 weeks",
    group: "G-07",
    borrower: "Asha",
    details: "Similar income decline in Zone 4 market. Asha experienced a 6-week shortfall. Individual repayment restructuring was applied. Meera and Kavita remained stable — no guarantee transmission occurred in that event.",
    comparison: {
      incomeShock:       { previous: "Similar",  current: "Similar"  },
      repaymentPressure: { previous: "Moderate", current: "Higher"   },
      networkExposure:   { previous: "Low",       current: "High"     },
      outcome:           { previous: "Recovered", current: "Monitoring" },
    },
  },
  {
    id: "HE-2025-01",
    year: "2025",
    type: "Supply Chain Disruption",
    similarity: 82,
    outcome: "Recovered",
    duration: "8 weeks",
    group: "G-07",
    borrower: "Farah + Asha",
    details: "External supply disruption affected both Asha and Farah (shared market). Recovered within 8 weeks with targeted support. Key difference from the current event: the guarantee chain was not activated in 2025.",
    comparison: {
      incomeShock:       { previous: "Similar",  current: "Similar"  },
      repaymentPressure: { previous: "Moderate", current: "Higher"   },
      networkExposure:   { previous: "Low",       current: "High"     },
      outcome:           { previous: "Recovered", current: "Monitoring" },
    },
  },
  {
    id: "HE-2026-01",
    year: "2026",
    type: "Current Event — Network Exposure",
    similarity: 85,
    outcome: "Monitoring",
    duration: "Ongoing",
    group: "G-07",
    borrower: "Asha",
    details: "Current event. Similar income decline pattern. The key new dimension: Meera's guarantee exposure is active and Kavita's disbursement is at risk. History suggests recovery is possible, but the network dimension requires additional targeted action beyond what was needed in 2024 or 2025.",
    comparison: {
      incomeShock:       { previous: "Similar", current: "Similar"   },
      repaymentPressure: { previous: "Higher",  current: "Critical"  },
      networkExposure:   { previous: "High",     current: "Very High" },
      outcome:           { previous: "Monitoring", current: "Active"  },
    },
  },
];
