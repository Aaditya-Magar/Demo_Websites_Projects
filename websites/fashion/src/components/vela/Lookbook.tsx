import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const fallbackImage =
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80";

const images = [
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600",
  "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=600",
  "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600",
  "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600",
];

export const Lookbook = () => {
  return (
    <section id="lookbook" className="bg-vela-cream px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-[10px] uppercase tracking-vela text-vela-terracotta md:text-xs">
            The Story Through the Lens
          </p>
          <h2 className="font-display text-5xl italic leading-none md:text-7xl">SS 2025 Lookbook</h2>
        </motion.div>

        <div className="columns-1 gap-3 sm:columns-2 md:columns-3" style={{ columnGap: "12px" }}>
          {images.map((src, i) => (
            <motion.div
              key={src + i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
              className="group relative mb-3 break-inside-avoid overflow-hidden"
            >
              <img
                src={src}
                alt={`Lookbook ${i + 1}`}
                loading="lazy"
                onError={(event) => {
                  const image = event.currentTarget;

                  if (image.dataset.fallbackApplied === "true") {
                    return;
                  }

                  image.dataset.fallbackApplied = "true";
                  image.src = fallbackImage;
                }}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-vela-charcoal/0 transition-colors duration-500 group-hover:bg-vela-charcoal/40">
                <Instagram
                  size={28}
                  strokeWidth={1.4}
                  className="text-vela-cream opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#"
            className="inline-block border border-vela-charcoal px-10 py-4 text-xs uppercase tracking-wider-2 transition hover:bg-vela-charcoal hover:text-vela-cream"
          >
            View Full Lookbook
          </a>
        </div>
      </div>
    </section>
  );
};
