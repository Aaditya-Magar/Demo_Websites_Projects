import { useRef, useState } from "react";
import { motion } from "framer-motion";
import beforeWhite from "@/assets/before-whitening.jpg";
import afterWhite from "@/assets/after-whitening.jpg";
import beforeMake from "@/assets/before-makeover.jpg";
import afterMake from "@/assets/after-makeover.jpg";
import beforeBraces from "@/assets/before-braces.jpg";
import afterBraces from "@/assets/after-braces.jpg";

const cases = [
  { label: "Case 1: Teeth Whitening", before: beforeWhite, after: afterWhite },
  { label: "Case 2: Smile Makeover", before: beforeMake, after: afterMake },
  { label: "Case 3: Invisible Braces", before: beforeBraces, after: afterBraces },
];

function Slider({ before, after, label }: { before: string; after: string; label: string }) {
  const [pos, setPos] = useState(50);
  const wrap = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const set = (clientX: number) => {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(2, Math.min(98, p)));
  };

  return (
    <div className="space-y-3">
      <div
        ref={wrap}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl select-none cursor-ew-resize bg-navy-deep"
        onMouseDown={(e) => { dragging.current = true; set(e.clientX); }}
        onMouseMove={(e) => dragging.current && set(e.clientX)}
        onMouseUp={() => (dragging.current = false)}
        onMouseLeave={() => (dragging.current = false)}
        onTouchStart={(e) => set(e.touches[0].clientX)}
        onTouchMove={(e) => set(e.touches[0].clientX)}
      >
        <img src={after} alt="After treatment" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        <img
          src={before}
          alt="Before treatment"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          draggable={false}
        />
        <span className="absolute top-3 left-3 bg-navy-deep/80 text-white text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded">Before</span>
        <span className="absolute top-3 right-3 bg-teal text-navy-deep text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded">After</span>
        <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_20px_rgba(255,255,255,0.7)]" style={{ left: `${pos}%` }}>
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 h-10 w-10 rounded-full bg-white text-navy-deep flex items-center justify-center shadow-xl">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M8 5l-6 7 6 7zM16 5l6 7-6 7z" /></svg>
          </div>
        </div>
      </div>
      <p className="text-sm font-semibold text-navy-deep text-center">{label}</p>
    </div>
  );
}

export function BeforeAfter() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-teal font-semibold">Transformations</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-navy-deep text-balance">
            Real results, <span className="italic text-teal">real smiles</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Drag the slider to see the SmileCraft difference. Every smile is hand-crafted by our specialists.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-14 grid md:grid-cols-3 gap-6"
        >
          {cases.map((c) => (
            <Slider key={c.label} {...c} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
