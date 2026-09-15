import { X, Building2, ShieldCheck, User, Users, FileBadge, CheckCircle, ExternalLink } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function InstitutionModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 620,
          background: "#FFFFFF",
          borderRadius: 16,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
          border: "1px solid #E3E8EF",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #E3E8EF",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#14243A",
            color: "#FFFFFF",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "#3157D5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Building2 size={22} color="#FFFFFF" />
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em" }}>
                MicroFinance Alliance (MFA)
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>
                Institution Profile & Regulatory Authorization
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "none",
              borderRadius: 8,
              padding: 6,
              cursor: "pointer",
              color: "rgba(255,255,255,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              e.currentTarget.style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: "24px", maxHeight: "75vh", overflowY: "auto" }}>
          {/* Institutional Status Banner */}
          <div
            style={{
              background: "#F0FDF4",
              border: "1px solid #BBF7D0",
              borderRadius: 10,
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <ShieldCheck size={18} color="#168568" />
              <div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#166534" }}>
                  Active License • NBFC-MFI Class A-1
                </span>
                <span style={{ fontSize: 12, color: "#168568", marginLeft: 8 }}>
                  Reg: MFA-2024-001 • Good Standing
                </span>
              </div>
            </div>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                background: "#DCFCE7",
                color: "#166534",
                padding: "3px 8px",
                borderRadius: 99,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Audited
            </span>
          </div>

          {/* Key Metric Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
              marginBottom: 24,
            }}
          >
            <div style={{ padding: 14, background: "#F8FAFC", borderRadius: 10, border: "1px solid #E3E8EF" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#687588", fontSize: 11, marginBottom: 6 }}>
                <Users size={14} /> Active Portfolio
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#182230" }}>1,420</div>
              <div style={{ fontSize: 11, color: "#687588", marginTop: 2 }}>Borrowers (284 Groups)</div>
            </div>

            <div style={{ padding: 14, background: "#F8FAFC", borderRadius: 10, border: "1px solid #E3E8EF" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#687588", fontSize: 11, marginBottom: 6 }}>
                <User size={14} /> Active Analyst
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#182230" }}>A. Sharma</div>
              <div style={{ fontSize: 11, color: "#687588", marginTop: 2 }}>Lead Risk Officer (RA-9402)</div>
            </div>

            <div style={{ padding: 14, background: "#F8FAFC", borderRadius: 10, border: "1px solid #E3E8EF" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#687588", fontSize: 11, marginBottom: 6 }}>
                <FileBadge size={14} /> Passport Authority
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#168568" }}>Issuer Hub</div>
              <div style={{ fontSize: 11, color: "#687588", marginTop: 2 }}>Tamper-evident verification</div>
            </div>
          </div>

          {/* Profile Details List */}
          <div style={{ border: "1px solid #E3E8EF", borderRadius: 10, overflow: "hidden", marginBottom: 20 }}>
            <div style={{ padding: "12px 16px", background: "#F8FAFC", borderBottom: "1px solid #E3E8EF", fontSize: 12, fontWeight: 700, color: "#182230" }}>
              Operational Details
            </div>
            {[
              { label: "Institution Legal Name", val: "MicroFinance Alliance International Foundation" },
              { label: "Operating Hub", val: "South Asia Regional Risk Division (Zone 4)" },
              { label: "Compliance Standard", val: "ISO 27001 Certified • Zero Personal Exposure Protocol" },
              { label: "Contagion Model", val: "StressNet Deterministic Multi-Tier Propagation v3.4" },
              { label: "Intervention Protocol", val: "Targeted Minimal-Disruption Principle (Spec §21)" },
              { label: "Public Key Verification Hash", val: "0x7F4A...B902 (Verified Sandbox)" },
            ].map((item, idx) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 16px",
                  fontSize: 12,
                  borderBottom: idx < 5 ? "1px solid #F1F5F9" : "none",
                  background: idx % 2 === 0 ? "#FFFFFF" : "#FAFAFA",
                }}
              >
                <span style={{ color: "#687588", fontWeight: 500 }}>{item.label}</span>
                <span style={{ color: "#182230", fontWeight: 600 }}>{item.val}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              padding: "12px 14px",
              background: "#EEF2FF",
              borderRadius: 8,
              border: "1px solid #C7D2FE",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <CheckCircle size={16} color="#3157D5" />
            <span style={{ fontSize: 12, color: "#4338CA" }}>
              All simulation records generated in this session are cryptographically bound to Institution ID <strong>MFA-2024-001</strong>.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "14px 24px",
            background: "#F8FAFC",
            borderTop: "1px solid #E3E8EF",
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "8px 18px",
              background: "#3157D5",
              color: "#FFFFFF",
              border: "none",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
