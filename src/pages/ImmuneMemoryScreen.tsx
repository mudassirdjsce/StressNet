import { useState } from "react";
import { historyEvents } from "../utils/mock";
import type { Screen } from "../utils/mock";

interface Props { onNavigate: (s: Screen) => void; }

export default function ImmuneMemoryScreen({ onNavigate }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(historyEvents[0].id);
  const selected = historyEvents.find(e => e.id === selectedId) ?? historyEvents[0];

  const dimLabels: Record<string, string> = {
    incomeShock:       "Income shock",
    repaymentPressure: "Repayment pressure",
    networkExposure:   "Network exposure",
    outcome:           "Outcome",
  };

  const prevColor = (val: string) => {
    if (["Low","Moderate","Recovered","Similar"].includes(val)) return "#168568";
    if (["High","Higher","Monitoring"].includes(val)) return "#D99A27";
    if (["Very High","Critical","Active"].includes(val)) return "#D84C4C";
    return "#687588";
  };
  const currColor = (val: string) => prevColor(val);

  return (
    <div style={{ padding: "28px 32px", overflowY: "auto", flex: 1 }}>
      {/* Header */}
      <div style={{ marginBottom: 18 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#182230", letterSpacing: "-0.02em", margin: 0 }}>History / Resilience Context</h1>
        <p style={{ fontSize: 13, color: "#687588", margin: "3px 0 0" }}>
          Group G-07 · Previous stress events and their outcomes. Historical recovery informs — but does not replace — current evidence.
        </p>
      </div>

      {/* Conceptual note */}
      <div style={{ background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 9, padding: "10px 16px", marginBottom: 18, fontSize: 12, color: "#B45309" }}>
        <strong>Stress Immune Memory — Conceptual feature.</strong> This is a deterministic comparison of past events to the current case. It is not a trained predictive model. All data is synthetic.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20 }}>
        {/* Event list */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#687588", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Historical Events</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {historyEvents.map(ev => (
              <div
                key={ev.id}
                onClick={() => setSelectedId(ev.id)}
                style={{
                  padding: "14px 16px", borderRadius: 10, cursor: "pointer",
                  border: `1.5px solid ${selectedId === ev.id ? "#3157D5" : "#E3E8EF"}`,
                  background: selectedId === ev.id ? "#EEF2FF" : "#FFFFFF",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: selectedId === ev.id ? "#3157D5" : "#182230" }}>{ev.type}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: ev.outcome === "Recovered" ? "#168568" : "#D84C4C", background: ev.outcome === "Recovered" ? "#DCFCE7" : "#FEE2E2", padding: "1px 7px", borderRadius: 99 }}>{ev.outcome}</span>
                </div>
                <div style={{ fontSize: 11, color: "#687588" }}>{ev.year} · Group {ev.group} · {ev.borrower}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                  <div style={{ fontSize: 10, color: "#687588" }}>Similarity</div>
                  <div style={{ flex: 1, height: 4, background: "#F1F5F9", borderRadius: 99 }}>
                    <div style={{ height: "100%", width: `${ev.similarity}%`, background: ev.similarity > 80 ? "#D84C4C" : "#D99A27", borderRadius: 99 }} />
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: ev.similarity > 80 ? "#D84C4C" : "#D99A27" }}>{ev.similarity}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event detail + comparison */}
        <div>
          <div style={{ background: "#FFFFFF", border: "1px solid #E3E8EF", borderRadius: 12, padding: "20px", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#182230" }}>{selected.type}</div>
              <div style={{ fontSize: 12, color: "#687588" }}>{selected.year} · {selected.duration} · Group {selected.group}</div>
            </div>
            <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, margin: "0 0 12px" }}>{selected.details}</p>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ padding: "7px 12px", background: "#F8FAFC", borderRadius: 7, fontSize: 12 }}>
                <span style={{ color: "#687588" }}>Outcome: </span>
                <span style={{ fontWeight: 700, color: selected.outcome === "Recovered" ? "#168568" : "#D84C4C" }}>{selected.outcome}</span>
              </div>
              <div style={{ padding: "7px 12px", background: "#F8FAFC", borderRadius: 7, fontSize: 12 }}>
                <span style={{ color: "#687588" }}>Duration: </span>
                <span style={{ fontWeight: 700, color: "#182230" }}>{selected.duration}</span>
              </div>
              <div style={{ padding: "7px 12px", background: "#F8FAFC", borderRadius: 7, fontSize: 12 }}>
                <span style={{ color: "#687588" }}>Similarity: </span>
                <span style={{ fontWeight: 700, color: selected.similarity > 80 ? "#D84C4C" : "#D99A27" }}>{selected.similarity}%</span>
              </div>
            </div>
          </div>

          {/* ── PREVIOUS vs CURRENT COMPARISON TABLE (spec §26) ── */}
          <div style={{ background: "#FFFFFF", border: "1px solid #E3E8EF", borderRadius: 12, padding: "20px", marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#182230", marginBottom: 4 }}>Previous vs Current Comparison</div>
            <div style={{ fontSize: 11, color: "#687588", marginBottom: 14 }}>
              How the current event differs from the historical case — Simulated comparison, not algorithmic prediction
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Dimension", "Previous Event", "Current Case"].map(h => (
                    <th key={h} style={{ fontSize: 10, fontWeight: 700, color: "#687588", textAlign: "left", padding: "7px 10px", borderBottom: "1px solid #E3E8EF", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(selected.comparison).map(([key, vals], i) => (
                  <tr key={key} style={{ background: i % 2 === 0 ? "#FAFAFA" : "#FFFFFF" }}>
                    <td style={{ padding: "9px 10px", fontSize: 12, fontWeight: 600, color: "#374151" }}>{dimLabels[key]}</td>
                    <td style={{ padding: "9px 10px" }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: prevColor(vals.previous) }}>{vals.previous}</span>
                    </td>
                    <td style={{ padding: "9px 10px" }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: currColor(vals.current) }}>{vals.current}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: 14, padding: "12px 14px", background: "#EEF2FF", borderRadius: 8, border: "1px solid #C7D2FE" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#4338CA", marginBottom: 4 }}>Interpretation</div>
              <div style={{ fontSize: 12, color: "#6366F1", lineHeight: 1.5 }}>
                Historical recovery is encouraging — Group G-07 has resolved similar income shocks before. However, the current event has materially higher network exposure (active guarantee chain and group lending pressure). History changes context; it does not erase current evidence. Targeted support remains necessary.
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => onNavigate("intervention")} style={{ padding: "9px 18px", background: "#F5F7FA", border: "1px solid #E3E8EF", borderRadius: 8, fontSize: 12, fontWeight: 600, color: "#3157D5", cursor: "pointer" }}>
              ← Intervention
            </button>
            <button onClick={() => onNavigate("passport")} style={{ padding: "9px 18px", background: "#3157D5", color: "white", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              View Passport →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
