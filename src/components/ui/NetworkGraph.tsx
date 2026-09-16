import React, { useState } from "react";
import type { Borrower, Edge, BorrowerState } from "../../utils/mock";

/* ── Geometry & HUD Arc Helpers ─────────────────────────────────────────── */

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(" ");
}

/* ── Standard Radar Geometry matching the reference image ──────────────── */
// ViewBox: 0 0 800 580
// Center Asha: (400, 285)
// Outer ellipse: rx=320, ry=212
// Middle ellipse: rx=212, ry=142
// Inner ellipse: rx=108, ry=72

const RADAR_LAYOUT: Record<string, { x: number; y: number }> = {
  "G07-A1": { x: 400, y: 285 }, // Asha (Center)
  "G07-A2": { x: 165, y: 160 }, // Meera (Top-Left)
  "G07-A3": { x: 635, y: 160 }, // Kavita (Top-Right)
  "G07-A4": { x: 635, y: 430 }, // Farah (Bottom-Right)
  "G07-A5": { x: 165, y: 430 }, // Lata (Bottom-Left)
};

export interface NetworkGraphProps {
  borrowers: Borrower[];
  edges: Edge[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  simStep?: number;
  compact?: boolean;
  showEdgeLegend?: boolean;
  scenarioBorrowerStates?: Record<string, BorrowerState>;
  scenarioOverrides?: Record<string, BorrowerState>;
  showAfterIntervention?: boolean;
  onInvestigate?: () => void;
}

function resolveStatus(
  b: Borrower,
  simStep: number,
  overrides?: Record<string, BorrowerState>,
  showAfterIntervention?: boolean
): string {
  if (showAfterIntervention) {
    if (b.id === "G07-A5") return "Healthy";
    return "Watch";
  }
  if (overrides && overrides[b.id]) return overrides[b.id].status;
  // Scenario propagation sequence
  if (simStep >= 1 && b.id === "G07-A1") return "Critical";
  if (simStep >= 2 && b.id === "G07-A2") return "Watch";
  if (simStep >= 3 && b.id === "G07-A3") return "Watch";
  if (simStep >= 4 && b.id === "G07-A4") return "Watch";
  return b.status;
}

export default function NetworkGraph({
  borrowers,
  edges,
  selectedId,
  onSelect,
  simStep = 0,
  compact = false,
  scenarioBorrowerStates,
  scenarioOverrides,
  showAfterIntervention = false,
  onInvestigate,
}: NetworkGraphProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [btnHovered, setBtnHovered] = useState(false);
  const overrides = scenarioOverrides || scenarioBorrowerStates;

  // Radar center and radii
  const cx = 400;
  const cy = 285;
  const rxOuter = 320;
  const ryOuter = 212;
  const rxMid = 212;
  const ryMid = 142;
  const rxInner = 108;
  const ryInner = 72;

  // Node position resolver
  const getNodePos = (b: Borrower) => {
    return RADAR_LAYOUT[b.id] || { x: b.x, y: b.y };
  };

  return (
    <svg
      viewBox="0 0 800 580"
      preserveAspectRatio="xMidYMid meet"
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        background: "#090e1a",
        borderRadius: 10,
        userSelect: "none",
      }}
      aria-label="Group G-07 risk network live analysis radar"
    >
      <defs>
        {/* Subtle grid pattern for authentic HUD dashboard texture */}
        <pattern id="hud-bg-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="0.8" />
        </pattern>

        {/* Glow filters */}
        <filter id="glow-diffuse-coral" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="14" />
        </filter>

        <filter id="glow-diffuse-amber" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
        </filter>

        <filter id="glow-diffuse-green" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
        </filter>

        {/* Soft edge blur for borders */}
        <filter id="glow-border-coral" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feFlood floodColor="#f43f5e" floodOpacity="0.65" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="shadow" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glow-border-amber" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feFlood floodColor="#f59e0b" floodOpacity="0.55" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="shadow" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glow-border-green" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feFlood floodColor="#10b981" floodOpacity="0.65" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="shadow" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Selection glow */}
        <filter id="select-ring-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feFlood floodColor="#38bdf8" floodOpacity="0.8" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="shadow" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Radial gradient for Asha central node fill */}
        <radialGradient id="asha-core-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3d121f" />
          <stop offset="70%" stopColor="#220a13" />
          <stop offset="100%" stopColor="#14060b" />
        </radialGradient>

