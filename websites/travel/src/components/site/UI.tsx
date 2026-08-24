import { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { WHATSAPP } from "@/data/site";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div style={{ scaleX: scrollYProgress }} className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--amber-h)] z-[60] origin-left" />;
}

export function CustomCursor() { return null; }

export function WhatsAppFab() {
  return (
    <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl animate-pulse-ring hover:scale-110 transition">
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="currentColor" aria-hidden="true">
        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.673.244-1.032 0-.388-1.79-1.245-2.064-1.245zm-2.4-13.745c-7.182 0-13.018 5.836-13.018 13.018 0 2.55.732 4.93 2.022 6.95L3.39 28.78l4.86-1.288a12.94 12.94 0 0 0 6.482 1.73c7.182 0 13.018-5.834 13.018-13.018 0-3.473-1.34-6.78-3.81-9.265a13.078 13.078 0 0 0-9.27-3.74zm0 23.852a10.83 10.83 0 0 1-5.498-1.488l-.39-.232-3.91 1.027 1.027-3.91-.244-.402a10.74 10.74 0 0 1-1.65-5.732c0-5.99 4.87-10.86 10.85-10.86 2.91 0 5.62 1.13 7.66 3.18a10.84 10.84 0 0 1 3.18 7.66c0 5.97-4.87 10.84-10.84 10.84z"/>
      </svg>
    </a>
  );
}

export function PageWrap({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.55, ease: [0.25, 1, 0.35, 1] }}>
      {children}
    </motion.div>
  );
}

export function useCounter(target: number, inView: boolean, duration = 2000) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf: number; const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      setVal(Math.floor(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setVal(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return val;
}

export function SectionHeader({ overline, title, subtitle, light = false, center = false }: { overline?: string; title: string; subtitle?: string; light?: boolean; center?: boolean }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.3 }} transition={{ duration: 0.7 }} className={`mb-12 ${center ? "text-center" : ""}`}>
      {overline && <div className={`text-xs font-sans-ui font-semibold tracking-[0.2em] uppercase mb-3 ${light ? "text-[var(--amber-h)]" : "text-[var(--coral)]"}`}>{overline}</div>}
      <h2 className={`font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance ${light ? "text-white" : "text-[var(--twilight-deep)]"}`}>{title}</h2>
      {subtitle && <p className={`mt-4 max-w-2xl text-base md:text-lg font-sans-ui ${center ? "mx-auto" : ""} ${light ? "text-white/70" : "text-[var(--stone)]"}`}>{subtitle}</p>}
    </motion.div>
  );
}
