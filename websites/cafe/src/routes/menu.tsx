import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { menuItems, type MenuItem } from "@/data/cafe";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Brew Haven Café" },
      { name: "description", content: "Explore handcrafted coffee, beverages, desserts, and snacks at Brew Haven Café." },
      { property: "og:title", content: "Menu — Brew Haven Café" },
      { property: "og:description", content: "Handcrafted coffee, beverages, desserts and snacks." },
    ],
  }),
  component: MenuPage,
});

const categories = ["All", "Coffee", "Beverages", "Desserts", "Snacks"] as const;

function MenuPage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const items = cat === "All" ? menuItems : menuItems.filter((m) => m.category === cat);

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs tracking-[0.3em] uppercase text-accent font-semibold">Our Menu</span>
        <h1 className="mt-3 font-display text-5xl md:text-6xl text-primary">Brewed With Love</h1>
        <p className="mt-4 text-muted-foreground">From velvety lattes to flaky pastries — every item, made fresh, served warm.</p>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-3">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              cat === c
                ? "bg-primary text-primary-foreground shadow-soft"
                : "bg-card text-foreground hover:bg-secondary"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to="/menu/$id"
        params={{ id: item.id }}
        className="group block bg-card rounded-3xl overflow-hidden shadow-soft hover:shadow-card transition-all hover:-translate-y-2 h-full"
      >
        <div className="aspect-[5/4] overflow-hidden">
          <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs px-2.5 py-1 rounded-full bg-accent/15 text-accent font-medium">{item.category}</span>
            <span className="text-lg font-semibold text-primary">${item.price.toFixed(2)}</span>
          </div>
          <h3 className="mt-3 font-display text-2xl text-primary">{item.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{item.description}</p>
        </div>
      </Link>
    </motion.div>
  );
}
