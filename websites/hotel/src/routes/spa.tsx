import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { spaTreatments } from "../lib/data";
import { Overline, Reveal } from "../components/SectionPrimitives";
import { ChevronDown, Flame, Droplets, Wind, Leaf, Heart, Sun } from "lucide-react";
import { useRef } from "react";

export const Route = createFileRoute("/spa")({
  head: () => ({
    meta: [
      { title: "The Seagrove Spa — Award-Winning Wellness in Goa" },
      { name: "description", content: "Eight treatment rooms. Balinese rituals, Ayurvedic traditions, and a private couples' suite by the sea." },
      { property: "og:title", content: "The Seagrove Spa" },
      { property: "og:description", content: "Where ancient wisdom meets the sound of the sea." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200" },
    ],
  }),
  component: Spa,
});

function Spa() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start","end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  return (
    <>
      <section ref={ref} className="relative h-[90vh] overflow-hidden bg-ocean-deep">
        <motion.img style={{ y }} src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920" alt="The Seagrove Spa" className="absolute inset-0 w-full h-[120%] object-cover" />
        <div className="absolute inset-0 bg-ocean-deep/65" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <Overline>The Seagrove Spa</Overline>
          <h1 className="mt-4 font-display italic text-5xl md:text-7xl lg:text-8xl text-ivory">The Seagrove Spa</h1>
          <p className="mt-6 text-ivory/75 font-sub max-w-xl">Where ancient wisdom meets the sound of the sea.</p>
        </div>
      </section>

      <section className="bg-ivory py-24">
        <div className="max-w-[1300px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <Overline>Our Philosophy</Overline>
            <h2 className="font-display italic text-4xl md:text-5xl text-ocean mt-3">Stillness, distilled.</h2>
            <p className="mt-6 text-ocean/80 font-sub leading-relaxed">Eight treatment rooms framed by lotus ponds. A private couples' suite with twin outdoor baths. A steam cave carved from local stone. We blend Balinese touch, Ayurvedic wisdom, and modern wellness science into rituals that quiet the mind and restore the body.</p>
            <p className="mt-4 text-ocean/80 font-sub leading-relaxed">Every guest begins with a personal consultation in our herbal garden — because true care begins with listening.</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=900" alt="Spa interior" className="rounded-2xl aspect-[4/5] object-cover w-full" />
              <div className="absolute -inset-5 border-2 border-gold rounded-2xl pointer-events-none" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand py-24">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <Overline>Treatments</Overline>
            <h2 className="mt-3 font-display italic text-4xl md:text-5xl text-ocean">The Treatment Menu</h2>
          </div>
          <div className="space-y-3">
            {Object.entries(spaTreatments).map(([cat, items]) => <Accordion key={cat} title={cat} items={items} />)}
          </div>
        </div>
      </section>

      <section className="bg-ocean-deep text-ivory py-24">
        <div className="max-w-[1300px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <Overline>Facilities</Overline>
            <h2 className="mt-3 font-display italic text-4xl md:text-5xl">A Sanctuary in Six Spaces</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {[
              { i: Flame, l: "Steam Cave" }, { i: Droplets, l: "Plunge Pool" }, { i: Wind, l: "Sauna" },
              { i: Leaf, l: "Herbal Garden" }, { i: Heart, l: "Meditation" }, { i: Sun, l: "Sun Deck" },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="border border-white/10 rounded-2xl p-6 text-center hover:border-gold/60 transition">
                  <f.i className="mx-auto text-gold" size={26} />
                  <p className="mt-3 font-sub text-sm">{f.l}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-14">
            <Link to="/booking" className="inline-block bg-gold text-ocean-deep px-8 py-4 rounded-full text-xs font-sub uppercase tracking-[0.22em] hover:bg-gold-soft transition">Book a Treatment</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Accordion({ title, items }: { title: string; items: { name: string; duration: string; price: number }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-2xl bg-card overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5">
        <span className="font-display italic text-2xl text-ocean">{title}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }}><ChevronDown className="text-gold" /></motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22,1,0.36,1] }} className="overflow-hidden">
            <ul className="px-6 pb-6 space-y-3">
              {items.map((t) => (
                <li key={t.name} className="flex justify-between items-baseline border-b border-dashed border-border pb-3">
                  <span className="font-sub text-ocean">{t.name}</span>
                  <span className="text-driftwood font-sub text-sm">{t.duration} <span className="text-gold ml-3">₹{t.price.toLocaleString("en-IN")}</span></span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
