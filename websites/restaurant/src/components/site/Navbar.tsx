import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, UtensilsCrossed } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[color:var(--dark-brown)]/85 backdrop-blur-xl border-b border-gold/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid place-items-center h-10 w-10 rounded-full border border-gold/40 text-gold group-hover:rotate-12 transition-transform">
            <UtensilsCrossed className="h-5 w-5" />
          </span>
          <span className="font-display text-cream text-xl leading-none">
            Royal Spice <span className="text-gradient-gold">House</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="gold-underline text-sm uppercase tracking-[0.18em] text-cream/85 hover:text-gold transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/reservation"
            className="ml-2 inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-gold text-[color:var(--dark-brown)] text-sm font-semibold tracking-wide hover:glow-gold-strong hover:scale-[1.03] transition-all"
          >
            Book Table
          </Link>
        </nav>

        <button
          aria-label="Toggle menu"
          className="md:hidden text-cream p-2"
          onClick={() => setOpen((s) => !s)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-[color:var(--dark-brown)]/95 backdrop-blur-xl border-t border-gold/20"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="text-cream/90 text-base uppercase tracking-widest hover:text-gold"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/reservation"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center px-5 py-3 rounded-full bg-gold text-[color:var(--dark-brown)] font-semibold"
              >
                Book Table
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
