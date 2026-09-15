import { Building2, ChevronDown, Search, RotateCcw, Bell } from "lucide-react";

interface Props {
  title?: string;
  onResetSession: () => void;
  interventionDone: boolean;
  onOpenProfile?: () => void;
}

export default function TopNav({ onResetSession, interventionDone, onOpenProfile }: Props) {
  return (
    <header
      style={{
        height: 56,
        background: "#FFFFFF",
        borderBottom: "1px solid #E3E8EF",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: 16,
        flexShrink: 0,
      }}
    >
      {/* Institution name */}
      <button
        onClick={onOpenProfile}
        title="View Institution Profile"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginRight: 8,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px 8px",
          borderRadius: 8,
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FAFC")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            background: "#EEF2FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Building2 size={15} color="#3157D5" />
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#182230" }}>MicroFinance Alliance</span>
        <ChevronDown size={14} color="#687588" />
      </button>

      {/* Search */}
      <div style={{ flex: 1, maxWidth: 340, position: "relative" }}>
        <Search
          size={14}
          color="#9CA3AF"
          style={{
            position: "absolute",
            left: 10,
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}
        />
        <input
          placeholder="Search borrowers, groups..."
          style={{
            width: "100%",
            height: 32,
            paddingLeft: 32,
            paddingRight: 12,
            background: "#F5F7FA",
            border: "1px solid #E3E8EF",
            borderRadius: 8,
            fontSize: 13,
            color: "#182230",
            outline: "none",
          }}
        />
      </div>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
        {/* Intervention done indicator */}
        {interventionDone && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: "#168568",
              background: "#DCFCE7",
              border: "1px solid #BBF7D0",
              padding: "3px 8px",
              borderRadius: 4,
            }}
          >
            Intervention Active
          </span>
        )}

        {/* Reset Session button */}
        <button
          onClick={onResetSession}
          title="Reset session to start"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "5px 10px",
            border: "1px solid #E3E8EF",
            borderRadius: 7,
            background: "#FFFFFF",
            color: "#687588",
            fontSize: 11,
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: "0.02em",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#CBD5E1";
            e.currentTarget.style.color = "#182230";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#E3E8EF";
            e.currentTarget.style.color = "#687588";
          }}
        >
          <RotateCcw size={12} color="currentColor" />
          Reset Session
        </button>

        {/* Notifications */}
        <button
          title="Notifications"
          style={{
            position: "relative",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Bell size={17} color="#687588" />
          <span
            style={{
              position: "absolute",
              top: 2,
              right: 2,
              width: 7,
              height: 7,
              background: "#D84C4C",
              borderRadius: "50%",
              border: "1.5px solid white",
            }}
          />
        </button>

        {/* User Profile */}
        <div
          onClick={onOpenProfile}
          title="View Analyst Profile"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            padding: "3px 6px",
            borderRadius: 8,
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FAFC")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "#3157D5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 700,
              color: "white",
            }}
          >
            AS
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#182230", lineHeight: 1.2 }}>A. Sharma</span>
            <span style={{ fontSize: 10, color: "#687588", lineHeight: 1.2 }}>Risk Analyst</span>
          </div>
        </div>
      </div>
    </header>
  );
}
