import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight, Phone, Play, Calendar, Users, Star, Shield, Clock, Headphones,
  CreditCard, Award, Smile, Plane, Globe, BookOpen, MapPin, ChevronDown,
} from "lucide-react";
import { destinations, packages, testimonials, blogPosts, visaData, PHONE } from "@/data/site";
import { PageWrap, SectionHeader, useCounter } from "@/components/site/UI";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WanderNest — The World Is Waiting. Let's Go Together." },
      { name: "description", content: "India's most trusted family travel agency. 500+ destinations, 18 years, 50,000+ happy families. Customised holidays from Kerala to Switzerland." },
      { property: "og:title", content: "WanderNest — Premium Family & Honeymoon Holidays" },
      { property: "og:description", content: "Handcrafted holidays from India's most trusted family travel agency." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200" },
    ],
  }),
  component: Home,
});

const heroImages = [
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920", overline: "INDIA'S MOST TRUSTED FAMILY TRAVEL EXPERTS" },
  { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920", overline: "FROM SANTORINI TO SINGAPORE — WE'VE BEEN THERE" },
  { src: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1920", overline: "OVERWATER VILLAS, ALPINE PEAKS, FAMILY MEMORIES" },
];

const heroPills = [
  { id: "india", label: "🇮🇳 India", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1920" },
  { id: "asia", label: "🌏 Asia", img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1920" },
  { id: "europe", label: "🌍 Europe", img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1920" },
  { id: "maldives", label: "🐚 Maldives", img: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1920" },
];

function Hero() {
  const [idx, setIdx] = useState(0);
  const [override, setOverride] = useState<string | null>(null);
  const [overrideOverline, setOverrideOverline] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (override) return;
    const t = setInterval(() => setIdx((v) => (v + 1) % heroImages.length), 5500);
    return () => clearInterval(t);
  }, [override]);

  const bg = override || heroImages[idx].src;
  const overline = overrideOverline || heroImages[idx].overline;

  const words = ["Every", "Journey", "Begins", "With", "A", "Story."];

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div key={bg} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }} className="absolute inset-0">
          <img src={bg} alt="hero" className="absolute inset-0 w-full h-full object-cover animate-kenburns" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(7,13,24,0.7)] via-[rgba(7,13,24,0.3)] to-[rgba(7,13,24,0.85)]" />

      <div className="relative h-full max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col justify-center pt-32">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-[10px] sm:text-xs font-sans-ui font-semibold tracking-[0.2em] uppercase text-[var(--amber-h)] mb-6">
          <AnimatePresence mode="wait">
            <motion.span key={overline} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }}>{overline}</motion.span>
          </AnimatePresence>
        </motion.div>

        <h1 className="font-display italic text-white text-[44px] sm:text-7xl lg:text-[92px] leading-[0.98] max-w-5xl">
          {words.map((w, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 70, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mr-3 sm:mr-4">{w}</motion.span>
          ))}
        </h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-6 max-w-xl text-white/75 text-base lg:text-lg font-sans-ui leading-relaxed">
          Handcrafted holidays for families, couples & explorers. 500+ destinations. 18 years of expertise.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-8 flex flex-wrap gap-3">
          <Link to="/packages" className="group relative overflow-hidden shimmer-sweep px-6 py-3.5 rounded-full bg-[var(--amber-h)] text-[var(--twilight-deep)] font-sans-ui font-semibold flex items-center gap-2 hover:shadow-[0_8px_30px_rgba(232,160,32,0.5)] transition">
            Explore Packages <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </Link>
          <a href={`tel:${PHONE.replace(/\s/g,"")}`} className="px-6 py-3.5 rounded-full border border-white/40 text-white font-sans-ui font-medium flex items-center gap-2 hover:bg-white/10 transition">
            <Phone className="w-4 h-4" /> Talk to an Expert
          </a>
          <button onClick={() => setShowVideo(true)} className="px-6 py-3.5 text-white font-sans-ui flex items-center gap-2 hover:text-[var(--amber-h)] transition">
            <Play className="w-4 h-4 fill-current" /> Watch Our Story
          </button>
        </motion.div>

        {/* Trust cards */}
        <div className="mt-10 lg:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
          {[
            { i: <Calendar className="w-4 h-4" />, t: "18 Years of Travel Excellence" },
            { i: <Users className="w-4 h-4" />, t: "50,000+ Families Served" },
            { i: <Star className="w-4 h-4 fill-current" />, t: "4.9★ Google · 3,200 Reviews" },
          ].map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 + i * 0.2 }}
              className="glass rounded-2xl px-5 py-4 flex items-center gap-3 text-white">
              <div className="text-[var(--amber-h)]">{c.i}</div>
              <div className="text-sm font-sans-ui font-medium">{c.t}</div>
            </motion.div>
          ))}
        </div>

        {/* Pills */}
        <div className="mt-6 flex gap-2 flex-wrap max-w-md">
          {heroPills.map((p) => (
            <button key={p.id} onClick={() => { setOverride(p.img); setOverrideOverline(`DISCOVER ${p.label.split(" ").slice(1).join(" ").toUpperCase()}`); }}
              className="glass text-white text-xs font-sans-ui font-medium px-3 py-2 rounded-full hover:bg-[var(--amber-h)]/30 hover:border-[var(--amber-h)] transition">
              {p.label}
            </button>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity }}
          className="hidden md:flex absolute bottom-8 right-10 flex-col items-center gap-2 text-white/60">
          <div className="w-px h-12 bg-gradient-to-b from-[var(--amber-h)] to-transparent" />
          <ChevronDown className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-widest font-sans-ui [writing-mode:vertical-rl]">Scroll</span>
        </motion.div>
      </div>

      <AnimatePresence>
        {showVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowVideo(false)}
            className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-sm flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
              <iframe className="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="WanderNest" allow="autoplay; encrypted-media" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function DestinationShowcase() {
  const top = destinations.slice(0, 6);
  return (
    <section className="bg-[var(--twilight-deep)] py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionHeader light overline="EXPLORE BY DESTINATION" title="Where Will You Go Next?" subtitle="From the backwaters of Kerala to the canals of Amsterdam — we've been there, so you can trust us." />
      </div>
      <motion.div drag="x" dragConstraints={{ left: -1200, right: 0 }} dragElastic={0.08}
        className="flex gap-5 px-6 lg:px-10 cursor-grab active:cursor-grabbing">
        {top.map((d, i) => (
          <motion.div key={d.slug} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ delay: i * 0.07 }}
            className="relative shrink-0 w-[280px] h-[380px] rounded-[20px] overflow-hidden group">
            <Link to="/destinations/$slug" params={{ slug: d.slug }} className="block w-full h-full">
              <img src={d.image} alt={d.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full glass text-white text-xs font-sans-ui">{d.flag} {d.country}</div>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="text-xs text-[var(--amber-h)] font-sans-ui font-semibold">FROM ₹{d.from.toLocaleString("en-IN")} / PERSON</div>
                <div className="font-display italic text-2xl mt-1">{d.name}</div>
                <div className="text-xs text-white/70 mt-1 font-sans-ui">{d.packages} packages available</div>
                <div className="mt-3 h-px bg-[var(--amber-h)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <div className="mt-2 text-xs font-sans-ui font-semibold flex items-center gap-1 text-[var(--amber-h)] opacity-0 group-hover:opacity-100 transition">
                  Explore <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mt-10 text-right">
        <Link to="/destinations" className="text-[var(--amber-h)] font-sans-ui font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all">
          View All Destinations <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

function FeaturedPackages() {
  const feat = [packages[0], packages[1], packages[2]];
  return (
    <section className="bg-[var(--cloud)] py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-end flex-wrap gap-4 mb-12">
          <SectionHeader overline="HANDPICKED FOR FAMILIES" title="Our Most-Loved Holiday Packages" />
          <Link to="/packages" className="text-[var(--teal-s)] font-sans-ui font-semibold inline-flex items-center gap-2 mb-2">View All Packages <ArrowRight className="w-4 h-4" /></Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-5">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}
            className="lg:col-span-7 lg:row-span-2"><PackageCard p={feat[0]} large /></motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ delay: 0.15 }}
            className="lg:col-span-5"><PackageCard p={feat[1]} /></motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ delay: 0.3 }}
            className="lg:col-span-5"><PackageCard p={feat[2]} /></motion.div>
        </div>
      </div>
    </section>
  );
}

