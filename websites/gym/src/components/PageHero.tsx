import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function PageHero({
  image,
  overline,
  title,
  subtitle,
}: { image: string; overline: string; title: ReactNode; subtitle?: string }) {
  return (
    <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden grain pt-20">
      <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 h-full flex flex-col justify-end pb-14">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="font-condensed uppercase tracking-[0.4em] text-[#E8192C] text-xs mb-4"
        >
          ◆ {overline}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="font-display text-6xl md:text-8xl lg:text-9xl text-white leading-[0.9]"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-white/70 mt-4 max-w-xl text-lg"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
