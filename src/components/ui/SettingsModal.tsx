import { useState } from "react";
import { X, Settings, Sliders, Bell, Shield, Check, RotateCcw } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: Props) {
  const [sensitivity, setSensitivity] = useState(70);
  const [autoPassport, setAutoPassport] = useState(true);
  const [highAlerts, setHighAlerts] = useState(true);
  const [modelType, setModelType] = useState<"deterministic" | "probabilistic">("deterministic");
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 600);
  };

  const handleReset = () => {
    setSensitivity(70);
    setAutoPassport(true);
    setHighAlerts(true);
    setModelType("deterministic");
  };

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
          maxWidth: 560,
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
              <Settings size={22} color="#FFFFFF" />
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em" }}>
                Platform & Simulation Settings
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>
                Configure contagion detection, sensitivity, and alert preferences
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
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: "24px", maxHeight: "70vh", overflowY: "auto", display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Contagion Sensitivity Slider */}
          <div style={{ padding: 16, background: "#F8FAFC", borderRadius: 10, border: "1px solid #E3E8EF" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Sliders size={16} color="#3157D5" />
                <span style={{ fontSize: 13, fontWeight: 700, color: "#182230" }}>
                  Contagion Sensitivity Threshold
                </span>
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#3157D5",
                  background: "#EEF2FF",
                  padding: "2px 8px",
                  borderRadius: 6,
                }}
              >
                {sensitivity}%
              </span>
            </div>
            <p style={{ fontSize: 12, color: "#687588", margin: "0 0 12px", lineHeight: 1.4 }}>
              Determines the correlation threshold at which co-movement across guarantee connections triggers Watch or Critical status.
            </p>
            <input
              type="range"
              min="40"
              max="95"
              step="5"
              value={sensitivity}
              onChange={(e) => setSensitivity(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#3157D5", cursor: "pointer" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#9CA3AF", marginTop: 4 }}>
              <span>Conservative (40%)</span>
              <span>Default (70%)</span>
              <span>High Confidence (95%)</span>
            </div>
          </div>

          {/* Simulation Model Mode */}
          <div style={{ padding: 16, background: "#F8FAFC", borderRadius: 10, border: "1px solid #E3E8EF" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Shield size={16} color="#168568" />
              <span style={{ fontSize: 13, fontWeight: 700, color: "#182230" }}>
                Simulation Engine Mode
              </span>
            </div>
            <p style={{ fontSize: 12, color: "#687588", margin: "0 0 12px" }}>
              Control whether scenario propagation runs as a deterministic multi-step cascade or stochastic simulation.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <button
                type="button"
                onClick={() => setModelType("deterministic")}
                style={{
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: `1.5px solid ${modelType === "deterministic" ? "#3157D5" : "#E3E8EF"}`,
                  background: modelType === "deterministic" ? "#EEF2FF" : "#FFFFFF",
                  color: modelType === "deterministic" ? "#3157D5" : "#687588",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div style={{ fontWeight: 700 }}>Deterministic (Recommended)</div>
                <div style={{ fontSize: 10, opacity: 0.8, marginTop: 2 }}>Repeatable Day 1–5 cascade</div>
              </button>
              <button
                type="button"
                onClick={() => setModelType("probabilistic")}
                style={{
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: `1.5px solid ${modelType === "probabilistic" ? "#3157D5" : "#E3E8EF"}`,
                  background: modelType === "probabilistic" ? "#EEF2FF" : "#FFFFFF",
                  color: modelType === "probabilistic" ? "#3157D5" : "#687588",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div style={{ fontWeight: 700 }}>Monte Carlo Stochastic</div>
                <div style={{ fontSize: 10, opacity: 0.8, marginTop: 2 }}>Sampled random trials</div>
              </button>
            </div>
          </div>

          {/* Toggle Switches */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 14px",
                border: "1px solid #E3E8EF",
                borderRadius: 8,
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#182230" }}>
                  Automated Stress Passport Ledger
                </div>
                <div style={{ fontSize: 11, color: "#687588", marginTop: 2 }}>
                  Automatically mint a simulated tamper-evident record when an intervention is confirmed.
                </div>
              </div>
              <input
                type="checkbox"
                checked={autoPassport}
                onChange={(e) => setAutoPassport(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: "#3157D5", cursor: "pointer" }}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 14px",
                border: "1px solid #E3E8EF",
                borderRadius: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <Bell size={16} color="#D99A27" style={{ marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#182230" }}>
                    Critical Contagion Alerts
                  </div>
                  <div style={{ fontSize: 11, color: "#687588", marginTop: 2 }}>
                    Trigger immediate platform banner when guarantee chains exceed 2 hops.
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={highAlerts}
                onChange={(e) => setHighAlerts(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: "#3157D5", cursor: "pointer" }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "14px 24px",
            background: "#F8FAFC",
            borderTop: "1px solid #E3E8EF",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            type="button"
            onClick={handleReset}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: "none",
              color: "#687588",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <RotateCcw size={13} /> Reset Defaults
          </button>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={onClose}
              style={{
                padding: "8px 16px",
                background: "#FFFFFF",
                border: "1px solid #E3E8EF",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                color: "#687588",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 18px",
                background: saveSuccess ? "#168568" : "#3157D5",
                color: "#FFFFFF",
                border: "none",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.15s",
              }}
            >
              {saveSuccess && <Check size={14} />}
              {saveSuccess ? "Saved!" : "Save Settings"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
