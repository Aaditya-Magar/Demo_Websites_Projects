import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { timeline, awards } from "../lib/data";
import { Overline, Reveal } from "../components/SectionPrimitives";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Seagrove Resort & Spa" },
      { name: "description", content: "Founded in 2010 on Candolim Beach. The story of Goa's most celebrated luxury beach resort." },
      { property: "og:title", content: "Our Story — Seagrove" },
      { property: "og:description", content: "We didn't build a resort. We built a feeling." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200" },
    ],
  }),
  component: About,
});

const openerWords = ["We", "didn't", "build", "a", "resort.", "We", "built", "a", "feeling."];

function About() {
  const tlRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: tlRef, offset: ["start end", "end start"] });
  const dash = useTransform(scrollYProgress, [0, 1], [600, 0]);
  return (
    <>
      <section className="relative h-screen overflow-hidden bg-ocean-deep">
        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920" alt="" className="absolute inset-0 w-full h-full object-cover kenburns" />
        <div className="absolute inset-0 bg-ocean-deep/65" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <h1 className="font-display italic text-ivory text-4xl md:text-7xl leading-tight max-w-4xl">
            {openerWords.map((w, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }} className="inline-block mr-3">{w}</motion.span>
            ))}
          </h1>
        </div>
      </section>

      <section className="bg-ivory py-24">
        <div className="max-w-[1300px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <Overline>Our Story</Overline>
            <h2 className="font-display italic text-4xl md:text-5xl text-ocean mt-3">A honeymoon. A vision. A resort.</h2>
            <div className="mt-6 space-y-4 font-sub text-ocean/80 leading-relaxed">
              <p>Founded in 2010 by Vikram and Ananya Malhotra, a couple who fell in love with Candolim Beach on their honeymoon. What began as twelve garden cottages is now Goa's most celebrated luxury retreat.</p>
              <p>We believe in unhurried luxury — where service is invisible yet impeccable, where the ocean is always present, and where guests arrive as travellers and leave as friends.</p>
              <p>Today Seagrove employs over 280 colleagues, ninety percent of whom are from Goa. We grow our own herbs, source our seafood from Candolim's own fishing fleet, and donate one percent of every stay to coastal conservation.</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=900" alt="Founders" className="rounded-2xl aspect-[4/5] object-cover w-full" />
              <div className="absolute -inset-5 border-2 border-gold rounded-2xl pointer-events-none" />
            </div>
          </Reveal>
        </div>
      </section>

      <section ref={tlRef} className="bg-sand py-24 relative">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <Overline>Milestones</Overline>
            <h2 className="font-display italic text-4xl md:text-5xl text-ocean mt-3">Our Journey</h2>
          </div>
          <div className="relative">
            <svg className="absolute left-1/2 -translate-x-1/2 top-0 h-full" width="2" height="100%" viewBox="0 0 2 600" preserveAspectRatio="none">
              <motion.line x1="1" y1="0" x2="1" y2="600" stroke="#D4A853" strokeWidth="2" strokeDasharray="600" style={{ strokeDashoffset: dash }} />
            </svg>
            <ul className="space-y-12">
              {timeline.map((m, i) => (
                <motion.li key={m.year} initial={{ opacity: 0, x: i % 2 ? 60 : -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className={`relative grid grid-cols-2 gap-8 items-center ${i % 2 ? "" : ""}`}>
                  <div className={`${i % 2 ? "order-2 text-left pl-8" : "text-right pr-8"}`}>
                    <p className="font-display italic text-3xl text-gold">{m.year}</p>
                    <p className="text-ocean/80 font-sub mt-2 text-sm">{m.text}</p>
                  </div>
                  <span className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold border-4 border-sand" />
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-ocean-deep text-ivory py-24">
        <div className="max-w-[1300px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <Overline>What We Believe</Overline>
            <h2 className="font-display italic text-4xl md:text-5xl mt-3">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { t: "Unhurried Luxury", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900" },
              { t: "Warm Goan Hospitality", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900" },
              { t: "Conscious Sustainability", img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=900" },
            ].map((v, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                  <img src={v.img} alt={v.t} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep to-transparent" />
                  <p className="absolute bottom-6 left-6 right-6 font-display italic text-3xl">{v.t}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Overline>Awards</Overline>
          <h2 className="font-display italic text-4xl text-ocean mt-3 mb-10">Awards & Recognition</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
            {awards.map((a) => (
              <div key={a.title} className="min-w-[260px] border border-gold/50 rounded-xl bg-sand p-5 text-center">
                <p className="text-gold font-display italic text-2xl">{a.year}</p>
                <p className="text-ocean text-sm font-sub font-medium mt-1">{a.title}</p>
                <p className="text-driftwood text-[10px] font-sub uppercase tracking-[0.2em] mt-1.5">{a.source}</p>
              </div>
            ))}
          </div>
          <p className="mt-14 text-center text-driftwood text-xs font-sub uppercase tracking-[0.2em]">As seen in</p>
          <div className="mt-4 flex flex-wrap justify-center items-center gap-x-10 gap-y-3 font-display italic text-ocean/70 text-xl">
            <span>Condé Nast Traveller</span>
            <span>·</span>
            <span>Vogue India</span>
            <span>·</span>
            <span>NDTV Travel</span>
            <span>·</span>
            <span>Times of India</span>
            <span>·</span>
            <span>Architectural Digest India</span>
          </div>
        </div>
      </section>
    </>
  );
}
