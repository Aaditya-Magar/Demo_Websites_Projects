import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { to: "/rooms", label: "Rooms" },
  { to: "/dining", label: "Dining" },
  { to: "/spa", label: "Spa" },
  { to: "/experiences", label: "Experiences" },
  { to: "/gallery", label: "Gallery" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [loc.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[rgba(8,15,22,0.92)] backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path d="M16 4 C 10 10, 10 16, 16 22 C 22 16, 22 10, 16 4 Z" stroke="#D4A853" strokeWidth="1.5" />
            <path d="M4 24 Q 10 20, 16 24 T 28 24" stroke="#1A7B8A" strokeWidth="1.5" fill="none" />
          </svg>
          <span className="font-display text-2xl tracking-wide text-ivory">
            SEA<span className="text-teal italic">·</span>GROVE
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="nav-link relative text-[13px] font-sub font-medium uppercase tracking-[0.18em] text-ivory/85 hover:text-gold hover:tracking-[0.22em] transition-all duration-300"
              activeProps={{ className: "nav-link relative text-[13px] font-sub font-medium uppercase tracking-[0.18em] text-gold" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <a href="tel:+919822200111" className="flex items-center gap-2 text-ivory/80 hover:text-gold text-sm font-sub transition">
            <Phone size={14} /> +91 98222 00111
          </a>
          <Link
            to="/booking"
            className="bg-gold text-ocean-deep px-6 py-2.5 rounded-full text-[12px] font-sub font-semibold uppercase tracking-[0.2em] hover:bg-gold-soft transition-colors"
          >
            Book Now
          </Link>
        </div>

        <button
          className="lg:hidden text-ivory p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 top-20 bg-ocean-deep/98 backdrop-blur-md"
          >
            <div className="flex flex-col gap-6 p-10">
              {[...links, { to: "/booking", label: "Book Now" }].map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i }}
                >
                  <Link to={l.to} className="text-3xl font-display text-ivory hover:text-gold">
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <a href="tel:+919822200111" className="text-ivory/70 mt-6 text-sm font-sub">
                +91 98222 00111
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
