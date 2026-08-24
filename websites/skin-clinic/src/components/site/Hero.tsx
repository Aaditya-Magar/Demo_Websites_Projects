import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";

const particles = Array.from({ length: 18 });

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury dermatology clinic interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-rose-soft/60 via-transparent to-white/40" />
      </div>

      {/* Glowing orb */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 w-[520px] h-[520px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.78 0.16 350 / 0.45), transparent 70%)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-10 left-1/3 w-[420px] h-[420px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.93 0.09 90 / 0.45), transparent 70%)" }}
      />

      {/* Floating particles */}
      {particles.map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-accent/60"
          style={{
            width: 4 + (i % 4) * 2,
            height: 4 + (i % 4) * 2,
            left: `${(i * 53) % 100}%`,
            top: `${(i * 37) % 100}%`,
            filter: "blur(1px)",
          }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 5 + (i % 5), repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-40 pb-24 lg:pt-48 lg:pb-32 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs uppercase tracking-[0.25em] text-foreground/70 mb-7"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            Award-winning dermatology · Est. 2014
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold text-foreground leading-[1.02]"
          >
            Healthy Skin.<br />
            <span className="italic font-normal text-gradient">Confident</span> You.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-7 text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed"
          >
            Advanced dermatology treatments tailored for glowing, youthful skin —
            delivered by board-certified specialists in a serene, world-class clinic.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:shadow-glow hover:scale-[1.03] transition-all"
            >
              Book Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#treatments"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full glass text-foreground font-medium hover:bg-white transition-all"
            >
              View Treatments
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-12 flex items-center gap-5"
          >
            <div className="flex -space-x-3">
              {[
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
                "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=120&q=80",
                "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=120&q=80",
              ].map((src, i) => (
                <img key={i} src={src} alt="" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-highlight">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: "oklch(0.78 0.18 70)" }} />
                ))}
                <span className="ml-1.5 text-sm font-semibold text-foreground">4.9</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Trusted by 5,000+ patients</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hidden lg:block lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-luxe">
            <img
              src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=900&q=80"
              alt="Glowing healthy skin"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 glass rounded-2xl p-5 shadow-luxe"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full gradient-pink grid place-items-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-display font-semibold text-foreground">98%</div>
                <div className="text-xs text-muted-foreground">Patient satisfaction</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}