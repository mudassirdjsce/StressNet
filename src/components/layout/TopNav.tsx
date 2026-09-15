interface Props {
  title?: string;
  onResetDemo: () => void;
  interventionDone: boolean;
}

export default function TopNav({ onResetDemo, interventionDone }: Props) {
  return (
    <header style={{
      height: 56,
      background: "#FFFFFF",
      borderBottom: "1px solid #E3E8EF",
      display: "flex",
      alignItems: "center",
      padding: "0 24px",
      gap: 16,
      flexShrink: 0,
    }}>
      {/* Institution name */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginRight: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3157D5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#182230" }}>MicroFinance Alliance</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#687588" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* Search */}
      <div style={{ flex: 1, maxWidth: 340, position: "relative" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
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
        {/* Demo badge */}
        <span style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          color: "#687588",
          background: "#F1F5F9",
          border: "1px solid #E3E8EF",
          padding: "3px 8px",
          borderRadius: 4,
        }}>
          Demo Data
        </span>

        {/* Intervention done indicator */}
        {interventionDone && (
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: "#168568",
            background: "#DCFCE7",
            border: "1px solid #BBF7D0",
            padding: "3px 8px",
            borderRadius: 4,
          }}>
            Intervention Active
          </span>
        )}

        {/* Reset Demo button */}
        <button
          onClick={onResetDemo}
          title="Reset demo to start"
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
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "#CBD5E1";
            e.currentTarget.style.color = "#182230";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "#E3E8EF";
            e.currentTarget.style.color = "#687588";
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
          </svg>
          Reset Demo
        </button>

        {/* Notifications */}
        <button style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#687588" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          <span style={{
            position: "absolute", top: 2, right: 2, width: 8, height: 8,
            background: "#D84C4C", borderRadius: "50%", border: "1.5px solid white",
          }} />
        </button>

        {/* User */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <div style={{
            width: 30, height: 30, borderRadius: "50%",
            background: "#3157D5",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, color: "white",
          }}>
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