        {/* Sweeping radar scanner gradient */}
        <radialGradient id="radar-sweep-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.12" />
          <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="sweep-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
          <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.7" />
        </linearGradient>

        {/* ── CSS Animations for Orbital Movement & Rotation ── */}
        <style>{`
          @keyframes orbitGlideCW {
            from { stroke-dashoffset: 0; }
            to { stroke-dashoffset: -180; }
          }
          @keyframes orbitGlideCCW {
            from { stroke-dashoffset: 0; }
            to { stroke-dashoffset: 180; }
          }
          @keyframes radarSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes radarSpinReverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          @keyframes radarSweepScan {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .orbit-glide-cw {
            animation: orbitGlideCW 30s linear infinite;
          }
          .orbit-glide-ccw {
            animation: orbitGlideCCW 22s linear infinite;
          }
          .orbit-glide-outer {
            animation: orbitGlideCW 38s linear infinite;
          }
          .radar-orbit-spin {
            transform-origin: 400px 285px;
            animation: radarSpin 42s linear infinite;
          }
          .radar-orbit-spin-rev {
            transform-origin: 400px 285px;
            animation: radarSpinReverse 32s linear infinite;
          }
          .radar-scanner-sweep {
            transform-origin: 400px 285px;
            animation: radarSweepScan 16s linear infinite;
          }
        `}</style>
      </defs>

      {/* ── Background Canvas & Grid ─────────────────────────────────── */}
      <rect width="800" height="580" fill="#090e1a" />
      <rect width="800" height="580" fill="url(#hud-bg-grid)" />

      {/* ── Header: GROUP G-07 (Top-Left) ───────────────────────────── */}
      <g id="header-group">
        <text
          x="34"
          y="42"
          fill="#f1f5f9"
          fontSize="14"
          fontWeight="700"
          fontFamily="'JetBrains Mono', 'Fira Code', monospace, sans-serif"
          letterSpacing="0.14em"
        >
          GROUP G-07
        </text>
        {/* Underline bar under GROUP */}
        <line x1="34" y1="52" x2="82" y2="52" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        {/* Subtitle */}
        <text
          x="34"
          y="68"
          fill="#526e8f"
          fontSize="9.5"
          fontWeight="600"
          fontFamily="'JetBrains Mono', monospace, sans-serif"
          letterSpacing="0.16em"
        >
          RISK NETWORK &nbsp;•&nbsp; LIVE ANALYSIS
        </text>
      </g>

      {/* ── Top-Right Legend Pill ───────────────────────────────────── */}
      <g id="legend-pill" transform="translate(550, 22)">
        <rect
          width="214"
          height="34"
          rx="9"
          fill="rgba(10, 18, 30, 0.78)"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1"
        />
        {/* Healthy */}
        <g transform="translate(20, 17)">
          <circle cx="0" cy="0" r="4.5" fill="none" stroke="#10b981" strokeWidth="1.8" />
          <text x="10" y="3.5" fill="#e2e8f0" fontSize="11" fontWeight="500" fontFamily="Inter, sans-serif">
            Healthy
          </text>
        </g>
        {/* Watch */}
        <g transform="translate(93, 17)">
          <circle cx="0" cy="0" r="4.5" fill="none" stroke="#f59e0b" strokeWidth="1.8" />
          <text x="10" y="3.5" fill="#e2e8f0" fontSize="11" fontWeight="500" fontFamily="Inter, sans-serif">
            Watch
          </text>
        </g>
        {/* Critical */}
        <g transform="translate(155, 17)">
          <circle cx="0" cy="0" r="4.5" fill="none" stroke="#f43f5e" strokeWidth="1.8" />
          <text x="10" y="3.5" fill="#e2e8f0" fontSize="11" fontWeight="500" fontFamily="Inter, sans-serif">
            Critical
          </text>
        </g>
      </g>

      {/* ── Rotating Circular Orbit Rings & Scanner Sweep ─────────────── */}
      <g id="rotating-orbit-system" pointerEvents="none">
        {/* Clockwise rotating subtle segmented reticle */}
        <g className="radar-orbit-spin">
          <circle
            cx={cx}
            cy={cy}
            r={240}
            fill="none"
            stroke="rgba(65, 115, 175, 0.12)"
            strokeWidth="0.8"
            strokeDasharray="14 28 4 28"
          />
          <circle
            cx={cx}
            cy={cy}
            r={335}
            fill="none"
            stroke="rgba(65, 115, 175, 0.08)"
            strokeWidth="0.8"
            strokeDasharray="2 36 6 36"
          />
        </g>

