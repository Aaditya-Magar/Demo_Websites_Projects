import { useRef } from "react";
import { motion } from "framer-motion";
import { Linkedin, Instagram } from "lucide-react";

const doctors = [
  {
    name: "Dr. Sarah Mitchell",
    role: "General & Cosmetic Dentist",
    years: "12 years experience",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
  },
  {
    name: "Dr. James Patel",
    role: "Orthodontist",
    years: "15 years experience",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80",
  },
  {
    name: "Dr. Emily Chen",
    role: "Pediatric Dentist",
    years: "9 years experience",
    img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80",
  },
];

function DoctorCard({ d, i }: { d: typeof doctors[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg) translateZ(0)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: i * 0.12, duration: 0.7 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div
        ref={ref}
        className="group relative rounded-3xl bg-white border-t-4 border-gold shadow-[0_20px_50px_-25px_rgba(11,20,55,0.35)] overflow-hidden transition-transform duration-200 will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={d.img}
            alt={`${d.name}, ${d.role} at SmileCraft Dental`}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="p-6 text-center">
          <h3 className="font-display text-2xl text-navy-deep">{d.name}</h3>
          <p className="mt-1 text-sm text-teal font-semibold uppercase tracking-wider">{d.role}</p>
          <p className="mt-1 text-xs text-muted-foreground">{d.years}</p>
          <div className="mt-4 flex justify-center gap-3">
            <a href="#" aria-label="LinkedIn" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-navy-deep hover:bg-teal hover:text-white transition">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-navy-deep hover:bg-teal hover:text-white transition">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Doctors() {
  return (
    <section id="doctors" className="bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-teal font-semibold">Our Team</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-navy-deep text-balance">
            Meet our <span className="italic text-teal">expert team</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Board-certified specialists who blend decades of clinical excellence with genuine bedside warmth.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-8">
          {doctors.map((d, i) => (
            <DoctorCard key={d.name} d={d} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
