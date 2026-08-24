import { motion } from "framer-motion";
import { useState } from "react";
import { Linkedin, Award } from "lucide-react";

const doctors = [
  {
    name: "Dr. Anaya Sharma",
    role: "Founder · Cosmetic Dermatologist",
    exp: "15+ years experience",
    img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Dr. Rohan Mehta",
    role: "Laser & Hair Specialist",
    exp: "12+ years experience",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Dr. Priya Iyer",
    role: "Clinical Dermatologist",
    exp: "10+ years experience",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
  },
];

function DoctorCard({ d, i }: { d: typeof doctors[0]; i: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -12;
    setTilt({ x: y, y: x });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.15 }}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-luxe border border-border/50 transition-transform duration-300"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
        <div className="absolute top-5 right-5 w-10 h-10 rounded-full glass grid place-items-center">
          <Linkedin className="w-4 h-4 text-foreground" />
        </div>
        <div className="absolute bottom-5 left-5 right-5 text-white">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-xs font-medium text-foreground mb-3">
            <Award className="w-3 h-3 text-accent" /> {d.exp}
          </div>
          <h3 className="font-display text-2xl font-semibold">{d.name}</h3>
          <p className="text-sm text-white/80 mt-1">{d.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Doctors() {
  return (
    <section id="doctors" className="py-28 lg:py-36 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">Our Specialists</p>
          <h2 className="font-display text-4xl lg:text-6xl font-semibold text-foreground leading-tight">
            Meet the <span className="italic text-gradient">experts</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            Internationally trained dermatologists committed to your skin's long-term health.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {doctors.map((d, i) => <DoctorCard key={d.name} d={d} i={i} />)}
        </div>
      </div>
    </section>
  );
}