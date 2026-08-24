export function Tooth3D({ className = "" }: { className?: string }) {
  return (
    <div className={`scene-3d ${className}`}>
      <div className="tooth-float drop-shadow-[0_20px_40px_rgba(0,194,203,0.45)]">
        <svg viewBox="0 0 200 220" className="w-full h-full">
          <defs>
            <linearGradient id="toothG" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#E8F7F8" />
              <stop offset="100%" stopColor="#9DD9DD" />
            </linearGradient>
            <radialGradient id="toothShine" cx="0.3" cy="0.3" r="0.5">
              <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>
          <path
            d="M100 8c-28 0-52 12-66 30-14 18-12 44-2 70 6 16 10 30 12 50 2 22 12 54 26 54 12 0 14-22 18-46 3-18 8-26 12-26s9 8 12 26c4 24 6 46 18 46 14 0 24-32 26-54 2-20 6-34 12-50 10-26 12-52-2-70-14-18-38-30-66-30z"
            fill="url(#toothG)"
            stroke="rgba(11,20,55,0.15)"
            strokeWidth="1.5"
          />
          <ellipse cx="78" cy="60" rx="22" ry="34" fill="url(#toothShine)" />
          <path d="M70 45c8-10 20-14 32-12" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7" />
        </svg>
      </div>
    </div>
  );
}
