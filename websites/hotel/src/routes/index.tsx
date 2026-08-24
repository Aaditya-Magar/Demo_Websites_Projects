import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Bed, Waves, Sun, Sparkles, Play, ChevronDown, Star, BedDouble, Users, MapPin, Plus } from "lucide-react";
import { rooms, restaurants, experiences, testimonials, galleryImages, awards } from "../lib/data";
import { Counter, Overline, Reveal } from "../components/SectionPrimitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Seagrove Resort & Spa — Where the Sea Meets Stillness" },
      { name: "description", content: "Goa's #1 ultra-luxury beach resort. 48 ocean-facing suites, three restaurants, an award-winning spa on Candolim Beach." },
      { property: "og:title", content: "Seagrove Resort & Spa" },
      { property: "og:description", content: "Where the sea meets stillness. Candolim Beach, North Goa." },
    ],
  }),
  component: Home,
});

const heroWords = ["Where", "the", "Sea", "Meets", "Stillness"];

function Home() {
  return (
    <>
      <Hero />
      <FeaturedRooms />
      <ExperienceTeaser />
      <Showcase3D />
      <DiningPreview />
      <SpaTeaser />
      <Stats />
      <Testimonials />
      <ExperiencesGrid />
      <GalleryPreview />
      <CTABanner />
    </>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-ocean-deep py-24">
      <div className="absolute inset-0 kenburns">
        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920" alt="Seagrove resort beach at golden hour" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,15,22,0.55) 0%, rgba(8,15,22,0.2) 50%, rgba(8,15,22,0.85) 100%)" }} />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Overline>Goa's Finest Oceanfront Retreat</Overline>
        </motion.div>

        <h1 className="mt-6 font-display italic text-ivory leading-[0.95] text-4xl sm:text-5xl md:text-7xl lg:text-8xl">
          {heroWords.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 80, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.3 + i * 0.12, ease: [0.22,1,0.36,1] }}
              className="inline-block mr-3 md:mr-5"
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 1 }} className="mt-7 text-ivory/65 max-w-xl font-sub text-sm md:text-base">
          48 ocean-facing suites. 3 restaurants. An award-winning spa. <br/> Candolim Beach, North Goa.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.9 }} className="mt-9 flex flex-col sm:flex-row gap-4">
          <Link to="/rooms" className="bg-gold text-ocean-deep px-8 py-4 rounded-full text-xs font-sub font-semibold uppercase tracking-[0.22em] hover:bg-gold-soft transition">
            Explore Rooms
          </Link>
          <button className="border border-ivory/60 text-ivory px-8 py-4 rounded-full text-xs font-sub uppercase tracking-[0.22em] hover:bg-ivory/10 transition flex items-center gap-2.5 justify-center">
            <Play size={14} /> Watch Resort Film
          </button>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl px-6">
          {[
            { v: "48", l: "Ocean Suites" },
            { v: "#1 Resort", l: "Goa 2024" },
            { v: "1,200+ Reviews", l: "5-Star Rated" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9 + i * 0.18, duration: 0.7 }}
              className="glass rounded-2xl px-6 py-4 text-ivory text-center"
            >
              <p className="font-display italic text-xl text-gold">{s.v}</p>
              <p className="text-[11px] font-sub uppercase tracking-[0.2em] text-ivory/70 mt-1">{s.l}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

function FeaturedRooms() {
  const featured = rooms.slice(1, 3);
  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <Overline>Your Home by the Sea</Overline>
            <h2 className="mt-3 font-display italic text-4xl md:text-6xl text-ocean">Rooms & Villas</h2>
          </div>
          <Link to="/rooms" className="story-link text-teal text-sm font-sub uppercase tracking-[0.2em]">View All Rooms →</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RoomCard({ room, large, className = "" }: { room: typeof rooms[number]; large?: boolean; className?: string }) {
  return (
    <Reveal>
      <article className={`group bg-card rounded-2xl overflow-hidden border border-border hover:border-gold transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl ${className}`}>
        <Link to="/rooms/$id" params={{ id: room.id }} className="block relative overflow-hidden">
          <div className={`relative ${large ? "aspect-[16/11]" : "aspect-[16/10]"}`}>
            <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1.2s]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/85 via-ocean-deep/10 to-transparent" />
            <div className="absolute bottom-5 left-6 right-6 text-ivory">
              <p className="text-gold text-[10px] font-sub uppercase tracking-[0.25em]">From ₹{room.price.toLocaleString("en-IN")} / night</p>
              <h3 className="font-display italic text-3xl md:text-4xl mt-1">{room.name}</h3>
            </div>
          </div>
        </Link>
        <div className="p-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-sub text-muted-foreground">
          <span className="flex items-center gap-1.5"><MapPin size={13} className="text-teal" /> {room.size} sqm</span>
          <span className="flex items-center gap-1.5"><Users size={13} className="text-teal" /> Up to {room.guests}</span>
          <span className="flex items-center gap-1.5"><BedDouble size={13} className="text-teal" /> {room.beds}</span>
          <div className="flex flex-wrap gap-2 ml-auto">
            {room.highlights.slice(0,2).map((h) => (
              <span key={h} className="text-[10px] uppercase tracking-wider border border-teal/40 text-teal px-2.5 py-1 rounded-full">{h}</span>
            ))}
          </div>
        </div>
        <div className="px-6 pb-6 flex gap-3">
          <Link to="/booking" className="flex-1 text-center bg-teal text-white text-xs font-sub uppercase tracking-[0.2em] py-3 rounded-full hover:bg-teal/90 transition">Book Now</Link>
          <Link to="/rooms/$id" params={{ id: room.id }} className="flex-1 text-center border border-border text-xs font-sub uppercase tracking-[0.2em] py-3 rounded-full hover:border-gold hover:text-gold transition">View Details</Link>
        </div>
      </article>
    </Reveal>
  );
}

function ExperienceTeaser() {
  const items = [
    { title: "The Seagrove Spa", img: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=900", icon: Sparkles, to: "/spa" },
    { title: "Fine Dining by the Waves", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900", icon: Waves, to: "/dining" },
    { title: "Water Sports & Adventures", img: "https://images.unsplash.com/photo-1530053969600-caed2596d242?w=900", icon: Sun, to: "/experiences" },
    { title: "Sunset Cruises & Events", img: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=900", icon: Bed, to: "/experiences" },
  ];
  return (
    <section className="bg-ocean-deep text-ivory py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <Overline>The Seagrove Way</Overline>
          <h2 className="mt-3 font-display italic text-4xl md:text-6xl">More Than a Stay — An Experience</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <Link to={it.to} className="group relative aspect-[16/10] rounded-2xl overflow-hidden block border border-white/5 hover:border-teal/60 hover:shadow-[0_0_40px_rgba(26,123,138,0.25)] transition-all duration-500">
                <img src={it.img} alt={it.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/30 to-transparent" />
                <div className="absolute bottom-7 left-7 right-7">
                  <it.icon className="text-gold mb-3" size={24} />
                  <h3 className="font-display italic text-3xl">{it.title}</h3>
                  <p className="text-gold text-xs font-sub uppercase tracking-[0.22em] mt-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 story-link">Discover →</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Showcase3D() {
  const wrap = useRef<HTMLDivElement>(null);
  const [m, setM] = useState({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (!wrap.current) return;
      const r = wrap.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      target.current.x = (e.clientX - cx) / r.width;
      target.current.y = (e.clientY - cy) / r.height;
    };
    const loop = () => {
      setM((p) => ({ x: p.x + (target.current.x - p.x) * 0.06, y: p.y + (target.current.y - p.y) * 0.06 }));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); };
  }, []);

  const rotX = -m.y * 6;
  const rotY = m.x * 8;

  return (
    <section className="bg-[#080F16] text-ivory py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <Overline>Immersive</Overline>
          <h2 className="mt-3 font-display italic text-4xl md:text-6xl">Step Into Seagrove</h2>
        </div>

        <div ref={wrap} className="relative max-w-5xl mx-auto" style={{ perspective: "1400px" }}>
          <div className="relative aspect-[16/10] rounded-2xl" style={{ transformStyle: "preserve-3d", transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`, transition: "transform 80ms linear" }}>
            <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ transform: `translate3d(${m.x * -20}px, ${m.y * -20}px, -40px)` }}>
              <img src="https://images.unsplash.com/photo-1505881402582-c5bc11054f91?w=1400" alt="" className="w-full h-full object-cover opacity-70" />
            </div>
            <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl" style={{ transform: `translate3d(${m.x * 0}px, ${m.y * 0}px, 0px)` }}>
              <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600" alt="Seagrove resort" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -inset-x-10 -bottom-10 h-1/3 pointer-events-none" style={{ transform: `translate3d(${m.x * 35}px, ${m.y * 35}px, 80px)` }}>
              <img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=900" alt="" className="w-40 h-40 object-cover absolute left-4 bottom-0 rounded-full opacity-0" />
            </div>
            <div className="pointer-events-none absolute -inset-6 border-2 border-gold rounded-2xl" style={{ transform: `translate3d(${m.x * -10}px, ${m.y * -10}px, 30px)` }} />
          </div>

          {[
            { pos: "top-0 left-0 -translate-x-4 -translate-y-4", label: "48 Ocean Suites", Icon: Bed, delay: 0 },
            { pos: "top-0 right-0 translate-x-4 -translate-y-4", label: "Infinity Pool", Icon: Waves, delay: 0.6 },
            { pos: "bottom-0 left-0 -translate-x-4 translate-y-4", label: "Private Beach", Icon: Sun, delay: 1.0 },
            { pos: "bottom-0 right-0 translate-x-4 translate-y-4", label: "Award-Winning Spa", Icon: Sparkles, delay: 0.3 },
          ].map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, x: c.pos.includes("left") ? -60 : 60, y: c.pos.includes("top") ? -60 : 60 }}
              whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.9, type: "spring" }}
              className={`hidden md:flex absolute ${c.pos} glass-dark text-ivory rounded-2xl px-5 py-3.5 items-center gap-3 floaty`}
              style={{ animationDelay: `${c.delay}s` }}
            >
              <c.Icon className="text-gold" size={18} />
              <span className="text-sm font-sub">{c.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="border border-gold text-gold px-7 py-3.5 rounded-full text-xs font-sub uppercase tracking-[0.22em] hover:bg-gold hover:text-ocean-deep transition flex items-center gap-2"><Play size={14} /> Take a Virtual Tour</button>
          <span className="text-ivory/50 text-xs font-sub uppercase tracking-[0.2em]">360° View Available</span>
        </div>
      </div>
    </section>
  );
}

function DiningPreview() {
  return (
    <section className="bg-sand py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <Overline>The Table</Overline>
          <h2 className="mt-3 font-display italic text-4xl md:text-6xl text-ocean">A Culinary Journey</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {restaurants.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.1}>
              <Link to="/dining" className="group block aspect-[3/4] relative rounded-2xl overflow-hidden border border-transparent hover:border-gold hover:-translate-y-1 transition-all duration-500">
                <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:brightness-110 group-hover:scale-105 transition-all duration-[1.2s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/30 to-transparent" />
                <div className="absolute bottom-7 left-7 right-7 text-ivory">
                  <p className="text-gold text-[10px] font-sub uppercase tracking-[0.25em]">{r.tag}</p>
                  <h3 className="font-display italic text-4xl mt-2">{r.name}</h3>
                  <p className="text-ivory/70 text-xs font-sub mt-3">{r.timings}</p>
                  <p className="text-gold text-xs font-sub uppercase tracking-[0.22em] mt-4 story-link">Book a Table →</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpaTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end","end start"] });
  const imgY = useTransform(scrollYProgress, [0,1], ["-6%", "6%"]);
  return (
    <section ref={ref} className="bg-ocean-deep text-ivory">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <motion.div initial={{ x: -60, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative overflow-hidden">
          <motion.img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200" alt="The Seagrove Spa" style={{ y: imgY }} className="w-full h-full object-cover scale-110" />
        </motion.div>
        <motion.div initial={{ x: 60, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="px-8 md:px-16 py-16 md:py-24 flex flex-col justify-center">
          <Overline>The Seagrove Spa</Overline>
          <h2 className="mt-4 font-display italic text-4xl md:text-6xl">Surrender to Stillness</h2>
          <p className="mt-6 text-ivory/70 font-sub leading-relaxed max-w-lg">
            Eight treatment rooms framed by a lotus pond. Balinese rituals, Ayurvedic traditions, and a steam cave carved from local stone. Begin in the herbal garden — finish in the cold plunge pool, the sea on your tongue.
          </p>
          <ul className="mt-8 space-y-3">
            {["Signature Seagrove Ritual — 120 min","Hot Stone Massage — 90 min","Balinese Body Wrap — 75 min","Couples' Sanctuary — 150 min","Ayurvedic Abhyanga — 60 min"].map((t) => (
              <li key={t} className="border-l-2 border-gold pl-4 text-ivory/85 font-sub text-sm">{t}</li>
            ))}
          </ul>
          <Link to="/spa" className="mt-10 self-start border border-gold text-gold px-7 py-3.5 rounded-full text-xs font-sub uppercase tracking-[0.22em] hover:bg-gold hover:text-ocean-deep transition">Explore the Spa</Link>
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { v: 48, suffix: "", l: "Ocean Suites" },
    { v: 5, suffix: "", l: "Dining Experiences" },
    { v: 1200, suffix: "+", l: "5-Star Reviews" },
    { v: 1, prefix: "#", l: "Resort in Goa, 2024" },
  ];
  return (
    <section className="bg-sand py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <Overline>By the Numbers</Overline>
          <h2 className="mt-3 font-display italic text-4xl md:text-6xl text-ocean">Seagrove in Numbers</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="text-center border-t border-gold/40 pt-6">
                <p className="font-display italic text-5xl md:text-6xl text-ocean">
                  <Counter to={s.v} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="text-xs font-sub uppercase tracking-[0.22em] text-driftwood mt-2">{s.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {awards.slice(0,4).map((a) => (
            <div key={a.title} className="border border-gold/50 rounded-xl bg-ivory p-5 text-center">
              <p className="text-gold font-display italic text-2xl">{a.year}</p>
              <p className="text-ocean text-sm font-sub font-medium mt-1">{a.title}</p>
              <p className="text-driftwood text-[10px] font-sub uppercase tracking-[0.2em] mt-1.5">{a.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const wrap = useRef<HTMLDivElement>(null);
  return (
    <section className="bg-ocean-deep text-ivory py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="mb-12">
          <Overline>Words From Our Guests</Overline>
          <h2 className="mt-3 font-display italic text-4xl md:text-6xl">In Their Own Words</h2>
        </div>
      </div>
      <div ref={wrap} className="overflow-hidden cursor-grab active:cursor-grabbing pl-6 lg:pl-10">
        <motion.div drag="x" dragConstraints={{ left: -1800, right: 0 }} dragElastic={0.1} className="flex gap-6 w-max pb-4">
          {testimonials.map((t, i) => (
            <div key={i} className="w-[340px] md:w-[400px] glass rounded-2xl p-7 select-none">
              <div className="flex items-center gap-3">
                <img src={t.photo} alt={t.name} className="w-12 h-12 rounded-full object-cover" draggable={false} />
                <div>
                  <p className="font-sub text-sm text-ivory">{t.name}</p>
                  <p className="text-ivory/55 text-xs font-sub">{t.city}</p>
                </div>
                <span className="ml-auto text-[9px] uppercase tracking-[0.2em] text-gold border border-gold/50 rounded-full px-2 py-1">Verified</span>
              </div>
              <div className="flex gap-0.5 mt-4">{Array.from({length:5}).map((_,j)=>(<Star key={j} size={14} className="fill-gold text-gold" />))}</div>
              <p className="text-ivory/85 font-display italic text-lg leading-relaxed mt-4">"{t.text}"</p>
              <p className="text-ivory/50 text-xs font-sub mt-5">{t.room} · {t.stay}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ExperiencesGrid() {
  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <Overline>Curated</Overline>
          <h2 className="mt-3 font-display italic text-4xl md:text-6xl text-ocean">Curated Experiences</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {experiences.slice(0,6).map((e, i) => (
            <Reveal key={e.id} delay={(i % 3) * 0.08}>
              <Link to="/experiences" className="group block aspect-[4/5] relative rounded-2xl overflow-hidden border border-transparent hover:border-teal hover:shadow-[0_0_30px_rgba(26,123,138,0.2)] transition-all duration-500">
                <img src={e.image} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/30 to-transparent" />
                <div className="absolute top-5 left-5">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold border border-gold/60 rounded-full px-2.5 py-1 backdrop-blur-sm">{e.category}</span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-ivory">
                  <h3 className="font-display italic text-2xl">{e.title}</h3>
                  <p className="text-ivory/70 text-xs font-sub mt-2 line-clamp-2">{e.description}</p>
                  <p className="text-gold text-xs font-sub uppercase tracking-[0.2em] mt-3 story-link">Book Experience →</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryPreview() {
  const imgs = galleryImages.slice(0, 9);
  return (
    <section className="bg-ocean-deep text-ivory py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <Overline>Through the Lens</Overline>
          <h2 className="mt-3 font-display italic text-4xl md:text-6xl">A Glimpse of Seagrove</h2>
        </div>
        <div className="masonry-3">
          {imgs.map((g, i) => (
            <div key={i} className="masonry-item relative group rounded-xl overflow-hidden">
              <img src={g.src} alt="" className="w-full h-auto group-hover:scale-105 transition-transform duration-[1.2s]" />
              <div className="absolute inset-0 bg-ocean-deep/0 group-hover:bg-ocean-deep/40 flex items-center justify-center transition-colors">
                <Plus className="text-ivory opacity-0 group-hover:opacity-100 transition" size={28} />
              </div>
              <div className="absolute inset-0 border-2 border-gold opacity-0 group-hover:opacity-100 rounded-xl transition" />
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/gallery" className="inline-block border border-gold text-gold px-7 py-3.5 rounded-full text-xs font-sub uppercase tracking-[0.22em] hover:bg-gold hover:text-ocean-deep transition">View Full Gallery →</Link>
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="bg-gold relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-[0.07]" preserveAspectRatio="none" viewBox="0 0 1200 200">
        <path d="M0 100 Q 300 40, 600 100 T 1200 100" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M0 130 Q 300 70, 600 130 T 1200 130" stroke="white" strokeWidth="1" fill="none" />
      </svg>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 md:py-24 relative grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="font-display italic text-4xl md:text-6xl text-ocean-deep">Your Perfect Goa Escape Awaits</h2>
          <p className="mt-4 font-sub text-ocean-deep/75 max-w-md">Complimentary breakfast for stays of 3+ nights. Book direct for our best rate, guaranteed.</p>
        </div>
        <div className="flex flex-col sm:flex-row md:justify-end items-start md:items-center gap-4">
          <Link to="/booking" className="bg-ocean-deep text-ivory px-8 py-4 rounded-full text-xs font-sub uppercase tracking-[0.22em] hover:bg-ocean transition">Reserve Your Stay</Link>
          <a href="tel:+919822200111" className="text-ocean-deep font-sub text-sm">Call: +91 98222 00111</a>
        </div>
      </div>
    </section>
  );
}
