import { motion } from "framer-motion";
import { Scissors, Palette, Heart, Sparkles, Hand, Flower2, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const services = [
  {
    icon: Scissors,
    title: "Haircut & Styling",
    desc: "Precision cuts and runway-ready styling tailored to your face shape.",
    img: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: Palette,
    title: "Hair Coloring",
    desc: "Balayage, ombré, global colour with luxury ammonia-free formulas.",
    img: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: Heart,
    title: "Bridal Makeup",
    desc: "HD & airbrush bridal looks for the most important day of your life.",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: Sparkles,
    title: "Skincare & Facial",
    desc: "Hydra-facials, gold therapy and signature glow treatments.",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: Hand,
    title: "Nail Art",
    desc: "Gel extensions, chrome finishes and custom couture nail art.",
    img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: Flower2,
    title: "Spa & Relaxation",
    desc: "Aromatherapy, deep-tissue and signature Aura body rituals.",
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80",
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-28 px-6">
      <SectionHeading
        eyebrow="Our Signature Services"
        title="Crafted with"
        highlight="Care & Couture"
        description="From everyday elegance to bridal grandeur — every service is designed to leave you feeling iconic."
      />

      <div className="mt-20 max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.a
              key={s.title}
              href="#contact"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-3xl glass border border-border hover:border-primary/50 transition-all duration-500 shadow-luxe"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.2s] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              </div>

              <div className="absolute top-5 left-5 w-12 h-12 rounded-full glass-strong flex items-center justify-center text-primary group-hover:bg-gradient-gold group-hover:text-primary-foreground transition-all">
                <Icon className="w-5 h-5" />
              </div>

              <div className="absolute top-5 right-5 w-10 h-10 rounded-full glass-strong flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all">
                <ArrowUpRight className="w-4 h-4 text-primary" />
              </div>

              <div className="relative -mt-20 p-7">
                <h3 className="font-display text-2xl text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
