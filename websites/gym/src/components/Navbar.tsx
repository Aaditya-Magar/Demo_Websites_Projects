import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Flame } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/classes", label: "Classes" },
  { to: "/trainers", label: "Trainers" },
  { to: "/schedule", label: "Schedule" },
  { to: "/membership", label: "Membership" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/95 border-b border-[#E8192C]/60 backdrop-blur" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-10 h-20 flex items-center justify-between gap-5">
          <Link to="/" className="flex shrink-0 items-center gap-2 group lg:w-[248px] xl:w-[258px]">
            <span className="grid place-items-center h-9 w-9 rounded-sm bg-[#E8192C] text-white">
              <Flame size={20} strokeWidth={2.5} />
            </span>
            <span className="min-w-0 leading-none">
              <span className="block font-display text-[1.65rem] tracking-[0.08em] leading-none sm:text-3xl">
                <span className="text-[#E8192C]">IRON</span>
                <span className="text-white">PEAK</span>
              </span>
              <span className="mt-1 block whitespace-nowrap font-condensed text-[9px] uppercase tracking-[0.34em] text-[#E8192C] xl:text-[10px] xl:tracking-[0.38em]">
                Mumbai's #1 Premium Gym
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex min-w-0 flex-1 items-center justify-center gap-0">
            {NAV.slice(0, 7).map((n) => {
              const active = pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className="relative px-3 py-2 font-condensed font-semibold text-sm uppercase tracking-widest text-white/80 hover:text-white transition-colors xl:px-4"
                >
                  {n.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-[#E8192C]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Link
              to="/membership"
              className="group relative inline-flex items-center justify-center px-6 py-3 font-condensed font-bold text-sm uppercase tracking-widest border border-[#E8192C] bg-[#E8192C] text-white overflow-hidden"
            >
              <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative group-hover:text-[#E8192C] transition-colors">Join Now</span>
            </Link>
          </div>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black lg:hidden pt-24 px-8 overflow-y-auto"
          >
            <ul className="space-y-4">
              {NAV.map((n, i) => (
                <motion.li
                  key={n.to}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06 }}
                >
                  <Link
                    to={n.to}
                    className="flex items-baseline gap-4 py-3 border-b border-white/10"
                  >
                    <span className="text-[#E8192C] font-display text-xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-4xl text-white tracking-wide">
                      {n.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10">
              <Link
                to="/membership"
                className="block w-full text-center bg-[#E8192C] text-white font-condensed font-bold uppercase tracking-widest py-4"
              >
                Join Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