        {/* Counter-clockwise rotating inner ring */}
        <g className="radar-orbit-spin-rev">
          <circle
            cx={cx}
            cy={cy}
            r={115}
            fill="none"
            stroke="rgba(80, 135, 200, 0.12)"
            strokeWidth="0.8"
            strokeDasharray="8 20 2 20"
          />
        </g>

        {/* Live Rotating Radar Scanner Sweep Beam */}
        <g className="radar-scanner-sweep">
          <path
            d={`M ${cx} ${cy} L ${cx + 330} ${cy} A 330 330 0 0 0 ${cx + 233} ${cy - 233} Z`}
            fill="url(#radar-sweep-grad)"
            opacity="0.65"
          />
          <line
            x1={cx}
            y1={cy}
            x2={cx + 330}
            y2={cy}
            stroke="url(#sweep-line-grad)"
            strokeWidth="1.2"
          />
          <circle cx={cx + 330} cy={cy} r="2" fill="#38bdf8" opacity="0.8" />
        </g>
      </g>

      {/* ── Radar Concentric Dashed Ellipses ─────────────────────────── */}
      <g id="radar-rings" pointerEvents="none">
        {/* Inner ellipse */}
        <ellipse
          cx={cx}
          cy={cy}
          rx={rxInner}
          ry={ryInner}
          fill="none"
          stroke="rgba(42, 65, 96, 0.45)"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="orbit-glide-ccw"
        />
        {/* Middle ellipse */}
        <ellipse
          cx={cx}
          cy={cy}
          rx={rxMid}
          ry={ryMid}
          fill="none"
          stroke="rgba(42, 65, 96, 0.45)"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="orbit-glide-cw"
        />
        {/* Outer ellipse (Network Boundary) */}
        <ellipse
          cx={cx}
          cy={cy}
          rx={rxOuter}
          ry={ryOuter}
          fill="none"
          stroke="rgba(42, 65, 96, 0.48)"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="orbit-glide-outer"
        />
      </g>

      {/* ── Radar Ring Telemetry Labels ──────────────────────────────── */}
      <g id="ring-labels" pointerEvents="none">
        {/* NETWORK BOUNDARY (Top of Outer Ring) */}
        <text
          x={cx}
          y={cy - ryOuter - 10}
          textAnchor="middle"
          fill="#526e8f"
          fontSize="8.5"
          fontWeight="600"
          fontFamily="'JetBrains Mono', monospace, sans-serif"
          letterSpacing="0.14em"
        >
          NETWORK BOUNDARY
        </text>

        {/* INDIRECT EXPOSURE (Top of Middle Ring) */}
        <text
          x={cx}
          y={cy - ryMid - 8}
          textAnchor="middle"
          fill="#526e8f"
          fontSize="8.5"
          fontWeight="600"
          fontFamily="'JetBrains Mono', monospace, sans-serif"
          letterSpacing="0.14em"
        >
          INDIRECT EXPOSURE
        </text>

        {/* DIRECT EXPOSURE (Top of Inner Ring) */}
        <text
          x={cx}
          y={cy - ryInner - 8}
          textAnchor="middle"
          fill="#526e8f"
          fontSize="8.5"
          fontWeight="600"
          fontFamily="'JetBrains Mono', monospace, sans-serif"
          letterSpacing="0.14em"
        >
          DIRECT EXPOSURE
        </text>

        {/* Central Risk Score & Label (Above Asha) */}
        <text
          x={cx}
          y={cy - 48}
          textAnchor="middle"
          fill="#647e99"
          fontSize="9"
          fontWeight="600"
          fontFamily="'JetBrains Mono', monospace, sans-serif"
          letterSpacing="0.14em"
        >
          RISK SCORE
        </text>
        <text
          x={cx}
          y={cy - 30}
          textAnchor="middle"
          fill="#f43f5e"
          fontSize="16"
          fontWeight="700"
          fontFamily="Inter, sans-serif"
          letterSpacing="0.02em"
        >
          0.87
        </text>

