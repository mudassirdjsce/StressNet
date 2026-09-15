interface Segment {
  label: string;
  value: number;
  color: string;
}

interface Props {
  segments: Segment[];
  size?: number;
  innerRadius?: number;
  centerLabel?: string;
  centerSub?: string;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, innerR: number, startAngle: number, endAngle: number): string {
  const s = polarToCartesian(cx, cy, r, startAngle);
  const e = polarToCartesian(cx, cy, r, endAngle);
  const si = polarToCartesian(cx, cy, innerR, startAngle);
  const ei = polarToCartesian(cx, cy, innerR, endAngle);
  const large = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y} L ${ei.x} ${ei.y} A ${innerR} ${innerR} 0 ${large} 0 ${si.x} ${si.y} Z`;
}

export default function DonutChart({ segments, size = 200, innerRadius = 62, centerLabel, centerSub }: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 8;
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  const gap = 2;

  let currentAngle = 0;
  const slices = segments.map((seg) => {
    const sweep = (seg.value / total) * (360 - gap * segments.length);
    const start = currentAngle;
    const end = currentAngle + sweep;
    currentAngle = end + gap;
    return { ...seg, start, end };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {slices.map((s) => (
        <path
          key={s.label}
          d={arcPath(cx, cy, r, innerRadius, s.start, s.end)}
          fill={s.color}
          opacity={0.9}
        />
      ))}
      {centerLabel && (
        <text x={cx} y={cy - 6} textAnchor="middle" dominantBaseline="middle" fontSize="22" fontWeight="700" fill="#182230" fontFamily="Inter, sans-serif">
          {centerLabel}
        </text>
      )}
      {centerSub && (
        <text x={cx} y={cy + 16} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill="#687588" fontFamily="Inter, sans-serif">
          {centerSub}
        </text>
      )}
    </svg>
  );
}
