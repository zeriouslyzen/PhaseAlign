"use client";

const FORMULAS = [
  "∑", "∫", "π", "φ", "√", "∇", "∂", "Δ", "α", "β", "γ", "ω",
  "×", "+", "−", "=", "≈", "∞", "θ", "λ", "σ", "τ",
];

const ANIMS = ["float-drift-1", "float-drift-2", "float-drift-3"] as const;

export function NavBarBackground() {
  const items = FORMULAS.slice(0, 18).map((formula, i) => ({
    formula,
    left: `${5 + (i * 5.5) % 90}%`,
    top: `${10 + (i * 7) % 80}%`,
    delay: `${(i * 0.4) % 4}s`,
    duration: 4 + (i % 3),
    anim: ANIMS[i % 3],
  }));

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-none"
      aria-hidden
    >
      {items.map((item, i) => (
        <span
          key={`${item.formula}-${i}`}
          className="absolute text-xs sm:text-sm font-cyber whitespace-nowrap select-none text-white"
          style={{
            left: item.left,
            top: item.top,
            textShadow: "0 0 6px rgba(255,255,255,1), 0 0 12px rgba(255,255,255,0.8)",
            animation: `${item.anim} ${item.duration}s ease-in-out infinite`,
            animationDelay: item.delay,
          }}
        >
          {item.formula}
        </span>
      ))}
      {[...Array(12)].map((_, i) => (
        <span
          key={`star-${i}`}
          className="absolute h-px w-px rounded-full bg-white"
          style={{
            left: `${(i * 8.3) % 95}%`,
            top: `${15 + (i * 11) % 70}%`,
            boxShadow: "0 0 8px 2px rgba(255,255,255,0.9)",
            animation: "float-star 3s ease-in-out infinite",
            animationDelay: `${(i * 0.2) % 2}s`,
          }}
        />
      ))}
    </div>
  );
}
