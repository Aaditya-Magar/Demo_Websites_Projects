import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";

const items = [
  {
    quote:
      "I was terrified of dentists my whole life. Dr. Mitchell changed everything — painless, professional, and so caring. My smile has never looked better!",
    name: "Priya S.",
    city: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  },
  {
    quote:
      "The implant procedure was unbelievably smooth. Dr. Patel walked me through every step. Six months in, it feels exactly like my real tooth.",
    name: "Rohan M.",
    city: "Pune",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
  {
    quote:
      "My 7-year-old actually asks to go to the dentist now. Dr. Chen made our daughter feel like a superstar. The clinic is spotless and beautiful.",
    name: "Anita & Arjun K.",
    city: "Bandra",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
  {
    quote:
      "Whitening results blew me away — eight shades brighter in one session. Friends keep asking what changed. Worth every rupee.",
    name: "Kavya R.",
    city: "Andheri",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80",
  },
  {
    quote:
      "Honestly the most modern clinic I've ever been to. The 3D scan, the explanation, the care — all five-star. Highly, highly recommended.",
    name: "Daniel F.",
    city: "Powai",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&q=80",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % items.length), 4000);
    return () => clearInterval(t);
  }, []);

  const t = items[i];

  return (
    <section id="testimonials" className="relative bg-navy-deep text-white py-24 lg:py-32 overflow-hidden">
      <div className="absolute -top-40 left-1/3 h-[500px] w-[500px] rounded-full bg-teal/10 blur-3xl" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-teal font-semibold">Voices of our patients</span>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl text-balance">What our patients say</h2>

        <div className="relative mt-12 min-h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-3xl p-8 lg:p-12"
            >
              <Quote className="mx-auto h-10 w-10 text-teal" />
              <div className="mt-4 flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-5 w-5 fill-gold text-gold" />
                ))}
              </div>
              <p className="mt-6 font-display text-xl lg:text-2xl leading-relaxed text-white/95 text-balance">
                "{t.quote}"
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-teal/40" />
                <div className="text-left">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-white/60">{t.city}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, k) => (
            <button
              key={k}
              aria-label={`Go to testimonial ${k + 1}`}
              onClick={() => setI(k)}
              className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-teal" : "w-2 bg-white/30 hover:bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
