import { createFileRoute } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { GraduationCap } from "lucide-react";
import { faculty } from "../data/site";
import { PageHeader } from "./courses";

export const Route = createFileRoute("/faculty")({
  head: () => ({
    meta: [
      { title: "Faculty — ExcelEdge Academy" },
      { name: "description", content: "Meet our 50+ expert faculty: ex-IITians, AIIMS doctors and award-winning teachers." },
      { property: "og:title", content: "Faculty — ExcelEdge Academy" },
      { property: "og:description", content: "Taught by India's most awarded educators." },
    ],
  }),
  component: FacultyPage,
});

function FacultyPage() {
  return (
    <>
      <PageHeader title="Our Faculty" subtitle="A panel of ex-IITians, AIIMS doctors and India's most decorated teachers." />
      <section className="container mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {faculty.map((f, i) => (
            <TiltCard key={f.name} index={i} {...f} />
          ))}
        </div>
      </section>
    </>
  );
}

function TiltCard({
  name, subject, experience, photo, index,
}: { name: string; subject: string; experience: string; photo: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: (index % 3) * 0.1 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative rounded-3xl overflow-hidden bg-card border border-border shadow-card"
      >
        <div className="aspect-[4/5] overflow-hidden">
          <img src={photo} alt={name} className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 inset-x-0 p-6 text-white" style={{ transform: "translateZ(40px)" }}>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-gold text-gold-foreground text-xs font-bold mb-2">
            <GraduationCap className="h-3.5 w-3.5" /> {subject}
          </div>
          <div className="font-display text-xl font-bold">{name}</div>
          <div className="text-sm text-white/70">{experience}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
