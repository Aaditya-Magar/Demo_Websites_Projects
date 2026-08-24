import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { packages } from "@/data/site";
import { PageWrap, SectionHeader } from "@/components/site/UI";
import { PackageCard } from "./index";

export const Route = createFileRoute("/packages")({
  head: () => ({ meta: [{ title: "Tour Packages — WanderNest" }, { name: "description", content: "Family, honeymoon & group packages across India and the world." }] }),
  component: PkgPage,
});

function PkgPage() {
  const [type, setType] = useState<"all" | "family" | "honeymoon">("all");
  const list = type === "all" ? packages : packages.filter((p) => p.type === type);
  return (
    <PageWrap>
      <section className="relative h-[50vh] min-h-[380px] flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600" className="absolute inset-0 w-full h-full object-cover animate-kenburns" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(7,13,24,0.4)] to-[rgba(7,13,24,0.85)]" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pb-14 text-white">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--amber-h)] font-sans-ui font-semibold mb-3">PACKAGES</div>
          <h1 className="font-display text-5xl lg:text-7xl italic">Find Your Perfect Package</h1>
        </div>
      </section>
      <section className="py-16 bg-[var(--ivory)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex gap-2 mb-8">
            {([["all", "All"], ["family", "Family"], ["honeymoon", "Honeymoon"]] as const).map(([k, l]) => (
              <button key={k} onClick={() => setType(k)} className={`px-4 py-2 rounded-full text-sm font-sans-ui transition ${type === k ? "bg-[var(--twilight-deep)] text-white" : "bg-[var(--cloud)]"}`}>{l}</button>
            ))}
          </div>
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((p, i) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <PackageCard p={p} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageWrap>
  );
}
