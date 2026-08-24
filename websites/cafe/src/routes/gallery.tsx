import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import { galleryImages } from "@/data/cafe";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Brew Haven Café" },
      { name: "description", content: "A visual tour of Brew Haven — our space, our drinks, our people." },
      { property: "og:title", content: "Gallery — Brew Haven" },
      { property: "og:description", content: "A visual tour of Brew Haven Café." },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs tracking-[0.3em] uppercase text-accent font-semibold">Gallery</span>
        <h1 className="mt-3 font-display text-5xl md:text-6xl text-primary">Moments at Brew Haven</h1>
        <p className="mt-4 text-muted-foreground">A glimpse into the warmth, the craft, and the community.</p>
      </div>

      <div className="mt-14 columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
        {galleryImages.map((src, i) => (
          <motion.button
            key={src}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setActive(src)}
            className="mb-4 break-inside-avoid block w-full overflow-hidden rounded-2xl shadow-soft group"
          >
            <img src={src} alt="Café moment" loading="lazy" className="w-full h-auto group-hover:scale-110 transition-transform duration-700" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[80] bg-espresso/90 backdrop-blur-md grid place-items-center p-6 cursor-zoom-out"
          >
            <button className="absolute top-6 right-6 w-12 h-12 rounded-full glass text-cream grid place-items-center" onClick={() => setActive(null)}>
              <X />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={active}
              alt="Lightbox"
              className="max-w-full max-h-[85vh] rounded-2xl shadow-card"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
