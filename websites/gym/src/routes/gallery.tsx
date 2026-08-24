import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import PageHero from "@/components/PageHero";
import { GALLERY, GALLERY_FILTERS } from "@/lib/data";
import { useEffect } from "react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Iron Peak Circle" },
      { name: "description", content: "Inside Iron Peak Circle. Equipment, classes, events, and member transformations." },
      { property: "og:title", content: "Gallery — Iron Peak Circle" },
      { property: "og:description", content: "A look inside Mumbai's premium gym chain." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [filter, setFilter] = useState<(typeof GALLERY_FILTERS)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);

  const items = useMemo(
    () => filter === "All" ? GALLERY : GALLERY.filter((g) => g.cat === filter),
    [filter]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open === null) return;
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? null : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? null : (i - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, items.length]);

  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600"
        overline="Gallery"
        title={<>Inside <span className="text-[#E8192C]">Iron Peak Circle</span></>}
        subtitle="Equipment. Classes. Events. Transformations. Real photos from real members."
      />

      <section className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="flex flex-wrap gap-2 mb-8">
            {GALLERY_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 font-condensed uppercase tracking-widest text-xs transition-all ${
                  filter === f ? "bg-[#E8192C] text-white" : "border border-white/15 text-white/70 hover:text-white hover:border-white/40"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {items.map((g, i) => (
              <motion.button
                layout
                key={typeof g.src === "string" ? g.src : i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (i % 8) * 0.04 }}
                onClick={() => setOpen(i)}
                className="group relative block w-full overflow-hidden bg-[#111] aspect-square"
              >
                <motion.img
                  layoutId={`gimg-${i}`}
                  src={g.src}
                  alt={g.cat}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#E8192C]/0 group-hover:bg-[#E8192C]/35 transition-colors grid place-items-center">
                  <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="font-condensed uppercase tracking-widest text-[10px] text-white">{g.cat}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[160] bg-black/95 grid place-items-center p-4"
            onClick={() => setOpen(null)}
          >
            <button onClick={(e) => { e.stopPropagation(); setOpen(null); }} className="absolute top-4 right-4 grid place-items-center h-12 w-12 bg-[#E8192C] text-white"><X size={22} /></button>
            <button
              onClick={(e) => { e.stopPropagation(); setOpen((i) => (i === null ? null : (i - 1 + items.length) % items.length)); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 grid place-items-center h-12 w-12 bg-white/10 text-white hover:bg-[#E8192C]"
            ><ChevronLeft size={22} /></button>
            <button
              onClick={(e) => { e.stopPropagation(); setOpen((i) => (i === null ? null : (i + 1) % items.length)); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 grid place-items-center h-12 w-12 bg-white/10 text-white hover:bg-[#E8192C]"
            ><ChevronRight size={22} /></button>

            <motion.img
              layoutId={`gimg-${open}`}
              src={typeof items[open].src === "string" && (items[open].src as string).includes("w=900") ? (items[open].src as string).replace("w=900", "w=1600") : items[open].src}
              alt={items[open].cat}
              className="max-h-[88vh] max-w-[92vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
