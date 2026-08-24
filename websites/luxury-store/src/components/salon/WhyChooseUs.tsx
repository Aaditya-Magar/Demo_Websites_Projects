import { motion } from "framer-motion";
import { Check } from "lucide-react";

const points = [
  { title: "Certified Master Stylists", desc: "Trained at L'Oréal, Wella & Schwarzkopf academies." },
  { title: "Premium Global Products", desc: "Only Kérastase, Olaplex, Dermalogica & Estée Lauder." },
  { title: "Hospital-Grade Hygiene", desc: "Sterilised tools and single-use kits for every guest." },
  { title: "Personalised Consultation", desc: "Every appointment begins with a 1:1 style mapping." },
  { title: "Trend-Forward Styling", desc: "Direct from Paris, Milan & Mumbai fashion weeks." },
];

export function WhyChooseUs() {
  return (
    <section className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-luxe">
            <img
              src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=1200&q=80"
              alt="Stylist working with client"
              className="w-full h-[560px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-8 -right-4 md:-right-8 glass-strong rounded-2xl p-6 w-56 shadow-glow">
            <div className="text-3xl font-display text-gradient-gold">15+</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
              Industry Awards
            </div>
          </div>
          <div className="absolute -top-6 -left-4 md:-left-8 glass-strong rounded-2xl p-5 shadow-glow-pink">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Featured in</div>
            <div className="font-display text-xl mt-1">Vogue · Elle</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-primary">
            Why Aura Luxe
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
            A salon experience built on <span className="text-gradient-gold italic">trust</span>,{" "}
            craft & couture.
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            We treat every visit as a private ritual. From the moment you walk
            in, our team curates an experience that's as personal as your
            signature look.
          </p>

          <ul className="mt-10 space-y-5">
            {points.map((p, i) => (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4"
              >
                <div className="shrink-0 w-9 h-9 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display text-lg">{p.title}</h4>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
