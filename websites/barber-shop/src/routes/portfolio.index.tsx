import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Play } from "lucide-react";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "Portfolio — CutCraft Studios" },
      { name: "description", content: "12+ premium video edits across YouTube, Reels, ads and podcasts." },
      { property: "og:title", content: "CutCraft Portfolio" },
      { property: "og:description", content: "Explore the cuts that built billions of seconds of watch time." },
    ],
  }),
  component: PortfolioPage,
});

const filters = ["All", "YouTube", "Reels", "Ads", "Podcasts"] as const;

function PortfolioPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const list = projects.filter((p) => filter === "All" || p.category === filter);
  return (
    <div className="pt-32 pb-24">
      <section className="relative mx-auto max-w-7xl px-6">
        <div className="absolute inset-x-0 -top-10 -z-10 h-[400px] bg-radial-glow opacity-70" />
        <p className="text-xs uppercase tracking-widest text-electric">Our Work</p>
        <h1 className="mt-3 font-display text-5xl md:text-7xl">The <span className="gradient-text">Reel Vault</span>.</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">A selection of recent cuts. Hover for a preview, click for the full case study.</p>

        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                filter === f
                  ? "border-primary bg-primary text-primary-foreground glow-purple"
                  : "border-border text-muted-foreground hover:border-electric hover:text-electric"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link to="/portfolio/$id" params={{ id: p.id }} className="group relative block overflow-hidden rounded-2xl border border-border">
                <div className="relative">
                  <img src={p.thumbnail} alt={p.title} loading="lazy" className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute right-3 top-3 rounded-full bg-background/70 px-3 py-1 text-[11px] uppercase tracking-widest backdrop-blur">{p.category}</div>
                  <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary opacity-0 glow-purple transition group-hover:opacity-100">
                    <Play className="h-5 w-5 fill-current" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-xs text-electric">{p.client}</p>
                    <h3 className="mt-1 font-display text-2xl">{p.title}</h3>
                    <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                      <span>{p.views} views</span>
                      <span>{p.duration}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