export function PackageCard({ p, large = false }: { p: typeof packages[number]; large?: boolean }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-transparent hover:border-[var(--amber-h)]/40 transition-all hover:-translate-y-1.5 h-full flex flex-col">
      <div className={`relative overflow-hidden ${large ? "h-80 lg:h-[420px]" : "h-56"}`}>
        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        {p.badge && <span className="absolute top-4 left-4 bg-[var(--amber-h)] text-[var(--twilight-deep)] text-[10px] font-bold font-sans-ui tracking-wider px-2.5 py-1 rounded-full">{p.badge}</span>}
        <div className="absolute bottom-4 left-5 right-5 text-white">
          <div className="text-xs text-[var(--amber-h)] font-sans-ui font-semibold tracking-wider">FROM ₹{p.price.toLocaleString("en-IN")} / PERSON</div>
          <div className={`font-display ${large ? "text-3xl lg:text-4xl" : "text-xl"} italic leading-tight mt-1`}>{p.name}</div>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--cloud)] text-[var(--twilight-deep)] font-sans-ui">{p.nights}N / {p.days}D</span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--cloud)] text-[var(--twilight-deep)] font-sans-ui flex items-center gap-1"><Users className="w-3 h-3" /> {p.type === "honeymoon" ? "Couple" : "Family"}</span>
        </div>
        <div className="flex gap-2 text-xs text-[var(--stone)] font-sans-ui flex-wrap mb-4">
          <span>✈ Flights</span><span>· 🏨 Hotels</span><span>· 🍽 Meals</span><span>· 📸 Sightseeing</span>
        </div>
        <div className="mt-auto flex gap-2 pt-3">
          <Link to="/packages/$id" params={{ id: p.id }} className="flex-1 text-center px-4 py-2.5 rounded-full border border-[var(--teal-s)] text-[var(--teal-s)] text-sm font-sans-ui font-semibold hover:bg-[var(--teal-s)] hover:text-white transition">View Details</Link>
          <Link to="/booking/$packageId" params={{ packageId: p.id }} className="flex-1 text-center px-4 py-2.5 rounded-full bg-[var(--amber-h)] text-[var(--twilight-deep)] text-sm font-sans-ui font-semibold hover:shadow-lg transition">Book Now</Link>
        </div>
      </div>
    </div>
  );
}

function ParallaxShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [m, setM] = useState({ x: 0, y: 0 });
  useEffect(() => {
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    let raf: number;
    const tick = () => {
      cx += (tx - cx) * 0.065;
      cy += (ty - cy) * 0.065;
      setM({ x: cx, y: cy });
      raf = requestAnimationFrame(tick);
    };
    const el = ref.current;
    el?.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => { el?.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  const callouts = [
    { pos: "top-6 left-6", icon: <Globe className="w-4 h-4" />, label: "500+ Destinations", delay: 0 },
    { pos: "top-6 right-6", icon: <BookOpen className="w-4 h-4" />, label: "Visa Assistance", delay: 0.8 },
    { pos: "bottom-6 left-6", icon: <Headphones className="w-4 h-4" />, label: "24/7 Travel Support", delay: 1.4 },
    { pos: "bottom-6 right-6", icon: <CreditCard className="w-4 h-4" />, label: "EMI Available", delay: 2.1 },
  ];
  const corners = [
    { x: -50, y: -50 },{ x: 50, y: -50 },{ x: -50, y: 50 },{ x: 50, y: 50 },
  ];

  return (
    <section className="bg-[var(--twilight-deep)] py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionHeader light center overline="A WORLD AWAITS" title="Your Next Adventure Awaits" subtitle="Hover & explore. Drag the cards. Drift through the world." />

        <div ref={ref} className="relative mx-auto max-w-5xl aspect-[16/10] mt-8" style={{ perspective: "1200px" }}>
          {/* amber frame */}
          <div className="absolute -inset-5 border-2 border-[var(--amber-h)] rounded-[28px] pointer-events-none transition-transform duration-200 ease-out"
            style={{ transform: `translate(${-m.x * 12}px, ${-m.y * 12}px)` }} />
          {/* main image with parallax tilt */}
          <div className="relative w-full h-full rounded-[24px] overflow-hidden shadow-[0_30px_80px_-20px_rgba(232,160,32,0.4)] transition-transform duration-200 ease-out"
            style={{ transform: `rotateX(${m.y * -5}deg) rotateY(${m.x * 7}deg)`, transformStyle: "preserve-3d" }}>
            {/* Layer 1: bg sky */}
            <div className="absolute inset-0" style={{ transform: `translate(${m.x * 18}px, ${m.y * 18}px)` }}>
              <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600" alt="" className="w-full h-full object-cover" />
            </div>
            {/* Layer 2: mid */}
            <div className="absolute inset-0 mix-blend-overlay" style={{ transform: `translate(${m.x * 38}px, ${m.y * 38}px)` }}>
              <img src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200" alt="" className="w-full h-full object-cover opacity-50" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(7,13,24,0.5)] via-transparent to-[rgba(232,160,32,0.15)]" />
            {/* Layer 3: foreground caption */}
            <div className="absolute bottom-8 left-8 text-white" style={{ transform: `translate(${m.x * 70}px, ${m.y * 70}px)` }}>
              <div className="text-[10px] tracking-widest text-[var(--amber-h)] font-sans-ui font-semibold uppercase">Live Counter</div>
              <div className="font-display text-3xl italic">500+ happy families this month.</div>
            </div>
          </div>

          {callouts.map((c, i) => (
            <motion.div key={i} initial={{ x: corners[i].x, y: corners[i].y, opacity: 0 }} whileInView={{ x: 0, y: 0, opacity: 1 }} viewport={{ once: false, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.2 + i * 0.1 }}
              className={`absolute ${c.pos} glass text-white px-4 py-2.5 rounded-2xl flex items-center gap-2 text-xs font-sans-ui font-medium animate-float`}
              style={{ animationDelay: `${c.delay}s` }}>
              <span className="text-[var(--amber-h)]">{c.icon}</span> {c.label}
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/contact" className="inline-block px-7 py-3.5 rounded-full border-2 border-[var(--amber-h)] text-[var(--amber-h)] font-sans-ui font-semibold hover:bg-[var(--amber-h)] hover:text-[var(--twilight-deep)] transition">
            Plan Your Dream Holiday
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { icon: <Shield className="w-5 h-5" />, t: "100% Customised", d: "No cookie-cutter packages — every trip built around your family." },
    { icon: <Clock className="w-5 h-5" />, t: "18 Years Expertise", d: "Two decades of on-ground knowledge across 500+ destinations." },
    { icon: <Headphones className="w-5 h-5" />, t: "24/7 Travel Support", d: "Our team is with you from booking to back home." },
    { icon: <CreditCard className="w-5 h-5" />, t: "Zero Hidden Costs", d: "Full transparency — what you see is what you pay." },
    { icon: <Award className="w-5 h-5" />, t: "IATA Certified", d: "Licensed, government-recognised travel agency." },
    { icon: <Smile className="w-5 h-5" />, t: "Family-First Design", d: "Child-safe hotels, paced itineraries, fun for every age." },
  ];
  return (
    <section className="bg-[var(--cloud)] py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionHeader overline="WHY WANDERNEST" title="Why 50,000 Families Trust WanderNest" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div key={it.t} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ delay: i * 0.08 }}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:border-l-4 hover:border-l-[var(--amber-h)] hover:translate-x-1 border border-[var(--border)] transition-all">
              <div className="w-12 h-12 rounded-full bg-[var(--amber-h)]/15 text-[var(--amber-h)] flex items-center justify-center mb-4 group-hover:rotate-[360deg] transition-transform duration-700">{it.icon}</div>
              <h3 className="font-sans-ui font-semibold text-lg text-[var(--twilight-deep)]">{it.t}</h3>
              <p className="text-sm text-[var(--stone)] mt-1.5 font-sans-ui">{it.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4 });
  const stats = [
    { v: 18, suffix: "+", label: "Years of Operation" },
    { v: 500, suffix: "+", label: "Destinations Covered" },
    { v: 50000, suffix: "+", label: "Families Served" },
    { v: 4.9, suffix: "★", label: "Google Rating", isFloat: true },
  ];
  return (
    <section ref={ref} className="bg-[var(--twilight-deep)] py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionHeader light center overline="THE NUMBERS" title="WanderNest in Numbers" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {stats.map((s, i) => <StatItem key={i} v={s.v} suffix={s.suffix} label={s.label} inView={inView} isFloat={s.isFloat} />)}
        </div>
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {["IATA Accredited Member","TripAdvisor Excellence 2024","Times Travel — Best Family Agency 2023","Outlook Traveller Top 10 India","Google 4.9★ Quality"].map((a) => (
            <div key={a} className="border border-[var(--amber-h)]/40 rounded-xl p-4 text-center text-white/80 font-sans-ui text-sm">
              <Award className="w-5 h-5 text-[var(--amber-h)] mx-auto mb-2" />{a}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ v, suffix, label, inView, isFloat }: { v: number; suffix: string; label: string; inView: boolean; isFloat?: boolean }) {
  const n = useCounter(isFloat ? Math.round(v * 10) : v, inView, 2000);
  const display = isFloat ? (n / 10).toFixed(1) : (v >= 1000 ? n.toLocaleString("en-IN") : n);
  return (
    <div className="text-center">
      <div className="font-display text-[var(--amber-h)] text-5xl lg:text-7xl leading-none">{display}{suffix}</div>
      <div className="mt-2 text-white/65 text-sm font-sans-ui tracking-wide">{label}</div>
    </div>
  );
}

function Testimonials() {
  return (
    <section className="bg-[var(--twilight)] py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionHeader light overline="WANDERFAMILY" title="Stories From Our WanderFamily" subtitle="Real journeys, real words. Drag to explore." />
      </div>
      <motion.div drag="x" dragConstraints={{ left: -2400, right: 0 }} dragElastic={0.08} className="flex gap-5 px-6 lg:px-10 cursor-grab active:cursor-grabbing pb-4">
        {testimonials.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ delay: i * 0.04 }}
            className="shrink-0 w-[340px] glass-dark rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <img src={t.photo} alt={t.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-[var(--amber-h)] ring-offset-2 ring-offset-[var(--twilight)]" draggable={false} />
              <div>
                <div className="font-sans-ui font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-white/55">{t.city}</div>
              </div>
            </div>
            <div className="flex gap-0.5 mb-3">{[...Array(5)].map((_, k) => <Star key={k} className="w-3.5 h-3.5 fill-[var(--amber-h)] text-[var(--amber-h)]" />)}</div>
            <p className="italic text-white/85 text-sm leading-relaxed">"{t.text}"</p>
            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-[11px] text-[var(--amber-h)] font-sans-ui">{t.pkg}</span>
              <span className="text-[10px] text-[var(--teal-s)] font-sans-ui font-semibold">✓ Verified</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Calculator() {
  const [dest, setDest] = useState("India");
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [nights, setNights] = useState(5);
  const [hotel, setHotel] = useState<"3"|"4"|"5">("4");
  const [flights, setFlights] = useState(true);
  const [meal, setMeal] = useState<"BB"|"HB"|"AI">("BB");

  const baseRates: Record<string, number> = { India: 4500, Maldives: 14000, Thailand: 5500, Bali: 5800, Europe: 12000, Singapore: 6500 };
  const hotelMul: Record<string, number> = { "3": 1, "4": 1.4, "5": 2 };
  const mealMul: Record<string, number> = { BB: 1, HB: 1.18, AI: 1.4 };
  const flightCost: Record<string, number> = { India: 8000, Maldives: 35000, Thailand: 22000, Bali: 28000, Europe: 65000, Singapore: 25000 };

  const perNight = baseRates[dest] * hotelMul[hotel] * mealMul[meal];
  const baseAdult = perNight * nights;
  const baseAdults = baseAdult * adults;
  const baseKids = baseAdult * 0.5 * kids;
  const flightTotal = flights ? flightCost[dest] * (adults + kids) : 0;
  const subtotal = baseAdults + baseKids + flightTotal;
  const total = Math.round(subtotal * 1.05);

  return (
    <section id="calculator" className="bg-[var(--cloud)] py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-10">
        <div>
          <SectionHeader overline="BUDGET CALCULATOR" title="Plan Your Budget Instantly" subtitle="A quick estimate. Our experts send a tailored quote within 2 hours." />
          <div className="space-y-5 bg-white rounded-2xl p-6 shadow-sm">
            <div>
              <label className="text-xs uppercase tracking-wider text-[var(--stone)] font-sans-ui font-semibold">Destination</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {Object.keys(baseRates).map((d) => (
                  <button key={d} onClick={() => setDest(d)} className={`px-3.5 py-2 rounded-full text-sm font-sans-ui transition ${dest === d ? "bg-[var(--twilight-deep)] text-white" : "bg-[var(--cloud)] text-[var(--twilight-deep)] hover:bg-[var(--amber-h)]/30"}`}>{d}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Stepper label="Adults" v={adults} set={setAdults} min={1} max={10} />
              <Stepper label="Children" v={kids} set={setKids} min={0} max={8} />
              <Stepper label="Nights" v={nights} set={setNights} min={2} max={20} />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-[var(--stone)] font-sans-ui font-semibold">Hotel</label>
              <div className="flex gap-2 mt-2">
                {(["3","4","5"] as const).map((h) => (
                  <button key={h} onClick={() => setHotel(h)} className={`flex-1 py-2 rounded-lg text-sm font-sans-ui transition ${hotel === h ? "bg-[var(--amber-h)] text-[var(--twilight-deep)]" : "bg-[var(--cloud)] text-[var(--twilight-deep)]"}`}>{h}★ {h === "3" ? "Budget" : h === "4" ? "Comfort" : "Luxury"}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-[var(--stone)] font-sans-ui font-semibold">Include Flights?</label>
              <div className="flex gap-2 mt-2">
                <button onClick={() => setFlights(true)} className={`flex-1 py-2 rounded-lg text-sm font-sans-ui ${flights ? "bg-[var(--teal-s)] text-white" : "bg-[var(--cloud)]"}`}>Yes</button>
                <button onClick={() => setFlights(false)} className={`flex-1 py-2 rounded-lg text-sm font-sans-ui ${!flights ? "bg-[var(--teal-s)] text-white" : "bg-[var(--cloud)]"}`}>No</button>
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-[var(--stone)] font-sans-ui font-semibold">Meal Plan</label>
              <div className="flex gap-2 mt-2">
                {([["BB","Breakfast"],["HB","Half Board"],["AI","All Inclusive"]] as const).map(([k, v]) => (
                  <button key={k} onClick={() => setMeal(k)} className={`flex-1 py-2 rounded-lg text-sm font-sans-ui ${meal === k ? "bg-[var(--twilight-deep)] text-white" : "bg-[var(--cloud)]"}`}>{v}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-32 self-start">
          <div className="bg-[var(--twilight-deep)] text-white rounded-2xl p-8 shadow-2xl">
            <div className="text-xs tracking-widest text-[var(--amber-h)] font-sans-ui font-semibold uppercase mb-2">Estimated Cost</div>
            <div className="space-y-2.5 text-sm font-sans-ui text-white/75 border-b border-white/10 pb-5">
              <Row label={`Per night × ${nights}`} val={`₹${Math.round(perNight * nights).toLocaleString("en-IN")}`} />
              <Row label={`× ${adults} adults`} val={`₹${Math.round(baseAdults).toLocaleString("en-IN")}`} />
              {kids > 0 && <Row label={`+ ${kids} children (50% off)`} val={`₹${Math.round(baseKids).toLocaleString("en-IN")}`} />}
              {flights && <Row label="Flights estimate" val={`₹${flightTotal.toLocaleString("en-IN")}`} />}
              <Row label="Taxes (5% GST)" val={`₹${Math.round(subtotal * 0.05).toLocaleString("en-IN")}`} />
            </div>
            <div className="flex justify-between items-end mt-5">
              <span className="text-white/60 font-sans-ui">Total Estimate</span>
              <AnimatePresence mode="popLayout">
                <motion.span key={total} initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -18, opacity: 0 }}
                  className="font-display text-4xl text-[var(--amber-h)]">₹{total.toLocaleString("en-IN")}</motion.span>
              </AnimatePresence>
            </div>
            <div className="mt-6 grid gap-2.5">
              <Link to="/contact" className="text-center px-5 py-3 rounded-full bg-[var(--amber-h)] text-[var(--twilight-deep)] font-sans-ui font-semibold">Get Exact Quote →</Link>
              <a href={`tel:${PHONE.replace(/\s/g,"")}`} className="text-center px-5 py-3 rounded-full border border-white/30 text-white font-sans-ui">Talk to Expert →</a>
            </div>
            <p className="text-[11px] text-white/45 mt-5 leading-relaxed">Indicative estimate. Final price includes GST and varies by travel dates. Our experts send a detailed quote within 2 hours.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stepper({ label, v, set, min, max }: { label: string; v: number; set: (n: number) => void; min: number; max: number }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-[var(--stone)] font-sans-ui font-semibold">{label}</label>
      <div className="mt-2 flex items-center bg-[var(--cloud)] rounded-lg">
        <button onClick={() => set(Math.max(min, v - 1))} className="w-9 h-10 text-lg">−</button>
        <span className="flex-1 text-center font-sans-ui font-semibold">{v}</span>
        <button onClick={() => set(Math.min(max, v + 1))} className="w-9 h-10 text-lg">+</button>
      </div>
    </div>
  );
}

function Row({ label, val }: { label: string; val: string }) {
  return <div className="flex justify-between"><span>{label}</span><span className="text-white">{val}</span></div>;
}

function BlogPreview() {
  return (
    <section className="bg-[var(--twilight-deep)] py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionHeader light overline="STORIES FROM THE ROAD" title="Travel Stories & Tips" />
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((b, i) => (
            <motion.div key={b.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ delay: i * 0.1 }}>
              <Link to="/blog/$slug" params={{ slug: b.slug }} className="group block rounded-2xl overflow-hidden bg-[var(--twilight)] hover:-translate-y-1.5 transition">
                <div className="relative h-56 overflow-hidden">
                  <img src={b.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-4 left-4 bg-[var(--amber-h)] text-[var(--twilight-deep)] text-[10px] font-bold px-2.5 py-1 rounded-full">{b.category}</span>
                </div>
                <div className="p-5 text-white">
                  <h3 className="font-display text-xl leading-tight">{b.title}</h3>
                  <div className="flex items-center gap-2 mt-3 text-xs text-white/55">
                    <img src={b.authorPhoto} className="w-6 h-6 rounded-full object-cover" alt="" />
                    {b.author} · {b.read} min read
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/blog" className="inline-block px-6 py-3 rounded-full bg-[var(--amber-h)] text-[var(--twilight-deep)] font-sans-ui font-semibold">Read All Stories →</Link>
        </div>
      </div>
    </section>
  );
}

function VisaTeaser() {
  return (
    <section className="bg-[var(--cloud)] py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionHeader overline="VISA SERVICES" title="Stress-Free Visa Assistance" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {visaData.slice(0, 6).map((v) => (
            <div key={v.country} className="bg-white rounded-xl p-4 flex items-center gap-3 hover:shadow-md transition">
              <span className="text-3xl">{v.flag}</span>
              <div className="flex-1">
                <div className="font-sans-ui font-semibold text-[var(--twilight-deep)]">{v.country}</div>
                <div className="text-xs text-[var(--teal-s)] font-sans-ui">{v.type} · {v.time}</div>
              </div>
              <Link to="/visa" className="text-[var(--amber-h)] text-sm font-sans-ui font-semibold">Apply →</Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/visa" className="text-[var(--teal-s)] font-sans-ui font-semibold">Full Visa Assistance →</Link>
        </div>
      </div>
    </section>
  );
}

function InstagramWall() {
  const imgs = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
    "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600",
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600",
    "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600",
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600",
    "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600",
    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600",
    "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600",
  ];
  return (
    <section className="bg-[var(--twilight-deep)] py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionHeader light center overline="@WANDERNESTTRAVEL" title="Follow the Journey" />
        <div className="grid grid-cols-3 gap-2 lg:gap-3">
          {imgs.map((src, i) => (
            <motion.a key={i} href="#" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false }} transition={{ delay: i * 0.05 }}
              className="relative aspect-square rounded-lg overflow-hidden group">
              <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-[var(--amber-h)]/0 group-hover:bg-[var(--amber-h)]/40 transition flex items-center justify-center text-white opacity-0 group-hover:opacity-100">
                <Heart /> 1.2K
              </div>
            </motion.a>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="#" className="inline-block px-6 py-3 rounded-full bg-[var(--amber-h)] text-[var(--twilight-deep)] font-sans-ui font-semibold">Follow @wandernesttravel →</a>
        </div>
      </div>
    </section>
  );
}

function Heart() { return <span className="mr-1">♥</span>; }

function CtaBanner() {
  return (
    <section className="bg-[var(--amber-h)] py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #1A0F00 1px, transparent 0)", backgroundSize: "20px 20px" }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative grid lg:grid-cols-2 gap-8 items-center">
        <div className="text-[#1A0F00]">
          <h3 className="font-display italic text-4xl lg:text-5xl leading-tight">Your dream holiday starts with one call.</h3>
          <p className="mt-3 font-sans-ui text-[#1A0F00]/75">Complimentary itinerary consultation. No obligation. Just inspiration.</p>
        </div>
        <div className="flex gap-4 lg:justify-end items-center flex-wrap">
          <Link to="/contact" className="px-7 py-3.5 rounded-full bg-[var(--twilight-deep)] text-white font-sans-ui font-semibold">Start Planning</Link>
          <a href={`tel:${PHONE.replace(/\s/g,"")}`} className="text-[#1A0F00] font-display text-2xl flex items-center gap-2"><Phone className="w-5 h-5" /> {PHONE}</a>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <PageWrap>
      <Hero />
      <DestinationShowcase />
      <FeaturedPackages />
      <ParallaxShowcase />
      <WhyUs />
      <Stats />
      <Testimonials />
      <Calculator />
      <BlogPreview />
      <VisaTeaser />
      <InstagramWall />
      <CtaBanner />
    </PageWrap>
  );
}
