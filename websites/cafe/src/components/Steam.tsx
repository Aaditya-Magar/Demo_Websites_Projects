export function Steam({ count = 8 }: { count?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute bottom-0 block rounded-full bg-white/30 blur-md"
          style={{
            left: `${10 + i * 11}%`,
            width: `${20 + (i % 3) * 12}px`,
            height: `${20 + (i % 3) * 12}px`,
            animation: `steam ${5 + (i % 4)}s ease-in ${i * 0.6}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
