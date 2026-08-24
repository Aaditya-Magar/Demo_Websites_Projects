import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Trophy, Medal, Award } from "lucide-react";
import { toppers, stats } from "../data/site";
import { PageHeader } from "./courses";
import { CountUp } from "../components/CountUp";
import { SectionHeading } from "../components/SectionHeading";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Results & Toppers — ExcelEdge Academy" },
      { name: "description", content: "Meet our 500+ top selections in IIT-JEE, NEET and competitive exams." },
      { property: "og:title", content: "Results — ExcelEdge Academy" },
      { property: "og:description", content: "Where future toppers are made." },
    ],
  }),
  component: ResultsPage,
});

function rankIcon(i: number) {
  if (i === 0) return <Trophy className="h-5 w-5 text-gold-foreground" />;
  if (i < 3) return <Medal className="h-5 w-5 text-gold-foreground" />;
  return <Award className="h-5 w-5 text-gold-foreground" />;
}

function ResultsPage() {
  return (
    <>
      <PageHeader title="Results & Toppers" subtitle="Every rank tells a story of grit, guidance, and ExcelEdge." />

      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-card border border-border shadow-card"
            >
              <div className="font-display text-3xl md:text-4xl font-bold bg-gradient-brand bg-clip-text text-transparent">
                <CountUp to={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-2 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <SectionHeading eyebrow="Class of 2025" title="Our recent toppers" />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {toppers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 4) * 0.08 }}
              className="group rounded-2xl bg-card border border-border shadow-card overflow-hidden hover-lift"
            >
              <div className="aspect-square overflow-hidden">
                <img src={t.photo} alt={t.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-gold text-gold-foreground text-xs font-bold mb-3">
                  {rankIcon(i)} {t.rank}
                </div>
                <div className="font-display font-semibold text-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{t.exam}</div>
                {t.quote && <p className="mt-3 text-sm text-foreground/70 italic line-clamp-2">"{t.quote}"</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
