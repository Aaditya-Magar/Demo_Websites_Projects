import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { timeline } from "@/data/cafe";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Brew Haven Café" },
      { name: "description", content: "From a 4-seat espresso bar to a beloved community café — meet the people behind Brew Haven." },
      { property: "og:title", content: "Our Story — Brew Haven" },
      { property: "og:description", content: "From a 4-seat espresso bar to a beloved community café." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="pt-32 pb-20">
      <section className="max-w-5xl mx-auto px-6 text-center">
        <span className="text-xs tracking-[0.3em] uppercase text-accent font-semibold">Our Story</span>
        <h1 className="mt-3 font-display text-5xl md:text-7xl text-primary leading-tight">
          From a Tiny Bar to a <em className="text-gradient-warm not-italic">Big Family</em>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Brew Haven started with one espresso machine, one passionate barista, and one stubborn belief:
          coffee should bring people together.
        </p>
      </section>

      <section className="mt-20 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80" alt="Founder Marco Bellini" className="rounded-[2rem] shadow-card aspect-[4/5] object-cover w-full" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-xs tracking-[0.3em] uppercase text-accent font-semibold">Meet The Founder</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl text-primary">Marco Bellini</h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Born in Turin, raised on espresso, and trained at some of the world's finest roasteries — Marco
            brought his obsession with the perfect cup to New York in 2014. He still pulls every Saturday morning shot himself.
          </p>
          <blockquote className="mt-6 border-l-4 border-accent pl-5 italic text-foreground/80">
            "A café isn't a place. It's a feeling. We just happen to serve incredible coffee with it."
          </blockquote>
        </motion.div>
      </section>

      <section className="mt-28 max-w-4xl mx-auto px-6">
        <div className="text-center">
          <span className="text-xs tracking-[0.3em] uppercase text-accent font-semibold">The Journey</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl text-primary">A Decade of Brewing</h2>
        </div>
        <div className="relative mt-14">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
          {timeline.map((t, i) => (
            <motion.div
              key={t.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative grid md:grid-cols-2 gap-6 mb-12 ${i % 2 === 0 ? "" : "md:[direction:rtl]"}`}
            >
              <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left [direction:ltr]"}`}>
                <div className="font-display text-3xl text-accent">{t.year}</div>
                <h3 className="mt-1 font-display text-2xl text-primary">{t.title}</h3>
                <p className="mt-2 text-muted-foreground">{t.text}</p>
              </div>
              <span className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent ring-4 ring-background" />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
