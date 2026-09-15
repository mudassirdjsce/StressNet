import type { Borrower, Edge, RiskState, BorrowerState } from "../../utils/mock";

const STATUS_STROKE: Record<string, string> = {
  Healthy:  "#168568",
  Watch:    "#D99A27",
  Stressed: "#E06830",
  Critical: "#D84C4C",
  Support:  "#3157D5",
};
const STATUS_FILL: Record<string, string> = {
  Healthy:  "#DCFCE7",
  Watch:    "#FEF3C7",
  Stressed: "#FEE7DC",
  Critical: "#FEE2E2",
  Support:  "#EEF2FF",
};
const STATUS_TEXT: Record<string, string> = {
  Healthy:  "#166534",
  Watch:    "#92400E",
  Stressed: "#9A3412",
  Critical: "#991B1B",
  Support:  "#1D4ED8",
};

const EDGE_COLOR: Record<string, string> = {
  "shared-guarantee": "#D84C4C",
  "group-lending":    "#6C63D9",
  "common-income":    "#D99A27",
  "local-exposure":   "#64748B",
};
const EDGE_DASH: Record<string, string | undefined> = {
  "shared-guarantee": undefined,
  "group-lending":    "6 3",
  "common-income":    "4 3",
  "local-exposure":   "3 5",
};

