import { useState, useRef, type ReactNode } from "react";
import NetworkGraph from "../components/ui/NetworkGraph";
import Badge from "../components/ui/Badge";
import { g07Borrowers, g07Edges, groups, scenarios, simStages, g07Edges as relEdges } from "../utils/mock";
import type { Screen, ScenarioKey, BorrowerState } from "../utils/mock";
import {
  Search,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Check,
  X,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Minus,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface Props {
  onNavigate: (s: Screen) => void;
}

const INCOME_ICON_COMP: Record<string, ReactNode> = {
  stable: <Minus size={13} color="#168568" />,
  declining: <TrendingDown size={13} color="#D99A27" />,
  "severely-declining": <TrendingDown size={13} color="#D84C4C" />,
};

const REPAY_ICON_COMP: Record<string, ReactNode> = {
  stable: <Minus size={13} color="#168568" />,
  "rising-pressure": <TrendingUp size={13} color="#D99A27" />,
  "critical-pressure": <AlertTriangle size={13} color="#D84C4C" />,
};

const BUFFER_ICON_COMP: Record<string, ReactNode> = {
  adequate: <Minus size={13} color="#168568" />,
  narrowing: <TrendingDown size={13} color="#D99A27" />,
  depleted: <AlertCircle size={13} color="#D84C4C" />,
};

const INCOME_COLOR: Record<string, string> = {
  stable: "#168568",
  declining: "#D99A27",
  "severely-declining": "#D84C4C",
};

export default function NetworkScreen({ onNavigate }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>("G07-A1");
  const [simStep, setSimStep] = useState(0);
  const [simRunning, setSimRunning] = useState(false);
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>("network");
  const [showAfter, setShowAfter] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const scenario = scenarios.find((s) => s.key === activeScenario)!;
  const selected = g07Borrowers.find((b) => b.id === selectedId) ?? null;
  const group = groups[0];

  // Graph state: either scenario borrower overrides (for A/C) or sim-driven (for B)
  const graphOverrides: Record<string, BorrowerState> | undefined =
    activeScenario !== "network" || simStep === 0
      ? (scenario.borrowerStates as Record<string, BorrowerState>)
      : undefined;

  const selectedScenarioState = selected ? scenario.borrowerStates[selected.id] : null;

  // Relationships for the selected borrower
  const selectedEdges = selected
    ? relEdges.filter((e) => e.from === selected.id || e.to === selected.id)
    : [];

  const runSimulation = () => {
    if (simRunning) return;
    setActiveScenario("network");
    setSimStep(0);
    setShowAfter(false);
    setSimRunning(true);
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
    [1, 2, 3, 4, 5].forEach((step, i) => {
      const t = setTimeout(() => {
        setSimStep(step);
        if (step === 5) setSimRunning(false);
      }, (i + 1) * 1800);
      timerRef.current.push(t);
    });
  };

  const resetSim = () => {
    timerRef.current.forEach(clearTimeout);
    setSimStep(0);
    setSimRunning(false);
    setShowAfter(false);
  };

  const switchScenario = (key: ScenarioKey) => {
    resetSim();
    setActiveScenario(key);
    const sc = scenarios.find((s) => s.key === key)!;
    setSelectedId(sc.initiatorId);
  };

  const currentStage = simStages.find((s) => s.step === simStep);

  return (
    <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto", padding: "20px 20px 20px 24px" }}>
        <div style={{ marginBottom: 10 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#182230", letterSpacing: "-0.02em", margin: 0 }}>
            Group Stress Investigation
          </h1>
          <p style={{ fontSize: 13, color: "#687588", margin: "3px 0 0" }}>
            Group G-07 • Five borrowers • Select a scenario to compare the three stress situations.
          </p>
        </div>

        {/* Scenario tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          {scenarios.map((sc) => (
            <button
              key={sc.key}
              onClick={() => switchScenario(sc.key)}
              style={{
                padding: "6px 14px",
                borderRadius: 7,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                border: `1.5px solid ${activeScenario === sc.key ? "#3157D5" : "#E3E8EF"}`,
                background: activeScenario === sc.key ? "#EEF2FF" : "#FFFFFF",
                color: activeScenario === sc.key ? "#3157D5" : "#687588",
                transition: "all 0.15s",
              }}
            >
              {sc.label}
            </button>
          ))}
          <span
            style={{
              marginLeft: "auto",
              fontSize: 10,
              fontWeight: 700,
              color: "#687588",
              background: "#F1F5F9",
              border: "1px solid #E3E8EF",
              padding: "4px 8px",
              borderRadius: 4,
              letterSpacing: "0.05em",
              alignSelf: "center",
            }}
          >
            LIVE MONITOR
          </span>
        </div>

        {/* Scenario banner */}
        <div
          style={{
            background: activeScenario === "network" ? "#FFF8F8" : activeScenario === "individual" ? "#F0F9FF" : "#FFFBEB",
            border: `1px solid ${activeScenario === "network" ? "#FECACA" : activeScenario === "individual" ? "#BAE6FD" : "#FDE68A"}`,
            borderRadius: 9,
            padding: "10px 16px",
            marginBottom: 10,
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, color: "#182230", marginBottom: 3, display: "flex", alignItems: "center", gap: 8 }}>
            {scenario.trigger}
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "2px 8px",
                borderRadius: 99,
                background: scenario.containment === "Contained" ? "#DCFCE7" : scenario.containment === "May Spread" ? "#FEF3C7" : "#FEE2E2",
                color: scenario.containment === "Contained" ? "#166534" : scenario.containment === "May Spread" ? "#92400E" : "#991B1B",
              }}
            >
              {scenario.containment}
            </span>
            {(activeScenario !== "network" || simStep === 0) && (
              <span style={{ fontSize: 10, fontWeight: 700, color: "#3157D5", background: "#EEF2FF", padding: "2px 7px", borderRadius: 4, letterSpacing: "0.04em" }}>
                BASELINE
              </span>
            )}
            {activeScenario === "network" && simStep > 0 && (
              <span style={{ fontSize: 10, fontWeight: 700, color: "#D84C4C", background: "#FEE2E2", padding: "2px 7px", borderRadius: 4, letterSpacing: "0.04em" }}>
                HYPOTHETICAL SIMULATION
              </span>
            )}
          </div>
          <div style={{ fontSize: 12, color: "#687588", lineHeight: 1.5 }}>{scenario.explanation}</div>
          <div style={{ fontSize: 11, color: "#687588", marginTop: 4, fontStyle: "italic" }}>{scenario.containmentReason}</div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
          {activeScenario === "network" && (
            <>
              <button
                onClick={runSimulation}
                disabled={simRunning}
                style={{
                  height: 32,
                  padding: "0 16px",
                  background: simRunning ? "#F1F5F9" : "#3157D5",
                  color: simRunning ? "#687588" : "#FFFFFF",
                  border: "none",
                  borderRadius: 7,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: simRunning ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {simRunning ? <Loader2 size={13} className="animate-spin" /> : <Play size={12} fill="currentColor" />}
                {simRunning ? "Simulating..." : "Run Propagation"}
              </button>
              {simStep > 0 && (
                <button
                  onClick={resetSim}
                  style={{
                    height: 32,
                    padding: "0 12px",
                    border: "1px solid #E3E8EF",
                    borderRadius: 7,
                    fontSize: 12,
                    color: "#687588",
                    background: "#FFFFFF",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <RotateCcw size={12} /> Reset
                </button>
              )}
              {simStep >= 5 && !showAfter && (
                <button
                  onClick={() => setShowAfter(true)}
                  style={{
                    height: 32,
                    padding: "0 12px",
                    border: "1px solid #BBF7D0",
                    borderRadius: 7,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#168568",
                    background: "#F0FDF4",
                    cursor: "pointer",
                  }}
                >
                  Show Post-Intervention
                </button>
              )}
              {showAfter && (
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#168568",
                    background: "#DCFCE7",
                    padding: "4px 10px",
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <CheckCircle2 size={14} /> Asha: restructured • Meera: reduced • Kavita: protected • Lata: unchanged
                </span>
              )}
            </>
          )}
          <button
            onClick={() => onNavigate("attribution")}
            style={{
              height: 32,
              padding: "0 12px",
              border: "1px solid #E3E8EF",
              borderRadius: 7,
              fontSize: 12,
              color: "#3157D5",
              background: "#F5F7FA",
              cursor: "pointer",
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            View Attribution <ArrowRight size={13} />
          </button>
        </div>

        {/* Propagation timeline (Day-labeled) */}
        {simStep > 0 && activeScenario === "network" && (
          <div style={{ background: "#FFFFFF", border: "1px solid #E3E8EF", borderRadius: 9, padding: "12px 16px", marginBottom: 10 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#D84C4C", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
              HYPOTHETICAL SIMULATION — Scenario B: Network / Group
            </div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {simStages.map((s) => {
                const active = s.step === simStep;
                const done = s.step < simStep;
                return (
                  <div
                    key={s.step}
                    onClick={() => {
                      if (!simRunning) setSimStep(s.step);
                    }}
                    style={{
                      flex: 1,
                      padding: "6px 8px",
                      borderRadius: 6,
                      background: active ? "#FEE2E2" : done ? "#F0FDF4" : "#F8FAFC",
                      border: `1px solid ${active ? "#D84C4C" : done ? "#BBF7D0" : "#E3E8EF"}`,
                      cursor: simRunning ? "default" : "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: active ? "#D84C4C" : done ? "#168568" : "#9CA3AF" }}>
                        {s.day}
                      </span>
                      <div
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: "50%",
                          background: active ? "#D84C4C" : done ? "#168568" : "#E3E8EF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 8,
                          color: "white",
                          fontWeight: 700,
                        }}
                      >
                        {done ? <Check size={8} strokeWidth={3} /> : s.step}
                      </div>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: active ? "#991B1B" : "#374151", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {currentStage && (
              <div style={{ marginTop: 8, padding: "7px 10px", background: "#FFF8F8", borderRadius: 6, border: "1px solid #FECACA", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#991B1B" }}>{currentStage.day}: {currentStage.label} — </span>
                  <span style={{ fontSize: 11, color: "#687588" }}>{currentStage.desc}</span>
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#6C63D9", background: "#EEF2FF", padding: "1px 6px", borderRadius: 4, flexShrink: 0, marginLeft: 8 }}>
                  {(currentStage as any)?.channel || "Propagation Pathway"}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Network Graph */}
        <div style={{ flex: 1, minHeight: 480, background: "#0d1522", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, position: "relative", width: "100%", height: "100%" }}>
            <NetworkGraph
              borrowers={g07Borrowers}
              edges={g07Edges}
              selectedId={selectedId}
              onSelect={setSelectedId}
              simStep={simStep}
              scenarioOverrides={graphOverrides}
              showAfterIntervention={showAfter}
            />
          </div>
        </div>
      </div>

      {/* ── Right sidebar ─────────────────────────────────────────────────── */}
      <div style={{ width: 320, minWidth: 320, background: "#FFFFFF", borderLeft: "1px solid #E3E8EF", display: "flex", flexDirection: "column", overflowY: "auto" }}>
        {/* Scenario summary */}
        <div style={{ padding: "16px 18px", borderBottom: "1px solid #E3E8EF" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#687588", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
            Scenario Summary
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#182230", marginBottom: 2 }}>{scenario.label}</div>
          <div style={{ fontSize: 11, color: "#687588", marginBottom: 8 }}>{scenario.trigger}</div>
          {[
            ["Primary Initiator", scenario.initiatorName],
            ["Group Stress", (scenario as any).groupStress || (scenario.containment === "Contained" ? "Low (19)" : scenario.containment === "May Spread" ? "Moderate (52)" : "High (78)")],
            ["Attribution", scenario.primaryAttribution],
            ["Containment", scenario.containment],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #F8FAFC" }}>
              <span style={{ fontSize: 11, color: "#687588" }}>{k}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: k === "Group Stress" ? "#D99A27" : "#182230" }}>{v}</span>
            </div>
          ))}
          <button
            onClick={() => onNavigate("intervention")}
            style={{
              width: "100%",
              marginTop: 10,
              padding: "7px 0",
              background: "#F5F7FA",
              border: "1px solid #E3E8EF",
              borderRadius: 8,
              fontSize: 11,
              fontWeight: 600,
              color: "#3157D5",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            Open Intervention <ArrowRight size={12} />
          </button>
        </div>

        {/* Borrower detail */}
        <div style={{ padding: "16px 18px", flex: 1 }}>
          {selected ? (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#687588", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Borrower Detail
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: "#182230", marginTop: 2 }}>{selected.name}</div>
                  <div style={{ fontSize: 10, color: "#687588" }}>{selected.id} • {selected.group}</div>
                </div>
                <button
                  onClick={() => setSelectedId(null)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#687588", padding: 4 }}
                >
                  <X size={16} />
                </button>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <Badge variant={selectedScenarioState?.status ?? selected.status} size="md" />
                {selected.isInitiator && (
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#D84C4C", background: "#FEE2E2", padding: "2px 7px", borderRadius: 99 }}>
                    Initiator
                  </span>
                )}
                {selected.id === "G07-A5" && (
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#166534", background: "#DCFCE7", padding: "2px 7px", borderRadius: 99 }}>
                    Protected
                  </span>
                )}
              </div>

              {/* In-scenario note */}
              {selectedScenarioState && (
                <div style={{ background: "#F8FAFC", borderRadius: 7, padding: "9px 11px", marginBottom: 12, fontSize: 11, color: "#374151", lineHeight: 1.5, border: "1px solid #F1F5F9" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#687588", textTransform: "uppercase", letterSpacing: "0.04em" }}>In this scenario: </span>
                  {selectedScenarioState.note}
                </div>
              )}

              {/* OBSERVED SIGNALS — clearly labeled */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#3157D5", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 7, display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ fontSize: 9, background: "#EEF2FF", color: "#3157D5", padding: "1px 5px", borderRadius: 3, border: "1px solid #C7D2FE" }}>
                    BASELINE
                  </span>
                  Observed Signals
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {[
                    { label: "Income trend", value: selected.incomeTrend.replace(/-/g, " "), icon: INCOME_ICON_COMP[selected.incomeTrend], color: INCOME_COLOR[selected.incomeTrend] },
                    { label: "Repayment pressure", value: selected.repaymentTrend.replace(/-/g, " "), icon: REPAY_ICON_COMP[selected.repaymentTrend], color: selected.repaymentTrend !== "stable" ? "#D99A27" : "#168568" },
                    { label: "Cash buffer", value: selected.cashBuffer, icon: BUFFER_ICON_COMP[selected.cashBuffer], color: selected.cashBuffer === "adequate" ? "#168568" : selected.cashBuffer === "narrowing" ? "#D99A27" : "#D84C4C" },
                    { label: "Income source", value: selected.incomeSource, icon: <Minus size={13} color="#687588" />, color: "#687588" },
                    {
                      label: "Months overdue",
                      value: `${selected.monthsMissed} month${selected.monthsMissed !== 1 ? "s" : ""}`,
                      icon: selected.monthsMissed > 0 ? <AlertTriangle size={13} color="#D84C4C" /> : <Check size={13} color="#168568" />,
                      color: selected.monthsMissed > 0 ? "#D84C4C" : "#168568",
                    },
                  ].map((row) => (
                    <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0", borderBottom: "1px solid #F8FAFC" }}>
                      <span style={{ fontSize: 11, color: "#687588" }}>{row.label}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: row.color, display: "flex", alignItems: "center", gap: 5 }}>
                        {row.icon} {row.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 9, color: "#9CA3AF", marginTop: 5, fontStyle: "italic" }}>Illustrative • not real records</div>
              </div>

              {/* NETWORK EXPOSURE — only for borrowers with connections */}
              {selectedEdges.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#6C63D9", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 7, display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ fontSize: 9, background: "#EEF2FF", color: "#6C63D9", padding: "1px 5px", borderRadius: 3, border: "1px solid #C7D2FE" }}>
                      RELATIONSHIPS
                    </span>
                    Network Exposure
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {selectedEdges.map((e) => {
                      const other = e.from === selected.id ? e.to : e.from;
                      const otherB = g07Borrowers.find((b) => b.id === other);
                      const typeColors: Record<string, string> = { "shared-guarantee": "#D84C4C", "group-lending": "#6C63D9", "common-income": "#D99A27", "local-exposure": "#64748B" };
                      return (
                        <div key={other} style={{ background: "#F8FAFC", borderRadius: 7, padding: "8px 10px", border: "1px solid #F1F5F9" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: "#182230" }}>{otherB?.name}</span>
                            <span style={{ fontSize: 10, fontWeight: 600, color: typeColors[e.type] ?? "#687588", background: "#FFFFFF", border: `1px solid ${typeColors[e.type] ?? "#E3E8EF"}`, padding: "1px 6px", borderRadius: 99 }}>
                              {e.label}
                            </span>
                          </div>
                          <div style={{ fontSize: 10, color: "#687588", lineHeight: 1.4 }}>{e.reason}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Lata callout */}
              {selected.id === "G07-A5" && (
                <div style={{ padding: "9px 11px", background: "#F0FDF4", borderRadius: 7, border: "1px solid #BBF7D0", marginBottom: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#166534", marginBottom: 2 }}>Healthy — No Intervention Required</div>
                  <div style={{ fontSize: 11, color: "#166534", lineHeight: 1.4 }}>
                    Lata's income is independent of the guarantee chain and the Zone 4 market. She must not receive punitive action based on her group membership alone.
                  </div>
                </div>
              )}

              <button
                onClick={() => onNavigate("intervention")}
                style={{
                  width: "100%",
                  marginTop: 4,
                  padding: "9px 0",
                  background: "#3157D5",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                Open Intervention <ArrowRight size={13} />
              </button>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "32px 0", color: "#687588" }}>
              <Search size={32} color="#9CA3AF" style={{ margin: "0 auto 12px", display: "block" }} />
              <div style={{ fontSize: 13, fontWeight: 500 }}>Select a borrower node</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>Click any node to view observed signals and network exposure.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
