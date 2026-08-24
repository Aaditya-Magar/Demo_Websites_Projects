import { motion } from "framer-motion";
import { CalendarCheck, Play, ChevronDown } from "lucide-react";
import { Tooth3D } from "./Tooth3D";
import { Sparkles } from "./Sparkles";

const headline = ["Your", "Perfect", "Smile", "Starts", "Here"];

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden text-white"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&q=80)",
        }}
      />
      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/80 to-navy-deep/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-navy-deep/40" />

      <Sparkles count={26} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-40 pb-24 lg:pt-44 lg:pb-32 grid lg:grid-cols-12 gap-10 items-center min-h-screen">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-1.5 text-xs font-medium tracking-wider uppercase text-white/85"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
            Trusted dental care since 2009
          </motion.div>

          <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-balance">
            {headline.map((word, i) => (
              <motion.span
                key={i}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block mr-3"
              >
                {word === "Perfect" ? <span className="italic text-teal">{word}</span> : word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-6 max-w-xl text-base sm:text-lg text-white/75 leading-relaxed"
          >
            Advanced dental care with a gentle touch. Trusted by 10,000+ patients
            across the city for cosmetic, restorative and family dentistry.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#book"
              className="inline-flex items-center gap-2 rounded-full bg-teal px-7 py-3.5 text-sm font-semibold text-navy-deep shadow-[0_15px_40px_-10px_rgba(0,194,203,0.9)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-5px_rgba(0,194,203,1)]"
            >
              <CalendarCheck className="h-4 w-4" /> Book Appointment
            </a>
            <a
              href="#testimonials"
              className="group inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15 group-hover:bg-teal group-hover:text-navy-deep transition">
                <Play className="h-3 w-3 ml-0.5" />
              </span>
              Watch Our Story
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="mt-10 flex items-center gap-5 text-xs text-white/60"
          >
            <div className="flex -space-x-2">
              {[
                "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&q=80",
                "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&q=80",
                "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=80&q=80",
              ].map((src, i) => (
                <img key={i} src={src} alt="" className="h-9 w-9 rounded-full border-2 border-navy-deep object-cover" />
              ))}
            </div>
            <span>
              <strong className="text-white">4.9/5</strong> from 2,400+ Google reviews
            </span>
          </motion.div>
        </div>

        <div className="lg:col-span-5 hidden lg:flex justify-center">
          <Tooth3D className="w-[340px] h-[380px]" />
        </div>
      </div>

      <motion.a
        href="#stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.6, y: { repeat: Infinity, duration: 1.8 } }}
        className="absolute left-1/2 -translate-x-1/2 bottom-8 z-10 flex flex-col items-center gap-2 text-white/60 hover:text-white"
      >
        <span className="text-[11px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="h-5 w-5" />
      </motion.a>
    </section>
  );
}
