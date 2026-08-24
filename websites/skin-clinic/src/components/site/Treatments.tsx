import { motion } from "framer-motion";
import { Sparkles, Sun, Zap, Syringe, Droplets, Scissors } from "lucide-react";

const treatments = [
  { icon: Droplets, name: "Acne Treatment", desc: "Clinical-grade peels, LED therapy, and medical-grade extractions for clear, calm skin." },
  { icon: Sun, name: "Skin Whitening", desc: "Personalised brightening protocols using glutathione, vitamin-C and gentle peels." },
  { icon: Zap, name: "Laser Hair Removal", desc: "Painless diode laser sessions for smooth, hair-free skin on all body areas." },
  { icon: Syringe, name: "Anti-Aging / Botox", desc: "Wrinkle-relaxing injectables and dermal fillers by board-certified dermatologists." },
  { icon: Sparkles, name: "Pigmentation Treatment", desc: "Targeted Q-switched laser and topical regimens for melasma and dark spots." },
  { icon: Scissors, name: "Hair Loss Treatment", desc: "PRP, mesotherapy and GFC therapy for healthier, denser hair regrowth." },
];

export default function Treatments() {
  return (
    <section id="treatments" className="py-28 lg:py-36 px-6 lg:px-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">Our Treatments</p>
          <h2 className="font-display text-4xl lg:text-6xl font-semibold text-foreground leading-tight">
            Science-backed care for <span className="italic text-gradient">every skin</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            From acne to anti-aging, every treatment is curated around your unique skin profile.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative p-8 rounded-3xl bg-white border border-border/60 hover:border-accent/40 hover:shadow-glow transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "linear-gradient(135deg, oklch(0.78 0.16 350 / 0.05), transparent)" }}
              />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl gradient-pink grid place-items-center shadow-glow group-hover:scale-110 transition-transform duration-500">
                  <t.icon className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">{t.name}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t.desc}</p>
                <a
                  href="#contact"
                  className="mt-6 text-sm font-medium text-accent group-hover:translate-x-1 transition-transform inline-block"
                >
                  Learn more →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}