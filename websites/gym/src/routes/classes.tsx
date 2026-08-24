import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";
import { X, Calendar, Clock, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import { showToast } from "@/components/Toast";
import { ALL_CLASSES, GymClass, ClassCategory } from "@/lib/data";

export const Route = createFileRoute("/classes")({
  head: () => ({
    meta: [
      { title: "Classes — Iron Peak Circle" },
      { name: "description", content: "Strength, cardio, combat, mind & body, recovery. 50+ classes weekly across Mumbai." },
      { property: "og:title", content: "Classes — Iron Peak Circle" },
      { property: "og:description", content: "Find your class. 50+ weekly sessions across all three Iron Peak Circle locations." },
    ],
  }),
  component: ClassesPage,
});

const FILTERS = ["All", "Strength", "Cardio", "Mind & Body", "Combat", "Recovery"] as const;

function ClassesPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [picked, setPicked] = useState<GymClass | null>(null);

  const list = useMemo(
    () => filter === "All" ? ALL_CLASSES : ALL_CLASSES.filter((c) => c.category === (filter as ClassCategory)),
    [filter]
  );

  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1600"
        overline="Programs"
        title={<>Find Your <span className="text-[#E8192C]">Class</span></>}
        subtitle="From explosive HIIT to deep-tissue mobility. Twelve world-class formats. Pick your fight."
      />

      <section className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="flex flex-wrap gap-2 mb-10">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 font-condensed uppercase tracking-widest text-xs transition-all ${
                  filter === f
                    ? "bg-[#E8192C] text-white"
                    : "border border-white/15 text-white/70 hover:text-white hover:border-white/40"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {list.map((c) => (
                <motion.div
                  layout
                  key={c.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-[#1A1A1A] overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={c.image} alt={c.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-3 right-3 bg-[#E8192C] text-white px-2.5 py-1 text-[10px] font-condensed font-bold uppercase tracking-widest">{c.intensity}</div>
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur text-white px-2.5 py-1 text-[10px] font-condensed uppercase tracking-widest">{c.category}</div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-3xl tracking-wider text-white">{c.name}</h3>
                    <p className="font-condensed uppercase tracking-widest text-xs text-[#E8192C] mt-1">with {c.trainer}</p>
                    <p className="text-white/60 text-sm mt-3 leading-relaxed flex-1">{c.description}</p>
                    <div className="flex items-center gap-4 mt-4 text-xs text-white/50 font-condensed uppercase tracking-widest">
                      <span className="flex items-center gap-1.5"><Clock size={12} /> {c.duration}m</span>
                      <span className="flex items-center gap-1.5"><Users size={12} /> max {c.maxParticipants}</span>
                      <IntensityBars level={c.intensity} />
                    </div>
                    <button
                      onClick={() => setPicked(c)}
                      className="mt-5 w-full bg-[#E8192C] text-white py-3 font-condensed font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-[#E8192C] transition-colors"
                    >
                      Book Class
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <BookingModal classData={picked} onClose={() => setPicked(null)} />
    </>
  );
}

function IntensityBars({ level }: { level: GymClass["intensity"] }) {
  const map = { LOW: 1, MEDIUM: 2, HIGH: 2, EXTREME: 3 } as const;
  const filled = map[level];
  return (
    <span className="flex items-center gap-0.5 ml-auto">
      {[0, 1, 2].map((i) => (
        <span key={i} className={`h-3 w-1 ${i < filled ? "bg-[#E8192C]" : "bg-white/15"}`} />
      ))}
    </span>
  );
}

function BookingModal({ classData, onClose }: { classData: GymClass | null; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !date || !time) return;
    showToast(`Booked ${classData?.name} ✓`);
    onClose();
    setName(""); setEmail(""); setDate(""); setTime("");
  };

  return (
    <AnimatePresence>
      {classData && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-sm grid place-items-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#111] border border-white/10 max-w-lg w-full max-h-[90vh] overflow-auto"
          >
            <div className="relative h-44">
              <img src={classData.image} alt={classData.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
              <button onClick={onClose} className="absolute top-3 right-3 grid place-items-center h-9 w-9 bg-black/60 text-white hover:bg-[#E8192C]"><X size={18} /></button>
            </div>
            <div className="p-6">
              <p className="font-condensed uppercase tracking-widest text-[#E8192C] text-xs">{classData.category} · {classData.duration}min · {classData.intensity}</p>
              <h3 className="font-display text-4xl tracking-wider text-white mt-1">{classData.name}</h3>
              <p className="text-white/60 text-sm mt-2">with {classData.trainer}</p>
              <p className="text-white/70 mt-4 text-sm leading-relaxed">{classData.description}</p>

              <form onSubmit={submit} className="mt-6 space-y-3">
                <Input label="Name" value={name} onChange={setName} />
                <Input label="Email" type="email" value={email} onChange={setEmail} />
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Date" type="date" value={date} onChange={setDate} />
                  <Input label="Time" type="time" value={time} onChange={setTime} />
                </div>
                <button className="mt-2 w-full bg-[#E8192C] text-white py-3 font-condensed font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-[#E8192C] transition-colors flex items-center justify-center gap-2">
                  <Calendar size={16} /> Confirm Booking
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="block font-condensed uppercase tracking-widest text-[10px] text-white/50 mb-1">{label}</span>
      <input
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black/50 border border-white/10 px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#E8192C]"
      />
    </label>
  );
}
