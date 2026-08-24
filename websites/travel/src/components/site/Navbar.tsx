import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Compass } from "lucide-react";
import { PHONE } from "@/data/site";

const links = [
  { to: "/destinations", label: "Destinations" },
  { to: "/packages", label: "Packages" },
  { to: "/honeymoon", label: "Honeymoon" },
  { to: "/family", label: "Family" },
  { to: "/visa", label: "Visa" },
  { to: "/blog", label: "Blog" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [path]);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-[var(--amber-h)] text-[var(--twilight-deep)] text-xs sm:text-sm font-medium overflow-hidden h-9 flex items-center">
        <div className="hidden sm:block w-full text-center font-sans-ui">
          🎉 Early Bird: Flat 15% off on Europe packages for Jun–Aug departures. Use code <span className="font-bold tracking-wider">WANDEREARLY</span>
        </div>
        <div className="sm:hidden whitespace-nowrap animate-marquee flex">
          <span className="px-8">🎉 Early Bird: Flat 15% off on Europe packages — Use code WANDEREARLY</span>
          <span className="px-8">🎉 Early Bird: Flat 15% off on Europe packages — Use code WANDEREARLY</span>
        </div>
      </div>

      <motion.header
        className={`fixed top-9 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-[rgba(7,13,24,0.94)] backdrop-blur-lg shadow-lg" : "bg-transparent"}`}
      >
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 h-[72px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[var(--amber-h)]/15 border border-[var(--amber-h)]/40 flex items-center justify-center animate-spin-once">
              <Compass className="w-5 h-5 text-[var(--amber-h)]" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-white text-xl tracking-wide">WANDERNEST</div>
              <div className="font-sans-ui text-[10px] uppercase tracking-[0.18em] text-[var(--amber-h)]">Family Travel Specialists</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 relative">
            {links.map((l) => {
              const active = path === l.to || (l.to !== "/" && path.startsWith(l.to));
              return (
                <Link key={l.to} to={l.to} className="relative px-4 py-2 text-sm font-sans-ui text-white/85 hover:text-[var(--amber-h)] transition-all duration-200 hover:tracking-wide">
                  {l.label}
                  {active && (
                    <motion.div layoutId="nav-indicator" className="absolute left-3 right-3 -bottom-0.5 h-[2px] bg-[var(--amber-h)] rounded-full" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href={`tel:${PHONE.replace(/\s/g,"")}`} className="text-white/90 text-sm font-sans-ui flex items-center gap-2 hover:text-[var(--amber-h)] transition">
              <Phone className="w-4 h-4" /> {PHONE}
            </a>
            <Link to="/contact" className="relative overflow-hidden shimmer-sweep px-5 py-2.5 rounded-full bg-[var(--amber-h)] text-[var(--twilight-deep)] text-sm font-semibold font-sans-ui hover:shadow-[0_8px_28px_rgba(232,160,32,0.4)] transition">
              Plan My Trip
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-2" aria-label="Menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#070D18]/98 backdrop-blur-sm flex flex-col pt-24 px-8 lg:hidden"
          >
            <button onClick={() => setOpen(false)} className="absolute top-6 right-6 text-white p-2"><X className="w-6 h-6" /></button>
            {links.map((l, i) => (
              <motion.div key={l.to} initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.07, type: "spring", stiffness: 260 }}>
                <Link to={l.to} className="block py-4 text-3xl font-display text-white border-b border-white/10">{l.label}</Link>
              </motion.div>
            ))}
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 space-y-3">
              <Link to="/contact" className="block text-center px-6 py-3.5 rounded-full bg-[var(--amber-h)] text-[var(--twilight-deep)] font-semibold">Plan My Trip</Link>
              <a href={`tel:${PHONE.replace(/\s/g,"")}`} className="block text-center text-white/80 py-2"><Phone className="inline w-4 h-4 mr-2" />{PHONE}</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
