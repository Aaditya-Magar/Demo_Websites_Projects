import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Atom, Stethoscope, GraduationCap, BookOpen, Sparkles, Rocket,
  ArrowRight, Star, Trophy, Award, Quote,
} from "lucide-react";
import { Particles } from "../components/Particles";
import { CountUp } from "../components/CountUp";
import { SectionHeading } from "../components/SectionHeading";
import { courses, stats, toppers, testimonials } from "../data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ExcelEdge Academy — Where Future Toppers Are Made" },
      { name: "description", content: "Premium coaching for IIT-JEE, NEET, Boards & Foundation. 10,000+ students, 500+ selections, 50+ expert faculty." },
      { property: "og:title", content: "ExcelEdge Academy — Where Future Toppers Are Made" },
      { property: "og:description", content: "Premium coaching for IIT-JEE, NEET, Boards & Foundation." },
    ],
  }),
  component: Home,
});

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Atom, Stethoscope, GraduationCap, BookOpen, Sparkles, Rocket,
};

function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <CoursesPreview />
      <Toppers />
      <Testimonials />
      <CTA />
    </>
  );
}

function Hero() {
  const heading = "Achieve Rank.";
  const heading2 = "Achieve Excellence.";
  return (
    <section className="relative min-h-[100svh] flex items-center bg-gradient-hero overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 mix-blend-luminosity"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy/90" />
      <Particles count={30} />

      {/* Floating 3D book cards */}
      <div className="absolute inset-0 pointer-events-none" style={{ perspective: "800px" }}>
        {[
          { top: "15%", left: "8%", delay: "0s", rot: "rotateX(20deg) rotateY(-25deg)" },
          { top: "25%", right: "12%", delay: "1.5s", rot: "rotateX(-15deg) rotateY(25deg)" },
          { bottom: "20%", left: "14%", delay: "3s", rot: "rotateX(10deg) rotateY(20deg)" },
          { bottom: "28%", right: "8%", delay: "2s", rot: "rotateX(-20deg) rotateY(-20deg)" },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute hidden md:block animate-float"
            style={{ ...p, transform: p.rot, animationDelay: p.delay }}
          >
            <div className="w-20 h-28 rounded-md bg-gradient-gold shadow-glow border border-white/30 grid place-items-center">
              <BookOpen className="h-8 w-8 text-gold-foreground" />
            </div>
          </div>
        ))}
      </div>

      <div className="relative container mx-auto px-6 py-32 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm font-medium mb-8"
        >
          <Star className="h-4 w-4 text-accent fill-accent" />
          India's #1 Coaching Institute · Est. 2008
        </motion.div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight max-w-5xl">
          {[heading, heading2].map((line, li) => (
            <div key={li} className="block">
              {line.split(" ").map((w, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
                  transition={{ delay: 0.3 + (li * 3 + i) * 0.12, duration: 0.7 }}
                  className="inline-block mr-3"
                >
                  {li === 1 ? <span className="bg-gradient-gold bg-clip-text text-transparent">{w}</span> : w}
                </motion.span>
              ))}
            </div>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-8 text-lg md:text-xl text-white/80 max-w-2xl"
        >
          India's trusted coaching institute for IIT-JEE, NEET, and competitive exams. Built by toppers, for future toppers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            to="/courses"
            className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-gold text-gold-foreground font-semibold shadow-glow hover:scale-105 transition-transform"
          >
            Explore Courses
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/admission"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 backdrop-blur border border-white/30 text-white font-semibold hover:bg-white/20 transition-colors"
          >
            Enroll Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="relative -mt-12 z-10 container mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 bg-card rounded-3xl p-6 md:p-10 shadow-glow border border-border">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="font-display text-3xl md:text-5xl font-bold bg-gradient-brand bg-clip-text text-transparent">
              <CountUp to={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-xs md:text-sm text-muted-foreground font-medium">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CoursesPreview() {
  const featured = courses.slice(0, 4);
  return (
    <section className="container mx-auto px-6 py-24">
      <SectionHeading
        eyebrow="Programs"
        title="Pick the path that takes you to the top"
        subtitle="Rank-focused programs designed by ex-IITians, AIIMS doctors, and India's most awarded teachers."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((c, i) => {
          const Icon = iconMap[c.icon] || BookOpen;
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to="/courses/$id"
                params={{ id: c.id }}
                className="group block h-full p-6 rounded-2xl bg-card border border-border shadow-card hover-lift hover:border-primary/40"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-brand grid place-items-center shadow-soft mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{c.short}</p>
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary">
                  Learn more <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function Toppers() {
  return (
    <section className="bg-secondary/50 py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Hall of Fame"
          title="Meet our recent toppers"
          subtitle="The faces behind 500+ top selections in IITs and India's leading medical colleges."
        />
      </div>
      <div className="relative">
        <motion.div
          className="flex gap-6 px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...toppers, ...toppers].map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-64 rounded-2xl bg-card border border-border shadow-card overflow-hidden"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img src={t.photo} alt={t.name} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="p-4">
                <div className="inline-block px-2.5 py-1 rounded-full bg-gradient-gold text-gold-foreground text-xs font-bold mb-2">
                  {t.rank}
                </div>
                <div className="font-display font-semibold text-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.exam}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="container mx-auto px-6 py-24">
      <SectionHeading eyebrow="Voices of Toppers" title="What our students say" />
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-7 rounded-2xl bg-card border border-border shadow-card relative"
          >
            <Quote className="absolute top-5 right-5 h-8 w-8 text-accent/30" />
            <p className="text-foreground/80 leading-relaxed">"{t.text}"</p>
            <div className="mt-6 flex items-center gap-3">
              <img src={t.photo} alt={t.name} className="h-12 w-12 rounded-full object-cover" loading="lazy" />
              <div>
                <div className="font-semibold text-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="container mx-auto px-6 pb-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 md:p-16 text-center text-white shadow-glow">
        <Particles count={20} />
        <div className="relative">
          <Trophy className="h-12 w-12 text-accent mx-auto mb-4" />
          <h2 className="font-display text-3xl md:text-5xl font-bold text-balance">
            Start Your Journey to the Top Today
          </h2>
          <p className="mt-4 text-white/80 max-w-xl mx-auto">
            Join the next batch of ExcelEdge toppers. Limited seats. Scholarships available based on entrance test.
          </p>
          <Link
            to="/admission"
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-gold text-gold-foreground font-semibold shadow-glow hover:scale-105 transition-transform"
          >
            <Award className="h-5 w-5" />
            Apply for Admission
          </Link>
        </div>
      </div>
    </section>
  );
}
