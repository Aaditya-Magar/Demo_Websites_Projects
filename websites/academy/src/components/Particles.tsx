import { useMemo } from "react";

export function Particles({ count = 24 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: Math.random() * 100,
        size: 4 + Math.random() * 8,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 10,
        opacity: 0.3 + Math.random() * 0.6,
      })),
    [count]
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full bg-accent/70 blur-[1px] animate-particle"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