        {/* CRITICAL EXPOSURE (Below Asha) */}
        <text
          x={cx}
          y={cy + 64}
          textAnchor="middle"
          fill="#f43f5e"
          fontSize="9"
          fontWeight="700"
          fontFamily="'JetBrains Mono', monospace, sans-serif"
          letterSpacing="0.14em"
        >
          CRITICAL EXPOSURE
        </text>
      </g>

      {/* ── Crosshair Grid Axes & Guidelines ─────────────────────────── */}
      <g id="radar-axes" pointerEvents="none">
        {/* Vertical Axis */}
        <line
          x1={cx}
          y1={cy - ryOuter - 18}
          x2={cx}
          y2={cy + ryOuter + 18}
          stroke="rgba(42, 65, 96, 0.42)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        {/* Horizontal Axis */}
        <line
          x1={cx - rxOuter - 18}
          y1={cy}
          x2={cx + rxOuter + 18}
          y2={cy}
          stroke="rgba(42, 65, 96, 0.42)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Diagonal Ray Guidelines to sector nodes */}
        {/* Ray to Meera (165, 160) */}
        <line
          x1={cx}
          y1={cy}
          x2={165}
          y2={160}
          stroke="rgba(42, 65, 96, 0.28)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        {/* Ray to Kavita (635, 160) */}
        <line
          x1={cx}
          y1={cy}
          x2={635}
          y2={160}
          stroke="rgba(42, 65, 96, 0.28)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        {/* Ray to Farah (635, 430) */}
        <line
          x1={cx}
          y1={cy}
          x2={635}
          y2={430}
          stroke="rgba(42, 65, 96, 0.28)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        {/* Ray to Lata (165, 430) */}
        <line
          x1={cx}
          y1={cy}
          x2={165}
          y2={430}
          stroke="rgba(42, 65, 96, 0.38)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      </g>

      {/* ── Cardinal and Intersection Target Dots ─────────────────────── */}
      <g id="radar-dots" pointerEvents="none">
        {/* 4 Cardinal Dots on Outer Ellipse */}
        {[
          { x: cx, y: cy - ryOuter }, // Top (400, 73)
          { x: cx, y: cy + ryOuter }, // Bottom (400, 497)
          { x: cx - rxOuter, y: cy }, // Left (80, 285)
          { x: cx + rxOuter, y: cy }, // Right (720, 285)
        ].map((pt, i) => (
          <g key={`cardinal-${i}`}>
            <circle cx={pt.x} cy={pt.y} r="3" fill="#8ca0b8" />
            <circle cx={pt.x} cy={pt.y} r="6" fill="none" stroke="rgba(140, 160, 184, 0.3)" strokeWidth="1" />
          </g>
        ))}

        {/* Micro intersection dots on grid */}
        {[
          { x: cx, y: cy - ryMid },
          { x: cx, y: cy + ryMid },
          { x: cx - rxMid, y: cy },
          { x: cx + rxMid, y: cy },
          { x: cx, y: cy - ryInner },
          { x: cx, y: cy + ryInner },
          { x: cx - rxInner, y: cy },
          { x: cx + rxInner, y: cy },
          // Diagonal intersections
          { x: 282, y: 222 },
          { x: 518, y: 222 },
          { x: 518, y: 357 },
          { x: 282, y: 357 },
        ].map((pt, i) => (
          <circle key={`intersect-${i}`} cx={pt.x} cy={pt.y} r="1.8" fill="rgba(140, 160, 184, 0.45)" />
        ))}
      </g>

      {/* ── Edges / Connection Lines & Exact Angled Labels ───────────── */}
      <g id="network-edges">
        {/* 1. Asha -> Meera: Solid Coral-Red Line */}
        <line
          x1={cx}
          y1={cy}
          x2={165}
          y2={160}
          stroke="#f43f5e"
          strokeWidth={2.4}
          style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
        />
        {/* Angled Label for Asha -> Meera */}
        <g transform="translate(268, 218) rotate(28)" pointerEvents="none">
          <text
            x="0"
            y="-5"
            textAnchor="middle"
            fill="#f43f5e"
            fontSize="11.5"
            fontWeight="700"
            fontFamily="Inter, sans-serif"
          >
            0.62
          </text>
          <text
            x="0"
            y="7"
            textAnchor="middle"
            fill="#f43f5e"
            fontSize="8.5"
            fontWeight="600"
            fontFamily="Inter, sans-serif"
          >
            Direct Exposure
          </text>
        </g>

