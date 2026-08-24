import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { products, formatPrice, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ProductDrawer } from "./ProductDrawer";

const TABS = ["All", "Women", "Men", "Accessories"] as const;

export const ProductGrid = () => {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const [selected, setSelected] = useState<Product | null>(null);
  const { wishlist, toggleWish } = useCart();

  const filtered = tab === "All" ? products : products.filter((p) => p.category === tab);

  return (
    <section id="new-arrivals" className="bg-vela-cream px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-vela text-vela-terracotta md:text-xs">
              Just Arrived
            </p>
            <h2 className="font-display text-5xl italic leading-none text-vela-charcoal md:text-6xl">
              New Arrivals
            </h2>
          </div>

          <div className="flex flex-wrap gap-8">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="relative pb-2 text-xs uppercase tracking-wider-2"
              >
                <span className={tab === t ? "text-vela-charcoal" : "text-vela-stone"}>{t}</span>
                {tab === t && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute inset-x-0 bottom-0 h-px bg-vela-terracotta"
                    transition={{ duration: 0.4, ease: [0.7, 0, 0.3, 1] }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p, i) => {
            const wished = wishlist.includes(p.id);
            return (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
                className="group cursor-pointer"
                onClick={() => setSelected(p)}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <img
                    src={p.hoverImage}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <motion.button
                    whileTap={{ scale: 1.4 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWish(p.id);
                    }}
                    className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center bg-vela-cream/85 backdrop-blur-sm transition hover:bg-vela-cream"
                    aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      size={15}
                      strokeWidth={1.5}
                      className={wished ? "fill-vela-terracotta text-vela-terracotta" : "text-vela-charcoal"}
                    />
                  </motion.button>

                  <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(p);
                      }}
                      className="w-full bg-vela-charcoal py-3 text-[10px] uppercase tracking-wider-2 text-vela-cream transition hover:bg-vela-terracotta"
                    >
                      Quick Add
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider-2 text-vela-stone">{p.category}</p>
                    <h3 className="mt-1 font-body text-sm font-medium text-vela-charcoal">{p.name}</h3>
                  </div>
                  <p className="text-sm font-medium">{formatPrice(p.price)}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <ProductDrawer product={selected} onClose={() => setSelected(null)} />
    </section>
  );
};
