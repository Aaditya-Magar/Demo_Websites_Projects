import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useMotionValue, useTransform, animate, useScroll, useTransform as useTr } from "framer-motion";
import { useEffect, useRef } from "react";
import { Star, Award, Users, Utensils, Flame, Leaf, Sparkles, ChevronRight } from "lucide-react";
import { dishes, testimonials } from "@/data/dishes";
import { SpiceParticles } from "@/components/site/SpiceParticles";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Royal Spice House — Authentic Indian Cuisine in Delhi" },
      { name: "description", content: "Experience royal Indian flavours at Royal Spice House. Tandoor specialties, slow-cooked biryanis and timeless classics in a luxurious setting." },
      { property: "og:title", content: "Royal Spice House" },
      { property: "og:description", content: "Authentic Taste. Royal Experience." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1600&q=80" },
    ],
  }),
  component: Home,
});

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.floor(v).toLocaleString() + suffix);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animate(mv, to, { duration: 2, ease: "easeOut" });
          obs.disconnect();
        }
      });
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [mv, to]);
  return <motion.span ref={ref}>{rounded}</motion.span>;
}

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yBg = useTr(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yText = useTr(scrollYProgress, [0, 1], ["0%", "60%"]);

  const signatures = dishes.filter((d) => d.signature);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <motion.div
          style={{ y: yBg, backgroundImage: "url('https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=2000&q=80')" }}
          className="absolute inset-0 bg-cover bg-center scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--dark-brown)]/85 via-[color:var(--dark-brown)]/55 to-[color:var(--dark-brown)]" />
        <SpiceParticles count={22} />

        <motion.div style={{ y: yText }} className="relative z-10 h-full container mx-auto px-6 flex flex-col items-center justify-center text-center text-cream">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="ornate-divider w-full max-w-md mb-6 text-xs tracking-[0.4em] uppercase">
            <Sparkles className="h-4 w-4" /> Est. 2009
          </motion.div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] max-w-5xl">
            {"Experience the Taste of".split(" ").map((w, i) => (
              <motion.span key={i} className="inline-block mr-3"
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.7 }}>
                {w}
              </motion.span>
            ))}
            <motion.span className="block text-gradient-gold mt-2"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}>
              Royal India
            </motion.span>
          </h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="mt-6 max-w-xl text-cream/80 text-base md:text-lg">
            From traditional curries to modern flavours — every dish crafted with passion, heritage and the finest spices of the subcontinent.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}
            className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link to="/menu" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-[color:var(--dark-brown)] font-semibold hover:glow-gold-strong hover:scale-105 transition-all">
              View Menu <ChevronRight className="h-4 w-4" />
            </Link>
            <Link to="/reservation" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-gold/60 text-cream hover:bg-gold/10 transition-all">
              Book Table
            </Link>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/50 text-xs tracking-[0.3em] uppercase">
          Scroll
        </motion.div>
      </section>

      {/* SIGNATURE DISHES */}
      <section className="relative py-24 md:py-32 bg-cream">
        <div className="container mx-auto px-6">
          <Reveal>
            <p className="text-center text-gold tracking-[0.4em] uppercase text-xs">Signature Plates</p>
            <h2 className="text-center font-display text-4xl md:text-6xl mt-3 text-maroon">From Our Royal Kitchen</h2>
            <div className="ornate-divider mt-6 max-w-md mx-auto"><Flame className="h-4 w-4" /></div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {signatures.map((d, i) => (
              <Reveal key={d.id} delay={i * 0.08}>
                <Link to="/menu/$id" params={{ id: d.id }} className="group block relative overflow-hidden rounded-2xl bg-white border border-gold/20 hover:border-gold transition-all hover:-translate-y-1 hover:glow-gold">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={d.image} alt={d.name} loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--dark-brown)] via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-0 inset-x-0 p-5 text-cream">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-gold">{d.category}</span>
                    <h3 className="font-display text-xl mt-1">{d.name}</h3>
                    <p className="text-xs text-cream/75 mt-1 line-clamp-2">{d.short}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-20 bg-royal-gradient overflow-hidden">
        <SpiceParticles count={12} />
        <div className="container mx-auto px-6 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: 10000, suffix: "+", label: "Happy Guests", Icon: Users },
              { v: 15, suffix: "+", label: "Years of Heritage", Icon: Award },
              { v: 100, suffix: "+", label: "Authentic Dishes", Icon: Utensils },
              { v: 4.8, suffix: "★", label: "Guest Rating", Icon: Star },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center text-cream">
                  <s.Icon className="h-7 w-7 mx-auto text-gold" />
                  <div className="font-display text-4xl md:text-5xl text-gradient-gold mt-3">
                    {s.v < 10 ? <span>{s.v}{s.suffix}</span> : <CountUp to={s.v} suffix={s.suffix} />}
                  </div>
                  <p className="text-xs uppercase tracking-[0.3em] text-cream/70 mt-2">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80"
              alt="Royal Spice House interior with warm ambient lighting" className="rounded-3xl w-full h-[500px] object-cover shadow-2xl" />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-gold tracking-[0.4em] uppercase text-xs">Why Choose Us</p>
            <h2 className="font-display text-4xl md:text-5xl text-maroon mt-3">A Royal Experience in Every Bite</h2>
            <p className="text-foreground/70 mt-4 leading-relaxed">
              We blend timeless tradition with modern artistry. Every spice is hand-picked, every recipe perfected over generations.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              {[
                { Icon: Leaf, title: "Authentic Spices", text: "Hand-ground masalas sourced from spice farms across India." },
                { Icon: Award, title: "Master Chefs", text: "Led by Chef Arjun Kapoor with 25+ years of royal cuisine." },
                { Icon: Sparkles, title: "Royal Ambience", text: "Heritage interiors inspired by Mughal palaces." },
                { Icon: Flame, title: "Live Tandoor", text: "Watch your meal sizzle to perfection in our open kitchen." },
              ].map((f, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white border border-gold/20 hover:border-gold transition-colors">
                  <f.Icon className="h-6 w-6 text-gold" />
                  <h3 className="font-display text-lg mt-3 text-maroon">{f.title}</h3>
                  <p className="text-sm text-foreground/70 mt-1">{f.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-[color:var(--dark-brown)] text-cream overflow-hidden">
        <div className="container mx-auto px-6">
          <Reveal>
            <p className="text-center text-gold tracking-[0.4em] uppercase text-xs">Guest Stories</p>
            <h2 className="text-center font-display text-4xl md:text-5xl mt-3">Loved by Royals & Wanderers</h2>
            <div className="ornate-divider mt-6 max-w-md mx-auto"><Star className="h-4 w-4" /></div>
          </Reveal>

          <div className="mt-14 relative">
            <motion.div
              className="flex gap-6"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            >
              {[...testimonials, ...testimonials].map((t, i) => (
                <div key={i} className="min-w-[320px] md:min-w-[420px] p-7 rounded-2xl border border-gold/20 bg-white/5 backdrop-blur">
                  <div className="flex gap-1 text-gold">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-gold" />)}</div>
                  <p className="mt-4 text-cream/85 italic">"{t.text}"</p>
                  <div className="mt-5">
                    <p className="font-display text-gold">{t.name}</p>
                    <p className="text-xs text-cream/60 uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80')" }} />
        <div className="absolute inset-0 bg-[color:var(--maroon)]/85" />
        <SpiceParticles count={14} />
        <div className="container mx-auto px-6 relative text-center text-cream">
          <Reveal>
            <h2 className="font-display text-4xl md:text-6xl">Reserve Your Table Today</h2>
            <p className="mt-4 max-w-xl mx-auto text-cream/80">Limited seating each evening. Book ahead and let us craft an unforgettable royal feast for you.</p>
            <Link to="/reservation" className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-[color:var(--dark-brown)] font-semibold hover:glow-gold-strong hover:scale-105 transition-all">
              Book Your Experience <ChevronRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
