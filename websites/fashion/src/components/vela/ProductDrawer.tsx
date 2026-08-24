import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import type { Product } from "@/data/products";
import { SIZES, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";

export const ProductDrawer = ({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) => {
  const { addItem } = useCart();
  const [size, setSize] = useState("M");
  const [color, setColor] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setSize("M");
      setColor(product.colors[0]);
    }
  }, [product]);

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-vela-charcoal/50"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
            className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-lg flex-col overflow-y-auto bg-vela-cream"
          >
            <div className="flex items-center justify-between border-b border-vela-charcoal/10 px-6 py-5">
              <span className="text-xs uppercase tracking-wider-2 text-vela-stone">{product.category}</span>
              <button onClick={onClose} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <img src={product.image} alt={product.name} className="h-[420px] w-full object-cover" />

            <div className="flex-1 px-6 py-8">
              <h3 className="font-display text-4xl italic">{product.name}</h3>
              <p className="mt-2 text-lg">{formatPrice(product.price)}</p>
              <p className="mt-6 text-sm leading-relaxed text-vela-stone">{product.description}</p>

              <div className="mt-8">
                <p className="mb-3 text-xs uppercase tracking-wider-2">Color</p>
                <div className="flex gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      style={{ backgroundColor: c }}
                      className={`h-8 w-8 rounded-full border-2 transition ${
                        color === c ? "border-vela-terracotta" : "border-vela-charcoal/20"
                      }`}
                      aria-label={`Color ${c}`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <p className="mb-3 text-xs uppercase tracking-wider-2">Size</p>
                <div className="flex gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`min-w-[48px] border px-4 py-3 text-xs transition ${
                        size === s
                          ? "border-vela-charcoal bg-vela-charcoal text-vela-cream"
                          : "border-vela-charcoal/30 hover:border-vela-charcoal"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  addItem(product, size);
                  onClose();
                }}
                className="mt-10 w-full bg-vela-charcoal py-4 text-xs uppercase tracking-wider-2 text-vela-cream transition hover:bg-vela-terracotta"
              >
                Add to Bag — {formatPrice(product.price)}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
