import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dishes, categories } from "@/data/dishes";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Royal Spice House" },
      { name: "description", content: "Explore our curated menu of Indian classics: tandoor specialties, biryanis, curries, desserts and traditional beverages." },
      { property: "og:title", content: "Our Menu — Royal Spice House" },
      { property: "og:description", content: "Curated Indian classics from our royal kitchen." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [active, setActive] = useState<string>("All");
  const tabs = ["All", ...categories];
  const filtered = active === "All" ? dishes : dishes.filter((d) => d.category === active);

  return (
    <>
      <section className="relative pt-40 pb-16 bg-[color:var(--dark-brown)] text-cream text-center overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542528180-a1208c5169a5?auto=format&fit=crop&w=1800&q=80')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[color:var(--dark-brown)]" />
        <div className="relative container mx-auto px-6">
          <p className="text-gold tracking-[0.4em] uppercase text-xs">The Menu</p>
          <h1 className="font-display text-5xl md:text-7xl mt-3 text-gradient-gold">A Royal Feast Awaits</h1>
          <div className="ornate-divider mt-6 max-w-md mx-auto" />
          <p className="mt-4 max-w-xl mx-auto text-cream/75">Hand-crafted with heirloom recipes and the finest spices. Every plate, a celebration.</p>
        </div>
      </section>

      <section className="bg-cream py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {tabs.map((t) => (
              <button key={t} onClick={() => setActive(t)}
                className={`px-5 py-2.5 rounded-full text-sm tracking-wide transition-all border ${
                  active === t
                    ? "bg-maroon text-cream border-maroon glow-gold"
                    : "bg-white text-foreground/80 border-gold/30 hover:border-gold hover:text-maroon"
                }`}>
                {t}
              </button>
            ))}
          </div>

          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((d, i) => (
                <motion.div key={d.id} layout
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}>
                  <Link to="/menu/$id" params={{ id: d.id }}
                    className="group block bg-white rounded-2xl overflow-hidden border border-gold/20 hover:border-gold transition-all hover:-translate-y-1.5 hover:shadow-xl">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img src={d.image} alt={d.name} loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <span className={`absolute top-3 left-3 h-5 w-5 rounded-sm border-2 grid place-items-center bg-white ${d.veg ? "border-green-700" : "border-red-700"}`} aria-label={d.veg ? "Veg" : "Non-veg"}>
                        <span className={`h-2 w-2 rounded-full ${d.veg ? "bg-green-700" : "bg-red-700"}`} />
                      </span>
                    </div>
                    <div className="p-5">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-gold">{d.category}</span>
                      <div className="flex items-baseline justify-between mt-1.5 gap-3">
                        <h3 className="font-display text-xl text-maroon">{d.name}</h3>
                        <span className="font-display text-lg text-foreground">₹{d.price}</span>
                      </div>
                      <p className="text-sm text-foreground/65 mt-2 line-clamp-2">{d.short}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
