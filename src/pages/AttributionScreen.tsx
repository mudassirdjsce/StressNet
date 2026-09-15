import { useState } from "react";
import DonutChart from "../components/ui/DonutChart";
import type { Screen, ScenarioKey } from "../utils/mock";
import { scenarios } from "../utils/mock";

interface Props {
  onNavigate: (s: Screen) => void;
}

const segmentsByScenario: Record<ScenarioKey, Array<{label: string; value: number; color: string}>> = {
  individual: [
    { label: "Individual", value: 74, color: "#0EA5E9" },
    { label: "Network",    value: 14, color: "#6C63D9" },
    { label: "External",  value: 12, color: "#F59E0B" },
  ],
  network: [
    { label: "Network",    value: 64, color: "#6C63D9" },
    { label: "Individual", value: 22, color: "#0EA5E9" },
    { label: "External",  value: 14, color: "#F59E0B" },
  ],
  external: [
    { label: "External",  value: 74, color: "#F59E0B" },
    { label: "Network",   value: 16, color: "#6C63D9" },
    { label: "Individual", value: 10, color: "#0EA5E9" },
  ],
};

const panelsByScenario: Record<ScenarioKey, Array<{key: string; pct: number; color: string; bg: string; border: string; desc: string; detail: string; dominant?: boolean}>> = {
  individual: [
    {
      key: "Individual", pct: 74, dominant: true,
      color: "#0EA5E9", bg: "#F0F9FF", border: "#BAE6FD",
      desc: "Asha's stress is concentrated in her own circumstances.",
      detail: "A personal health expense reduced Asha's income for one cycle. Meera, Kavita, Farah, and Lata are all current on repayments. No co-movement detected in the group. The stress signal is isolated to Asha.",
    },
    {
      key: "Network", pct: 14,
      color: "#6C63D9", bg: "#EEF2FF", border: "#C7D2FE",
      desc: "Low network signal — connected borrowers remain stable.",
      detail: "Despite holding a guarantee with Asha, Meera has not experienced repayment difficulty. The guarantee has not been triggered. Kavita's disbursement is unaffected. No group-level deterioration detected.",
    },
    {
      key: "External", pct: 12,
      color: "#F59E0B", bg: "#FFFBEB", border: "#FDE68A",
      desc: "Minimal external signal.",
      detail: "No regional market disruption is active in Zone 4. Farah, who shares the same market as Asha, shows stable income. The external factor is not the driver.",
    },
  ],
  network: [
    {
      key: "Individual", pct: 22,
      color: "#0EA5E9", bg: "#F0F9FF", border: "#BAE6FD",
      desc: "Some individual signals present in Asha.",
      detail: "Asha's own income and repayment record show stress, but similar stress has spread to Meera and Kavita — borrowers with direct relationship exposure. This suggests the individual signal alone cannot explain the pattern.",
    },
    {
      key: "Network", pct: 64, dominant: true,
      color: "#6C63D9", bg: "#EEF2FF", border: "#C7D2FE",
      desc: "Asha's guarantee and lending relationships are transmitting stress.",
      detail: "Dominant signal. Meera (shared guarantee with Asha) is 1 month overdue. Kavita (group lending) faces disbursement risk. The co-movement of borrowers connected to Asha — but not to each other — indicates network-driven vulnerability, not coincidence.",
    },
    {
      key: "External", pct: 14,
      color: "#F59E0B", bg: "#FFFBEB", border: "#FDE68A",
      desc: "Moderate Zone 4 market signal — not the dominant driver.",
      detail: "Farah shares Asha's market and shows early pressure, but Meera and Kavita do not share that market and are still affected. This rules out a purely external explanation for the co-movement.",
    },
  ],
  external: [
    {
      key: "Individual", pct: 10,
      color: "#0EA5E9", bg: "#F0F9FF", border: "#BAE6FD",
      desc: "Low individual signal.",
      detail: "No personal events or individual income changes have been detected for Asha or Farah beyond the market shock. Their stress onset is simultaneous and tied to the same external factor.",
    },
    {
      key: "Network", pct: 16,
      color: "#6C63D9", bg: "#EEF2FF", border: "#C7D2FE",
      desc: "Some co-movement from shared market exposure — not guarantee transmission.",
      detail: "Asha and Farah both use Zone 4 market. Their stress is simultaneous and caused by the same outside factor — not by one causing the other. Meera and Kavita, who do not use that market, remain stable. This distinguishes external shock from network propagation.",
    },
    {
      key: "External", pct: 74, dominant: true,
      color: "#F59E0B", bg: "#FFFBEB", border: "#FDE68A",
      desc: "Zone 4 market disruption is simultaneously affecting Asha and Farah.",
      detail: "Dominant signal. A supply disruption in Zone 4 has reduced income for both Asha and Farah at the same time. Neither caused the other's stress. Lata (domestic services), Meera (tailoring), and Kavita (garments) are all unaffected — confirming the shock is market-specific, not group-wide.",
    },
  ],
};

