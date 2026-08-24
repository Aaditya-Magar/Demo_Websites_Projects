import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Play, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/portfolio/$id")({
  head: ({ params }) => {
    const p = projects.find((x) => x.id === params.id);
    return {
      meta: [
        { title: p ? `${p.title} — CutCraft Studios` : "Project — CutCraft Studios" },
        { name: "description", content: p?.description ?? "Project case study." },
        { property: "og:title", content: p?.title ?? "CutCraft Project" },
        { property: "og:description", content: p?.description ?? "" },
        { property: "og:image", content: p?.thumbnail ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    const p = projects.find((x) => x.id === params.id);
    if (!p) throw notFound();
    return p;
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <h1 className="font-display text-6xl gradient-text">Lost in the timeline</h1>
        <p className="mt-3 text-muted-foreground">That project doesn't exist.</p>
        <Link to="/portfolio" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-purple">
          Back to portfolio
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <p>{error.message}</p>
    </div>
  ),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { id } = Route.useParams();
  const p = projects.find((x) => x.id === id)!;
  const next = projects[(projects.findIndex((x) => x.id === p.id) + 1) % projects.length]!;
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> All projects
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          <p className="text-xs uppercase tracking-widest text-electric">{p.category} · {p.client}</p>
          <h1 className="mt-3 font-display text-5xl md:text-7xl">{p.title}</h1>
        </motion.div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="relative overflow-hidden rounded-2xl border border-border neon-border">
              <img src={p.thumbnail} alt={p.title} className="aspect-video w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <button className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary glow-purple transition hover:scale-110">
                <Play className="h-7 w-7 fill-current" />
              </button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 rounded-2xl border border-border bg-surface/40 p-6">
              <Stat label="Views" value={p.views} />
              <Stat label="Engagement" value={p.engagement} />
              <Stat label="Runtime" value={p.duration} />
            </div>

            <div className="mt-10">
              <h2 className="font-display text-3xl">The Brief</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{p.description}</p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                We collaborated with {p.client} from raw dailies through final color, building a custom edit language: rhythm tied to the score, B-roll layered for emotion, and motion graphics that punch without distracting. The result lives at the top of the {p.category} feed.
              </p>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 self-start space-y-4">
            <div className="rounded-2xl border border-border bg-surface/60 p-6">
              <h3 className="font-display text-2xl">Want a cut like this?</h3>
              <p className="mt-2 text-sm text-muted-foreground">Tell us about your channel — we reply within 24 hours.</p>
              <Link to="/contact" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-purple">
                Start a project <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-2xl border border-border bg-surface/30 p-6">
              <p className="text-xs uppercase tracking-widest text-electric">Up next</p>
              <Link to="/portfolio/$id" params={{ id: next.id }} className="mt-3 block group">
                <img src={next.thumbnail} alt={next.title} className="aspect-video w-full rounded-lg object-cover transition group-hover:opacity-80" />
                <p className="mt-3 font-display text-xl">{next.title}</p>
                <p className="text-xs text-muted-foreground">{next.client}</p>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-3xl gradient-text">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}
