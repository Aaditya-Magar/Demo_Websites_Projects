import { useEffect, useState } from "react";

export function Sparkles({ count = 22 }: { count?: number }) {
  const [dots, setDots] = useState<Array<{ left: number; size: number; delay: number; duration: number; opacity: number; key: number }>>([]);
  useEffect(() => {
    setDots(
      Array.from({ length: count }).map((_, i) => ({
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 8,
        duration: 9 + Math.random() * 10,
        opacity: 0.3 + Math.random() * 0.5,
        key: i,
      }))
    );
  }, [count]);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <span
          key={d.key}
          className="sparkle"
          style={{
            left: `${d.left}%`,
            bottom: `-10px`,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
