import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const HERO_BG =
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=80";

const headline = "Where Beauty Meets Perfection".split(" ");

export function Hero() {
  // Generate stable particle config
  const particles = Array.from({ length: 26 }).map((_, i) => ({
    left: (i * 37) % 100,
    delay: (i * 0.7) % 8,
    duration: 12 + ((i * 1.3) % 10),
    size: 3 + ((i * 2) % 6),
    pink: i % 3 === 0,
  }));

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden flex items-center"
    >
      {/* Background image with parallax + gradient */}
      <div className="absolute inset-0">
        <motion.img
          src={HERO_BG}
          alt="Luxury salon interior with warm lighting"
          className="w-full h-full object-cover"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
      </div>

      {/* Floating SVG hair strands (3D feel) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ perspective: "800px" }}
      >
        {[0, 1, 2].map((i) => (
          <motion.svg
            key={i}
            viewBox="0 0 600 600"
            className="absolute opacity-30"
            style={{
              top: `${10 + i * 25}%`,
              left: `${5 + i * 30}%`,
              width: 320 + i * 60,
              filter: "drop-shadow(0 0 20px oklch(0.78 0.13 85 / 0.4))",
            }}
            animate={{
              rotateX: [0, 12, -8, 0],
              rotateY: [0, -15, 10, 0],
              y: [0, -20, 10, 0],
            }}
            transition={{
              duration: 14 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <defs>
              <linearGradient id={`g${i}`} x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.86 0.09 88)" />
                <stop offset="100%" stopColor="oklch(0.92 0.06 330)" />
              </linearGradient>
            </defs>
            <path
              d="M50,300 C150,80 350,520 550,300"
              fill="none"
              stroke={`url(#g${i})`}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M50,330 C170,120 380,540 550,330"
              fill="none"
              stroke={`url(#g${i})`}
              strokeWidth="1"
              opacity="0.6"
            />
            <path
              d="M50,270 C140,60 360,500 550,270"
              fill="none"
              stroke={`url(#g${i})`}
              strokeWidth="0.8"
              opacity="0.5"
            />
          </motion.svg>
        ))}
      </div>

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.left}%`,
              bottom: `-20px`,
              width: p.size,
              height: p.size,
              background: p.pink
                ? "radial-gradient(circle, oklch(0.92 0.06 330) 0%, transparent 70%)"
                : "radial-gradient(circle, oklch(0.86 0.09 88) 0%, transparent 70%)",
              boxShadow: p.pink
                ? "0 0 12px oklch(0.92 0.06 330 / 0.8)"
                : "0 0 12px oklch(0.78 0.13 85 / 0.8)",
              animation: `particle-up ${p.duration}s linear ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-6 pt-28 pb-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs tracking-[0.3em] uppercase text-foreground/80">
            Luxury Beauty Studio · Est. 2017
          </span>
        </motion.div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.05] max-w-5xl">
          {headline.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.8, ease: "easeOut" }}
              className="inline-block mr-4"
            >
              {word === "Beauty" || word === "Perfection" ? (
                <span className="text-gradient-gold italic">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8 max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          Luxury hair, skin, and beauty services crafted for your confidence —
          by award-winning stylists in the heart of the city.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-gold text-primary-foreground font-medium glow-on-hover"
          >
            Book Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass-strong text-foreground hover:border-primary/50 transition-colors"
          >
            Explore Services
          </a>
        </motion.div>
      </div>

      {/* Bottom wavy divider */}
      <div className="absolute bottom-0 left-0 right-0 leading-[0]">
        <svg viewBox="0 0 1440 100" className="w-full h-16" preserveAspectRatio="none">
          <path
            d="M0,40 C320,100 720,0 1440,60 L1440,100 L0,100 Z"
            fill="oklch(0.13 0.012 285)"
          />
        </svg>
      </div>
    </section>
  );
}
