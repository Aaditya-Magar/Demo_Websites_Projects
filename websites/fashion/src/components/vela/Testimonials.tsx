import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Ananya R.",
    city: "Bangalore",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
    text: "I've been searching for an effortless linen blazer for years. VELA's Linen Edit is everything — the drape, the texture, the fit. I get compliments every single time.",
    bought: "The Linen Edit — Oversized Blazer",
  },
  {
    name: "Rohan K.",
    city: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    text: "Three months in and the cargo pants still look new. The cotton has softened beautifully without losing structure. This is what real craftsmanship feels like.",
    bought: "Cargo Utility Pants",
  },
  {
    name: "Meera S.",
    city: "Delhi",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    text: "The silk slip dress travels with me everywhere. It packs into nothing and looks unreal at dinner. My new uniform.",
    bought: "Silk Slip Dress",
  },
  {
    name: "Karan D.",
    city: "Bengaluru",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    text: "The chunky knit is the warmest, most considered piece in my wardrobe. You can feel the hours that went into it.",
    bought: "Chunky Knit Sweater",
  },
  {
    name: "Sara P.",
    city: "Pune",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200",
    text: "VELA is the first brand whose aesthetic and ethics I trust equally. The wide-leg trousers are now in three colours.",
    bought: "Wide-Leg Trousers",
  },
];

export const Testimonials = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % reviews.length), 4000);
    return () => clearInterval(t);
  }, []);

  const r = reviews[i];

  return (
    <section className="bg-vela-cream px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-[10px] uppercase tracking-vela text-vela-terracotta md:text-xs">
          Community
        </p>
        <h2 className="mb-16 font-display text-5xl italic leading-none md:text-7xl">Worn & Loved</h2>

        <div className="relative h-[340px] md:h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
              className="absolute inset-0 flex flex-col items-center"
            >
              <img src={r.avatar} alt={r.name} className="mb-5 h-14 w-14 rounded-full object-cover" loading="lazy" />
              <div className="mb-5 flex gap-1 text-vela-terracotta">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="font-display text-2xl italic leading-relaxed text-vela-charcoal md:text-3xl">
                "{r.text}"
              </p>
              <p className="mt-6 text-sm font-medium">{r.name} <span className="text-vela-stone">— {r.city}</span></p>
              <p className="mt-1 text-xs uppercase tracking-wider-2 text-vela-stone">Wearing: {r.bought}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {reviews.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              aria-label={`Review ${k + 1}`}
              className={`h-1.5 transition-all ${k === i ? "w-8 bg-vela-terracotta" : "w-4 bg-vela-charcoal/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
