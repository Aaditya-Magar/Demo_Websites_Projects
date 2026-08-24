import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play, Star, Youtube, Film, Megaphone, Mic } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import heroFrame from "@/assets/hero-frame.jpg";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CutCraft Studios — We Craft Stories Frame by Frame" },
      { name: "description", content: "Premium video editing for YouTube, Reels, ads & podcasts. 100M+ views generated, 500+ projects delivered." },
      { property: "og:title", content: "CutCraft Studios" },
      { property: "og:description", content: "We turn raw footage into viral content." },
    ],
  }),
  component: HomePage,
});

function FloatingFrame() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), { stiffness: 150, damping: 15 });

  function onMove(e: React.MouseEvent) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() { mx.set(0); my.set(0); }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: 1200 }}
      className="relative mx-auto w-full max-w-2xl"
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative animate-float rounded-2xl"
      >
        <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-primary/40 via-electric/30 to-transparent blur-3xl animate-pulse-glow" />
        <div className="relative overflow-hidden rounded-2xl neon-border glass">
          <img src={heroFrame} alt="CutCraft showcase frame" width={1280} height={800} className="aspect-[16/10] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-electric">Featured cut</p>
              <p className="font-display text-2xl">Neon Nights · Tokyo</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary glow-purple">
              <Play className="h-5 w-5 fill-current" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const start = performance.now(); const dur = 1600;
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

function HomePage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, -120]);
  const y2 = useTransform(scrollY, [0, 800], [0, -60]);

  const featured = projects.slice(0, 4);
  const services = [
    { icon: Youtube, title: "YouTube Editing", desc: "Long-form storytelling that retains viewers from second one to outro." },
    { icon: Film, title: "Instagram Reels", desc: "Algorithm-tuned short-form built to hook, hold and convert." },
    { icon: Megaphone, title: "Ads & Brand Films", desc: "Cinematic spots that turn attention into action." },
    { icon: Mic, title: "Podcast Production", desc: "Multi-cam podcast edits with broadcast polish." },
  ];

  const testimonials = [
    { name: "Kai Mercer", role: "12M+ subscriber YouTuber", quote: "CutCraft turned my channel into a brand. Retention jumped 40% in the first month." },
    { name: "Aria Khan", role: "Founder, The Founders Files", quote: "The pacing, the score sync, the type design — every cut feels intentional. They are the standard." },
    { name: "Mona Reyes", role: "Studio Talks Podcast", quote: "I send raw and they return cinema. We've never missed a Tuesday drop." },
  ];
  const [t, setT] = useState(0);
  useEffect(() => { const id = setInterval(() => setT((v) => (v + 1) % testimonials.length), 5000); return () => clearInterval(id); }, [testimonials.length]);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden pt-32 pb-32 md:pt-44 md:pb-40">
        <motion.img
          src={heroBg}
          alt=""
          aria-hidden
          width={1920}
          height={1080}
          style={{ y: y1 }}
          className="absolute inset-0 -z-10 h-[120%] w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
        <motion.div style={{ y: y2 }} className="absolute inset-0 -z-10 bg-radial-glow" />

        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-1.5 text-xs uppercase tracking-widest text-electric"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse" />
                Premium Edit Studio
              </motion.span>
              <h1 className="mt-6 font-display text-5xl leading-[0.95] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                {"We Turn Raw".split(" ").map((w, i) => (
                  <motion.span key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i, duration: 0.6 }} className="mr-3 inline-block">{w}</motion.span>
                ))}
                <br />
                <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="gradient-text text-glow-purple">Footage Into</motion.span>{" "}
                <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.6 }} className="inline-block">Viral Content.</motion.span>
              </h1>
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                className="mt-6 max-w-xl text-lg text-muted-foreground"
              >
                From YouTube to Reels, we craft edits that capture attention, build brands and drive engagement at the speed of the algorithm.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <Link to="/contact" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground glow-purple transition hover:scale-105">
                  Start your project
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
                <Link to="/portfolio" className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-7 py-3.5 text-sm font-semibold backdrop-blur transition hover:border-electric hover:text-electric">
                  <Play className="h-4 w-4 fill-current" />
                  Watch the reel
                </Link>
              </motion.div>
            </div>
            <FloatingFrame />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-16 md:grid-cols-4">
          {[
            { v: 100, s: "M+", l: "Views Generated" },
            { v: 500, s: "+", l: "Projects Delivered" },
            { v: 50, s: "+", l: "Creators Served" },
            { v: 49, s: "★", l: "Average Rating", divide: true },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-display text-5xl md:text-6xl gradient-text">
                {s.divide ? <>4.<CountUp to={9} /></> : <CountUp to={s.v} suffix={s.s} />}
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-electric">Featured Work</p>
            <h2 className="mt-3 font-display text-4xl md:text-6xl">Cuts that <span className="gradient-text">break the feed</span>.</h2>
          </div>
          <Link to="/portfolio" className="hidden md:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {featured.map((p, i) => (
            <Link
              key={p.id}
              to="/portfolio/$id"
              params={{ id: p.id }}
              className="group relative block overflow-hidden rounded-2xl border border-border"
            >
              <div className="relative overflow-hidden">
                <img src={p.thumbnail} alt={p.title} loading="lazy" className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-0 bg-primary/0 transition duration-500 group-hover:bg-primary/15" />
                <div className="absolute right-4 top-4 rounded-full bg-background/70 px-3 py-1 text-xs backdrop-blur">{p.category}</div>
                <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary opacity-0 glow-purple transition group-hover:opacity-100">
                  <Play className="h-6 w-6 fill-current" />
                </div>
              </div>
              <div className="flex items-end justify-between gap-4 p-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{p.client}</p>
                  <h3 className="mt-1 font-display text-2xl">{p.title}</h3>
                </div>
                <div className="text-right">
                  <p className="font-display text-xl text-electric">{p.views}</p>
                  <p className="text-xs text-muted-foreground">views</p>
                </div>
              </div>
              {i === 0 && <div aria-hidden className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br from-primary/30 to-electric/20 blur-2xl" />}
            </Link>
          ))}
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-electric">Services</p>
          <h2 className="mt-3 font-display text-4xl md:text-6xl">Built for every <span className="gradient-text">format</span>.</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <motion.div
              key={s.title}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl border border-border bg-surface/50 p-6 transition hover:border-primary/50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary transition group-hover:glow-purple">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-2xl">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <div className="flex justify-center gap-1 text-electric">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
          </div>
          <motion.blockquote
            key={t}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 font-display text-3xl leading-tight md:text-4xl"
          >
            "{testimonials[t].quote}"
          </motion.blockquote>
          <p className="mt-6 text-sm text-muted-foreground">
            <span className="text-foreground">{testimonials[t].name}</span> · {testimonials[t].role}
          </p>
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button key={i} aria-label={`Slide ${i + 1}`} onClick={() => setT(i)} className={`h-1.5 rounded-full transition-all ${i === t ? "w-8 bg-primary" : "w-3 bg-border"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-7xl px-6 py-32">
        <div className="absolute inset-x-6 inset-y-12 -z-10 rounded-3xl bg-gradient-to-br from-primary/20 via-electric/10 to-transparent blur-3xl" />
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/60 p-12 text-center md:p-20 neon-border">
          <h2 className="font-display text-5xl md:text-7xl">Ready to <span className="gradient-text">go viral</span>?</h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Hand us your raw footage. We'll hand back the edit that changes your channel forever.
          </p>
          <Link to="/contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground glow-purple transition hover:scale-105">
            Book a free strategy call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
