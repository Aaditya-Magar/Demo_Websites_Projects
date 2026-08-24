import { motion } from "framer-motion";
import {
  Stethoscope, Sparkles as SparkIcon, Bone, Smile, Activity, Baby, ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "General Dentistry",
    desc: "Routine checkups, cleanings, fillings and preventive care to keep your smile healthy for life.",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=900&q=80",
  },
  {
    icon: SparkIcon,
    title: "Teeth Whitening",
    desc: "Professional whitening treatments that brighten your smile up to 8 shades in a single visit.",
    image: null,
  },
  {
    icon: Bone,
    title: "Dental Implants",
    desc: "Permanent, natural-looking tooth replacement using titanium implants and ceramic crowns.",
    image: "https://images.unsplash.com/photo-1606811951341-0d52e0c4f3e8?w=900&q=80",
  },
  {
    icon: Smile,
    title: "Orthodontics & Braces",
    desc: "Traditional braces and clear aligners to gently straighten teeth at any age.",
    image: null,
  },
  {
    icon: Activity,
    title: "Root Canal Treatment",
    desc: "Modern, virtually pain-free endodontic care that saves your natural tooth and ends discomfort.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffedbe47ad4?w=900&q=80",
  },
  {
    icon: Baby,
    title: "Pediatric Dentistry",
    desc: "Gentle, fun-filled dental experiences for kids — building lifelong healthy smile habits.",
    image: null,
  },
];

export function Services() {
  return (
    <section id="services" className="relative bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-teal font-semibold">What we do</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-navy-deep text-balance">
            World-class dental services, <span className="italic text-teal">perfectly personal</span>.
          </h2>
          <p className="mt-5 text-muted-foreground text-base lg:text-lg">
            Every treatment is built around comfort, precision, and long-lasting results — backed by the latest dental technology.
          </p>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.a
                key={s.title}
                href="#book"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-[0_4px_20px_-12px_rgba(11,20,55,0.2)] hover:border-teal hover:shadow-[0_25px_60px_-20px_rgba(0,194,203,0.5)] transition-all duration-500"
              >
                {s.image && (
                  <>
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{ backgroundImage: `url(${s.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/70 to-navy-deep/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </>
                )}
                <div className="relative">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal/10 text-teal group-hover:bg-teal group-hover:text-navy-deep transition-all duration-500">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className={`mt-6 font-display text-2xl ${s.image ? "group-hover:text-white" : "text-navy-deep"} transition-colors`}>
                    {s.title}
                  </h3>
                  <p className={`mt-3 text-sm leading-relaxed ${s.image ? "text-muted-foreground group-hover:text-white/80" : "text-muted-foreground"} transition-colors`}>
                    {s.desc}
                  </p>
                  <span className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${s.image ? "text-teal group-hover:text-teal-glow" : "text-teal"}`}>
                    Learn More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
