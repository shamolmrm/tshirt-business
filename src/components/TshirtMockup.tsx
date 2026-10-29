import React from "react";

interface Props {
  color?: string;
  width?: number;
  design?: React.ReactNode;
  shadow?: boolean;
  view?: "front" | "back" | "both";
}

export const PRINT_AREA = { w: 164, h: 190, cx: 82, cy: 95 };

// ─── Single shirt (front or back) ────────────────────────────────────────────
function ShirtShape({ color, isFront, uid }: { color: string; isFront: boolean; uid: string }) {
  const isLight = ["#ffffff","#f5f5f5","#fafafa","#eeeeee","#e8e8e8","#e0e0e0"].includes(color.toLowerCase());
  const base = isLight ? "#d8d8d8" : color;
  const edgeDark = isLight ? "rgba(0,0,0,0.30)" : "rgba(0,0,0,0.72)";
  const edgeMid  = isLight ? "rgba(0,0,0,0.10)" : "rgba(0,0,0,0.30)";
  const centerHL = isLight ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.07)";
  const wrinkle  = isLight ? "rgba(0,0,0,0.07)"  : "rgba(255,255,255,0.04)";
  const seam     = isLight ? "rgba(0,0,0,0.10)"  : "rgba(255,255,255,0.06)";
  const collarBg = isLight ? "#c0c0c0" : "rgba(0,0,0,0.70)";
  const collarHL = isLight ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.10)";

  /* ── viewBox: 500 × 560 ── */
  return (
    <g>
      <defs>
        {/* Side-to-center gradient */}
        <linearGradient id={`sg-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor={edgeDark} />
          <stop offset="14%"  stopColor={edgeMid} />
          <stop offset="42%"  stopColor="rgba(0,0,0,0)" />
          <stop offset="50%"  stopColor={centerHL} />
          <stop offset="58%"  stopColor="rgba(0,0,0,0)" />
          <stop offset="86%"  stopColor={edgeMid} />
          <stop offset="100%" stopColor={edgeDark} />
        </linearGradient>

        {/* Top-bottom gradient */}
        <linearGradient id={`tg-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(0,0,0,0.18)" />
          <stop offset="12%"  stopColor="rgba(0,0,0,0.04)" />
          <stop offset="55%"  stopColor="rgba(0,0,0,0)" />
          <stop offset="88%"  stopColor="rgba(0,0,0,0.06)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.28)" />
        </linearGradient>

        {/* Armhole inner shadow */}
        <radialGradient id={`ah-${uid}-l`} cx="100%" cy="0%" r="100%">
          <stop offset="0%"   stopColor="rgba(0,0,0,0.55)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <radialGradient id={`ah-${uid}-r`} cx="0%" cy="0%" r="100%">
          <stop offset="0%"   stopColor="rgba(0,0,0,0.55)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>

        {/* Fabric noise texture */}
        <filter id={`noise-${uid}`} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" result="n"/>
          <feColorMatrix type="saturate" values="0" in="n" result="gn"/>
          <feBlend mode="overlay" in="SourceGraphic" in2="gn" result="b"/>
          <feComposite operator="in" in="b" in2="SourceGraphic"/>
        </filter>

        {/* Drop shadow */}
        <filter id={`ds-${uid}`} x="-10%" y="-4%" width="120%" height="120%">
          <feDropShadow dx="0" dy="10" stdDeviation="18"
            floodColor={isLight ? "rgba(140,140,140,0.5)" : "rgba(0,0,0,0.65)"} />
        </filter>
      </defs>

      {/* ── Shirt silhouette ── */}
      {/* Main body fill */}
      <path filter={`url(#ds-${uid})`}
        d="M 172,52
           C 148,44 112,42 82,48
           L 34,66 L 4,84 L 2,165
           C 20,175 44,179 68,176
           L 94,156
           C 97,170 100,184 101,198
           L 99,522
           C 140,528 184,531 250,531
           C 316,531 360,528 401,522
           L 399,198
           C 400,184 403,170 406,156
           L 432,176
           C 456,179 480,175 498,165
           L 496,84 L 466,66 L 418,48
           C 388,42 352,44 328,52
           C 316,68 304,82 291,91
           Q 250,99 209,91
           C 196,82 184,68 172,52 Z"
        fill={base}
      />

      {/* Fabric texture overlay (very subtle) */}
      <path
        d="M 172,52
           C 148,44 112,42 82,48
           L 34,66 L 4,84 L 2,165
           C 20,175 44,179 68,176
           L 94,156
           C 97,170 100,184 101,198
           L 99,522
           C 140,528 184,531 250,531
           C 316,531 360,528 401,522
           L 399,198
           C 400,184 403,170 406,156
           L 432,176
           C 456,179 480,175 498,165
           L 496,84 L 466,66 L 418,48
           C 388,42 352,44 328,52
           C 316,68 304,82 291,91
           Q 250,99 209,91
           C 196,82 184,68 172,52 Z"
        fill="transparent"
        filter={`url(#noise-${uid})`}
        opacity="0.07"
      />

      {/* Side gradient overlay */}
      <path
        d="M 172,52
           C 148,44 112,42 82,48
           L 34,66 L 4,84 L 2,165
           C 20,175 44,179 68,176
           L 94,156
           C 97,170 100,184 101,198
           L 99,522
           C 140,528 184,531 250,531
           C 316,531 360,528 401,522
           L 399,198
           C 400,184 403,170 406,156
           L 432,176
           C 456,179 480,175 498,165
           L 496,84 L 466,66 L 418,48
           C 388,42 352,44 328,52
           C 316,68 304,82 291,91
           Q 250,99 209,91
           C 196,82 184,68 172,52 Z"
        fill={`url(#sg-${uid})`}
      />

      {/* Top-bottom gradient */}
      <path
        d="M 101,198 L 99,522
           C 140,528 184,531 250,531
           C 316,531 360,528 401,522
           L 399,198 Z"
        fill={`url(#tg-${uid})`}
      />

      {/* ── Collar ── */}
      <path
        d="M 172,52
           C 184,68 196,82 209,91
           Q 250,99 291,91
           C 304,82 316,68 328,52
           C 312,35 286,26 250,25
           C 214,26 188,35 172,52 Z"
        fill={collarBg}
      />
      {/* Collar inner highlight curve */}
      <path
        d="M 178,56 C 192,70 204,82 216,90 Q 250,98 284,90 C 296,82 308,70 322,56"
        fill="none" stroke={collarHL} strokeWidth="2.5" opacity="0.9"
      />
      {/* Collar rib lines */}
      {[0,1,2,3].map(n => (
        <path key={n}
          d={`M ${178+n*3.2},${56+n*4} C ${192+n*2},${70+n*3} ${204+n*1.5},${82+n*2} ${216+n},${90+n} Q ${250},${98+n} ${284-n},${90+n} C ${296-n*1.5},${82+n*2} ${308-n*2},${70+n*3} ${322-n*3.2},${56+n*4}`}
          fill="none"
          stroke={isLight ? "rgba(0,0,0,0.09)" : "rgba(255,255,255,0.07)"}
          strokeWidth="0.8"
        />
      ))}

      {/* ── Seam lines ── */}
      {/* Left side seam */}
      <line x1="101" y1="200" x2="99" y2="520" stroke={seam} strokeWidth="1.2" />
      {/* Right side seam */}
      <line x1="399" y1="200" x2="401" y2="520" stroke={seam} strokeWidth="1.2" />
      {/* Left shoulder seam */}
      <path d="M 172,52 C 148,44 112,42 82,48 L 34,66 L 4,84" fill="none" stroke={seam} strokeWidth="1" />
      {/* Right shoulder seam */}
      <path d="M 328,52 C 352,44 388,42 418,48 L 466,66 L 496,84" fill="none" stroke={seam} strokeWidth="1" />
      {/* Left sleeve cuff */}
      <path d="M 2,165 C 20,175 44,179 68,176" fill="none" stroke={seam} strokeWidth="1.5" />
      {/* Right sleeve cuff */}
      <path d="M 498,165 C 480,175 456,179 432,176" fill="none" stroke={seam} strokeWidth="1.5" />
      {/* Hem */}
      <path d="M 99,522 C 140,528 184,531 250,531 C 316,531 360,528 401,522"
        fill="none" stroke={seam} strokeWidth="1.5" />
      <path d="M 99,516 C 140,522 184,525 250,525 C 316,525 360,522 401,516"
        fill="none" stroke={wrinkle} strokeWidth="1" />

      {/* ── Armhole transition shadow ── */}
      <path d="M 94,156 C 97,170 100,184 101,198" fill="none" stroke={seam} strokeWidth="1.5" />
      <path d="M 406,156 C 403,170 400,184 399,198" fill="none" stroke={seam} strokeWidth="1.5" />

      {/* Left armhole inner shadow */}
      <path d="M 68,176 L 94,156 C 97,170 100,184 101,198 L 99,230 Z"
        fill={`url(#ah-${uid}-l)`} opacity="0.6" />
      {/* Right armhole inner shadow */}
      <path d="M 432,176 L 406,156 C 403,170 400,184 399,198 L 401,230 Z"
        fill={`url(#ah-${uid}-r)`} opacity="0.6" />

      {/* ── Centre highlight streak ── */}
      <path d="M 240,200 L 236,510 L 248,510 L 244,200 Z"
        fill={centerHL} opacity="0.5" />

      {/* ── Subtle wrinkle lines on body ── */}
      <path d="M 138,320 C 142,350 144,390 141,430" fill="none" stroke={wrinkle} strokeWidth="1.2" />
      <path d="M 362,320 C 358,350 356,390 359,430" fill="none" stroke={wrinkle} strokeWidth="1.2" />
      <path d="M 210,430 C 220,448 240,455 260,448 C 272,444 282,436 288,425"
        fill="none" stroke={wrinkle} strokeWidth="1" />

      {/* ── Sleeve inner fold line ── */}
      <path d="M 52,171 L 94,156" fill="none" stroke={wrinkle} strokeWidth="1.5" />
      <path d="M 448,171 L 406,156" fill="none" stroke={wrinkle} strokeWidth="1.5" />

      {/* ── Shoulder highlight patches ── */}
      <ellipse cx="130" cy="80" rx="45" ry="18" fill={centerHL} opacity="0.55" transform="rotate(-20,130,80)" />
      <ellipse cx="370" cy="80" rx="45" ry="18" fill={centerHL} opacity="0.55" transform="rotate(20,370,80)" />

      {/* ── Back-specific: center back seam ── */}
      {!isFront && (
        <>
          <line x1="250" y1="200" x2="250" y2="520" stroke={seam} strokeWidth="1.2" />
          {/* Back neck label area */}
          <rect x="228" y="82" width="44" height="22" rx="3"
            fill={isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"} />
          <line x1="234" y1="88" x2="266" y2="88" stroke={isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)"} strokeWidth="1" />
          <line x1="234" y1="94" x2="266" y2="94" stroke={isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"} strokeWidth="1" />
          <line x1="234" y1="100" x2="254" y2="100" stroke={isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"} strokeWidth="1" />
        </>
      )}
    </g>
  );
}

// ─── Main exported component ──────────────────────────────────────────────────
export default function TshirtMockup({ color = "#111111", width = 320, design, shadow = true, view = "front" }: Props) {
  const uid = (color + view).replace(/[^a-z0-9]/gi, "");

  if (view === "both") {
    return (
      <svg viewBox="0 0 1060 580" style={{ width, height: "auto", display: "block" }}
        xmlns="http://www.w3.org/2000/svg">
        {/* Front */}
        <g transform="translate(10, 10) scale(0.96)">
          <ShirtShape color={color} isFront uid={uid + "f"} />
          {design && <g transform="translate(168, 200)">{design}</g>}
        </g>
        {/* Back */}
        <g transform="translate(540, 10) scale(0.96)">
          <ShirtShape color={color} isFront={false} uid={uid + "b"} />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 500 560" style={{ width, height: "auto", display: "block" }}
      xmlns="http://www.w3.org/2000/svg">
      {shadow && (
        <ellipse cx="250" cy="550" rx="170" ry="10"
          fill="rgba(0,0,0,0.18)" />
      )}
      <ShirtShape color={color} isFront={view === "front"} uid={uid} />
      {view === "front" && design && (
        <g transform="translate(168, 200)">{design}</g>
      )}
    </svg>
  );
}