const evidenceByScenario: Record<ScenarioKey, Array<{icon: string; label: string}>> = {
  individual: [
    { icon: "👤", label: "Asha — 2 months overdue, personal health expense (simulated)" },
    { icon: "✅", label: "Meera — current on repayments; guarantee not triggered" },
    { icon: "✅", label: "Kavita — current; group disbursement unaffected" },
    { icon: "✅", label: "Farah — Zone 4 market stable; income unaffected" },
    { icon: "🟢", label: "Lata — fully stable; domestic services income" },
  ],
  network: [
    { icon: "⚠",  label: "Asha — 2 months overdue; income severely declining" },
    { icon: "🔗", label: "Meera — shared guarantee with Asha; 1 month overdue" },
    { icon: "🔗", label: "Kavita — group lending; disbursement at risk" },
    { icon: "📊", label: "Repayment co-movement: Asha + Meera + Kavita (simulated correlation: 0.71)" },
    { icon: "🟢", label: "Lata — stable; income independent; no exposure to guarantee chain" },
  ],
  external: [
    { icon: "🌾", label: "Zone 4 market disruption — supply shock, Sep 2026" },
    { icon: "💸", label: "Asha — Zone 4 seller; income down 40% (simulated)" },
    { icon: "💸", label: "Farah — Zone 4 seller; income down 35% (simulated)" },
    { icon: "✅", label: "Meera (tailoring), Kavita (garments) — different markets; unaffected" },
    { icon: "🟢", label: "Lata (domestic services) — fully unaffected by market shock" },
  ],
};

