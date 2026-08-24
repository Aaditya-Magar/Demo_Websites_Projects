import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { galleryImages } from "@/data/dishes";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Royal Spice House" },
      { name: "description", content: "A glimpse into our kitchen, dining hall and signature plates." },
      { property: "og:title", content: "Gallery — Royal Spice House" },
      { property: "og:description", content: "A visual feast of our food and ambience." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <section className="relative pt-40 pb-16 bg-[color:var(--dark-brown)] text-cream text-center">
        <div className="container mx-auto px-6">
          <p className="text-gold tracking-[0.4em] uppercase text-xs">Gallery</p>
          <h1 className="font-display text-5xl md:text-7xl mt-3 text-gradient-gold">A Visual Feast</h1>
          <div className="ornate-divider mt-6 max-w-md mx-auto" />
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="container mx-auto px-6">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
            {galleryImages.map((src, i) => (
              <Reveal key={src} delay={(i % 6) * 0.05}>
                <button onClick={() => setActive(src)}
                  className="relative mb-5 block w-full overflow-hidden rounded-2xl group">
                  <img src={src} alt={`Royal Spice House ${i + 1}`} loading="lazy"
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <span className="absolute inset-0 bg-[color:var(--maroon)]/0 group-hover:bg-[color:var(--maroon)]/30 transition-colors" />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md grid place-items-center p-4"
            onClick={() => setActive(null)}>
            <button className="absolute top-6 right-6 text-cream hover:text-gold" aria-label="Close">
              <X className="h-7 w-7" />
            </button>
            <motion.img
              key={active}
              src={active} alt="" onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="max-h-[88vh] max-w-[92vw] rounded-2xl object-contain glow-gold"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
