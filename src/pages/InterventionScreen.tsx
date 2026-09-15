import { useState } from "react";
import Badge from "../components/ui/Badge";
import { interventionCases } from "../utils/mock";
import type { Screen } from "../utils/mock";
import { CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

interface Props {
  onNavigate: (s: Screen) => void;
  onConfirmIntervention: (caseId: string, optionLabel: string) => void;
  caseStatuses: Record<string, string>;
  interventionDone: boolean;
}

type OptionKey = "targeted" | "broad";

const interventionTypes = [
  { id: "checkin", label: "Individual Check-in", desc: "Recommended when stress appears borrower-specific. Field officer visit for Asha only." },
  { id: "flex", label: "Repayment Flexibility", desc: "Short-term repayment adjustment for Asha. Appropriate for cash-flow pressure without network spread." },
  { id: "targeted", label: "Targeted Group Support", desc: "Support for Asha + Meera + Kavita — the three members with documented exposure. Lata is excluded." },
  { id: "external", label: "External Shock Response", desc: "Used when a common external factor is driving stress. Focus on market-affected members." },
];

export default function InterventionScreen({ onNavigate, onConfirmIntervention, caseStatuses: _caseStatuses, interventionDone }: Props) {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("targeted");
  const [comparisonMode, setComparisonMode] = useState<OptionKey>("targeted");
  const [confirmed, setConfirmed] = useState(false);

  const ic = interventionCases[0];

  const handleConfirm = () => {
    const label = interventionTypes.find(o => o.id === selectedOption)?.label ?? selectedOption;
    onConfirmIntervention(ic.id, label);
    setConfirmed(true);
  };

  const afterRows = comparisonMode === "targeted" ? ic.afterTargeted : ic.afterBroad;

  return (
    <div style={{ padding: "28px 32px", overflowY: "auto", flex: 1 }}>
      {/* Header */}
      <div style={{ marginBottom: 18 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#182230", letterSpacing: "-0.02em", margin: 0 }}>Targeted Response</h1>
        <p style={{ fontSize: 13, color: "#687588", margin: "3px 0 0" }}>
          Group G-07 • Compare broad and targeted intervention and select the least-disruptive support action. All values simulated.
        </p>
      </div>

      {/* Case summary row */}
      <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
        {/* Primary case card */}
        <div style={{ flex: 1, background: "#FFFFFF", border: "1.5px solid #FECACA", borderRadius: 12, padding: "18px 22px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#D84C4C", background: "#FEE2E2", padding: "2px 8px", borderRadius: 4, letterSpacing: "0.04em" }}>
                  PRIORITY: CRITICAL
                </span>
                <Badge variant="Network" size="sm" />
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#182230" }}>{ic.id} — Group {ic.group}</div>
              <div style={{ fontSize: 12, color: "#687588", marginTop: 3 }}>{ic.description}</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#687588", background: "#F8FAFC", padding: "3px 8px", borderRadius: 4, border: "1px solid #E3E8EF", whiteSpace: "nowrap" }}>
              Officer: {ic.officer}
            </span>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1, padding: "10px 14px", background: "#FEE2E2", borderRadius: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#991B1B", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                Potentially Exposed
              </div>
              {ic.affectedBorrowers.map(n => (
                <div key={n} style={{ fontSize: 12, color: "#991B1B" }}>• {n}</div>
              ))}
            </div>
            <div style={{ flex: 1, padding: "10px 14px", background: "#DCFCE7", borderRadius: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#166534", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                Healthy — No Intervention
              </div>
              {ic.healthyBorrowers.map(n => (
                <div key={n} style={{ fontSize: 12, color: "#166534", display: "flex", alignItems: "center", gap: 6 }}>
                  <CheckCircle2 size={13} /> {n}
                </div>
              ))}
            </div>
          </div>
          {!reviewOpen && (
            <button
              onClick={() => setReviewOpen(true)}
              style={{
                width: "100%",
                marginTop: 12,
                padding: "9px 0",
                background: "#3157D5",
                color: "white",
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
              Review Intervention <ArrowRight size={13} />
            </button>
          )}
        </div>

        {/* Secondary cases */}
        <div style={{ width: 220, display: "flex", flexDirection: "column", gap: 10 }}>
          {interventionCases.slice(1).map(c => (
            <div key={c.id} style={{ background: "#FFFFFF", border: "1px solid #E3E8EF", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#182230", marginBottom: 3 }}>{c.id}</div>
              <div style={{ fontSize: 11, color: "#687588", marginBottom: 6 }}>Group {c.group} • {c.attribution}</div>
              <Badge variant={c.status === "Resolved" ? "Healthy" : "Watch"} size="sm" label={c.status} />
            </div>
          ))}
          <div style={{ padding: "10px 14px", background: "#F8FAFC", borderRadius: 8, border: "1px solid #F1F5F9" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#687588", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 3 }}>Portfolio</div>
            <div style={{ fontSize: 11, color: "#687588" }}>4 groups monitored</div>
            <div style={{ fontSize: 11, color: "#687588" }}>2 interventions pending</div>
          </div>
        </div>
      </div>

      {/* Intervention review panel */}
      {reviewOpen && !confirmed && (
        <div style={{ background: "#FFFFFF", border: "1px solid #E3E8EF", borderRadius: 12, padding: "24px", marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#182230", marginBottom: 16 }}>Select Intervention Type</div>

          {/* Option selector */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            {interventionTypes.map(opt => (
              <div
                key={opt.id}
                onClick={() => setSelectedOption(opt.id)}
                style={{
                  padding: "12px 14px",
                  borderRadius: 9,
                  cursor: "pointer",
                  border: `2px solid ${selectedOption === opt.id ? "#3157D5" : "#E3E8EF"}`,
                  background: selectedOption === opt.id ? "#EEF2FF" : "#FAFAFA",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, color: selectedOption === opt.id ? "#3157D5" : "#182230", marginBottom: 4 }}>
                  {opt.label}
                </div>
                <div style={{ fontSize: 11, color: "#687588", lineHeight: 1.4 }}>{opt.desc}</div>
              </div>
            ))}
          </div>

          {/* ── BROAD vs TARGETED COMPARISON ── */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#182230", marginBottom: 8 }}>
              Compare Responses
              <span style={{ fontSize: 11, fontWeight: 400, color: "#687588", marginLeft: 8 }}>— Core Decision Criteria</span>
            </div>

            {/* Toggle */}
            <div style={{ display: "flex", gap: 0, marginBottom: 14, border: "1px solid #E3E8EF", borderRadius: 8, overflow: "hidden", width: "fit-content" }}>
              {([["targeted", "Option B — Targeted (Recommended)"], ["broad", "Option A — Broad Response"]] as [OptionKey, string][]).map(([key, lbl]) => (
                <button
                  key={key}
                  onClick={() => setComparisonMode(key)}
                  style={{
                    padding: "7px 18px",
                    fontSize: 12,
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    background: comparisonMode === key ? (key === "targeted" ? "#168568" : "#D84C4C") : "#F8FAFC",
                    color: comparisonMode === key ? "white" : "#687588",
                    transition: "background 0.15s",
                  }}
                >
                  {lbl}
                </button>
              ))}
            </div>

            {/* Side-by-side label explanation */}
            {comparisonMode === "broad" && (
              <div style={{ padding: "10px 14px", background: "#FEE2E2", borderRadius: 7, border: "1px solid #FECACA", fontSize: 12, color: "#991B1B", marginBottom: 12, display: "flex", alignItems: "flex-start", gap: 8 }}>
                <AlertTriangle size={16} color="#991B1B" style={{ flexShrink: 0, marginTop: 1 }} />
                <div>
                  <strong>Option A — Broad:</strong> Flags or monitors the entire group, potentially penalizing Lata who has no documented exposure. This is an unjustified response.
                </div>
              </div>
            )}
            {comparisonMode === "targeted" && (
              <div style={{ padding: "10px 14px", background: "#DCFCE7", borderRadius: 7, border: "1px solid #BBF7D0", fontSize: 12, color: "#166534", marginBottom: 12, display: "flex", alignItems: "flex-start", gap: 8 }}>
                <CheckCircle2 size={16} color="#166534" style={{ flexShrink: 0, marginTop: 1 }} />
                <div>
                  <strong>Option B — Targeted:</strong> Supports Asha, Meera, and Kavita — the members with documented exposure. Lata remains untouched. This is the optimal approach.
                </div>
              </div>
            )}

            {/* Before / After table */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {/* Before */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#687588", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
                  Before Intervention
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {["Member", "State", "Note"].map(h => (
                        <th key={h} style={{ fontSize: 10, fontWeight: 700, color: "#687588", textAlign: "left", padding: "5px 8px", borderBottom: "1px solid #E3E8EF", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ic.beforeState.map((row, i) => (
                      <tr key={row.name} style={{ background: i % 2 === 0 ? "#FAFAFA" : "#FFFFFF" }}>
                        <td style={{ padding: "6px 8px", fontSize: 12, fontWeight: 600, color: "#182230" }}>{row.name}</td>
                        <td style={{ padding: "6px 8px" }}><Badge variant={row.status} size="sm" /></td>
                        <td style={{ padding: "6px 8px", fontSize: 11, color: "#687588", lineHeight: 1.3 }}>{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* After */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: comparisonMode === "targeted" ? "#166534" : "#991B1B", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
                  After {comparisonMode === "targeted" ? "Targeted" : "Broad"} Response
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {["Member", "State", "Action"].map(h => (
                        <th key={h} style={{ fontSize: 10, fontWeight: 700, color: "#687588", textAlign: "left", padding: "5px 8px", borderBottom: "1px solid #E3E8EF", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {afterRows.map((row, i) => {
                      const isLata = row.name === "Lata";
                      const rowBg = isLata ? (comparisonMode === "broad" ? "#FFF1F1" : "#F0FDF4") : (i % 2 === 0 ? "#FAFAFA" : "#FFFFFF");
                      return (
                        <tr key={row.name} style={{ background: rowBg }}>
                          <td style={{ padding: "6px 8px", fontSize: 12, fontWeight: 600, color: "#182230" }}>{row.name}</td>
                          <td style={{ padding: "6px 8px" }}><Badge variant={row.status} size="sm" /></td>
                          <td style={{ padding: "6px 8px", fontSize: 11, color: isLata && comparisonMode === "broad" ? "#991B1B" : "#687588", lineHeight: 1.3 }}>{row.action}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {comparisonMode === "targeted" && (
                  <div style={{ marginTop: 8, padding: "7px 10px", background: "#DCFCE7", borderRadius: 6, fontSize: 11, color: "#166534", border: "1px solid #BBF7D0", display: "flex", alignItems: "center", gap: 6 }}>
                    <CheckCircle2 size={13} color="#166534" /> <strong>Healthy member protected:</strong> Lata is unchanged.
                  </div>
                )}
                {comparisonMode === "broad" && (
                  <div style={{ marginTop: 8, padding: "7px 10px", background: "#FEE2E2", borderRadius: 6, fontSize: 11, color: "#991B1B", border: "1px solid #FECACA", display: "flex", alignItems: "center", gap: 6 }}>
                    <AlertTriangle size={13} color="#991B1B" /> <strong>Unnecessary penalty:</strong> Lata is flagged despite having no exposure.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Confirm */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={handleConfirm}
              style={{
                padding: "10px 28px",
                background: "#168568",
                color: "white",
                border: "none",
                borderRadius: 9,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <CheckCircle2 size={15} /> Confirm Simulated Intervention
            </button>
            <span style={{ fontSize: 11, color: "#9CA3AF", fontStyle: "italic" }}>
              Simulated workflow only — no real lending actions are applied
            </span>
          </div>
        </div>
      )}

      {/* Confirmation state */}
      {(confirmed || interventionDone) && (
        <div style={{ background: "#F0FDF4", border: "1.5px solid #BBF7D0", borderRadius: 12, padding: "20px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <CheckCircle2 size={20} color="#168568" />
            <span style={{ fontSize: 14, fontWeight: 700, color: "#168568" }}>Intervention Initiated — Simulated</span>
          </div>
          <div style={{ fontSize: 13, color: "#166534", marginBottom: 10 }}>
            Targeted support initiated for Asha, Meera, and Kavita. <strong>Lata remains unchanged</strong> — no intervention applied to the healthy member.
          </div>
          <div style={{ padding: "9px 12px", background: "#FFFFFF", borderRadius: 8, border: "1px solid #BBF7D0", fontSize: 11, color: "#687588", marginBottom: 12 }}>
            This is a simulated workflow. No real borrower actions, repayments, or lending decisions have been made.
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => onNavigate("immune-memory")}
              style={{
                padding: "8px 18px",
                background: "#F5F7FA",
                border: "1px solid #E3E8EF",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                color: "#3157D5",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              View History <ArrowRight size={13} />
            </button>
            <button
              onClick={() => onNavigate("passport")}
              style={{
                padding: "8px 18px",
                background: "#3157D5",
                color: "white",
                border: "none",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              View Stress Passport <ArrowRight size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
