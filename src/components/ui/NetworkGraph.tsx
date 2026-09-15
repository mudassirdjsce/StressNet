import React, { useState } from "react";
import type { Borrower, Edge, RiskState, BorrowerState } from "../../utils/mock";

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
// Center Asha: (400, 290)
// Outer ellipse: rx=320, ry=210
// Middle ellipse: rx=210, ry=140
// Inner ellipse: rx=105, ry=70

const RADAR_LAYOUT: Record<string, { x: number; y: number }> = {
  "G07-A1": { x: 400, y: 290 }, // Asha (Center)
  "G07-A2": { x: 150, y: 160 }, // Meera (Top-Left)
  "G07-A3": { x: 650, y: 160 }, // Kavita (Top-Right)
  "G07-A4": { x: 650, y: 420 }, // Farah (Bottom-Right)
  "G07-A5": { x: 150, y: 420 }, // Lata (Bottom-Left)
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
  // Scenario B propagation sequence
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
  showEdgeLegend = false,
  scenarioBorrowerStates,
  scenarioOverrides,
  showAfterIntervention = false,
}: NetworkGraphProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const overrides = scenarioOverrides || scenarioBorrowerStates;

  // Radar center and radii
  const cx = 400;
  const cy = 290;
  const rxOuter = 320;
  const ryOuter = 210;
  const rxMid = 210;
  const ryMid = 140;
  const rxInner = 105;
  const ryInner = 70;

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
        background: "#0d1522",
      }}
      aria-label="Group G-07 relationship radar network"
    >
      <defs>
        {/* Glow filters */}
        <filter id="glow-diffuse-coral" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
        </filter>

        <filter id="glow-diffuse-amber" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
        </filter>

        <filter id="glow-diffuse-green" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
        </filter>

        {/* Soft edge blur for borders */}
        <filter id="glow-border-coral" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="#f43f5e" floodOpacity="0.6" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="shadow" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glow-border-amber" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="#f59e0b" floodOpacity="0.5" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="shadow" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glow-border-green" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feFlood floodColor="#10b981" floodOpacity="0.7" result="color" />
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
        {/* Radial gradient for Asha central node fill */}
        <radialGradient id="asha-core-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3d121f" />
          <stop offset="70%" stopColor="#240c14" />
          <stop offset="100%" stopColor="#14060b" />
        </radialGradient>

        {/* Sweep gradient for rotating radar scan */}
        <radialGradient id="radar-sweep-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.14" />
          <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="sweep-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
          <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.75" />
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
            transform-origin: 400px 290px;
            animation: radarSpin 42s linear infinite;
          }
          .radar-orbit-spin-rev {
            transform-origin: 400px 290px;
            animation: radarSpinReverse 32s linear infinite;
          }
          .radar-scanner-sweep {
            transform-origin: 400px 290px;
            animation: radarSweepScan 16s linear infinite;
          }
        `}</style>
      </defs>

      {/* ── Background Canvas ───────────────────────────────────────── */}
      <rect width="800" height="580" fill="#0d1522" />

      {/* ── Header: GROUP G-07 (Top-Left) ───────────────────────────── */}
      <g id="header-group">
        <text
          x="36"
          y="42"
          fill="#8e9eb5"
          fontSize="13"
          fontWeight="600"
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing="0.14em"
        >
          GROUP G-07
        </text>
        {/* Underline bar: bright front, subtle track */}
        <line x1="36" y1="52" x2="76" y2="52" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="76" y1="52" x2="140" y2="52" stroke="rgba(142,158,181,0.22)" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* ── Top-Right Legend Pill ───────────────────────────────────── */}
      <g id="legend-pill" transform="translate(562, 22)">
        <rect
          width="202"
          height="34"
          rx="8"
          fill="rgba(13,23,38,0.75)"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
        {/* Healthy */}
        <g transform="translate(14, 17)">
          <circle cx="0" cy="0" r="5" fill="none" stroke="#10b981" strokeWidth="1.8" />
          <text x="10" y="4" fill="#e2e8f0" fontSize="11" fontWeight="500" fontFamily="Inter, sans-serif">
            Healthy
          </text>
        </g>
        {/* Watch */}
        <g transform="translate(86, 17)">
          <circle cx="0" cy="0" r="5" fill="none" stroke="#f59e0b" strokeWidth="1.8" />
          <text x="10" y="4" fill="#e2e8f0" fontSize="11" fontWeight="500" fontFamily="Inter, sans-serif">
            Watch
          </text>
        </g>
        {/* Critical */}
        <g transform="translate(148, 17)">
          <circle cx="0" cy="0" r="5" fill="none" stroke="#f43f5e" strokeWidth="1.8" />
          <text x="10" y="4" fill="#e2e8f0" fontSize="11" fontWeight="500" fontFamily="Inter, sans-serif">
            Critical
          </text>
        </g>
      </g>

      {/* ── Rotating Circular Orbit Rings & HUD Compass ────────────── */}
      <g id="rotating-orbit-system" pointerEvents="none">
        {/* Clockwise rotating segmented circular orbit rings */}
        <g className="radar-orbit-spin">
          <circle
            cx={cx}
            cy={cy}
            r={240}
            fill="none"
            stroke="rgba(65, 115, 175, 0.16)"
            strokeWidth="1"
            strokeDasharray="14 28 4 28"
          />
          <circle
            cx={cx}
            cy={cy}
            r={335}
            fill="none"
            stroke="rgba(65, 115, 175, 0.11)"
            strokeWidth="0.8"
            strokeDasharray="2 36 6 36"
          />
          {/* Subtle rotating tick marks at regular intervals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const p1 = polarToCartesian(cx, cy, 235, deg);
            const p2 = polarToCartesian(cx, cy, 245, deg);
            return (
              <line
                key={`tick-${deg}`}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke="rgba(100, 150, 210, 0.28)"
                strokeWidth="1"
              />
            );
          })}
        </g>

        {/* Counter-clockwise rotating inner reticle ring */}
        <g className="radar-orbit-spin-rev">
          <circle
            cx={cx}
            cy={cy}
            r={115}
            fill="none"
            stroke="rgba(80, 135, 200, 0.18)"
            strokeWidth="1"
            strokeDasharray="8 20 2 20"
          />
          {/* Quadrant micro blip dots */}
          {[0, 90, 180, 270].map((deg) => {
            const pt = polarToCartesian(cx, cy, 115, deg);
            return (
              <circle
                key={`blip-${deg}`}
                cx={pt.x}
                cy={pt.y}
                r="1.8"
                fill="#38bdf8"
                opacity="0.55"
              />
            );
          })}
        </g>

        {/* Live Rotating Radar Scanner Sweep Beam */}
        <g className="radar-scanner-sweep">
          {/* Faint sweeping radar sector */}
          <path
            d={`M ${cx} ${cy} L ${cx + 330} ${cy} A 330 330 0 0 0 ${cx + 233} ${cy - 233} Z`}
            fill="url(#radar-sweep-grad)"
            opacity="0.8"
          />
          {/* Leading beam line */}
          <line
            x1={cx}
            y1={cy}
            x2={cx + 330}
            y2={cy}
            stroke="url(#sweep-line-grad)"
            strokeWidth="1.5"
          />
          {/* Leading beam edge glow particle */}
          <circle cx={cx + 330} cy={cy} r="2.5" fill="#38bdf8" opacity="0.8" />
        </g>
      </g>

      {/* ── Radar Concentric Dashed Ellipses (Flowing Orbital Motion) ─ */}
      <g id="radar-rings" pointerEvents="none">
        {/* Inner ellipse (flowing counter-clockwise) */}
        <ellipse
          cx={cx}
          cy={cy}
          rx={rxInner}
          ry={ryInner}
          fill="none"
          stroke="rgba(70, 100, 140, 0.24)"
          strokeWidth="1"
          strokeDasharray="4 5"
          className="orbit-glide-ccw"
        />
        {/* Middle ellipse (flowing clockwise) */}
        <ellipse
          cx={cx}
          cy={cy}
          rx={rxMid}
          ry={ryMid}
          fill="none"
          stroke="rgba(70, 100, 140, 0.26)"
          strokeWidth="1"
          strokeDasharray="4 5"
          className="orbit-glide-cw"
        />
        {/* Outer ellipse (passes through all 4 outer nodes and 4 cardinal dots, flowing clockwise) */}
        <ellipse
          cx={cx}
          cy={cy}
          rx={rxOuter}
          ry={ryOuter}
          fill="none"
          stroke="rgba(70, 100, 140, 0.35)"
          strokeWidth="1"
          strokeDasharray="4 5"
          className="orbit-glide-outer"
        />
      </g>

      {/* ── Crosshair Grid Axes ─────────────────────────────────────── */}
      <g id="radar-axes">
        {/* Vertical Axis */}
        <line
          x1={cx}
          y1={cy - ryOuter - 10}
          x2={cx}
          y2={cy + ryOuter + 10}
          stroke="rgba(70, 100, 140, 0.26)"
          strokeWidth="1"
          strokeDasharray="4 5"
        />
        {/* Horizontal Axis */}
        <line
          x1={cx - rxOuter - 10}
          y1={cy}
          x2={cx + rxOuter + 10}
          y2={cy}
          stroke="rgba(70, 100, 140, 0.26)"
          strokeWidth="1"
          strokeDasharray="4 5"
        />

        {/* Diagonal Ray Guidelines to sector nodes */}
        <line
          x1={cx}
          y1={cy}
          x2={150}
          y2={160}
          stroke="rgba(70, 100, 140, 0.16)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        <line
          x1={cx}
          y1={cy}
          x2={650}
          y2={160}
          stroke="rgba(70, 100, 140, 0.16)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        <line
          x1={cx}
          y1={cy}
          x2={650}
          y2={420}
          stroke="rgba(70, 100, 140, 0.16)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        {/* Ray to Lata */}
        <line
          x1={cx}
          y1={cy}
          x2={150}
          y2={420}
          stroke="rgba(70, 100, 140, 0.28)"
          strokeWidth="1"
          strokeDasharray="4 5"
        />
      </g>

      {/* ── Cardinal and Intersection Dots ──────────────────────────── */}
      <g id="radar-dots">
        {/* 4 Cardinal Dots on Outer Ellipse */}
        {[
          { x: cx, y: cy - ryOuter }, // Top (400, 80)
          { x: cx, y: cy + ryOuter }, // Bottom (400, 500)
          { x: cx - rxOuter, y: cy }, // Left (80, 290)
          { x: cx + rxOuter, y: cy }, // Right (720, 290)
        ].map((pt, i) => (
          <g key={`cardinal-${i}`}>
            <circle cx={pt.x} cy={pt.y} r="3.5" fill="#8ca0b8" />
            <circle cx={pt.x} cy={pt.y} r="6" fill="none" stroke="rgba(140, 160, 184, 0.22)" strokeWidth="1" />
          </g>
        ))}

        {/* Axis Intersection Dots */}
        {[
          { x: cx, y: cy - ryMid },
          { x: cx, y: cy + ryMid },
          { x: cx - rxMid, y: cy },
          { x: cx + rxMid, y: cy },
          { x: cx, y: cy - ryInner },
          { x: cx, y: cy + ryInner },
          { x: cx - rxInner, y: cy },
          { x: cx + rxInner, y: cy },
        ].map((pt, i) => (
          <circle key={`intersect-${i}`} cx={pt.x} cy={pt.y} r="2" fill="rgba(140, 160, 184, 0.45)" />
        ))}
      </g>

      {/* ── Edges / Connection Lines ────────────────────────────────── */}
      <g id="network-edges">
        {/* 1. Asha -> Meera: Solid Coral-Red Line */}
        <line
          x1={cx}
          y1={cy}
          x2={150}
          y2={160}
          stroke="#f43f5e"
          strokeWidth={2.4}
          style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
        />

        {/* 2. Asha -> Kavita: Dashed Periwinkle/Blue Line */}
        <line
          x1={cx}
          y1={cy}
          x2={650}
          y2={160}
          stroke="#5c77fa"
          strokeWidth={2}
          strokeDasharray="6 4"
          style={{ transition: "stroke 0.3s" }}
        />

        {/* 3. Asha -> Farah: Dashed Amber Line */}
        <line
          x1={cx}
          y1={cy}
          x2={650}
          y2={420}
          stroke="#f59e0b"
          strokeWidth={2}
          strokeDasharray="6 4"
          style={{ transition: "stroke 0.3s" }}
        />

        {/* 4. Lata -> Farah: Dashed Muted Blue Line */}
        <line
          x1={150}
          y1={420}
          x2={650}
          y2={420}
          stroke="#38bdf8"
          strokeWidth={1.8}
          strokeDasharray="6 4"
          opacity={0.65}
          style={{ transition: "stroke 0.3s" }}
        />

        {/* Edge labels for detailed mode (NetworkScreen) */}
        {!compact &&
          edges.map((e) => {
            const fromB = borrowers.find((b) => b.id === e.from);
            const toB = borrowers.find((b) => b.id === e.to);
            if (!fromB || !toB) return null;
            const p1 = getNodePos(fromB);
            const p2 = getNodePos(toB);
            const mx = (p1.x + p2.x) / 2;
            const my = (p1.y + p2.y) / 2;

            return (
              <g key={`label-${e.from}-${e.to}`} opacity={0.9}>
                <rect
                  x={mx - 48}
                  y={my - 9}
                  width={96}
                  height={18}
                  rx={4}
                  fill="rgba(11,18,33,0.9)"
                  stroke="rgba(100,130,180,0.3)"
                  strokeWidth="0.8"
                />
                <text
                  x={mx}
                  y={my + 3}
                  textAnchor="middle"
                  fontSize="8.5"
                  fontWeight="600"
                  fill="#cbd5e1"
                  fontFamily="'JetBrains Mono', monospace"
                  style={{ pointerEvents: "none" }}
                >
                  {e.label}
                </text>
              </g>
            );
          })}
      </g>

      {/* ── Nodes & HUD Brackets ────────────────────────────────────── */}
      <g id="network-nodes">
        {borrowers.map((b) => {
          const pos = getNodePos(b);
          const status = resolveStatus(b, simStep, overrides, showAfterIntervention);
          const isSelected = selectedId === b.id;
          const isHovered = hoveredNode === b.id;
          const isAsha = b.name === "Asha" || b.id === "G07-A1";
          const isLata = b.name === "Lata" || b.id === "G07-A5";

          // Node radii
          const nodeRadius = isAsha ? 38 : 32;
          const hudRadius = isAsha ? 44 : 37;

          // Status colors & themes
          const isCritical = status === "Critical";
          const isWatch = status === "Watch";
          const isHealthy = status === "Healthy";

          const strokeColor = isCritical ? "#f43f5e" : isWatch ? "#f59e0b" : "#10b981";
          const glowFilter = isCritical
            ? "url(#glow-border-coral)"
            : isWatch
            ? "url(#glow-border-amber)"
            : "url(#glow-border-green)";

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

              {/* Diffuse Outer Glow */}
              {isCritical && (
                <>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={56}
                    fill="rgba(244, 63, 94, 0.14)"
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
                  r={44}
                  fill="rgba(245, 158, 11, 0.08)"
                  filter="url(#glow-diffuse-amber)"
                />
              )}

              {isHealthy && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={46}
                  fill="rgba(16, 185, 129, 0.18)"
                  filter="url(#glow-diffuse-green)"
                />
              )}

              {/* Main Node Circle */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={nodeRadius}
                fill={isAsha ? "url(#asha-core-gradient)" : "#0e1726"}
                stroke={strokeColor}
                strokeWidth={isCritical ? 2.5 : 2.2}
                filter={glowFilter}
                style={{ transition: "stroke 0.3s, fill 0.3s" }}
              />

              {/* HUD Brackets (Segmented Arc Accents) matching reference image */}
              {isAsha && (
                <>
                  {/* Top-Right segment */}
                  <path
                    d={describeArc(pos.x, pos.y, hudRadius, 15, 75)}
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth={3.5}
                    strokeLinecap="round"
                  />
                  {/* Bottom segment */}
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
                <>
                  {/* Top-Right arc */}
                  <path
                    d={describeArc(pos.x, pos.y, hudRadius, 5, 68)}
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth={3.5}
                    strokeLinecap="round"
                  />
                  {/* Bottom-Right tick */}
                  <path
                    d={describeArc(pos.x, pos.y, hudRadius, 125, 155)}
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth={3}
                    strokeLinecap="round"
                  />
                </>
              )}

              {b.name === "Kavita" && (
                <>
                  {/* Top-Left arc */}
                  <path
                    d={describeArc(pos.x, pos.y, hudRadius, 290, 350)}
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth={3.5}
                    strokeLinecap="round"
                  />
                  {/* Bottom-Right arc */}
                  <path
                    d={describeArc(pos.x, pos.y, hudRadius, 110, 165)}
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth={3.5}
                    strokeLinecap="round"
                  />
                </>
              )}

              {b.name === "Farah" && (
                <>
                  {/* Top-Right arc */}
                  <path
                    d={describeArc(pos.x, pos.y, hudRadius, 20, 70)}
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth={3.5}
                    strokeLinecap="round"
                  />
                  {/* Bottom arc */}
                  <path
                    d={describeArc(pos.x, pos.y, hudRadius, 160, 210)}
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth={3.5}
                    strokeLinecap="round"
                  />
                </>
              )}

              {isLata && (
                <>
                  {/* Top-Right emerald arc */}
                  <path
                    d={describeArc(pos.x, pos.y, hudRadius, 15, 80)}
                    fill="none"
                    stroke="#34d399"
                    strokeWidth={3.5}
                    strokeLinecap="round"
                  />
                  {/* Bottom-Right notch */}
                  <path
                    d={describeArc(pos.x, pos.y, hudRadius, 170, 200)}
                    fill="none"
                    stroke="#34d399"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                  />
                </>
              )}

              {/* Node Name Label */}
              <text
                x={pos.x}
                y={pos.y + 5}
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize={isAsha ? 15 : 14}
                fontWeight="600"
                fontFamily="Inter, sans-serif"
                letterSpacing="0.01em"
                style={{ pointerEvents: "none", userSelect: "none" }}
              >
                {b.name}
              </text>
            </g>
          );
        })}
      </g>

      {/* Detailed mode (NetworkScreen): Step 5 outcome banner */}
      {!compact && simStep >= 5 && (
        <g transform="translate(160, 525)">
          <rect
            width="480"
            height="32"
            rx="6"
            fill="rgba(16,185,129,0.1)"
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
