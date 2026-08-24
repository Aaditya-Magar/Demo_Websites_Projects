import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";

const reviews = [
  {
    name: "Aarohi Kapoor",
    role: "Patient · Acne Treatment",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
    text: "After struggling with stubborn acne for years, DermaGlow changed my life. Within three months my skin was finally clear and glowing. Dr. Anaya truly listens.",
  },
  {
    name: "Vikram Desai",
    role: "Patient · Hair Restoration",
    img: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=300&q=80",
    text: "The PRP sessions with Dr. Rohan were painless and the results in six months were remarkable. The clinic feels more like a luxury spa than a medical center.",
  },
  {
    name: "Sneha Reddy",
    role: "Patient · Pigmentation",
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80",
    text: "I had melasma for almost a decade. The team customised a plan that actually worked — gentle, safe and visibly effective. Worth every rupee.",
  },
  {
    name: "Rahul Joshi",
    role: "Patient · Laser Hair Removal",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    text: "Professional, transparent and absolutely painless. Eight sessions and I am completely free from ingrown hair. Highly recommend.",
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % reviews.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="reviews" className="py-28 lg:py-36 px-6 lg:px-10 relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10 opacity-50"
        style={{ background: "radial-gradient(800px circle at 80% 20%, oklch(0.78 0.16 350 / 0.15), transparent 60%), radial-gradient(800px circle at 20% 80%, oklch(0.93 0.09 90 / 0.2), transparent 60%)" }}
      />
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">Reviews</p>
        <h2 className="font-display text-4xl lg:text-6xl font-semibold text-foreground leading-tight">
          Loved by <span className="italic text-gradient">5,000+</span> patients
        </h2>

        <div className="relative mt-16 min-h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-3xl p-10 lg:p-14 shadow-luxe"
            >
              <Quote className="w-10 h-10 text-accent mx-auto mb-6" />
              <p className="font-display text-2xl lg:text-3xl text-foreground leading-relaxed italic">
                "{reviews[i].text}"
              </p>
              <div className="flex items-center justify-center gap-1 mt-8">
                {[...Array(5)].map((_, k) => (
                  <Star key={k} className="w-4 h-4 fill-current" style={{ color: "oklch(0.78 0.18 70)" }} />
                ))}
              </div>
              <div className="mt-6 flex items-center justify-center gap-4">
                <img src={reviews[i].img} alt={reviews[i].name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-luxe" />
                <div className="text-left">
                  <div className="font-display font-semibold text-foreground">{reviews[i].name}</div>
                  <div className="text-xs text-muted-foreground">{reviews[i].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              className={`h-1.5 rounded-full transition-all ${k === i ? "w-10 bg-accent" : "w-2 bg-foreground/20"}`}
              aria-label={`Review ${k + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}