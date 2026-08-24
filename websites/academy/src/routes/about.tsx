import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";
import { timeline } from "../data/site";
import { PageHeader } from "./courses";
import { SectionHeading } from "../components/SectionHeading";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ExcelEdge Academy" },
      { name: "description", content: "Founded in 2008, ExcelEdge has trained 10,000+ students with 500+ top selections." },
      { property: "og:title", content: "About ExcelEdge Academy" },
      { property: "og:description", content: "Our story, mission, and vision." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader title="About ExcelEdge" subtitle="From a single classroom in Kota to India's most-loved coaching institute." />

      <section className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">Our Story</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-5">17 years of relentless pursuit of excellence.</h2>
          <p className="text-foreground/80 leading-relaxed">
            ExcelEdge began in 2008 with one teacher, thirty students, and a single conviction: that great mentorship can change a life. Today, we are a national institute with 50+ faculty, six centers, and an alumni network that spans every IIT and top medical college in India.
          </p>
          <p className="text-foreground/80 leading-relaxed mt-4">
            Our philosophy is simple — concept first, drilling next, mentorship always.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-3xl overflow-hidden shadow-glow">
          <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=900&q=80&auto=format&fit=crop" alt="Classroom" className="w-full h-full object-cover" />
        </motion.div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <SectionHeading eyebrow="Our Journey" title="Milestones that shaped us" />
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent" />
          {timeline.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1 }}
              className={`relative grid md:grid-cols-2 gap-6 mb-12 ${i % 2 ? "md:[direction:rtl]" : ""}`}
            >
              <div className={`pl-12 md:pl-0 md:[direction:ltr] ${i % 2 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                <div className="inline-block px-3 py-1 rounded-full bg-gradient-gold text-gold-foreground text-xs font-bold mb-2">
                  {m.year}
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">{m.title}</h3>
                <p className="text-foreground/70 mt-2">{m.text}</p>
              </div>
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-2 h-4 w-4 rounded-full bg-gradient-brand ring-4 ring-background" />
              <div />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
        {[
          { icon: Target, title: "Our Mission", text: "To make world-class coaching accessible to every aspiring student in India." },
          { icon: Eye, title: "Our Vision", text: "To be the most loved and trusted coaching institute, building India's future scientists and doctors." },
          { icon: Heart, title: "Our Values", text: "Integrity, Empathy, Excellence — in every classroom, every test, every interaction." },
        ].map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-2xl bg-card border border-border shadow-card text-center hover-lift"
          >
            <div className="h-14 w-14 mx-auto rounded-2xl bg-gradient-brand grid place-items-center shadow-glow mb-4">
              <v.icon className="h-7 w-7 text-primary-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold mb-2">{v.title}</h3>
            <p className="text-foreground/70">{v.text}</p>
          </motion.div>
        ))}
      </section>
    </>
  );
}
