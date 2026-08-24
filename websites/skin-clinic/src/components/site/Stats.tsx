import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, mv]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

const stats = [
  { value: 5000, suffix: "+", label: "Happy Patients" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 98, suffix: "%", label: "Success Rate" },
  { value: 20, suffix: "+", label: "Treatments" },
];

export default function Stats() {
  return (
    <section className="relative -mt-12 z-10 px-6 lg:px-10">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-luxe border border-border/60 grid grid-cols-2 md:grid-cols-4 overflow-hidden">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="p-8 lg:p-10 text-center border-b md:border-b-0 md:border-r border-border/60 last:border-r-0"
          >
            <div className="font-display text-4xl lg:text-5xl font-semibold text-foreground">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-sm text-muted-foreground tracking-wide">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}