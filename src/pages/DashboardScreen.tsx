import NetworkGraph from "../components/ui/NetworkGraph";
import Badge from "../components/ui/Badge";
import { g07Borrowers, g07Edges, backgroundGroups } from "../utils/mock";
import type { Screen } from "../utils/mock";
import { CheckCircle2, ArrowRight, TrendingDown, TrendingUp, AlertCircle, Activity, Shield, Users, AlertTriangle } from "lucide-react";

interface Props {
  onNavigate: (s: Screen) => void;
  interventionDone: boolean;
}

/* ── Inline style helpers ─────────────────────────────────────── */

const mono: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontVariantNumeric: "tabular-nums",
};

const cardBase: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #E3E8EF",
  borderRadius: 10,
};

const sectionLabel: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  color: "#94A3B8",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  ...mono,
};

export default function DashboardScreen({ onNavigate, interventionDone }: Props) {
  const kpis = [
    {
      label: "STRESS SCORE",
      value: "78",
      sub: "/ 100",
      accent: "#EF4444",
      icon: <Activity size={15} color="#EF4444" />,
      detail: "Severe — immediate attention",
    },
    {
      label: "PROPAGATION RISK",
      value: "63",
      sub: "%",
      accent: "#EAB308",
      icon: <AlertTriangle size={15} color="#EAB308" />,
      detail: "3 connected borrowers exposed",
    },
    {
      label: "MEMBERS AT RISK",
      value: "3",
      sub: "/ 5",
      accent: "#F97316",
      icon: <Users size={15} color="#F97316" />,
      detail: "Asha, Meera, Kavita",
    },
    {
      label: "CONTAINMENT",
      value: "May Spread",
      sub: "",
      accent: "#EAB308",
      icon: <Shield size={15} color="#EAB308" />,
      detail: "Network pathways active",
    },
  ];

  return (
    <div style={{ padding: "24px 28px", overflowY: "auto", flex: 1 }}>
      {/* Intervention done banner */}
      {interventionDone && (
        <div
          style={{
            background: "#F0FDF4",
            border: "1px solid #BBF7D0",
            borderRadius: 8,
            padding: "10px 16px",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <CheckCircle2 size={15} color="#168568" />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#168568" }}>
              Intervention initiated — Asha, Meera, Kavita (Group G-07)
            </span>
            <span style={{ fontSize: 12, color: "#687588" }}>Lata remains unchanged. Passport updated.</span>
          </div>
          <button
            onClick={() => onNavigate("passport")}
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#3157D5",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            View Passport <ArrowRight size={13} />
          </button>
        </div>
      )}

      {/* ── Group Header ──────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 4 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0F172A", letterSpacing: "-0.025em", margin: 0 }}>
          Group G-07
        </h1>
        <span style={{
          fontSize: 12,
          fontWeight: 600,
          color: "#92400E",
          background: "rgba(234,179,8,0.1)",
          border: "1px solid rgba(234,179,8,0.2)",
          padding: "3px 10px",
          borderRadius: 4,
          ...mono,
        }}>
          5 members · 4 stable · 1 emerging concern
        </span>
      </div>
      <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 20px", lineHeight: 1.5 }}>
        This group looks broadly healthy overall. One borrower — Asha — is showing an emerging stress signal.
      </p>

      {/* ── KPI Strip ─────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {kpis.map((kpi, i) => (
          <div
            key={kpi.label}
            style={{
              ...cardBase,
              padding: "16px 18px",
              position: "relative",
              overflow: "hidden",
              animation: `kpi-enter 0.3s ease-out ${i * 0.06}s both`,
            }}
          >
            {/* Top accent line */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: kpi.accent, opacity: 0.6,
            }} />
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
              {kpi.icon}
              <span style={{ ...sectionLabel, color: "#64748B" }}>{kpi.label}</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 4 }}>
              <span style={{
                fontSize: kpi.label === "CONTAINMENT" ? 18 : 28,
                fontWeight: 700,
                color: kpi.accent,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                ...mono,
              }}>
                {kpi.value}
              </span>
              {kpi.sub && (
                <span style={{ fontSize: 14, color: "#94A3B8", fontWeight: 500, ...mono }}>{kpi.sub}</span>
              )}
            </div>
            <span style={{ fontSize: 11, color: "#94A3B8" }}>{kpi.detail}</span>
          </div>
        ))}
      </div>

      {/* ── Main Content Grid ─────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16, marginBottom: 20 }}>
        {/* Network Graph Card - Full radar telemetry view matching attached image */}
        <div
          style={{
            background: "#0d1522",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 10,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.18)",
            height: "100%",
          }}
        >
          <div style={{ flex: 1, width: "100%", height: "100%", minHeight: 520, display: "flex" }}>
            <NetworkGraph
              borrowers={g07Borrowers}
              edges={g07Edges}
              selectedId={null}
              onSelect={() => onNavigate("network")}
              simStep={0}
              compact={true}
              onInvestigate={() => onNavigate("network")}
            />
          </div>
        </div>

        {/* ── Right Column ─────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Asha Alert Card */}
          <div style={{
            ...cardBase,
            borderColor: "rgba(239,68,68,0.2)",
            padding: "16px 18px",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Left accent */}
            <div style={{
              position: "absolute", top: 0, left: 0, bottom: 0, width: 3,
              background: "#EF4444", borderRadius: "10px 0 0 10px",
            }} />

            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
              <span style={{ ...sectionLabel, color: "#DC2626" }}>EMERGING STRESS</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}>Asha</span>
              <Badge variant="Critical" size="sm" />
              <span style={{
                fontSize: 9,
                fontWeight: 700,
                color: "#DC2626",
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.15)",
                padding: "2px 6px",
                borderRadius: 3,
                ...mono,
              }}>
                INITIATOR
              </span>
            </div>

            {/* Observed signals */}
            <div style={{ ...sectionLabel, marginBottom: 8 }}>OBSERVED SIGNALS</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 14 }}>
              {[
                { label: "Income trend", value: "Severely declining", icon: <TrendingDown size={12} color="#EF4444" />, color: "#EF4444" },
                { label: "Repayment pressure", value: "Critical", icon: <TrendingUp size={12} color="#EF4444" />, color: "#EF4444" },
                { label: "Cash buffer", value: "Depleted", icon: <AlertCircle size={12} color="#EF4444" />, color: "#EF4444" },
              ].map((s) => (
                <div key={s.label} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "6px 10px",
                  background: "#FAFBFC",
                  borderRadius: 5,
                  border: "1px solid #F1F5F9",
                }}>
                  <span style={{ fontSize: 11, color: "#64748B" }}>{s.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: s.color, display: "flex", alignItems: "center", gap: 4, ...mono }}>
                    {s.icon} {s.value}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 11, fontWeight: 500, color: "#64748B", marginBottom: 12, fontStyle: "italic", lineHeight: 1.5 }}>
              Is Asha's problem contained, or could the group be vulnerable?
            </div>

            <button
              onClick={() => onNavigate("network")}
              style={{
                width: "100%",
                padding: "9px 0",
                background: "#DC2626",
                color: "white",
                border: "none",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#B91C1C")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#DC2626")}
            >
              Investigate Stress <ArrowRight size={13} />
            </button>
          </div>

          {/* ── Member Status Table ─────────────────────── */}
          <div style={{ ...cardBase, padding: "14px 16px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 10 }}>All Members</div>

            {/* Table header */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 80px 60px",
              padding: "4px 8px",
              marginBottom: 2,
            }}>
              <span style={{ ...sectionLabel, fontSize: 9 }}>NAME</span>
              <span style={{ ...sectionLabel, fontSize: 9, textAlign: "center" }}>STATUS</span>
              <span style={{ ...sectionLabel, fontSize: 9, textAlign: "right" }}>SCORE</span>
            </div>

            {g07Borrowers.map((b, i) => (
              <div
                key={b.id}
                onClick={() => onNavigate("network")}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 80px 60px",
                  alignItems: "center",
                  padding: "7px 8px",
                  background: i % 2 === 0 ? "#FAFBFC" : "transparent",
                  borderRadius: 4,
                  cursor: "pointer",
                  transition: "background 0.12s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#F1F5F9")}
                onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? "#FAFBFC" : "transparent")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: b.status === "Critical" ? "#EF4444" : b.status === "Watch" ? "#EAB308" : "#22C55E",
                    }}
                  />
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#0F172A" }}>{b.name}</span>
                  {b.isInitiator && (
                    <span style={{
                      fontSize: 8,
                      fontWeight: 700,
                      color: "#DC2626",
                      background: "rgba(239,68,68,0.06)",
                      border: "1px solid rgba(239,68,68,0.12)",
                      padding: "1px 4px",
                      borderRadius: 2,
                      ...mono,
                    }}>
                      INIT
                    </span>
                  )}
                </div>
                <div style={{ textAlign: "center" }}>
                  <Badge variant={b.status} size="sm" />
                </div>
                <div style={{
                  textAlign: "right",
                  fontSize: 12,
                  fontWeight: 600,
                  color: b.stressScore >= 60 ? "#EF4444" : b.stressScore >= 40 ? "#EAB308" : "#22C55E",
                  ...mono,
                }}>
                  {b.stressScore}
                </div>
              </div>
            ))}
          </div>

          {/* Primary CTA */}
          <button
            onClick={() => onNavigate("network")}
            style={{
              width: "100%",
              padding: "12px 0",
              background: "#0F172A",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              transition: "background 0.15s",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#1E293B")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#0F172A")}
          >
            Investigate Emerging Stress <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* ── Portfolio Context ──────────────────────────────── */}
      <div style={{ ...cardBase, padding: "16px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>Portfolio Context</div>
            <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 1 }}>
              Other monitored groups — secondary context
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {backgroundGroups.map((g) => (
            <div key={g.id} style={{
              padding: "14px 16px",
              background: "#FAFBFC",
              borderRadius: 8,
              border: "1px solid #F1F5F9",
              transition: "border-color 0.15s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", ...mono }}>{g.id}</span>
                <span style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: g.stress === "Elevated" ? "#92400E" : "#166534",
                  background: g.stress === "Elevated" ? "rgba(234,179,8,0.1)" : "rgba(34,197,94,0.08)",
                  border: `1px solid ${g.stress === "Elevated" ? "rgba(234,179,8,0.2)" : "rgba(34,197,94,0.15)"}`,
                  padding: "2px 8px",
                  borderRadius: 3,
                  ...mono,
                }}>
                  {g.stress}
                </span>
              </div>
              <div style={{ fontSize: 11, color: "#64748B", marginBottom: 8 }}>
                {g.members} members
              </div>
              {/* Propagation risk bar */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 10, color: "#94A3B8", minWidth: 80, ...mono }}>Propagation</span>
                <div style={{ flex: 1, height: 4, background: "#F1F5F9", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{
                    width: `${g.propagationRisk}%`,
                    height: "100%",
                    background: g.propagationRisk > 30 ? "#EAB308" : "#22C55E",
                    borderRadius: 99,
                    transition: "width 0.6s ease-out",
                  }} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, color: "#64748B", minWidth: 28, textAlign: "right", ...mono }}>
                  {g.propagationRisk}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
