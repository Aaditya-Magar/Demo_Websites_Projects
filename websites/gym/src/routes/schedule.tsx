import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";
import { X, Clock, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import { showToast } from "@/components/Toast";
import { SCHEDULE, SCHEDULE_DAYS, SCHEDULE_TIMES, ScheduleEntry, TRAINERS } from "@/lib/data";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Class Schedule — Iron Peak Circle" },
      { name: "description", content: "Weekly class schedule across Andheri, Powai, and Bandra. Book your spot." },
      { property: "og:title", content: "Class Schedule — Iron Peak Circle" },
      { property: "og:description", content: "50+ classes a week. Find yours and book in seconds." },
    ],
  }),
  component: SchedulePage,
});

const COLOR_BG: Record<ScheduleEntry["color"], string> = {
  red: "bg-[#E8192C] text-white",
  blue: "bg-[#1f4fb6] text-white",
  green: "bg-[#1f8a4f] text-white",
  orange: "bg-[#e07a1f] text-white",
};

function SchedulePage() {
  const [day, setDay] = useState<string>("All");
  const [type, setType] = useState<string>("All");
  const [trainer, setTrainer] = useState<string>("All");
  const [picked, setPicked] = useState<ScheduleEntry | null>(null);

  const types = ["All", "Cardio", "Strength", "Mind & Body", "Combat"];
  const list = useMemo(() => {
    return SCHEDULE.filter((s) =>
      (day === "All" || s.day === day) &&
      (trainer === "All" || s.trainer === trainer) &&
      (type === "All" ||
        (type === "Cardio" && s.color === "red") ||
        (type === "Strength" && s.color === "blue") ||
        (type === "Mind & Body" && s.color === "green") ||
        (type === "Combat" && s.color === "orange"))
    );
  }, [day, type, trainer]);

  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1571388208497-71bedc66e932?w=1600"
        overline="Schedule"
        title={<>This Week At <span className="text-[#E8192C]">Iron Peak Circle</span></>}
        subtitle="50+ classes across the week. Filter, find, and book in seconds."
      />

      <section className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          {/* Filters */}
          <div className="flex flex-wrap items-end gap-4 mb-8">
            <FilterSelect label="Day" value={day} onChange={setDay} options={["All", ...SCHEDULE_DAYS]} />
            <FilterSelect label="Class Type" value={type} onChange={setType} options={types} />
            <FilterSelect label="Trainer" value={trainer} onChange={setTrainer} options={["All", ...TRAINERS.map((t) => t.name)]} />
            <div className="ml-auto flex items-center gap-3 text-xs font-condensed uppercase tracking-widest text-white/60">
              <Legend color="bg-[#E8192C]" label="Cardio" />
              <Legend color="bg-[#1f4fb6]" label="Strength" />
              <Legend color="bg-[#1f8a4f]" label="Mind" />
              <Legend color="bg-[#e07a1f]" label="Combat" />
            </div>
          </div>

          {/* Desktop grid */}
          <div className="hidden md:block overflow-x-auto border border-white/10">
            <div className="grid grid-cols-[80px_repeat(7,minmax(140px,1fr))] min-w-[900px]">
              <div className="bg-[#111] border-b border-white/10" />
              {SCHEDULE_DAYS.map((d) => (
                <div key={d} className="bg-[#111] p-3 text-center font-condensed uppercase tracking-widest text-xs text-white border-b border-white/10">
                  {d}
                </div>
              ))}
              {SCHEDULE_TIMES.map((t, ri) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: ri * 0.05 }}
                  className="contents"
                >
                  <div className="bg-[#0a0a0a] p-3 text-right text-[10px] font-condensed uppercase tracking-widest text-white/50 border-b border-white/5">
                    {t}
                  </div>
                  {SCHEDULE_DAYS.map((d) => {
                    const item = list.find((s) => s.day === d && s.time === t);
                    return (
                      <div key={d + t} className="border-b border-l border-white/5 p-1.5 min-h-[78px]">
                        {item && (
                          <button
                            onClick={() => setPicked(item)}
                            className={`w-full h-full text-left p-2 ${COLOR_BG[item.color]} hover:brightness-110 transition`}
                          >
                            <div className="font-display tracking-wider text-sm leading-tight">{item.name}</div>
                            <div className="text-[10px] opacity-90 font-condensed uppercase tracking-widest mt-0.5">{item.trainer.split(" ")[0]}</div>
                            <div className="text-[10px] opacity-80 mt-1">{item.duration}m · {item.spots} left</div>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile list */}
          <div className="md:hidden space-y-2">
            {list.map((item, i) => (
              <motion.button
                key={item.day + item.time + item.name}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                onClick={() => setPicked(item)}
                className={`w-full text-left p-4 ${COLOR_BG[item.color]}`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-display tracking-wider text-xl">{item.name}</div>
                  <div className="font-condensed uppercase tracking-widest text-xs">{item.day} · {item.time}</div>
                </div>
                <div className="text-xs opacity-90 mt-1 font-condensed uppercase tracking-widest">{item.trainer} · {item.duration}m · {item.spots} spots</div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {picked && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setPicked(null)}
            className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-sm grid place-items-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111] border border-white/10 max-w-md w-full p-7 relative"
            >
              <button onClick={() => setPicked(null)} className="absolute top-3 right-3 text-white/60 hover:text-white"><X size={20} /></button>
              <div className={`inline-block px-3 py-1 ${COLOR_BG[picked.color]} font-condensed uppercase tracking-widest text-[10px] mb-3`}>{picked.day} · {picked.time}</div>
              <h3 className="font-display text-4xl tracking-wider text-white">{picked.name}</h3>
              <p className="font-condensed uppercase tracking-widest text-[#E8192C] text-xs mt-1">with {picked.trainer}</p>
              <div className="flex items-center gap-5 mt-4 text-sm text-white/70">
                <span className="flex items-center gap-1.5"><Clock size={14} /> {picked.duration} min</span>
                <span className="flex items-center gap-1.5"><Users size={14} /> {picked.spots} spots left</span>
              </div>
              <button
                onClick={() => { showToast(`Booked ${picked.name} ✓`); setPicked(null); }}
                className="mt-6 w-full bg-[#E8192C] text-white py-3 font-condensed font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-[#E8192C] transition-colors"
              >
                Book Now
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="block font-condensed uppercase tracking-widest text-[10px] text-white/50 mb-1">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#111] border border-white/10 px-3 py-2 text-white text-sm focus:outline-none focus:border-[#E8192C]"
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`h-2.5 w-2.5 ${color}`} />
      {label}
    </span>
  );
}
