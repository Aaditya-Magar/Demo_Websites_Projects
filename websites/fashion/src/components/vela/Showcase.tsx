import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const callouts = [
  "100% Organic Linen",
  "Hand-finished seams",
  "Natural plant dyes",
];

export const Showcase = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  // mouse parallax
  const target = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    // Skip parallax on touch / small screens
    if (window.matchMedia("(hover: none), (max-width: 768px)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      target.current = { x, y };
    };
    const onLeave = () => {
      target.current = { x: 0, y: 0 };
    };
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);

    let raf = 0;
    const loop = () => {
      cur.current.x += (target.current.x - cur.current.x) * 0.08;
      cur.current.y += (target.current.y - cur.current.y) * 0.08;
      if (imgRef.current) {
        const rx = cur.current.y * -10;
        const ry = cur.current.x * 14;
        const tx = cur.current.x * 30;
        const ty = cur.current.y * 30;
        imgRef.current.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translate3d(${tx}px, ${ty}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-vela-charcoal px-6 py-24 text-vela-cream md:px-10 md:py-36">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left text + SVG lines */}
        <div className="relative">
          <p className="mb-4 text-[10px] uppercase tracking-vela text-vela-terracotta md:text-xs">
            The Craft
          </p>
          <h2 className="font-display text-5xl italic leading-[0.95] md:text-7xl">
            Crafted<br />Different.
          </h2>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-vela-cream/70 md:text-base">
            Every VELA garment is a study in restraint — woven slowly, finished by hand,
            and dyed with what the earth provides. We make less, so we can make better.
          </p>

          <ul className="mt-12 space-y-6">
            {callouts.map((c, i) => (
              <li key={c} className="flex items-center gap-5">
                <svg width="80" height="2" className="overflow-visible">
                  <motion.line
                    x1="0" y1="1" x2="80" y2="1"
                    stroke="hsl(var(--vela-terracotta))"
                    strokeWidth="1"
                    strokeDasharray="80"
                    strokeDashoffset="80"
                    animate={inView ? { strokeDashoffset: 0 } : {}}
                    transition={{ duration: 1, delay: 0.4 + i * 0.2, ease: "easeOut" }}
                  />
                </svg>
                <span className="font-display text-2xl italic md:text-3xl">{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: 3D parallax + orbit */}
        <div ref={wrapRef} className="relative mx-auto h-[380px] w-full max-w-[520px] sm:h-[460px] md:h-[600px]">
          <div
            ref={imgRef}
            className="absolute inset-0 transition-transform duration-100 ease-out will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=900"
              alt="Hero garment"
              className="h-full w-full object-cover shadow-2xl"
            />
          </div>

          {/* Orbit images */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0">
            <div className="absolute -translate-x-1/2 -translate-y-1/2 animate-orbit-1">
              <img
                src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300"
                alt=""
                className="h-20 w-20 object-cover shadow-xl ring-1 ring-vela-cream/20 md:h-24 md:w-24"
              />
            </div>
            <div className="absolute -translate-x-1/2 -translate-y-1/2 animate-orbit-2">
              <img
                src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=300"
                alt=""
                className="h-16 w-16 object-cover shadow-xl ring-1 ring-vela-cream/20 md:h-20 md:w-20"
              />
            </div>
            <div className="absolute -translate-x-1/2 -translate-y-1/2 animate-orbit-3">
              <img
                src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=300"
                alt=""
                className="h-20 w-20 object-cover shadow-xl ring-1 ring-vela-cream/20 md:h-24 md:w-24"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
