import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Instagram } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const stylists = [
  {
    name: "Aanya Kapoor",
    role: "Creative Director · Hair",
    exp: "12 years",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Riya Mehra",
    role: "Bridal Makeup Artist",
    exp: "9 years",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Zoya Khan",
    role: "Master Colourist",
    exp: "10 years",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Ishaan Verma",
    role: "Skin & Spa Specialist",
    exp: "7 years",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  },
];

function TiltCard({ s, i }: { s: typeof stylists[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: -y * 14, ry: x * 14 });
  };
  const reset = () => setT({ rx: 0, ry: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 0.6 }}
      style={{ perspective: "1000px" }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{
          transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.2s ease-out",
        }}
        className="group relative rounded-3xl overflow-hidden glass shadow-luxe"
      >
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={s.img}
            alt={s.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>

        <div
          className="absolute bottom-0 inset-x-0 p-6"
          style={{ transform: "translateZ(40px)" }}
        >
          <div className="text-[11px] tracking-[0.3em] uppercase text-primary">
            {s.exp} experience
          </div>
          <h3 className="mt-2 font-display text-2xl">{s.name}</h3>
          <p className="text-sm text-muted-foreground">{s.role}</p>
          <div className="mt-4 flex items-center gap-3">
            <a
              href="#contact"
              className="px-4 py-2 rounded-full bg-gradient-gold text-primary-foreground text-xs font-medium glow-on-hover"
            >
              Book with {s.name.split(" ")[0]}
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full glass-strong flex items-center justify-center text-foreground/80 hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Stylists() {
  return (
    <section id="stylists" className="relative py-28 px-6">
      <SectionHeading
        eyebrow="Meet Our Artists"
        title="The Hands Behind"
        highlight="Your Glow"
        description="A team of internationally trained artists, each obsessed with their craft."
      />

      <div className="mt-20 max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {stylists.map((s, i) => (
          <TiltCard key={s.name} s={s} i={i} />
        ))}
      </div>
    </section>
  );
}
