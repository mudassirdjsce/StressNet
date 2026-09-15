import type { RiskState } from "../../utils/mock";

const config: Record<string, { bg: string; text: string; dot: string; label: string }> = {
  healthy:    { bg: "#DCFCE7", text: "#166534", dot: "#168568", label: "Healthy"  },
  watch:      { bg: "#FEF3C7", text: "#92400E", dot: "#D99A27", label: "Watch"    },
  stressed:   { bg: "#FEE7DC", text: "#9A3412", dot: "#E06830", label: "Stressed" },
  critical:   { bg: "#FEE2E2", text: "#991B1B", dot: "#D84C4C", label: "Critical" },
  support:    { bg: "#EEF2FF", text: "#1D4ED8", dot: "#3157D5", label: "Support in Progress" },
  // Legacy compat
  stable:     { bg: "#DCFCE7", text: "#166534", dot: "#168568", label: "Healthy"  },
  monitoring: { bg: "#EEF2FF", text: "#4338CA", dot: "#6C63D9", label: "Monitoring" },
  resolved:   { bg: "#DCFCE7", text: "#166534", dot: "#168568", label: "Resolved" },
  active:     { bg: "#FEE2E2", text: "#991B1B", dot: "#D84C4C", label: "Active"   },
  verified:   { bg: "#DCFCE7", text: "#166534", dot: "#168568", label: "Verified" },
  network:    { bg: "#EEF2FF", text: "#4338CA", dot: "#6C63D9", label: "Network"  },
  individual: { bg: "#F0F9FF", text: "#0369A1", dot: "#0EA5E9", label: "Individual" },
  external:   { bg: "#FFFBEB", text: "#B45309", dot: "#F59E0B", label: "External"  },
  pending:    { bg: "#FEF3C7", text: "#B45309", dot: "#D99A27", label: "Pending Review" },
  elevated:   { bg: "#FEF3C7", text: "#B45309", dot: "#D99A27", label: "Elevated" },
  high:       { bg: "#FEE2E2", text: "#991B1B", dot: "#D84C4C", label: "High"     },
  low:        { bg: "#DCFCE7", text: "#166534", dot: "#168568", label: "Low"       },
};

interface Props {
  variant: string;
  label?: string;
  size?: "sm" | "md";
  dot?: boolean;
}

export default function Badge({ variant, label, size = "sm", dot = true }: Props) {
  const v = config[variant.toLowerCase()] ?? config.healthy;
  const displayLabel = label ?? v.label;

  return (
    <span style={{
      backgroundColor: v.bg,
      color: v.text,
      fontSize: size === "sm" ? "11px" : "12px",
      padding: size === "sm" ? "2px 8px" : "3px 10px",
      borderRadius: "99px",
      fontWeight: 600,
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      letterSpacing: "0.01em",
      whiteSpace: "nowrap",
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: v.dot, flexShrink: 0 }} />}
      {displayLabel}
    </span>
  );
}

export function RiskBadge({ status }: { status: RiskState }) {
  return <Badge variant={status} />;
}
