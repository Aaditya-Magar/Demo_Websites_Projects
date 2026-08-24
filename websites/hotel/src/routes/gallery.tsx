import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { galleryImages } from "../lib/data";
import { PageHero } from "../components/SectionPrimitives";
import { X, ChevronLeft, ChevronRight, Plus } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Seagrove Resort & Spa" },
      { name: "description", content: "Photos of Seagrove Resort — rooms, dining, spa, beach and events on Candolim Beach, Goa." },
      { property: "og:title", content: "Seagrove Through the Lens" },
      { property: "og:description", content: "A visual journey through Goa's #1 luxury beach resort." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200" },
    ],
  }),
  component: Gallery,
});

const cats = ["All","Rooms","Dining","Spa","Beach","Events"];

function Gallery() {
  const [active, setActive] = useState("All");
  const [box, setBox] = useState<number | null>(null);
  const [count, setCount] = useState(16);
  const filtered = useMemo(() => active === "All" ? galleryImages : galleryImages.filter((g) => g.cat === active), [active]);
  const visible = filtered.slice(0, count);

  return (
    <>
      <PageHero title="Seagrove Through the Lens" subtitle="A visual journey through every corner of the resort." image="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920" />
      <section className="bg-ocean-deep text-ivory py-16 min-h-screen">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-1 justify-center mb-12 relative">
            {cats.map((c) => (
              <button key={c} onClick={() => { setActive(c); setCount(16); }} className="relative px-5 py-2.5 text-xs font-sub uppercase tracking-[0.2em] text-ivory/70 hover:text-ivory">
                {c}
                {active === c && <motion.span layoutId="gal-underline" className="absolute left-3 right-3 -bottom-px h-[2px] bg-gold" />}
              </button>
            ))}
          </div>

          <div className="masonry-4">
            {visible.map((g, i) => (
              <motion.button
                key={`${active}-${i}`}
                layoutId={`gal-${active}-${i}`}
                onClick={() => setBox(i)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (i % 8) * 0.04 }}
                className="masonry-item relative group rounded-xl overflow-hidden block w-full"
              >
                <img src={g.src} alt="" className="w-full h-auto group-hover:scale-105 transition-transform duration-[1.2s]" />
                <div className="absolute inset-0 bg-ocean-deep/0 group-hover:bg-ocean-deep/40 flex items-center justify-center transition-colors">
                  <Plus className="text-ivory opacity-0 group-hover:opacity-100" size={28} />
                </div>
                <div className="absolute inset-0 border-2 border-gold opacity-0 group-hover:opacity-100 rounded-xl transition" />
              </motion.button>
            ))}
          </div>

          {count < filtered.length && (
            <div className="text-center mt-12">
              <button onClick={() => setCount(count + 8)} className="border border-gold text-gold px-7 py-3.5 rounded-full text-xs font-sub uppercase tracking-[0.22em] hover:bg-gold hover:text-ocean-deep transition">Load More</button>
            </div>
          )}
        </div>

        <AnimatePresence>
          {box !== null && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-ocean-deep/97 flex items-center justify-center p-6" onClick={() => setBox(null)}>
              <button className="absolute top-6 right-6 text-ivory" onClick={() => setBox(null)}><X size={28} /></button>
              <button className="absolute left-6 text-ivory hover:text-gold" onClick={(e) => { e.stopPropagation(); setBox((box - 1 + visible.length) % visible.length); }}><ChevronLeft size={32} /></button>
              <button className="absolute right-6 text-ivory hover:text-gold" onClick={(e) => { e.stopPropagation(); setBox((box + 1) % visible.length); }}><ChevronRight size={32} /></button>
              <motion.img layoutId={`gal-${active}-${box}`} src={visible[box].src} alt="" className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl" onClick={(e) => e.stopPropagation()} />
              <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ivory/70 font-sub text-xs uppercase tracking-[0.22em]">{box + 1} / {visible.length}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
