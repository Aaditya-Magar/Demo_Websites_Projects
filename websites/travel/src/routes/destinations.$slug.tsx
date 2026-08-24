import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { destinations, packages } from "@/data/site";
import { PageWrap } from "@/components/site/UI";
import { PackageCard } from "./index";
import { Plane, MapPin } from "lucide-react";

export const Route = createFileRoute("/destinations/$slug")({
  component: DestDetail,
  notFoundComponent: () => <div className="min-h-screen flex items-center justify-center"><Link to="/destinations" className="text-[var(--amber-h)]">← All destinations</Link></div>,
});

function DestDetail() {
  const { slug } = Route.useParams();
  const d = destinations.find((x) => x.slug === slug);
  if (!d) throw notFound();
  const dPackages = packages.filter((p) => p.destSlug === slug).slice(0, 3);
  const monthColor = (m: string) => m === "best" ? "bg-[var(--success)]" : m === "good" ? "bg-[var(--amber-h)]" : m === "mid" ? "bg-[var(--coral)]/60" : "bg-[var(--stone)]/40";

  return (
    <PageWrap>
      <section className="relative h-[75vh] min-h-[500px] flex items-end overflow-hidden">
        <img src={d.image} alt={d.name} className="absolute inset-0 w-full h-full object-cover animate-kenburns" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(7,13,24,0.4)] to-[rgba(7,13,24,0.85)]" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pb-16 text-white">
          <div className="text-xs text-white/60 mb-3 font-sans-ui"><Link to="/" className="hover:text-white">Home</Link> / <Link to="/destinations" className="hover:text-white">Destinations</Link> / {d.name}</div>
          <h1 className="font-display text-6xl lg:text-8xl italic">{d.name}</h1>
          <p className="mt-2 text-white/75 font-sans-ui text-lg">{d.flag} {d.country} · {d.tagline}</p>
        </div>
      </section>
      <section className="py-16 bg-[var(--ivory)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="font-display text-3xl mb-4">Why Visit {d.name}</h2>
              <p className="text-[var(--stone)] leading-relaxed">{d.intro}</p>
            </div>
            <div>
              <h3 className="font-display text-2xl mb-4">Best Time to Visit</h3>
              <div className="grid grid-cols-12 gap-1 text-center">
                {["J","F","M","A","M","J","J","A","S","O","N","D"].map((m, i) => (
                  <div key={i}>
                    <div className={`h-12 rounded-lg ${monthColor(d.months[i])}`} />
                    <div className="text-xs mt-1 text-[var(--stone)] font-sans-ui">{m}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 text-xs mt-3 text-[var(--stone)] font-sans-ui flex-wrap">
                <span><span className="inline-block w-3 h-3 rounded bg-[var(--success)] mr-1" />Best</span>
                <span><span className="inline-block w-3 h-3 rounded bg-[var(--amber-h)] mr-1" />Good</span>
                <span><span className="inline-block w-3 h-3 rounded bg-[var(--coral)]/60 mr-1" />Mid</span>
                <span><span className="inline-block w-3 h-3 rounded bg-[var(--stone)]/40 mr-1" />Low</span>
              </div>
            </div>
            <div>
              <h3 className="font-display text-2xl mb-4">Top Things to Do</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {d.things.map((t, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-[var(--border)] flex gap-3">
                    <MapPin className="w-5 h-5 text-[var(--amber-h)] shrink-0 mt-0.5" /><span className="text-sm font-sans-ui">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display text-2xl mb-4">Getting There</h3>
              <div className="space-y-2">
                {d.flights.map((f, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-[var(--border)] flex items-center gap-3">
                    <Plane className="w-5 h-5 text-[var(--teal-s)]" />
                    <div className="text-sm font-sans-ui"><span className="font-semibold">From {f.from}</span> · {f.time} · <span className="text-[var(--stone)]">{f.airlines}</span></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[var(--teal-s)]/10 border border-[var(--teal-s)]/30 rounded-xl p-5">
              <div className="text-xs uppercase tracking-wider text-[var(--teal-s)] font-sans-ui font-semibold mb-2">Visa</div>
              <p className="text-sm">{d.visa}</p>
            </div>
          </div>
          <aside className="lg:sticky lg:top-32 self-start space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
              <h3 className="font-display text-xl mb-4">Available Packages</h3>
              <div className="space-y-4">
                {dPackages.length ? dPackages.map((p) => <PackageCard key={p.id} p={p} />) : <p className="text-sm text-[var(--stone)]">Custom packages on request.</p>}
              </div>
            </div>
            <Link to="/contact" className="block text-center px-5 py-3 rounded-full bg-[var(--amber-h)] text-[var(--twilight-deep)] font-semibold">Build Custom Package →</Link>
          </aside>
        </div>
      </section>
    </PageWrap>
  );
}
