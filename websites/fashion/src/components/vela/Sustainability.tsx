import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Counter = ({ to, suffix = "" }: { to: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const dur = 1800;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(start + (to - start) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
};

export const Sustainability = () => {
  return (
    <section id="sustainability" className="bg-vela-terracotta px-6 py-24 text-vela-cream md:px-10 md:py-36">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="space-y-10"
        >
          <p className="text-[10px] uppercase tracking-vela text-vela-cream/80 md:text-xs">
            Made With Intention
          </p>

          <div className="border-b border-vela-cream/30 pb-8">
            <div className="font-display text-7xl italic leading-none md:text-9xl">
              <Counter to={100} suffix="%" />
            </div>
            <p className="mt-3 text-xs uppercase tracking-wider-2">Organic Materials</p>
          </div>

          <div className="border-b border-vela-cream/30 pb-8">
            <div className="font-display text-7xl italic leading-none md:text-9xl">
              <Counter to={0} />
            </div>
            <p className="mt-3 text-xs uppercase tracking-wider-2">Synthetic Dyes</p>
          </div>

          <div>
            <div className="font-display text-6xl italic leading-none md:text-8xl">Carbon</div>
            <p className="mt-3 text-xs uppercase tracking-wider-2">Neutral by 2026</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="space-y-8"
        >
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900"
            alt="Natural fabric and earth materials"
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
          <p className="font-display text-2xl italic leading-relaxed md:text-3xl">
            "We believe the most radical thing fashion can do today is slow down.
            VELA is built around respect — for the maker, the wearer, and the land."
          </p>
          <p className="text-xs uppercase tracking-wider-2 text-vela-cream/80">
            — Aarav Mehta, Founder
          </p>
        </motion.div>
      </div>
    </section>
  );
};