interface Props {
  borrowers: Borrower[];
  edges: Edge[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  simStep: number;
  compact?: boolean;
  showEdgeLegend?: boolean;
  scenarioBorrowerStates?: Record<string, BorrowerState>;
}

function resolveStatus(b: Borrower, simStep: number, overrides?: Record<string, BorrowerState>): string {
  if (overrides && overrides[b.id]) return overrides[b.id].status;
  // Scenario B propagation
  if (simStep >= 1 && b.id === "G07-A1") return "Critical";
  if (simStep >= 2 && b.id === "G07-A2") return "Watch";
  if (simStep >= 3 && b.id === "G07-A3") return "Watch";
  if (simStep >= 4 && b.id === "G07-A4") return "Watch";
  return b.status;
}

function midpoint(x1: number, y1: number, x2: number, y2: number) {
  return { x: (x1 + x2) / 2, y: (y1 + y2) / 2 };
}

export default function NetworkGraph({ borrowers, edges, selectedId, onSelect, simStep, compact, showEdgeLegend, scenarioBorrowerStates }: Props) {
  const nodeR = compact ? 18 : 24;
  const fontSize = compact ? 10 : 12;

  return (
    <svg viewBox="0 0 640 460" style={{ width: "100%", height: "100%", display: "block" }} aria-label="Group G-07 relationship network">
      {/* Group region */}
      <ellipse cx="320" cy="230" rx="278" ry="200" fill="#EEF2FF" stroke="#3157D5" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.35" />
      <text x="52" y="56" fill="#3157D5" fontSize="12" fontWeight="700" fontFamily="Inter, sans-serif" letterSpacing="0.04em">Group G-07</text>
      <text x="52" y="72" fill="#687588" fontSize="10" fontFamily="Inter, sans-serif">Synthetic demonstration data</text>

      {/* Edges */}
      {edges.map((e) => {
        const from = borrowers.find(b => b.id === e.from);
        const to   = borrowers.find(b => b.id === e.to);
        if (!from || !to) return null;

        const simHighlight =
          simStep > 0 &&
          e.type === "shared-guarantee" && simStep >= 2 && (e.from === "G07-A2" || e.to === "G07-A2") ||
          simStep > 0 && e.type === "group-lending"    && simStep >= 3 && (e.from === "G07-A3" || e.to === "G07-A3") ||
          simStep > 0 && e.type === "common-income"    && simStep >= 4 && (e.from === "G07-A4" || e.to === "G07-A4") ||
          simStep >= 1 && (e.from === "G07-A1" || e.to === "G07-A1");

        const color = simHighlight ? STATUS_STROKE.Critical : EDGE_COLOR[e.type] ?? "#CBD5E1";
        const strokeW = e.strength === "high" ? 2.5 : e.strength === "medium" ? 1.8 : 1.2;
        const mp = midpoint(from.x, from.y, to.x, to.y);

        return (
          <g key={`${e.from}-${e.to}`}>
            <line x1={from.x} y1={from.y} x2={to.x} y2={to.y}
              stroke={color} strokeWidth={simHighlight ? strokeW + 1 : strokeW}
              strokeDasharray={EDGE_DASH[e.type]} opacity={simHighlight ? 0.9 : 0.65}
              style={{ transition: "stroke 0.4s, stroke-width 0.3s" }} />
            {!compact && (
              <g>
                <rect x={mp.x - 46} y={mp.y - 10} width={92} height={18} rx={5} fill="rgba(255,255,255,0.93)" stroke={color} strokeWidth="0.8" />
                <text x={mp.x} y={mp.y + 3} textAnchor="middle" fontSize="8" fontWeight="600" fill={color} fontFamily="Inter, sans-serif" style={{ pointerEvents: "none" }}>{e.label}</text>
              </g>
            )}
          </g>
        );
      })}

      {/* Nodes */}
      {borrowers.map((b) => {
        const statusStr = resolveStatus(b, simStep, scenarioBorrowerStates);
        const isSelected = selectedId === b.id;
        const isPulsing = simStep >= 1 && b.id === "G07-A1" ||
                          simStep >= 2 && b.id === "G07-A2" ||
                          simStep >= 3 && b.id === "G07-A3" ||
                          simStep >= 4 && b.id === "G07-A4";

        const fill   = STATUS_FILL[statusStr]   ?? "#F1F5F9";
        const stroke = STATUS_STROKE[statusStr] ?? "#94A3B8";
        const text   = STATUS_TEXT[statusStr]   ?? "#374151";

        return (
          <g key={b.id} onClick={() => onSelect(isSelected ? null : b.id)} style={{ cursor: "pointer" }}>
            {isSelected && <circle cx={b.x} cy={b.y} r={nodeR + 9} fill="none" stroke="#3157D5" strokeWidth="2.5" opacity={0.4} />}
            {b.isInitiator && !compact && <circle cx={b.x} cy={b.y} r={nodeR + 5} fill="none" stroke="#D84C4C" strokeWidth="1.5" strokeDasharray="4 2" opacity={0.55} />}
            {isPulsing && (
              <circle cx={b.x} cy={b.y} r={nodeR + 4} fill={stroke} opacity={0.1}>
                <animate attributeName="r" values={`${nodeR+4};${nodeR+14};${nodeR+4}`} dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.18;0;0.18" dur="1.8s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={b.x} cy={b.y} r={nodeR} fill={fill} stroke={stroke} strokeWidth={isSelected ? 3 : 2} style={{ transition: "fill 0.4s, stroke 0.4s" }} />
            {/* Name */}
            <text x={b.x} y={b.y - 2} textAnchor="middle" dominantBaseline="middle" fontSize={fontSize} fontWeight="700" fill={text} fontFamily="Inter, sans-serif" style={{ pointerEvents: "none" }}>{b.name}</text>
            {/* Status label below name */}
            {!compact && (
              <text x={b.x} y={b.y + 12} textAnchor="middle" fontSize="8" fontWeight="500" fill={text} fontFamily="Inter, sans-serif" style={{ pointerEvents: "none" }}>{statusStr}</text>
            )}
            {b.isInitiator && !compact && (
              <text x={b.x} y={b.y + nodeR + 16} textAnchor="middle" fontSize="8" fontWeight="700" fill="#D84C4C" fontFamily="Inter, sans-serif" style={{ pointerEvents: "none" }}>← Initiator</text>
            )}
          </g>
        );
      })}

      {/* Step 5 outcome banner */}
      {simStep >= 5 && (
        <g>
          <rect x="80" y="408" width="480" height="36" rx="7" fill="#F0FDF4" stroke="#168568" strokeWidth="1.5" />
          <text x="320" y="430" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="600" fill="#166534" fontFamily="Inter, sans-serif">
            ✓ Lata remains Healthy — independent income, not in the guarantee chain
          </text>
        </g>
      )}

      {/* Node status legend */}
      {compact && (
        <g>
          <rect x="450" y="8" width="180" height="46" rx="6" fill="rgba(255,255,255,0.95)" stroke="#E3E8EF" />
          {[["#168568","#DCFCE7","Healthy"],["#D99A27","#FEF3C7","Watch"],["#D84C4C","#FEE2E2","Critical"]].map(([c,bg,l],i) => (
            <g key={l} transform={`translate(${458 + (i % 3) * 58}, ${i < 3 ? 18 : 34})`}>
              <circle r="5" cx="5" cy="5" fill={bg} stroke={c} strokeWidth="1.5" />
              <text x="14" y="10" fontSize="9" fill="#687588" fontFamily="Inter, sans-serif">{l}</text>
            </g>
          ))}
        </g>
      )}

      {/* Edge type legend */}
      {showEdgeLegend && !compact && (
        <g>
          <rect x="10" y="408" width="290" height="46" rx="6" fill="rgba(255,255,255,0.96)" stroke="#E3E8EF" />
          {[
            { color: "#D84C4C", dash: "",    label: "Shared guarantee" },
            { color: "#6C63D9", dash: "6 3", label: "Group lending" },
            { color: "#D99A27", dash: "4 3", label: "Common income" },
            { color: "#64748B", dash: "3 5", label: "Local exposure" },
          ].map((item, i) => (
            <g key={item.label} transform={`translate(${18 + (i % 2) * 144}, ${416 + Math.floor(i / 2) * 16})`}>
              <line x1="0" y1="6" x2="20" y2="6" stroke={item.color} strokeWidth="2" strokeDasharray={item.dash} />
              <text x="24" y="10" fontSize="9" fill="#687588" fontFamily="Inter, sans-serif">{item.label}</text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