        {/* 2. Asha -> Kavita: Dashed Periwinkle/Blue Line */}
        <line
          x1={cx}
          y1={cy}
          x2={635}
          y2={160}
          stroke="#446bf2"
          strokeWidth={2}
          strokeDasharray="6 4"
          style={{ transition: "stroke 0.3s" }}
        />
        {/* Angled Label for Asha -> Kavita */}
        <g transform="translate(532, 218) rotate(-28)" pointerEvents="none">
          <text
            x="0"
            y="-5"
            textAnchor="middle"
            fill="#446bf2"
            fontSize="11.5"
            fontWeight="700"
            fontFamily="Inter, sans-serif"
          >
            0.58
          </text>
          <text
            x="0"
            y="7"
            textAnchor="middle"
            fill="#446bf2"
            fontSize="8.5"
            fontWeight="600"
            fontFamily="Inter, sans-serif"
          >
            Indirect Link
          </text>
        </g>

        {/* 3. Asha -> Farah: Dashed Amber Line */}
        <line
          x1={cx}
          y1={cy}
          x2={635}
          y2={430}
          stroke="#f59e0b"
          strokeWidth={2}
          strokeDasharray="6 4"
          style={{ transition: "stroke 0.3s" }}
        />
        {/* Angled Label for Asha -> Farah */}
        <g transform="translate(532, 362) rotate(31.5)" pointerEvents="none">
          <text
            x="0"
            y="-5"
            textAnchor="middle"
            fill="#f59e0b"
            fontSize="11.5"
            fontWeight="700"
            fontFamily="Inter, sans-serif"
          >
            0.61
          </text>
          <text
            x="0"
            y="7"
            textAnchor="middle"
            fill="#f59e0b"
            fontSize="8.5"
            fontWeight="600"
            fontFamily="Inter, sans-serif"
          >
            Indirect Link
          </text>
        </g>

        {/* 4. Lata -> Farah: Dashed Muted Sky Blue Line */}
        <line
          x1={165}
          y1={430}
          x2={635}
          y2={430}
          stroke="#38bdf8"
          strokeWidth={1.8}
          strokeDasharray="6 4"
          style={{ transition: "stroke 0.3s" }}
        />
        {/* Centered Label for Lata -> Farah */}
        <g transform="translate(400, 422)" pointerEvents="none">
          <text
            x="0"
            y="-4"
            textAnchor="middle"
            fill="#38bdf8"
            fontSize="11.5"
            fontWeight="700"
            fontFamily="Inter, sans-serif"
          >
            0.21
          </text>
          <text
            x="0"
            y="14"
            textAnchor="middle"
            fill="#38bdf8"
            fontSize="8.5"
            fontWeight="600"
            fontFamily="Inter, sans-serif"
          >
            Lower Risk Connection
          </text>
        </g>
      </g>

