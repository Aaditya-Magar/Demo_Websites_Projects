import { motion } from "framer-motion";

const cards = [
  {
    title: "The Linen Edit",
    sub: "SS 2025",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800",
    className: "md:row-span-2 md:h-full h-[500px]",
  },
  {
    title: "Urban Noir",
    sub: "Capsule",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
    className: "h-[280px]",
  },
  {
    title: "Earth & Thread",
    sub: "Year-Round",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800",
    className: "h-[280px]",
  },
];

export const Collections = () => {
  return (
    <section id="collections" className="bg-vela-cream px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center md:mb-20"
        >
          <p className="mb-4 text-[10px] uppercase tracking-vela text-vela-terracotta md:text-xs">
            Curated Edits
          </p>
          <h2 className="font-display text-5xl italic leading-none text-vela-charcoal md:text-7xl">
            The Collections
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:grid-rows-2">
          {cards.map((c, i) => (
            <motion.a
              key={c.title}
              href="#new-arrivals"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              className={`group relative block w-full overflow-hidden ${c.className}`}
            >
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vela-charcoal/80 via-vela-charcoal/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute inset-x-0 bottom-0 p-8 text-vela-cream md:p-10">
                <p className="mb-2 text-[10px] uppercase tracking-vela text-vela-cream/70 md:text-xs">{c.sub}</p>
                <h3 className="font-display text-3xl italic md:text-5xl">{c.title}</h3>
                <div className="mt-4 translate-y-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-xs uppercase tracking-wider-2">Shop Now →</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
