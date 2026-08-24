import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";
import { X, Instagram, Twitter, Award, Calendar } from "lucide-react";
import PageHero from "@/components/PageHero";
import TiltCard from "@/components/TiltCard";
import { showToast } from "@/components/Toast";
import { TRAINERS, Trainer } from "@/lib/data";

export const Route = createFileRoute("/trainers")({
  head: () => ({
    meta: [
      { title: "Trainers — Iron Peak Circle" },
      { name: "description", content: "Meet Iron Peak Circle's elite coaching team. Strength, yoga, boxing, CrossFit, and more." },
      { property: "og:title", content: "Trainers — Iron Peak Circle" },
      { property: "og:description", content: "Six elite coaches. National-level athletes. Your goals, their obsession." },
    ],
  }),
  component: TrainersPage,
});

function TrainersPage() {
  const [picked, setPicked] = useState<Trainer | null>(null);
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1571388208497-71bedc66e932?w=1600"
        overline="The Coaches"
        title={<>Meet The <span className="text-[#E8192C]">Coaches</span></>}
        subtitle="Six elite coaches. Combined 57 years of experience. National-level athletes. Yours."
      />
      <section className="bg-black py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRAINERS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 3) * 0.08 }}
            >
              <TiltCard className="group relative bg-[#111] cursor-pointer overflow-hidden">
                <button onClick={() => setPicked(t)} className="text-left w-full">
                  <div className="absolute inset-x-0 top-0 h-1 bg-[#E8192C] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-10" />
                  <div className="aspect-[3/4] overflow-hidden">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="bg-[#1A1A1A] p-5 group-hover:bg-black transition-colors">
                    <p className="font-condensed uppercase tracking-widest text-[#E8192C] text-xs">{t.specialty}</p>
                    <h3 className="font-display text-3xl tracking-wider text-white mt-1">{t.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-white/40 text-xs font-condensed uppercase tracking-widest">{t.years} yrs · {t.certs.length} certs</p>
                      <div className="flex gap-2 text-white/50">
                        <Instagram size={14} />
                        <Twitter size={14} />
                      </div>
                    </div>
                  </div>
                </button>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      <TrainerPanel trainer={picked} onClose={() => setPicked(null)} />
    </>
  );
}

function TrainerPanel({ trainer, onClose }: { trainer: Trainer | null; onClose: () => void }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const slots = ["7AM", "10AM", "5PM", "7PM"];
  return (
    <AnimatePresence>
      {trainer && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[140] bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[480px] z-[150] bg-[#0a0a0a] border-l border-white/10 overflow-y-auto"
          >
            <div className="relative h-72">
              <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
              <button onClick={onClose} className="absolute top-4 right-4 grid place-items-center h-10 w-10 bg-black/60 text-white hover:bg-[#E8192C]"><X size={20} /></button>
            </div>
            <div className="p-7">
              <p className="font-condensed uppercase tracking-widest text-[#E8192C] text-xs">{trainer.specialty}</p>
              <h2 className="font-display text-5xl tracking-wider text-white mt-1">{trainer.name}</h2>
              <p className="text-white/50 text-sm mt-1">{trainer.years} years experience</p>
              <p className="text-white/75 mt-5 leading-relaxed">{trainer.bio}</p>

              <h4 className="mt-7 font-condensed uppercase tracking-widest text-xs text-white/50 mb-2">Certifications</h4>
              <ul className="space-y-1">
                {trainer.certs.map((c) => (
                  <li key={c} className="text-sm text-white flex items-center gap-2"><span className="text-[#E8192C]">▸</span>{c}</li>
                ))}
              </ul>

              <h4 className="mt-6 font-condensed uppercase tracking-widest text-xs text-white/50 mb-2 flex items-center gap-2"><Award size={12} /> Achievements</h4>
              <ul className="space-y-1">
                {trainer.achievements.map((a) => (
                  <li key={a} className="text-sm text-white/70 flex items-center gap-2"><span className="text-[#C9A84C]">★</span>{a}</li>
                ))}
              </ul>

              <h4 className="mt-7 font-condensed uppercase tracking-widest text-xs text-white/50 mb-2 flex items-center gap-2"><Calendar size={12} /> Weekly Availability</h4>
              <div className="grid grid-cols-7 gap-1 text-[10px]">
                {days.map((d) => (
                  <div key={d} className="text-center font-condensed uppercase tracking-widest text-white/50">{d}</div>
                ))}
                {days.map((d, di) => (
                  <div key={d + "col"} className="space-y-1">
                    {slots.map((s, si) => {
                      const free = (di + si) % 3 !== 0;
                      return (
                        <div key={s} className={`px-1 py-1.5 text-center text-[9px] font-condensed uppercase tracking-wider ${free ? "bg-[#E8192C]/20 text-white" : "bg-white/5 text-white/30"}`}>{s}</div>
                      );
                    })}
                  </div>
                ))}
              </div>

              <button
                onClick={() => { showToast(`Session requested with ${trainer.name} ✓`); onClose(); }}
                className="mt-7 w-full bg-[#E8192C] text-white py-3.5 font-condensed font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-[#E8192C] transition-colors"
              >
                Book A Session
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
