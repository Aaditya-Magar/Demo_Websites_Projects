import { AnimatePresence, motion } from "framer-motion";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

const NAV = ["Collections", "Lookbook", "About", "Sustainability", "Contact"];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-vela-cream/90 backdrop-blur-md border-b border-vela-charcoal/10"
            : "bg-vela-cream/70 backdrop-blur-sm border-b border-vela-charcoal/5"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-6 md:h-20 md:px-10">
          <a href="#top" className="font-display text-2xl font-semibold tracking-vela text-vela-charcoal md:text-3xl">
            VELA
          </a>

          <nav className="hidden items-center gap-10 lg:flex">
            {NAV.map((n) => (
              <a
                key={n}
                href={`#${n.toLowerCase()}`}
                className="story-link text-xs font-medium uppercase tracking-wider-2 text-vela-charcoal"
              >
                {n}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button aria-label="Search" className="text-vela-charcoal transition hover:text-vela-terracotta">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button
              aria-label="Cart"
              onClick={() => setCartOpen(true)}
              className="relative text-vela-charcoal transition hover:text-vela-terracotta"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center bg-vela-terracotta text-[10px] font-medium text-vela-cream"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              aria-label="Menu"
              onClick={() => setOpen(true)}
              className="text-vela-charcoal transition hover:text-vela-terracotta lg:hidden"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-vela-charcoal lg:hidden"
          >
            <div className="flex h-16 items-center justify-between px-6 md:h-20">
              <span className="font-display text-2xl font-semibold tracking-vela text-vela-cream">VELA</span>
              <button onClick={() => setOpen(false)} className="text-vela-cream" aria-label="Close menu">
                <X size={22} />
              </button>
            </div>
            <motion.nav
              variants={{
                animate: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
              }}
              initial="initial"
              animate="animate"
              className="flex flex-col items-start gap-8 px-8 pt-16"
            >
              {NAV.map((n) => (
                <motion.a
                  key={n}
                  variants={{
                    initial: { opacity: 0, y: 30 },
                    animate: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
                  href={`#${n.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="font-display text-5xl italic text-vela-cream"
                >
                  {n}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
