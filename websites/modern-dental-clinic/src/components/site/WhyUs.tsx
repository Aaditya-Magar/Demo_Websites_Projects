import { motion } from "framer-motion";
import { Check } from "lucide-react";

const points = [
  "State-of-the-art digital X-rays & 3D scanning",
  "Pain-free procedures with sedation options",
  "Same-day emergency appointments available",
  "Flexible payment plans & insurance accepted",
  "Child-friendly, anxiety-free environment",
];

export function WhyUs() {
  return (
    <section id="why" className="relative bg-navy-deep text-white py-24 lg:py-32 overflow-hidden">
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-teal/15 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-4 lg:inset-auto lg:top-4 lg:left-4 lg:right-[-16px] lg:bottom-[-16px] rounded-3xl border-2 border-teal" />
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&q=80"
            alt="Modern SmileCraft dental clinic interior with advanced equipment"
            className="relative rounded-3xl object-cover w-full h-[480px]"
          />
          <div className="absolute -bottom-6 -left-6 glass-card rounded-2xl px-5 py-4 max-w-[220px]">
            <div className="font-display text-3xl text-teal">A+</div>
            <div className="text-xs text-white/70 mt-1">Hygiene & safety rating from National Dental Council</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-teal font-semibold">Why SmileCraft</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-balance">
            Why <span className="italic text-gold">10,000 patients</span> trust SmileCraft
          </h2>
          <p className="mt-5 text-white/70 leading-relaxed">
            From the moment you walk in, you'll notice the difference. We blend
            world-class technology with a warm, human touch — so your visit feels
            calm, clear, and completely in your control.
          </p>

          <ul className="mt-9 space-y-4">
            {points.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className="flex items-start gap-3"
              >
                <span className="mt-0.5 inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-teal text-navy-deep">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <span className="text-white/90">{p}</span>
              </motion.li>
            ))}
          </ul>

          <a
            href="#book"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3 text-sm font-semibold text-navy-deep transition hover:-translate-y-0.5 hover:shadow-[0_15px_40px_-5px_rgba(0,194,203,1)]"
          >
            Schedule a free consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
}
