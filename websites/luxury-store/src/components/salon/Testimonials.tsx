import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const reviews = [
  {
    name: "Priya Sharma",
    role: "Fashion Editor",
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=300&q=80",
    text:
      "Aanya transformed my hair into something I didn't think possible. The salon feels like a 5-star spa in Paris — every detail is curated.",
  },
  {
    name: "Anika Reddy",
    role: "Bride · Dec 2025",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    text:
      "Riya gave me the bridal look of my dreams. Hours of dancing and zero touch-ups. My family still talks about how flawless I looked.",
  },
  {
    name: "Meher Singh",
    role: "Entrepreneur",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
    text:
      "I've been a client for 4 years. Zoya's colour work is unmatched in the city — luxurious products, calm vibes, always on time.",
  },
  {
    name: "Naina Kapoor",
    role: "Influencer",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    text:
      "The hydra-facial here is addictive. My skin glows for weeks. Aura Luxe has become my Sunday self-care ritual.",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % reviews.length), 5500);
    return () => clearInterval(id);
  }, []);

  const r = reviews[i];

  return (
    <section id="reviews" className="relative py-28 px-6">
      <SectionHeading
        eyebrow="Client Stories"
        title="Loved by"
        highlight="Beauty Lovers"
        description="Real words from real clients who chose Aura Luxe for their most special looks."
      />

      <div className="mt-20 max-w-4xl mx-auto relative">
        <Quote className="absolute -top-6 -left-2 w-20 h-20 text-primary/15" />

        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="glass-strong rounded-3xl p-10 md:p-14 shadow-luxe text-center"
          >
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="font-display text-2xl md:text-3xl leading-relaxed text-foreground/90">
              "{r.text}"
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <img
                src={r.img}
                alt={r.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/40"
              />
              <div className="text-left">
                <div className="font-display text-lg">{r.name}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  {r.role}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-center gap-2">
          {reviews.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              aria-label={`Review ${k + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                k === i ? "w-10 bg-gradient-gold" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
