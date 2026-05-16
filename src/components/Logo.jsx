import React from "react";

// Custom Trident SVG logo - premium industrial mark
export default function Logo({ variant = "dark", className = "" }) {
  const fg = variant === "light" ? "#FFFFFF" : "#0F172A";
  const accent = variant === "light" ? "#94A3B8" : "#1E3A8A";

  return (
    <div className={`flex items-center gap-3 ${className}`} data-testid="brand-logo">
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="38" height="38" rx="2" stroke={accent} strokeWidth="1.5" />
        {/* Trident */}
        <path d="M20 6 L20 34" stroke={fg} strokeWidth="2" strokeLinecap="round" />
        <path d="M10 12 L10 18 Q10 22 14 22 L20 22" stroke={fg} strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M30 12 L30 18 Q30 22 26 22 L20 22" stroke={fg} strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M10 12 L8 8 M10 12 L12 8" stroke={fg} strokeWidth="2" strokeLinecap="round" />
        <path d="M30 12 L28 8 M30 12 L32 8" stroke={fg} strokeWidth="2" strokeLinecap="round" />
        <path d="M20 6 L18 2 M20 6 L22 2" stroke={fg} strokeWidth="2" strokeLinecap="round" />
        <circle cx="20" cy="22" r="2" fill={accent} />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-display font-bold text-base tracking-tight" style={{ color: fg }}>
          TRIDENT
        </span>
        <span className="font-body text-[10px] tracking-[0.25em] uppercase mt-0.5" style={{ color: accent }}>
          Enterprise
        </span>
      </div>
    </div>
  );
}
