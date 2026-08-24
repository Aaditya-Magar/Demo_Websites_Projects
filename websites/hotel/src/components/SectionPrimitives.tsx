import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function PageHero({
  title, subtitle, image, height = "70vh",
}: { title: string; subtitle?: string; image: string; height?: string }) {
  return (
    <section className="relative w-full overflow-hidden" style={{ height }}>
      <div className="absolute inset-0 kenburns">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/60 via-ocean-deep/30 to-ocean-deep/80" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }}
          className="font-display italic text-5xl md:text-7xl text-ivory"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-5 max-w-2xl text-ivory/75 font-sub"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}

export function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1800;
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.floor(eased * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{prefix}{val.toLocaleString("en-IN")}{suffix}</span>;
}

export function Reveal({ children, delay = 0, y = 40 }: { children: React.ReactNode; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22,1,0.36,1] }}
    >
      {children}
    </motion.div>
  );
}

export function Overline({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-[11px] font-sub uppercase tracking-[0.32em] text-gold ${className}`}>{children}</p>;
}
