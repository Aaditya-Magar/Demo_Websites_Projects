import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;
    document.body.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 5}px, ${e.clientY - 5}px, 0)`;
      }
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!ringRef.current) return;
      if (t.closest("a, button, [data-cursor='hover']")) {
        ringRef.current.classList.add("cursor-ring--hover");
      } else {
        ringRef.current.classList.remove("cursor-ring--hover");
      }
    };

    let raf = 0;
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.14;
      pos.current.y += (target.current.y - pos.current.y) * 0.14;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.x - 18}px, ${pos.current.y - 18}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <style>{`
        .cursor-dot, .cursor-ring { position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999; will-change: transform; }
        .cursor-dot { width: 10px; height: 10px; border-radius: 9999px; background: #FDFAF4; mix-blend-mode: difference; }
        .cursor-ring { width: 36px; height: 36px; border-radius: 9999px; border: 1.5px solid #D4A853; transition: width .25s ease, height .25s ease, background-color .25s ease, border-color .25s ease; }
        .cursor-ring.cursor-ring--hover { width: 60px; height: 60px; margin-left: -12px; margin-top: -12px; background: rgba(212,168,83,0.15); border-color: #D4A853; }
        @media (pointer: coarse) { .cursor-dot, .cursor-ring { display: none; } }
      `}</style>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      if (ref.current) ref.current.style.transform = `scaleX(${scrolled})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[9998] bg-transparent">
      <div ref={ref} className="h-full bg-gold origin-left" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
