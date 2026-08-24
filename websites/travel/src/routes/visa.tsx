import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { visaData } from "@/data/site";
import { PageWrap, SectionHeader } from "@/components/site/UI";
import { Search, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/visa")({
  head: () => ({ meta: [{ title: "Visa Assistance — WanderNest" }, { name: "description", content: "Visas made simple. We handle the paperwork." }] }),
  component: () => {
    const [q, setQ] = useState("");
    const [open, setOpen] = useState<string | null>(null);
    const list = visaData.filter((v) => v.country.toLowerCase().includes(q.toLowerCase()));
    const colorMap: Record<string, string> = { success: "bg-[var(--success)]/15 text-[var(--success)]", teal: "bg-[var(--teal-s)]/15 text-[var(--teal-s)]", amber: "bg-[var(--amber-h)]/15 text-[var(--amber-h)]" };
    return (
      <PageWrap>
        <section className="relative h-[55vh] min-h-[420px] flex items-center overflow-hidden">
          <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600" className="absolute inset-0 w-full h-full object-cover animate-kenburns" alt="" />
          <div className="absolute inset-0 bg-[rgba(7,13,24,0.7)]" />
          <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 text-white text-center w-full">
            <h1 className="font-display italic text-5xl lg:text-7xl">Visas Made Simple</h1>
            <div className="mt-8 max-w-xl mx-auto bg-white rounded-full flex items-center px-5 py-1 shadow-2xl">
              <Search className="w-5 h-5 text-[var(--stone)]" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search destination..." className="flex-1 px-3 py-3 text-[var(--twilight-deep)] focus:outline-none" />
            </div>
          </div>
        </section>
        <section className="py-20 bg-[var(--ivory)]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {list.map((v) => (
                <div key={v.country} className="bg-white border border-[var(--border)] rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{v.flag}</span>
                    <div className="flex-1">
                      <div className="font-display text-xl">{v.country}</div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-sans-ui ${colorMap[v.typeColor]}`}>{v.type}</span>
                    </div>
                  </div>
                  <div className="text-sm text-[var(--stone)] font-sans-ui">⏱ {v.time} · 💰 {v.fee}</div>
                  <button onClick={() => setOpen(open === v.country ? null : v.country)} className="mt-3 text-xs text-[var(--teal-s)] font-sans-ui font-semibold flex items-center gap-1">
                    Required documents <ChevronDown className={`w-3 h-3 transition ${open === v.country ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {open === v.country && (
                      <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mt-2 space-y-1 text-xs text-[var(--stone)]">
                        {v.docs.map((d) => <li key={d}>· {d}</li>)}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                  <button className="mt-4 w-full px-4 py-2 rounded-full bg-[var(--amber-h)] text-[var(--twilight-deep)] text-sm font-semibold">Apply Now →</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </PageWrap>
    );
  },
});
