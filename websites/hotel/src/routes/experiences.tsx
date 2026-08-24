import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "../lib/data";
import { PageHero, Reveal, Overline } from "../components/SectionPrimitives";
import { toast } from "sonner";

export const Route = createFileRoute("/experiences")({
  head: () => ({
    meta: [
      { title: "Experiences — Seagrove Resort & Spa" },
      { name: "description", content: "Curated experiences in Goa — sunset cruises, beach bonfires, cooking with the chef, and more." },
      { property: "og:title", content: "Experiences at Seagrove" },
      { property: "og:description", content: "Curate your days. From sunrise yoga to sunset dolphin cruises." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1530053969600-caed2596d242?w=1200" },
    ],
  }),
  component: ExperiencesPage,
});

const cats = ["All", "On Water", "On Land", "Culinary", "Wellness", "Cultural"];

function ExperiencesPage() {
  const [active, setActive] = useState("All");
  const list = useMemo(() => active === "All" ? experiences : experiences.filter((e) => e.category === active), [active]);
  return (
    <>
      <PageHero title="Curate Your Days" subtitle="Eight curated experiences for every mood and moment." image="https://images.unsplash.com/photo-1530053969600-caed2596d242?w=1920" />
      <section className="bg-ivory py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-1 justify-center mb-12 relative">
            {cats.map((c) => (
              <button key={c} onClick={() => setActive(c)} className="relative px-5 py-2.5 text-xs font-sub uppercase tracking-[0.2em] text-ocean/70 hover:text-ocean">
                {c}
                {active === c && <motion.span layoutId="exp-underline" className="absolute left-3 right-3 -bottom-px h-[2px] bg-gold" />}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {list.map((e) => (
                <motion.div key={e.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-transparent hover:border-teal hover:shadow-[0_0_30px_rgba(26,123,138,0.2)] transition-all duration-500">
                  <img src={e.image} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/30 to-transparent" />
                  <div className="absolute top-5 left-5 text-[10px] uppercase tracking-[0.2em] text-gold border border-gold/60 rounded-full px-2.5 py-1">{e.category}</div>
                  <div className="absolute bottom-6 left-6 right-6 text-ivory">
                    <h3 className="font-display italic text-2xl">{e.title}</h3>
                    <p className="text-ivory/70 text-xs font-sub mt-2 line-clamp-2">{e.description}</p>
                    <div className="flex justify-between items-center mt-4 text-xs font-sub">
                      <span className="text-ivory/60">{e.duration} · from ₹{e.price.toLocaleString("en-IN")}/pp</span>
                    </div>
                    <button onClick={() => toast.success(`${e.title} added to your itinerary.`)} className="mt-4 text-gold text-xs font-sub uppercase tracking-[0.22em] story-link">Book Experience →</button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="bg-ocean-deep text-ivory py-24">
        <div className="max-w-[1300px] mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <img src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200" alt="Sunset Dolphin Cruise" className="rounded-2xl aspect-[5/4] object-cover w-full" />
              <div>
                <Overline>Signature Experience</Overline>
                <h2 className="font-display italic text-5xl mt-3">Sunset Dolphin Cruise</h2>
                <p className="mt-5 text-ivory/75 font-sub leading-relaxed">A private 38-foot yacht. A bottle of vintage champagne. The Arabian Sea turning gold beneath you as a pod of dolphins cuts the wake. Two of the most memorable hours you will spend in Goa.</p>
                <ul className="mt-6 space-y-2 text-sm font-sub text-ivory/80">
                  <li>· Up to 8 guests</li><li>· Champagne, canapés, fresh fruit</li><li>· Captain & host crew</li><li>· From ₹12,000 per person</li>
                </ul>
                <button onClick={() => toast.success("Cruise request received.")} className="mt-7 bg-gold text-ocean-deep px-7 py-3.5 rounded-full text-xs font-sub uppercase tracking-[0.22em] hover:bg-gold-soft transition">Reserve the Cruise</button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand py-20">
        <div className="max-w-[1300px] mx-auto px-6 lg:px-10">
          <Overline>This Season</Overline>
          <h2 className="font-display italic text-4xl text-ocean mt-3 mb-10">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { d: "Dec 18", t: "Full Moon Beach Dinner", time: "7:30 PM" },
              { d: "Dec 24", t: "Christmas Eve Gala", time: "8:00 PM" },
              { d: "Dec 31", t: "New Year's Eve at Tides", time: "9:00 PM" },
              { d: "Jan 14", t: "Sunset Jazz on the Sand", time: "6:30 PM" },
            ].map((e) => (
              <div key={e.t} className="bg-card border border-border rounded-2xl p-6">
                <p className="text-gold font-display italic text-xl">{e.d}</p>
                <p className="font-sub text-ocean mt-2">{e.t}</p>
                <p className="text-driftwood text-xs font-sub mt-1">{e.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
