import NetworkGraph from "../components/ui/NetworkGraph";
import Badge from "../components/ui/Badge";
import { g07Borrowers, g07Edges, backgroundGroups } from "../utils/mock";
import type { Screen } from "../utils/mock";

interface Props {
  onNavigate: (s: Screen) => void;
  interventionDone: boolean;
}

export default function DashboardScreen({ onNavigate, interventionDone }: Props) {
  const asha = g07Borrowers.find(b => b.id === "G07-A1")!;

  return (
    <div style={{ padding: "28px 32px", overflowY: "auto", flex: 1 }}>

      {/* Intervention done banner */}
      {interventionDone && (
        <div style={{ background: "#F0FDF4", border: "1.5px solid #BBF7D0", borderRadius: 10, padding: "11px 16px", marginBottom: 18, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#168568" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#168568" }}>Intervention initiated — Asha, Meera, Kavita (Group G-07)</span>
            <span style={{ fontSize: 12, color: "#687588" }}>Lata remains unchanged. Passport updated.</span>
          </div>
          <button onClick={() => onNavigate("passport")} style={{ fontSize: 12, fontWeight: 600, color: "#3157D5", background: "none", border: "none", cursor: "pointer" }}>View Passport →</button>
        </div>
      )}

      {/* Group header */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#182230", letterSpacing: "-0.02em", margin: 0 }}>Group G-07</h1>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#D99A27", background: "#FEF3C7", padding: "3px 10px", borderRadius: 99 }}>5 borrowers · 4 stable · 1 emerging concern</span>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#687588", background: "#F1F5F9", border: "1px solid #E3E8EF", padding: "2px 8px", borderRadius: 4, letterSpacing: "0.05em", marginLeft: "auto" }}>SYNTHETIC DEMO DATA</span>
      </div>
      <p style={{ fontSize: 13, color: "#687588", margin: "0 0 20px", lineHeight: 1.5 }}>
        This group looks broadly healthy overall. One borrower — Asha — is showing an emerging stress signal.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20, marginBottom: 20 }}>
        {/* Graph */}
        <div style={{ background: "#FFFFFF", border: "1px solid #E3E8EF", borderRadius: 12, padding: "20px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#182230" }}>Group Relationship Network</div>
              <div style={{ fontSize: 12, color: "#687588", marginTop: 2 }}>5 borrowers · Asha is the initiating stress signal</div>
            </div>
            <button onClick={() => onNavigate("network")} style={{ fontSize: 12, fontWeight: 600, color: "#3157D5", background: "none", border: "none", cursor: "pointer" }}>Investigate →</button>
          </div>
          <div style={{ height: 300, flex: 1 }}>
            <NetworkGraph
              borrowers={g07Borrowers}
              edges={g07Edges}
              selectedId={null}
              onSelect={() => onNavigate("network")}
              simStep={0}
              compact={true}
            />
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Asha alert card — per spec §10 */}
          <div style={{ background: "#FFF8F8", border: "1.5px solid #FECACA", borderRadius: 12, padding: "16px 18px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#D84C4C", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Emerging Stress — Asha</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#182230" }}>Asha</span>
              <Badge variant="Critical" size="sm" />
              <span style={{ fontSize: 10, fontWeight: 700, color: "#D84C4C", background: "#FEE2E2", padding: "1px 6px", borderRadius: 99 }}>Initiator</span>
            </div>

            {/* Observed signals — spec §10 */}
            <div style={{ fontSize: 10, fontWeight: 700, color: "#687588", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Observed Signals</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
              {[
                { label: "Income trend",       value: "↓↓ Severely declining",  color: "#D84C4C" },
                { label: "Repayment pressure", value: "↑↑ Critical pressure",   color: "#D84C4C" },
                { label: "Cash buffer",        value: "⚠  Depleted",            color: "#D84C4C" },
              ].map(s => (
                <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 8px", background: "#FFF0F0", borderRadius: 6 }}>
                  <span style={{ fontSize: 11, color: "#687588" }}>{s.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 11, fontWeight: 600, color: "#991B1B", marginBottom: 10, fontStyle: "italic" }}>
              Is Asha's problem contained, or could the group be vulnerable?
            </div>

            <button onClick={() => onNavigate("network")} style={{ width: "100%", padding: "10px 0", background: "#D84C4C", color: "white", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
              Investigate Asha's Stress →
            </button>
          </div>

          {/* Member status list */}
          <div style={{ background: "#FFFFFF", border: "1px solid #E3E8EF", borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#182230", marginBottom: 10 }}>All Members — G-07</div>
            {g07Borrowers.map(b => (
              <div key={b.id} onClick={() => onNavigate("network")}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: "1px solid #F8FAFC", cursor: "pointer" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                <div style={{ width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
                  background: b.status === "Critical" ? "#D84C4C" : b.status === "Watch" ? "#D99A27" : "#168568" }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "#182230", flex: 1 }}>{b.name}</span>
                {b.isInitiator && <span style={{ fontSize: 9, fontWeight: 700, color: "#D84C4C", background: "#FEE2E2", padding: "1px 5px", borderRadius: 99 }}>Initiator</span>}
                <Badge variant={b.status} size="sm" />
              </div>
            ))}
          </div>

          {/* Primary CTA */}
          <button onClick={() => onNavigate("network")} style={{
            width: "100%", padding: "13px 0",
            background: "#3157D5", color: "white",
            border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer",
          }}>
            Investigate Emerging Stress →
          </button>
        </div>
      </div>

      {/* Secondary: portfolio context */}
      <div style={{ background: "#FFFFFF", border: "1px solid #E3E8EF", borderRadius: 12, padding: "18px 20px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#182230", marginBottom: 3 }}>Portfolio Context</div>
        <div style={{ fontSize: 11, color: "#687588", marginBottom: 12 }}>Other monitored groups — secondary context · Synthetic data · Not the focus of this demo</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {backgroundGroups.map(g => (
            <div key={g.id} style={{ padding: "12px 14px", background: "#F8FAFC", borderRadius: 8, border: "1px solid #F1F5F9" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: g.color }}>{g.id}</span>
                <span style={{ fontSize: 11, color: g.stress === "Elevated" ? "#D99A27" : "#168568", fontWeight: 600 }}>{g.stress}</span>
              </div>
              <div style={{ fontSize: 11, color: "#687588" }}>{g.members} members · Propagation risk: {g.propagationRisk}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
