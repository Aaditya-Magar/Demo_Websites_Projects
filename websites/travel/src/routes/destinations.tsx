import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { destinations } from "@/data/site";
import { PageWrap, SectionHeader } from "@/components/site/UI";

export const Route = createFileRoute("/destinations")({
  head: () => ({ meta: [{ title: "Destinations — WanderNest" }, { name: "description", content: "500+ handpicked destinations across 6 continents." }] }),
  component: DestPage,
});

const tabs = [
  { id: "all", label: "All" }, { id: "india", label: "🇮🇳 India" }, { id: "asia", label: "🌏 Asia" },
  { id: "europe", label: "🌍 Europe" }, { id: "islands", label: "🐚 Islands" }, { id: "world", label: "🌐 World" },
];

function DestPage() {
  const [tab, setTab] = useState("all");
  const list = tab === "all" ? destinations : destinations.filter((d) => d.region === tab);
  return (
    <PageWrap>
      <section className="relative h-[55vh] min-h-[420px] flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600" alt="" className="absolute inset-0 w-full h-full object-cover animate-kenburns" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(7,13,24,0.5)] to-[rgba(7,13,24,0.85)]" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pb-16 text-white">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--amber-h)] font-sans-ui font-semibold mb-3">DESTINATIONS</div>
          <h1 className="font-display text-5xl lg:text-7xl italic">The World Through WanderNest</h1>
          <p className="mt-3 text-white/70 max-w-xl font-sans-ui">500+ handpicked destinations across 6 continents.</p>
        </div>
      </section>
      <div className="sticky top-[108px] z-30 bg-[var(--ivory)]/90 backdrop-blur border-b border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex gap-1 overflow-x-auto no-scrollbar py-3">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className="relative px-4 py-2 text-sm font-sans-ui whitespace-nowrap">
              <span className={tab === t.id ? "text-[var(--twilight-deep)] font-semibold" : "text-[var(--stone)]"}>{t.label}</span>
              {tab === t.id && <motion.div layoutId="dest-tab" className="absolute left-2 right-2 -bottom-0.5 h-[2px] bg-[var(--amber-h)]" />}
            </button>
          ))}
        </div>
      </div>
      <section className="py-16 bg-[var(--ivory)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((d, i) => (
              <motion.div key={d.slug} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link to="/destinations/$slug" params={{ slug: d.slug }} className="block group relative h-80 rounded-2xl overflow-hidden">
                  <img src={d.image} alt={d.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="glass text-white text-xs px-2.5 py-1 rounded-full font-sans-ui">{d.flag} {d.country}</span>
                    {d.popular && <span className="bg-[var(--amber-h)] text-[var(--twilight-deep)] text-[10px] font-bold px-2.5 py-1 rounded-full">POPULAR</span>}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <div className="flex gap-1.5 flex-wrap mb-2">
                      {d.best.map((b) => <span key={b} className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--teal-s)]/30 border border-[var(--teal-s)]/40 font-sans-ui">{b}</span>)}
                    </div>
                    <div className="font-display italic text-2xl">{d.name}</div>
                    <div className="text-xs text-[var(--amber-h)] mt-1 font-sans-ui font-semibold">FROM ₹{d.from.toLocaleString("en-IN")} / PERSON · {d.packages} packages</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageWrap>
  );
}
