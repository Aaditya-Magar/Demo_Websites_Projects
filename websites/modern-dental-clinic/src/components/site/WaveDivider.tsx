export function WaveDivider({ from = "navy", to = "white", flip = false }: { from?: string; to?: string; flip?: boolean }) {
  // colors handled via classes by parent; this component is a simple svg wave separator
  return (
    <div className={`relative -mb-px ${flip ? "rotate-180" : ""}`} aria-hidden>
      <svg viewBox="0 0 1440 80" className="block w-full h-12 lg:h-16" preserveAspectRatio="none">
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