      {/* ── Nodes & HUD Brackets ────────────────────────────────────── */}
      <g id="network-nodes">
        {borrowers.map((b) => {
          const pos = getNodePos(b);
          const status = resolveStatus(b, simStep, overrides, showAfterIntervention);
          const isSelected = selectedId === b.id;
          const isHovered = hoveredNode === b.id;
          const isAsha = b.name === "Asha" || b.id === "G07-A1";

          // Node radii
          const nodeRadius = isAsha ? 38 : 34;
          const hudRadius = isAsha ? 44 : 39;

          // Status colors & themes
          const isCritical = status === "Critical";
          const isWatch = status === "Watch";
          const isHealthy = status === "Healthy";

          const themeColor = isCritical ? "#f43f5e" : isWatch ? "#f59e0b" : "#10b981";
          const glowFilter = isCritical
            ? "url(#glow-border-coral)"
            : isWatch
            ? "url(#glow-border-amber)"
            : "url(#glow-border-green)";

          // Individual borrower formatted scores
          const scoreDisplay =
            b.name === "Meera" ? "0.62" :
            b.name === "Kavita" ? "0.58" :
            b.name === "Farah" ? "0.61" :
            b.name === "Lata" ? "0.21" :
            (b.stressScore / 100).toFixed(2);

          return (
            <g
              key={b.id}
              onClick={() => onSelect(isSelected ? null : b.id)}
              onMouseEnter={() => setHoveredNode(b.id)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{
                cursor: "pointer",
                transition: "transform 0.2s ease-out",
                transformOrigin: `${pos.x}px ${pos.y}px`,
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
            >
              {/* Target Selection Ring */}
              {isSelected && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={nodeRadius + 14}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  filter="url(#select-ring-glow)"
                />
              )}

              {/* Diffuse Outer Ambient Glow */}
              {isCritical && (
                <>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={56}
                    fill="rgba(244, 63, 94, 0.16)"
                    filter="url(#glow-diffuse-coral)"
                  />
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={49}
                    fill="none"
                    stroke="rgba(244, 63, 94, 0.28)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                </>
              )}

              {isWatch && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={46}
                  fill="rgba(245, 158, 11, 0.1)"
                  filter="url(#glow-diffuse-amber)"
                />
              )}

              {isHealthy && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={46}
                  fill="rgba(16, 185, 129, 0.16)"
                  filter="url(#glow-diffuse-green)"
                />
              )}

              {/* Main Node Circle */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={nodeRadius}
                fill={isAsha ? "url(#asha-core-gradient)" : "#0d1726"}
                stroke={themeColor}
                strokeWidth={isCritical ? 2.5 : 2.2}
                filter={glowFilter}
                style={{ transition: "stroke 0.3s, fill 0.3s" }}
              />

              {/* HUD Brackets (Segmented Arc Accents) exactly as in reference image */}
              {isAsha && (
                <>
                  {/* Top-Right arc */}
                  <path
                    d={describeArc(pos.x, pos.y, hudRadius, 15, 75)}
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth={3.5}
                    strokeLinecap="round"
                  />
                  {/* Bottom-Left arc */}
                  <path
                    d={describeArc(pos.x, pos.y, hudRadius, 150, 215)}
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth={3.5}
                    strokeLinecap="round"
                  />
                </>
              )}

              {b.name === "Meera" && (
                <path
                  d={describeArc(pos.x, pos.y, hudRadius, 10, 72)}
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth={3.5}
                  strokeLinecap="round"
                />
              )}

              {b.name === "Kavita" && (
                <path
                  d={describeArc(pos.x, pos.y, hudRadius, 15, 75)}
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth={3.5}
                  strokeLinecap="round"
                />
              )}

              {b.name === "Farah" && (
                <path
                  d={describeArc(pos.x, pos.y, hudRadius, 120, 180)}
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth={3.5}
                  strokeLinecap="round"
                />
              )}

              {b.name === "Lata" && (
                <path
                  d={describeArc(pos.x, pos.y, hudRadius, 15, 75)}
                  fill="none"
                  stroke="#34d399"
                  strokeWidth={3.5}
                  strokeLinecap="round"
                />
              )}

              {/* Person Silhouette Avatar Icon */}
              {isAsha ? (
                <g transform={`translate(${pos.x}, ${pos.y - 8})`}>
                  <circle cx="0" cy="-4" r="4.2" fill="#f43f5e" />
                  <path
                    d="M -7.5 7 C -7.5 2 -3.5 0.5 0 0.5 C 3.5 0.5 7.5 2 7.5 7 Z"
                    fill="#f43f5e"
                  />
                </g>
              ) : (
                <g transform={`translate(${pos.x}, ${pos.y - 12})`}>
                  <circle cx="0" cy="-4" r="3.8" fill={themeColor} />
                  <path
                    d="M -7 6.5 C -7 2 -3 0.8 0 0.8 C 3 0.8 7 2 7 6.5 Z"
                    fill={themeColor}
                  />
                </g>
              )}

              {/* Node Name Label */}
              <text
                x={pos.x}
                y={isAsha ? pos.y + 13 : pos.y + 7}
                textAnchor="middle"
                fill="#ffffff"
                fontSize={isAsha ? 14 : 12.5}
                fontWeight="600"
                fontFamily="Inter, sans-serif"
                letterSpacing="0.01em"
                style={{ pointerEvents: "none" }}
              >
                {b.name}
              </text>

              {/* Node Risk Score Label (Meera, Kavita, Farah, Lata) */}
              {!isAsha && (
                <text
                  x={pos.x}
                  y={pos.y + 21}
                  textAnchor="middle"
                  fill="#cbd5e1"
                  fontSize={10.5}
                  fontWeight="600"
                  fontFamily="Inter, sans-serif"
                  style={{ pointerEvents: "none" }}
                >
                  {scoreDisplay}
                </text>
              )}
            </g>
          );
        })}
      </g>

