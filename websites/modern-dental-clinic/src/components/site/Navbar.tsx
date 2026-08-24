import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, CalendarCheck } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#why", label: "About" },
  { href: "#doctors", label: "Doctors" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#book", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy-deep/80 backdrop-blur-xl border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <div className="[&_span]:!text-white">
          <Logo light />
        </div>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="link-underline text-sm text-white/80 hover:text-white font-medium">
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#book"
          className="hidden lg:inline-flex items-center gap-2 rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-navy-deep shadow-[0_10px_30px_-10px_rgba(0,194,203,0.9)] transition hover:shadow-[0_15px_40px_-5px_rgba(0,194,203,1)] hover:-translate-y-0.5"
        >
          <CalendarCheck className="h-4 w-4" /> Book Appointment
        </a>

        <button
          aria-label="Menu"
          onClick={() => setOpen((s) => !s)}
          className="lg:hidden rounded-md p-2 text-white"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mx-6 mt-3 rounded-2xl bg-navy-deep/95 backdrop-blur-xl border border-white/10 p-6 space-y-4"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-white/85 hover:text-teal text-base font-medium"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="block text-center rounded-full bg-teal px-5 py-3 text-sm font-semibold text-navy-deep"
            >
              Book Appointment
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
