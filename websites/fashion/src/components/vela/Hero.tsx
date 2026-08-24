import { motion } from "framer-motion";

const HEADING = "Wear the Story";

export const Hero = () => {
  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-5">
        <div className="relative col-span-1 h-[55vh] overflow-hidden md:col-span-3 md:h-full">
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400"
            alt="Editorial portrait wearing VELA SS 2025"
            className="h-full w-full origin-center object-cover animate-ken-burns"
          />
        </div>

        <div className="relative col-span-1 flex flex-col justify-center bg-vela-charcoal px-6 py-16 md:col-span-2 md:px-12 lg:px-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.7 }}
            className="mb-5 text-[10px] uppercase tracking-vela text-vela-terracotta md:text-xs"
          >
            New Collection — SS 2025
          </motion.p>

          <h1 className="font-display text-4xl font-light italic leading-[0.95] text-vela-cream sm:text-5xl md:text-6xl lg:text-7xl">
            <motion.span
              initial="initial"
              animate="animate"
              variants={{ animate: { transition: { staggerChildren: 0.04, delayChildren: 1.7 } } }}
              className="inline-block"
            >
              {HEADING.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  variants={{
                    initial: { opacity: 0, y: 40 },
                    animate: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
                  className="inline-block"
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.7 }}
            className="mt-8 max-w-md text-sm leading-relaxed text-vela-cream/70 md:text-base"
          >
            VELA crafts clothing that carries meaning. Each piece is a conversation
            between fabric, form, and the person who wears it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#collections"
              className="bg-vela-terracotta px-8 py-4 text-xs uppercase tracking-wider-2 text-vela-cream transition hover:bg-vela-cream hover:text-vela-charcoal"
            >
              Explore Collection
            </a>
            <a
              href="#about"
              className="border border-vela-cream/60 px-8 py-4 text-xs uppercase tracking-wider-2 text-vela-cream transition hover:border-vela-terracotta hover:text-vela-terracotta"
            >
              Our Story
            </a>
          </motion.div>
        </div>
      </div>

      {/* Marquee */}
      <div className="absolute inset-x-0 bottom-0 overflow-hidden bg-vela-terracotta py-3">
        <div className="flex w-max animate-marquee whitespace-nowrap text-xs uppercase tracking-wider-2 text-vela-cream">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex">
              {[
                "Free Shipping over ₹2999",
                "New arrivals every Friday",
                "Sustainably made",
                "Wear the Story",
                "Free Shipping over ₹2999",
                "New arrivals every Friday",
                "Sustainably made",
                "Wear the Story",
              ].map((t, i) => (
                <span key={i} className="mx-8 flex items-center gap-8">
                  {t} <span className="text-vela-cream/60">•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