      {/* ── Footer Telemetry Metrics (Bottom-Left) ───────────────────── */}
      <g id="footer-metrics" transform="translate(38, 520)">
        {/* Metric 1: Entities */}
        <g transform="translate(16, 0)">
          <text
            x="0"
            y="20"
            fill="#ffffff"
            fontSize="21"
            fontWeight="700"
            fontFamily="Inter, sans-serif"
          >
            4
          </text>
          <text
            x="0"
            y="33"
            fill="#647e99"
            fontSize="8.5"
            fontWeight="700"
            fontFamily="'JetBrains Mono', monospace, sans-serif"
            letterSpacing="0.12em"
          >
            ENTITIES
          </text>
        </g>

        {/* Divider 1 */}
        <line x1="68" y1="5" x2="68" y2="35" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />

        {/* Metric 2: Connections */}
        <g transform="translate(100, 0)">
          <text
            x="0"
            y="20"
            fill="#ffffff"
            fontSize="21"
            fontWeight="700"
            fontFamily="Inter, sans-serif"
          >
            6
          </text>
          <text
            x="0"
            y="33"
            fill="#647e99"
            fontSize="8.5"
            fontWeight="700"
            fontFamily="'JetBrains Mono', monospace, sans-serif"
            letterSpacing="0.12em"
          >
            CONNECTIONS
          </text>
        </g>

        {/* Divider 2 */}
        <line x1="172" y1="5" x2="172" y2="35" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />

        {/* Metric 3: Highest Risk */}
        <g transform="translate(204, 0)">
          <text
            x="0"
            y="20"
            fill="#f43f5e"
            fontSize="21"
            fontWeight="700"
            fontFamily="Inter, sans-serif"
          >
            0.87
          </text>
          <text
            x="0"
            y="33"
            fill="#647e99"
            fontSize="8.5"
            fontWeight="700"
            fontFamily="'JetBrains Mono', monospace, sans-serif"
            letterSpacing="0.12em"
          >
            HIGHEST RISK
          </text>
        </g>
      </g>

      {/* ── Footer Action Button: INVESTIGATE NETWORK (Bottom-Right) ─── */}
      <g
        id="investigate-network-btn"
        transform="translate(600, 524)"
        onClick={() => {
          if (onInvestigate) onInvestigate();
          else onSelect("network");
        }}
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
        style={{ cursor: "pointer" }}
        role="button"
        tabIndex={0}
      >
        <rect
          width="168"
          height="38"
          rx="7"
          fill={btnHovered ? "rgba(30, 58, 95, 0.6)" : "rgba(11, 20, 36, 0.85)"}
          stroke={btnHovered ? "rgba(96, 165, 250, 0.75)" : "rgba(56, 189, 248, 0.35)"}
          strokeWidth="1.2"
          style={{ transition: "all 0.15s ease-out" }}
        />
        <text
          x="72"
          y="23.5"
          textAnchor="middle"
          fill={btnHovered ? "#ffffff" : "#cbd5e1"}
          fontSize="10"
          fontWeight="700"
          fontFamily="'JetBrains Mono', monospace, sans-serif"
          letterSpacing="0.08em"
          style={{ transition: "fill 0.15s ease-out" }}
        >
          INVESTIGATE NETWORK
        </text>
        {/* Right Arrow */}
        <path
          d="M 142 19 L 148 19 M 145 16 L 148 19 L 145 22"
          fill="none"
          stroke={btnHovered ? "#ffffff" : "#cbd5e1"}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transition: "stroke 0.15s ease-out" }}
        />
      </g>

      {/* Detailed mode (NetworkScreen): Step 5 outcome banner */}
      {!compact && simStep >= 5 && (
        <g transform="translate(160, 485)">
          <rect
            width="480"
            height="32"
            rx="6"
            fill="rgba(16,185,129,0.12)"
            stroke="rgba(16,185,129,0.3)"
            strokeWidth="1"
          />
          <text
            x="240"
            y="20"
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="600"
            fill="#10b981"
            fontFamily="Inter, sans-serif"
          >
            Lata remains Healthy — independent income, not in the guarantee chain
          </text>
        </g>
      )}
    </svg>
  );
}

