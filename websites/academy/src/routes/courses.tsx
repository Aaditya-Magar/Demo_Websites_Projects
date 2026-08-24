import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Atom, Stethoscope, GraduationCap, BookOpen, Sparkles, Rocket, ArrowRight, Clock, IndianRupee } from "lucide-react";
import { courses } from "../data/site";
import { SectionHeading } from "../components/SectionHeading";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — ExcelEdge Academy" },
      { name: "description", content: "Explore IIT-JEE, NEET, Boards and Foundation programs at ExcelEdge Academy." },
      { property: "og:title", content: "Courses — ExcelEdge Academy" },
      { property: "og:description", content: "Programs designed to make toppers." },
    ],
  }),
  component: CoursesPage,
});

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Atom, Stethoscope, GraduationCap, BookOpen, Sparkles, Rocket,
};

const exams = ["All", "JEE", "NEET", "Boards", "Foundation"] as const;
const classes = ["All", "6-8", "9-10", "10", "11-12", "12"] as const;

function CoursesPage() {
  const [exam, setExam] = useState<(typeof exams)[number]>("All");
  const [cls, setCls] = useState<(typeof classes)[number]>("All");

  const filtered = courses.filter(
    (c) => (exam === "All" || c.exam === exam) && (cls === "All" || c.classLevel === cls)
  );

  return (
    <>
      <PageHeader title="Our Courses" subtitle="Hand-crafted programs across exams and grade levels — pick yours." />
      <section className="container mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-4 mb-10 p-5 rounded-2xl bg-card border border-border shadow-card">
          <FilterGroup label="Exam" options={exams} value={exam} onChange={setExam} />
          <FilterGroup label="Class" options={classes} value={cls} onChange={setCls} />
        </div>
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No courses match these filters.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c, i) => {
              const Icon = iconMap[c.icon] || BookOpen;
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to="/courses/$id"
                    params={{ id: c.id }}
                    className="group block h-full p-6 rounded-2xl bg-card border border-border shadow-card hover-lift hover:border-primary/40"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="h-12 w-12 rounded-xl bg-gradient-brand grid place-items-center shadow-soft">
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-semibold">
                        {c.exam}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2">{c.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-5">{c.short}</p>
                    <div className="flex items-center gap-4 text-sm text-foreground/80 border-t border-border pt-4">
                      <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-primary" /> {c.duration}</span>
                      <span className="flex items-center gap-1 ml-auto font-semibold"><IndianRupee className="h-4 w-4 text-accent" />{c.fee.replace("₹", "").trim()}</span>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
                      View details <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}

function FilterGroup<T extends string>({
  label, options, value, onChange,
}: { label: string; options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mr-1">{label}:</span>
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
            value === o
              ? "bg-gradient-brand text-primary-foreground shadow-soft"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="relative pt-32 pb-16 bg-gradient-hero text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "radial-gradient(circle at 30% 20%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      <div className="container mx-auto px-6 relative">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-6xl font-bold text-balance"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-white/80 text-lg max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
