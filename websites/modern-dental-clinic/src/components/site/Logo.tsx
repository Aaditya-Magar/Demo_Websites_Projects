export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#home" className="flex items-center gap-2.5 group">
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal to-teal-glow shadow-[0_8px_20px_-6px_rgba(0,194,203,0.7)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-navy-deep" fill="currentColor">
          <path d="M12 2c-3 0-5.5 1-7 2.6-1.5 1.7-1.3 4.3-.4 6.9.6 1.6 1 3 1.2 4.9.2 2.2 1.2 5.6 2.7 5.6 1.2 0 1.4-2.2 1.8-4.6.3-1.8.8-2.6 1.7-2.6s1.4.8 1.7 2.6c.4 2.4.6 4.6 1.8 4.6 1.5 0 2.5-3.4 2.7-5.6.2-1.9.6-3.3 1.2-4.9.9-2.6 1.1-5.2-.4-6.9C17.5 3 15 2 12 2z" />
        </svg>
      </span>
      <span className={`font-display text-xl tracking-tight ${light ? "text-white" : "text-navy-deep"}`}>
        Smile<span className="text-teal">Craft</span>
        <span className={`ml-1 text-xs font-sans uppercase tracking-[0.2em] ${light ? "text-white/60" : "text-navy/60"}`}>Dental</span>
      </span>
    </a>
  );
}
