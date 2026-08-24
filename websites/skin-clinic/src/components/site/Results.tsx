import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import acneImg from "@/assets/concern-acne.jpg";
import pigmentationImg from "@/assets/concern-pigmentation.jpg";
import agingImg from "@/assets/concern-aging.jpg";
import rosaceaImg from "@/assets/concern-rosacea.jpg";
import hairImg from "@/assets/concern-hair.jpg";
import glowImg from "@/assets/concern-glow.jpg";

const concerns = [
  {
    title: "Acne & Breakouts",
    desc: "Active acne, cystic breakouts, oily skin and post-acne marks.",
    img: acneImg,
    tag: "Most booked",
  },
  {
    title: "Pigmentation & Melasma",
    desc: "Uneven tone, dark patches, sun damage and post-inflammatory marks.",
    img: pigmentationImg,
    tag: "Laser-led",
  },
  {
    title: "Anti-Aging & Wrinkles",
    desc: "Fine lines, loss of firmness, dull texture and early signs of aging.",
    img: agingImg,
    tag: "Signature",
  },
  {
    title: "Sensitive & Rosacea",
    desc: "Redness, reactive skin, rosacea flare-ups and barrier repair.",
    img: rosaceaImg,
    tag: "Gentle care",
  },
  {
    title: "Hair Thinning & Loss",
    desc: "PRP, GFC and mesotherapy for stronger, denser hair regrowth.",
    img: hairImg,
    tag: "Trichology",
  },
  {
    title: "Glow & Hydration",
    desc: "Hydra-facials, peels and infusions for luminous, even-toned skin.",
    img: glowImg,
    tag: "Express",
  },
];

export default function Results() {
  return (
    <section id="results" className="py-28 lg:py-36 px-6 lg:px-10 gradient-soft">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">
            Skin Concerns We Treat
          </p>
          <h2 className="font-display text-4xl lg:text-6xl font-semibold text-foreground leading-tight">
            Solutions for <span className="italic text-gradient">every concern</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            Personalised, dermatologist-led protocols designed around your skin's unique needs.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {concerns.map((c, i) => (
            <motion.a
              key={c.title}
              href="#contact"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="group relative block rounded-3xl overflow-hidden shadow-luxe border border-border/50 bg-white"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent" />
                <div className="absolute top-5 left-5 px-3 py-1 rounded-full glass text-[11px] font-semibold uppercase tracking-wider text-foreground">
                  {c.tag}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-display text-2xl font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm text-white/80 leading-relaxed">{c.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent-foreground">
                    <span className="text-white">Book consultation</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