export default function AttributionScreen({ onNavigate }: Props) {
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>("network");
  const scenario  = scenarios.find(s => s.key === activeScenario)!;
  const segments  = segmentsByScenario[activeScenario];
  const panels    = panelsByScenario[activeScenario];
  const evidence  = evidenceByScenario[activeScenario];
  const dominant  = segments.reduce((a, b) => a.value > b.value ? a : b);

  return (
    <div style={{ padding: "28px 32px", overflowY: "auto", flex: 1 }}>
      {/* Header */}
      <div style={{ marginBottom: 18 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#182230", letterSpacing: "-0.02em", margin: 0 }}>Stress Attribution</h1>
        <p style={{ fontSize: 13, color: "#687588", margin: "3px 0 0" }}>
          Group G-07 · Distinguish isolated difficulty, network-caused vulnerability, and external shock. All values are simulated demonstration data.
        </p>
      </div>

      {/* Scenario selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {scenarios.map(sc => (
          <button key={sc.key} onClick={() => setActiveScenario(sc.key)} style={{
            padding: "7px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer",
            border: `1.5px solid ${activeScenario === sc.key ? "#3157D5" : "#E3E8EF"}`,
            background: activeScenario === sc.key ? "#EEF2FF" : "#FFFFFF",
            color: activeScenario === sc.key ? "#3157D5" : "#687588",
            transition: "all 0.15s",
          }}>{sc.label}</button>
        ))}
      </div>

      {/* Context bar */}
      <div style={{ background: "#FFFFFF", border: "1px solid #E3E8EF", borderRadius: 12, padding: "12px 20px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 13, color: "#687588" }}>Initiating borrower:</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#182230" }}>{scenario.initiatorName}</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#6C63D9", background: "#EEF2FF", padding: "3px 10px", borderRadius: 6 }}>Group G-07</span>
          <span style={{ fontSize: 13, fontWeight: 600, padding: "3px 10px", borderRadius: 99,
            background: scenario.containment === "Contained" ? "#DCFCE7" : scenario.containment === "May Spread" ? "#FEF3C7" : "#FEE2E2",
            color: scenario.containment === "Contained" ? "#168568" : scenario.containment === "May Spread" ? "#92400E" : "#991B1B",
          }}>{scenario.containment}</span>
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#687588", background: "#F1F5F9", padding: "3px 8px", borderRadius: 4, letterSpacing: "0.04em" }}>
          SIMULATED DATA
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 20, marginBottom: 20 }}>
        {/* Donut */}
        <div style={{ background: "#FFFFFF", border: "1px solid #E3E8EF", borderRadius: 12, padding: "24px 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#182230", marginBottom: 14, alignSelf: "flex-start" }}>Attribution Distribution</div>
          <DonutChart segments={segments} size={180} innerRadius={56} centerLabel={`${dominant.value}%`} centerSub={dominant.label} />
          <div style={{ marginTop: 18, width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
            {segments.map(s => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: s.color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: "#687588", flex: 1 }}>{s.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#182230" }}>{s.value}%</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: "8px 10px", background: "#F8FAFC", borderRadius: 7, width: "100%", fontSize: 11, color: "#687588", fontStyle: "italic" }}>
            Illustrative values — not validated probabilities
          </div>
        </div>

        {/* Attribution panels */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {panels.map(p => (
            <div key={p.key} style={{
              background: p.bg, border: `1.5px solid ${p.dominant ? p.color + "80" : p.border}`,
              borderRadius: 12, padding: "14px 18px", position: "relative",
            }}>
              {p.dominant && (
                <div style={{ position: "absolute", top: 12, right: 12, fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", background: p.color, color: "white", padding: "2px 8px", borderRadius: 99 }}>
                  DOMINANT
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#182230" }}>{p.key}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: p.color, lineHeight: 1, letterSpacing: "-0.02em" }}>{p.pct}%</div>
                </div>
                <div style={{ flex: 1, marginLeft: 8 }}>
                  <div style={{ height: 7, background: "rgba(255,255,255,0.6)", borderRadius: 99 }}>
                    <div style={{ height: "100%", width: `${p.pct}%`, background: p.color, borderRadius: 99 }} />
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#182230", margin: "0 0 3px" }}>{p.desc}</p>
              <p style={{ fontSize: 12, color: "#687588", margin: 0, lineHeight: 1.5 }}>{p.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Evidence + interpretation */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ background: "#FFFFFF", border: "1px solid #E3E8EF", borderRadius: 12, padding: "20px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#182230", marginBottom: 4 }}>Evidence Indicators</div>
          <div style={{ fontSize: 11, color: "#687588", marginBottom: 14 }}>Illustrative signals for this scenario — Simulated data</div>
          {evidence.map(e => (
            <div key={e.label} style={{ display: "flex", gap: 12, padding: "9px 12px", background: "#F8FAFC", borderRadius: 8, alignItems: "flex-start", marginBottom: 8 }}>
              <span style={{ fontSize: 15, flexShrink: 0 }}>{e.icon}</span>
              <span style={{ fontSize: 12, color: "#182230", lineHeight: 1.4 }}>{e.label}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "#FFFFFF", border: "1px solid #E3E8EF", borderRadius: 12, padding: "20px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#182230", marginBottom: 14 }}>Interpretation</div>
          <div style={{ background: "#EEF2FF", border: "1px solid #C7D2FE", borderRadius: 10, padding: "14px", marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#4338CA", lineHeight: 1.6 }}>
              "{scenario.primaryAttribution} stress is the dominant signal in this scenario."
            </div>
            <div style={{ fontSize: 12, color: "#6366F1", marginTop: 8, lineHeight: 1.5 }}>{scenario.explanation}</div>
          </div>
          <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 8, padding: "10px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#166534", marginBottom: 3 }}>Containment Assessment</div>
            <div style={{ fontSize: 12, color: "#166534", lineHeight: 1.5 }}>{scenario.containmentReason}</div>
          </div>
          <div style={{ padding: "10px 12px", background: "#FEF3C7", borderRadius: 8, border: "1px solid #FDE68A", marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400E", marginBottom: 3 }}>Disclaimer</div>
            <div style={{ fontSize: 12, color: "#B45309", lineHeight: 1.5 }}>
              All values are synthetic demonstration data. This is a conceptual framework — not validated financial analysis or proven prediction.
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => onNavigate("network")} style={{ flex: 1, padding: "9px 0", background: "#F5F7FA", color: "#3157D5", border: "1px solid #E3E8EF", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              ← Investigation
            </button>
            <button onClick={() => onNavigate("intervention")} style={{ flex: 1, padding: "9px 0", background: "#3157D5", color: "#FFFFFF", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              Intervention →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
