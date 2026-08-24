import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronDown, Play, Zap, Flame, BarChart3, Moon, ArrowRight, Star,
  Apple, Smartphone,
} from "lucide-react";
import CountUp from "@/components/CountUp";
import TiltCard from "@/components/TiltCard";
import { HOME_CLASSES, TRAINERS, TESTIMONIALS } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Iron Peak Circle — Forge Your Limits | Mumbai's Premium Gym" },
      { name: "description", content: "Mumbai's #1 premium gym chain. Elite coaching, world-class equipment, 24/7 access across Andheri, Powai, and Bandra." },
      { property: "og:title", content: "Iron Peak Circle — Forge Your Limits" },
      { property: "og:description", content: "Mumbai's #1 premium gym. 500+ members, 15 elite trainers, 50+ classes a week." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <WhySection />
      <ClassesPreview />
      <TrainerSpotlight />
      <MembershipTeaser />
      <TestimonialsSection />
      <AppTeaser />
    </>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  const lines = ["FORGE", "YOUR", "LIMITS", "EVERY", "DAY."];

  return (
    <section ref={ref} className="relative h-screen min-h-[720px] w-full overflow-hidden grain bg-black">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80"
          alt="Athlete training at Iron Peak Circle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/40" />
      </motion.div>

      {/* Particles */}
      <Particles />

      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-5 pt-20 lg:px-10 h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-10 w-full items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-condensed uppercase tracking-[0.4em] text-[#E8192C] text-xs sm:text-sm mb-5"
            >
              ◆ Mumbai's #1 Premium Gym
            </motion.p>
            <h1 className="m-0 font-display font-bold uppercase leading-[0.86] text-[15vw] sm:text-[11vw] lg:text-[7rem] xl:text-[8.1rem] text-white mb-6">
              {lines.slice(0, 3).map((l, i) => (
                <motion.span
                  key={l}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`block ${i === 2 ? "text-[#E8192C]" : ""}`}
                >
                  {l}
                </motion.span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-white/70 max-w-md text-base lg:text-lg leading-relaxed mb-8"
            >
              Iron Peak Circle is where champions are built. State-of-the-art equipment, elite coaching, and a community that pushes you further than you thought possible.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/membership"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#E8192C] text-white font-condensed font-bold uppercase tracking-widest text-sm overflow-hidden"
              >
                <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative group-hover:text-[#E8192C] transition-colors flex items-center gap-2">
                  Start Your Journey <ArrowRight size={16} />
                </span>
              </Link>
              <button className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/30 text-white font-condensed font-bold uppercase tracking-widest text-sm hover:border-white hover:bg-white/5 transition-colors">
                <span className="grid place-items-center h-6 w-6 rounded-full bg-white text-black">
                  <Play size={11} fill="currentColor" />
                </span>
                Watch Our Story
              </button>
            </motion.div>
          </div>

          {/* Right: 3D dumbbell + floating badges */}
          <div className="relative h-[480px] hidden lg:flex items-center justify-center perspective-800">
            <div className="relative w-72 h-72 spin-y">
              <DumbbellSVG />
            </div>
            <FloatingBadge text="500+ Members" className="top-4 left-2 [animation-delay:-1s]" />
            <FloatingBadge text="15 Trainers" className="top-10 right-0 [animation-delay:-2.5s]" />
            <FloatingBadge text="50+ Classes/Week" className="bottom-12 left-0 [animation-delay:-0.5s]" />
            <FloatingBadge text="Est. 2015" className="bottom-2 right-6 [animation-delay:-3.5s]" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[#E8192C] scroll-indicator"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}

function FloatingBadge({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`absolute glass px-4 py-2 text-xs font-condensed uppercase tracking-widest text-white whitespace-nowrap float-y ${className}`}>
      <span className="text-[#E8192C] mr-1">●</span>{text}
    </div>
  );
}

function DumbbellSVG() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full drop-shadow-[0_20px_40px_rgba(232,25,44,0.45)]">
      <defs>
        <linearGradient id="metal" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#3a3a3a" />
          <stop offset="50%" stopColor="#888" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
        <linearGradient id="red" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ff3344" />
          <stop offset="100%" stopColor="#a8101e" />
        </linearGradient>
      </defs>
      <rect x="170" y="92" width="60" height="16" fill="url(#metal)" rx="2" />
      <rect x="40" y="60" width="40" height="80" fill="url(#red)" rx="6" />
      <rect x="80" y="50" width="30" height="100" fill="url(#metal)" rx="4" />
      <rect x="110" y="84" width="60" height="32" fill="url(#metal)" />
      <rect x="230" y="84" width="60" height="32" fill="url(#metal)" />
      <rect x="290" y="50" width="30" height="100" fill="url(#metal)" rx="4" />
      <rect x="320" y="60" width="40" height="80" fill="url(#red)" rx="6" />
      <circle cx="60" cy="100" r="6" fill="#1a1a1a" />
      <circle cx="340" cy="100" r="6" fill="#1a1a1a" />
    </svg>
  );
}

function Particles() {
  const particles = Array.from({ length: 30 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((_, i) => {
        const left = (i * 37) % 100;
        const dur = 8 + ((i * 13) % 10);
        const delay = -((i * 1.7) % 12);
        const red = i % 3 === 0;
        return (
          <span
            key={i}
            className={`absolute bottom-0 h-1 w-1 rounded-full ${red ? "bg-[#E8192C]" : "bg-white/70"}`}
            style={{
              left: `${left}%`,
              animation: `rise ${dur}s linear ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

/* ---------- STATS BAR ---------- */
function StatsBar() {
  const stats = [
    { v: 500, suf: "+", l: "Members" },
    { v: 10, suf: "+", l: "Years Strong" },
    { v: 98, suf: "%", l: "Retention" },
    { v: 50, suf: "+", l: "Weekly Classes" },
  ];
  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="bg-[#E8192C] text-white"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
        {stats.map((s) => (
          <div key={s.l} className="px-4 text-center">
            <div className="font-display text-5xl lg:text-6xl leading-none">
              <CountUp end={s.v} suffix={s.suf} />
            </div>
            <div className="font-condensed uppercase tracking-widest text-xs mt-2 text-white/90">{s.l}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ---------- WHY SECTION ---------- */
function WhySection() {
  const features = [
    { Icon: Zap, title: "Elite Equipment", text: "Hammer Strength, Eleiko, Technogym. Only the best iron in the city." },
    { Icon: Flame, title: "Expert Coaches", text: "Certified trainers who've competed nationally. Your goals, their obsession." },
    { Icon: BarChart3, title: "Progress Tracking", text: "Monthly body composition scans, strength benchmarks, personalized plans." },
    { Icon: Moon, title: "24/7 Access", text: "Train at 3AM or 3PM. The doors never close for our members." },
  ];
  return (
    <section className="bg-black py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-condensed uppercase tracking-[0.4em] text-[#E8192C] text-xs mb-4"
          >
            ◆ Why Iron Peak Circle
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-display text-5xl lg:text-7xl text-white mb-12 leading-[0.95]"
          >
            Not Just A Gym. <br />A <span className="text-[#E8192C]">Transformation</span> Lab.
          </motion.h2>
          <div className="space-y-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5 items-start"
              >
                <div className="grid place-items-center h-12 w-12 bg-[#E8192C] text-white shrink-0">
                  <f.Icon size={22} />
                </div>
                <div>
                  <h3 className="font-display text-2xl tracking-wider text-white">{f.title}</h3>
                  <p className="text-white/60 mt-1 leading-relaxed">{f.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative"
        >
          <TiltCard className="relative">
            <div className="absolute -top-4 -left-4 -right-4 -bottom-4 border-4 border-[#E8192C]" />
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=900&q=80"
                alt="Iron Peak Circle gym interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.7)]" />
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- CLASSES PREVIEW ---------- */
function ClassesPreview() {
  return (
    <section className="bg-[#0a0a0a] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div>
            <p className="font-condensed uppercase tracking-[0.4em] text-[#E8192C] text-xs mb-4">◆ Programs</p>
            <h2 className="font-display text-5xl lg:text-7xl text-white leading-[0.95]">
              Train In Every <span className="text-[#E8192C]">Dimension</span>
            </h2>
          </div>
          <Link to="/classes" className="font-condensed uppercase tracking-widest text-sm text-white hover:text-[#E8192C] flex items-center gap-2">
            View All Classes <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HOME_CLASSES.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08 }}
              className="group relative overflow-hidden bg-[#1A1A1A] aspect-[4/5]"
            >
              <img src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute top-4 right-4 bg-[#E8192C] text-white px-2.5 py-1 text-[10px] font-condensed font-bold uppercase tracking-widest">
                {c.intensity}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-condensed uppercase tracking-widest text-[#E8192C] text-xs mb-1">{c.duration} min</p>
                <h3 className="font-display text-3xl tracking-wider text-white">{c.name}</h3>
                <div className="overflow-hidden h-0 group-hover:h-7 transition-[height] duration-300">
                  <Link to="/classes" className="font-condensed uppercase tracking-widest text-sm text-white flex items-center gap-1 mt-2">
                    Book Class <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-0 bg-gradient-to-t from-[#E8192C] to-transparent group-hover:h-1/2 transition-[height] duration-500 opacity-70" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- TRAINER SPOTLIGHT ---------- */
function TrainerSpotlight() {
  return (
    <section className="bg-[#111] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="text-center mb-14">
          <p className="font-condensed uppercase tracking-[0.4em] text-[#E8192C] text-xs mb-4">◆ The Coaches</p>
          <h2 className="font-display text-5xl lg:text-7xl text-white">Coached By The Best</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TRAINERS.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <TiltCard className="group relative bg-black overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#E8192C] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-10" />
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div className="bg-[#1A1A1A] p-6">
                  <p className="font-condensed uppercase tracking-widest text-[#E8192C] text-xs mb-1">{t.specialty}</p>
                  <h3 className="font-display text-3xl tracking-wider text-white">{t.name}</h3>
                  <p className="text-white/50 text-sm mt-2">{t.years} years experience</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/trainers" className="inline-flex items-center gap-2 font-condensed uppercase tracking-widest text-sm text-white hover:text-[#E8192C]">
            Meet All Coaches <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- MEMBERSHIP TEASER ---------- */
function MembershipTeaser() {
  const tiers = [
    { name: "STARTER", text: "Gym + 2 group classes / week. Get the habit." },
    { name: "PRO", text: "24/7 access, unlimited classes, monthly PT." },
    { name: "ELITE", text: "Everything + DEXA, recovery, priority booking." },
  ];
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px]">
      <div className="bg-[#E8192C] flex flex-col justify-center px-8 lg:px-16 py-16 text-white">
        <p className="font-condensed uppercase tracking-[0.4em] text-white/80 text-xs mb-4">◆ Become A Member</p>
        <h2 className="font-display text-6xl lg:text-8xl leading-[0.9]">Ready To<br />Start?</h2>
        <p className="mt-6 text-white/90 text-lg">Plans from <span className="font-display text-3xl">₹1,999</span>/month.</p>
        <div className="mt-8">
          <Link
            to="/membership"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#E8192C] font-condensed font-bold uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-colors"
          >
            Join Now <ArrowRight size={16} />
          </Link>
        </div>
      </div>
      <div className="bg-black flex flex-col justify-center px-8 lg:px-16 py-16">
        <div className="space-y-8">
          {tiers.map((t) => (
            <motion.div
              key={t.name}
              whileHover={{ y: -4 }}
              className="border-l-2 border-[#E8192C] pl-5"
            >
              <h3 className={`font-display text-3xl tracking-wider ${t.name === "ELITE" ? "text-[#C9A84C]" : "text-white"}`}>{t.name}</h3>
              <p className="text-white/60 mt-1">{t.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- TESTIMONIALS ---------- */
function TestimonialsSection() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 4000);
    return () => window.clearInterval(id);
  }, []);
  const t = TESTIMONIALS[i];
  return (
    <section className="bg-black py-24 lg:py-32 grain">
      <div className="max-w-5xl mx-auto px-5 lg:px-10 text-center">
        <p className="font-condensed uppercase tracking-[0.4em] text-[#E8192C] text-xs mb-4">◆ Testimonials</p>
        <h2 className="font-display text-5xl lg:text-7xl text-white mb-14">Real People. Real Results.</h2>
        <div className="relative min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="glass p-8 lg:p-12"
            >
              <div className="flex justify-center gap-1 text-[#E8192C] mb-5">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} size={18} fill="currentColor" />)}
              </div>
              <p className="text-white text-lg lg:text-2xl font-light leading-relaxed italic">"{t.quote}"</p>
              <div className="mt-8 flex items-center justify-center gap-4">
                <img src={t.avatar} alt={t.name} className="h-14 w-14 rounded-full object-cover border-2 border-[#E8192C]" />
                <div className="text-left">
                  <div className="font-display text-xl tracking-wider text-white">{t.name}</div>
                  <div className="font-condensed uppercase tracking-widest text-xs text-[#E8192C]">{t.result}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, k) => (
            <button
              key={k}
              aria-label={`Show testimonial ${k + 1}`}
              onClick={() => setI(k)}
              className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-[#E8192C]" : "w-2 bg-white/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- APP TEASER ---------- */
function AppTeaser() {
  return (
    <section className="bg-[#0a0a0a] py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="font-condensed uppercase tracking-[0.4em] text-[#E8192C] text-xs mb-4">◆ The Iron Peak Circle App</p>
          <h2 className="font-display text-5xl lg:text-7xl text-white leading-[0.95]">
            Track. Train. <span className="text-[#E8192C]">Transform.</span>
          </h2>
          <p className="text-white/70 mt-6 text-lg leading-relaxed max-w-md">
            The Iron Peak Circle app gives you live class booking, progress tracking, and trainer chat. Available on iOS and Android.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 bg-white text-black px-6 py-3 hover:bg-[#E8192C] hover:text-white transition-colors">
              <Apple size={28} />
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-widest">Download on</div>
                <div className="font-display tracking-wider text-lg leading-none">App Store</div>
              </div>
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 bg-white text-black px-6 py-3 hover:bg-[#E8192C] hover:text-white transition-colors">
              <Smartphone size={28} />
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-widest">Get it on</div>
                <div className="font-display tracking-wider text-lg leading-none">Google Play</div>
              </div>
            </a>
          </div>
        </div>

        <div className="relative flex justify-center">
          <PhoneMockup />
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="absolute -left-2 top-10 glass px-4 py-3 text-sm float-y"
          >
            🔥 <span className="text-white">You burned <b>480 cal</b> today</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="absolute -right-2 bottom-16 glass px-4 py-3 text-sm float-y [animation-delay:-2s]"
          >
            💪 <span className="text-white">New PR: <b>Bench 100kg!</b></span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PhoneMockup() {
  return (
    <div className="relative w-[280px] h-[560px] bg-black border-[10px] border-[#1A1A1A] rounded-[40px] shadow-[0_30px_80px_rgba(232,25,44,0.25)]">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 h-5 w-24 bg-black rounded-full z-10" />
      <div className="absolute inset-0 m-1 rounded-[32px] overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#111] p-5 pt-10">
        <div className="text-white/50 text-[10px] font-condensed uppercase tracking-widest">Today</div>
        <div className="font-display text-white text-3xl tracking-wider mt-1">Hey, Arjun</div>
        <div className="mt-5 bg-[#E8192C] p-4 rounded-lg text-white">
          <div className="text-[10px] uppercase tracking-widest opacity-80">Next Class</div>
          <div className="font-display text-xl tracking-wider">HIIT Blitz</div>
          <div className="text-[11px] mt-1 opacity-90">6:30 PM · Derek Cole</div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-white/5 border border-white/10 p-3 rounded">
            <div className="text-[10px] text-white/40 uppercase tracking-widest">Calories</div>
            <div className="font-display text-2xl text-white">480</div>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded">
            <div className="text-[10px] text-white/40 uppercase tracking-widest">Streak</div>
            <div className="font-display text-2xl text-[#E8192C]">23 days</div>
          </div>
        </div>
        <div className="mt-4 bg-white/5 border border-white/10 p-3 rounded">
          <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2">This Week</div>
          <div className="flex items-end justify-between h-16 gap-1">
            {[40, 70, 30, 90, 60, 100, 50].map((h, i) => (
              <div key={i} className="flex-1 bg-[#E8192C]/80 rounded-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
