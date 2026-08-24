import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { toast } from "sonner";

export const CartDrawer = () => {
  const { isOpen, setOpen, items, updateQty, removeItem, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[70] bg-vela-charcoal/50"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
            className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-vela-cream"
          >
            <div className="flex items-center justify-between border-b border-vela-charcoal/10 px-6 py-5">
              <h3 className="font-display text-2xl italic">Your Bag</h3>
              <button onClick={() => setOpen(false)} aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="font-display text-3xl italic text-vela-charcoal">Your bag is empty.</p>
                <p className="text-sm text-vela-stone">Discover pieces worth keeping.</p>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-2 bg-vela-charcoal px-8 py-3 text-xs uppercase tracking-wider-2 text-vela-cream transition hover:bg-vela-terracotta"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-6">
                  {items.map((item) => (
                    <div key={item.product.id + item.size} className="mb-6 flex gap-4 border-b border-vela-charcoal/10 pb-6">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-28 w-24 flex-shrink-0 object-cover"
                        loading="lazy"
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <h4 className="font-body text-sm font-medium">{item.product.name}</h4>
                          <button
                            onClick={() => removeItem(item.product.id, item.size)}
                            className="text-vela-stone transition hover:text-vela-terracotta"
                            aria-label="Remove"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="mt-1 text-xs text-vela-stone">Size {item.size}</p>
                        <p className="mt-1 text-sm">{formatPrice(item.product.price)}</p>
                        <div className="mt-auto flex items-center gap-3 pt-3">
                          <button
                            onClick={() => updateQty(item.product.id, item.size, item.quantity - 1)}
                            className="border border-vela-charcoal/30 p-1.5 transition hover:border-vela-terracotta"
                            aria-label="Decrease"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.product.id, item.size, item.quantity + 1)}
                            className="border border-vela-charcoal/30 p-1.5 transition hover:border-vela-terracotta"
                            aria-label="Increase"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-vela-charcoal/10 px-6 py-5">
                  <div className="mb-4 flex justify-between">
                    <span className="text-xs uppercase tracking-wider-2">Subtotal</span>
                    <span className="font-display text-2xl">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mb-4 text-xs text-vela-stone">Shipping & taxes calculated at checkout.</p>
                  <button
                    onClick={() => toast("Checkout — Coming Soon", { description: "We're putting the finishing stitches on it." })}
                    className="w-full bg-vela-charcoal py-4 text-xs uppercase tracking-wider-2 text-vela-cream transition hover:bg-vela-terracotta"
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
