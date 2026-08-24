import { motion } from "framer-motion";
import { Check, Crown } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const plans = [
  {
    name: "Signature Cut",
    price: "₹1,800",
    tag: "Hair",
    features: [
      "Hair consultation & analysis",
      "Wash & deep conditioning",
      "Precision cut & blow-dry",
      "Style finishing",
    ],
  },
  {
    name: "Couture Colour",
    price: "₹6,500",
    tag: "Most Loved",
    popular: true,
    features: [
      "Balayage / global colour",
      "Olaplex bond treatment",
      "Toning & gloss",
      "Cut + blow-dry included",
      "30-day touch-up promise",
    ],
  },
  {
    name: "Glow Facial",
    price: "₹3,200",
    tag: "Skin",
    features: [
      "Skin mapping consultation",
      "Hydra-facial cleanse",
      "Oxygen infusion",
      "24K gold mask & massage",
    ],
  },
  {
    name: "Bridal Luxe",
    price: "₹45,000",
    tag: "Bridal",
    features: [
      "HD + airbrush makeup",
      "Hair styling with extensions",
      "Pre-bridal skincare (3 sittings)",
      "Trial session included",
      "On-location service",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-28 px-6">
      <SectionHeading
        eyebrow="Pricing"
        title="Transparent &"
        highlight="Effortless"
        description="No hidden fees. Every package includes a personal consultation and our hospitality ritual."
      />

      <div className="mt-20 max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className={`relative rounded-3xl p-8 transition-all duration-500 ${
              p.popular
                ? "bg-gradient-gold text-primary-foreground shadow-glow"
                : "glass hover:border-primary/40 shadow-luxe"
            }`}
          >
            {p.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-onyx text-primary text-[10px] tracking-[0.25em] uppercase">
                <Crown className="w-3 h-3" />
                Most Loved
              </div>
            )}
            <div
              className={`text-[10px] tracking-[0.3em] uppercase ${
                p.popular ? "text-primary-foreground/70" : "text-primary"
              }`}
            >
              {p.tag}
            </div>
            <h3 className="mt-3 font-display text-2xl">{p.name}</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-display text-4xl">{p.price}</span>
              <span
                className={`text-sm ${
                  p.popular ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}
              >
                / session
              </span>
            </div>

            <ul className="mt-6 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <Check
                    className={`w-4 h-4 mt-0.5 shrink-0 ${
                      p.popular ? "text-primary-foreground" : "text-primary"
                    }`}
                  />
                  <span className={p.popular ? "text-primary-foreground/90" : "text-foreground/80"}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className={`mt-8 block text-center px-6 py-3 rounded-full font-medium text-sm transition-all ${
                p.popular
                  ? "bg-onyx text-primary hover:bg-onyx/80"
                  : "bg-gradient-gold text-primary-foreground glow-on-hover"
              }`}
            >
              Book This
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
