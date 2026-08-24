import { motion } from "framer-motion";
import { Check } from "lucide-react";

const points = [
  { title: "Advanced laser technology", desc: "FDA-approved devices from Lumenis, Candela & Cynosure." },
  { title: "Personalized skin analysis", desc: "AI-assisted skin diagnostics before every treatment plan." },
  { title: "Certified dermatologists", desc: "MD-DVL specialists with decades of clinical practice." },
  { title: "Safe & hygienic procedures", desc: "ISO-certified clinic protocols, single-use sterile tools." },
  { title: "Affordable treatment plans", desc: "Transparent pricing with flexible EMI options." },
];

export default function WhyUs() {
  return (
    <section id="about" className="py-28 lg:py-36 px-6 lg:px-10 gradient-soft">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-luxe">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80"
              alt="DermaGlow clinic interior"
              className="w-full h-full object-cover"
            />
          </div>
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-8 -right-6 w-56 aspect-square rounded-3xl overflow-hidden border-4 border-white shadow-luxe hidden md:block"
          >
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80"
              alt="Skin treatment procedure"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">Why DermaGlow</p>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
            A clinic built around <span className="italic text-gradient">your skin</span>, not protocols.
          </h2>
          <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
            For over a decade, DermaGlow has redefined dermatology in India by combining
            world-class technology with deeply personal care.
          </p>

          <ul className="mt-10 space-y-5">
            {points.map((p, i) => (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-full gradient-pink grid place-items-center shadow-glow">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-display font-semibold text-lg text-foreground">{p.title}</div>
                  <div className="text-muted-foreground text-sm mt-0.5">{p.desc}</div>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}