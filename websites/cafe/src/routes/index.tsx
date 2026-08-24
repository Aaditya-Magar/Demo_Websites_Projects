import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Wifi, Coffee, Users, Sparkles, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { menuItems, stats, testimonials, galleryImages } from "@/data/cafe";
import { Steam } from "@/components/Steam";
import { CountUp } from "@/components/CountUp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brew Haven Café — Where Every Cup Tells a Story" },
      { name: "description", content: "Cozy specialty café serving handcrafted coffee, fresh pastries, and warm hospitality." },
      { property: "og:title", content: "Brew Haven Café" },
      { property: "og:description", content: "Where every cup tells a story." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1600&q=80" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Featured />
      <WhyUs />
      <GalleryPreview />
      <Testimonials />
      <FinalCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[720px] w-full overflow-hidden md:min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=2000&q=80')",
        }}
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      {/* Floating coffee cup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 0.85, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="hidden lg:block absolute right-[8%] top-1/2 -translate-y-1/2"
        style={{ perspective: "800px" }}
      >
        <motion.div
          animate={{ rotateY: [0, 18, 0, -18, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <Steam count={5} />
          <CoffeeCupSVG />
        </motion.div>
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl flex-col justify-center px-6 pb-28 pt-32 text-cream md:min-h-screen md:pb-32 md:pt-36">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full glass text-sm font-medium tracking-wide"
        >
          <Sparkles className="w-4 h-4 text-accent" /> Est. 2014 · Brew Haven
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-6 max-w-full font-display text-4xl leading-[1.08] sm:text-6xl lg:max-w-3xl lg:text-7xl xl:text-8xl"
        >
          Start Your Day With <em className="text-gradient-warm not-italic">Perfect</em> Coffee
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-6 max-w-xl text-lg text-cream/85"
        >
          Freshly brewed coffee, handcrafted with passion and served with love. Step into a world where flavor meets warmth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            to="/menu"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-accent-foreground font-medium shadow-glow hover:scale-105 transition-transform"
          >
            View Menu <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/reservation"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass text-cream font-medium hover:bg-white/20 transition-colors"
          >
            Reserve Table
          </Link>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/70 text-xs tracking-[0.3em] uppercase"
      >
        Scroll
      </motion.div>
    </section>
  );
}

function CoffeeCupSVG() {
  return (
    <svg width="320" height="320" viewBox="0 0 200 200" className="drop-shadow-2xl">
      <defs>
        <linearGradient id="cup" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FDF6EC" />
          <stop offset="1" stopColor="#D7A86E" />
        </linearGradient>
        <radialGradient id="liquid" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#6F4E37" />
          <stop offset="1" stopColor="#1B1B1B" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="60" rx="55" ry="10" fill="url(#liquid)" />
      <path d="M45 60 Q45 150 100 158 Q155 150 155 60 Z" fill="url(#cup)" stroke="#3E2723" strokeWidth="2" />
      <path d="M155 75 Q185 80 185 110 Q185 135 155 135" fill="none" stroke="#3E2723" strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="100" cy="60" rx="50" ry="8" fill="#3E2723" opacity="0.6" />
    </svg>
  );
}

function Stats() {
  return (
    <section className="relative z-20 mx-auto mt-8 max-w-6xl px-6 md:-mt-10">
      <div className="grid grid-cols-2 md:grid-cols-4 bg-card rounded-3xl shadow-card overflow-hidden border border-border">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 text-center border-r last:border-r-0 border-border/50"
          >
            <div className="font-display text-4xl md:text-5xl text-primary">
              <CountUp value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-sm text-muted-foreground tracking-wide">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Featured() {
  const featured = menuItems.filter((m) => m.featured);
  return (
    <section className="py-28 max-w-7xl mx-auto px-6">
      <SectionHeader eyebrow="Signature Brews" title="Crafted to Perfection" subtitle="Our most-loved drinks, made with single-origin beans and a whole lot of care." />
      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Link
              to="/menu/$id"
              params={{ id: item.id }}
              className="group block bg-card rounded-3xl overflow-hidden shadow-soft hover:shadow-card transition-all hover:-translate-y-2"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-5">
                <div className="text-xs text-accent font-medium tracking-widest uppercase">{item.category}</div>
                <h3 className="mt-1 font-display text-xl text-primary">{item.name}</h3>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-semibold">${item.price.toFixed(2)}</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link to="/menu" className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
          Explore the full menu <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { icon: Coffee, title: "Fresh Beans", text: "Roasted in-house weekly from single-origin farms." },
    { icon: Users, title: "Expert Baristas", text: "Champion-trained craftspeople who know your name." },
    { icon: Sparkles, title: "Cozy Ambiance", text: "Warm lighting, soft jazz, the perfect reading nook." },
    { icon: Wifi, title: "Free WiFi", text: "Fast, stable, and unlimited — work or play, your call." },
  ];
  return (
    <section className="py-28 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader eyebrow="Why Brew Haven" title="More Than Just Coffee" />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card p-8 rounded-3xl shadow-soft hover:shadow-card hover:-translate-y-1 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-accent/15 text-accent grid place-items-center mb-4">
                <it.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl text-primary">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryPreview() {
  return (
    <section className="py-28 max-w-7xl mx-auto px-6">
      <SectionHeader eyebrow="The Vibe" title="Step Inside Brew Haven" />
      <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3">
        {galleryImages.slice(0, 8).map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`relative overflow-hidden rounded-2xl ${i % 5 === 0 ? "row-span-2 aspect-[3/5]" : "aspect-square"}`}
          >
            <img src={src} alt="Café" loading="lazy" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
          </motion.div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link to="/gallery" className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
          See the full gallery <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  return (
    <section className="py-28 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <Star className="w-10 h-10 mx-auto text-accent" />
        <motion.blockquote
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 font-display text-2xl md:text-4xl leading-snug"
        >
          "{t.text}"
        </motion.blockquote>
        <div className="mt-8 flex items-center justify-center gap-3">
          <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-accent" />
          <div className="text-left">
            <div className="font-semibold">{t.name}</div>
            <div className="text-sm text-primary-foreground/70">{t.role}</div>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button onClick={() => setI((i - 1 + testimonials.length) % testimonials.length)} className="w-10 h-10 rounded-full glass grid place-items-center hover:bg-white/20"><ChevronLeft className="w-4 h-4" /></button>
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button key={idx} onClick={() => setI(idx)} className={`w-2 h-2 rounded-full transition-all ${idx === i ? "bg-accent w-6" : "bg-white/30"}`} />
            ))}
          </div>
          <button onClick={() => setI((i + 1) % testimonials.length)} className="w-10 h-10 rounded-full glass grid place-items-center hover:bg-white/20"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-28 max-w-5xl mx-auto px-6">
      <div className="relative overflow-hidden rounded-[2.5rem] p-12 md:p-20 text-center text-cream" style={{ background: "var(--gradient-warm)" }}>
        <div className="absolute inset-0 opacity-30 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1600&q=80')" }} />
        <div className="relative">
          <h2 className="font-display text-4xl md:text-6xl">Visit Us Today</h2>
          <p className="mt-4 text-cream/85 max-w-xl mx-auto">Pull up a chair, grab a warm mug, and stay a while. Your table is waiting.</p>
          <Link to="/reservation" className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-accent-foreground font-medium shadow-glow hover:scale-105 transition-transform">
            Reserve Your Table <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <span className="text-xs tracking-[0.3em] uppercase text-accent font-semibold">{eyebrow}</span>
      <h2 className="mt-3 font-display text-4xl md:text-5xl text-primary">{title}</h2>
      {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
