import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { packages } from "@/data/site";
import { PageWrap } from "@/components/site/UI";
import { Check, X, Plus, Minus, Star } from "lucide-react";

export const Route = createFileRoute("/packages/$id")({
  component: PkgDetail,
  notFoundComponent: () => <div className="min-h-screen flex items-center justify-center"><Link to="/packages" className="text-[var(--amber-h)]">← All packages</Link></div>,
});

function PkgDetail() {
  const { id } = Route.useParams();
  const p = packages.find((x) => x.id === id);
  if (!p) throw notFound();
  const [openDay, setOpenDay] = useState(1);
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const total = Math.round((p.price * adults + p.price * 0.5 * kids) * 1.05);

  return (
    <PageWrap>
      <div className="pt-32 pb-8 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-5 gap-3 h-[420px]">
          <div className="lg:col-span-3 rounded-2xl overflow-hidden"><img src={p.gallery[0]} alt="" className="w-full h-full object-cover" /></div>
          <div className="lg:col-span-2 grid grid-cols-2 gap-3">
            {p.gallery.slice(1, 5).map((g, i) => <div key={i} className="rounded-2xl overflow-hidden"><img src={g} className="w-full h-full object-cover" alt="" /></div>)}
          </div>
        </div>
      </div>
      <section className="py-12 bg-[var(--ivory)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div>
              {p.badge && <span className="bg-[var(--amber-h)] text-[var(--twilight-deep)] text-xs font-bold px-3 py-1 rounded-full">{p.badge}</span>}
              <h1 className="font-display text-5xl mt-3">{p.name}</h1>
              <p className="text-[var(--stone)] mt-2 font-sans-ui">{p.destination} · {p.nights}N / {p.days}D</p>
              <div className="text-3xl font-display text-[var(--amber-h)] mt-4">FROM ₹{p.price.toLocaleString("en-IN")} <span className="text-sm text-[var(--stone)]">/ person</span></div>
            </div>
            <div>
              <h2 className="font-display text-2xl mb-4">Day-by-Day Itinerary</h2>
              <div className="space-y-2">
                {p.itinerary.map((d) => (
                  <div key={d.day} className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
                    <button onClick={() => setOpenDay(openDay === d.day ? 0 : d.day)} className="w-full flex justify-between items-center p-4 text-left">
                      <span className="font-sans-ui font-semibold"><span className="text-[var(--amber-h)] mr-2">Day {d.day}</span>{d.title}</span>
                      {openDay === d.day ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                    <AnimatePresence>
                      {openDay === d.day && (
                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                          <div className="px-4 pb-4 space-y-2 text-sm text-[var(--stone)] font-sans-ui">
                            {d.parts.map((part, i) => <p key={i}>· {part}</p>)}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-display text-xl mb-3">Inclusions</h3>
                <ul className="space-y-2">{p.inclusions.map((i) => <li key={i} className="flex gap-2 text-sm"><Check className="w-4 h-4 text-[var(--success)] shrink-0 mt-0.5" />{i}</li>)}</ul>
              </div>
              <div>
                <h3 className="font-display text-xl mb-3">Exclusions</h3>
                <ul className="space-y-2">{p.exclusions.map((i) => <li key={i} className="flex gap-2 text-sm"><X className="w-4 h-4 text-[var(--coral)] shrink-0 mt-0.5" />{i}</li>)}</ul>
              </div>
            </div>
            <div>
              <h3 className="font-display text-xl mb-3">Hotels</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {p.hotels.map((h, i) => (
                  <div key={i} className="bg-white border border-[var(--border)] rounded-xl overflow-hidden flex">
                    <img src={h.image} alt="" className="w-24 h-24 object-cover" />
                    <div className="p-3 flex-1">
                      <div className="font-sans-ui font-semibold text-sm">{h.name}</div>
                      <div className="text-xs text-[var(--stone)]">{h.city}</div>
                      <div className="flex gap-0.5 mt-1">{[...Array(h.stars)].map((_, k) => <Star key={k} className="w-3 h-3 fill-[var(--amber-h)] text-[var(--amber-h)]" />)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-32 self-start">
            <div className="bg-white rounded-2xl p-6 border-2 border-[var(--amber-h)]/40 shadow-lg">
              <div className="text-3xl font-display text-[var(--amber-h)]">₹{p.price.toLocaleString("en-IN")} <span className="text-sm text-[var(--stone)]">/ person</span></div>
              <hr className="my-4" />
              <div className="space-y-3">
                <Stepper label="Adults" v={adults} set={setAdults} min={1} />
                <Stepper label="Children" v={kids} set={setKids} min={0} />
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-display text-2xl"><span>Total</span><span className="text-[var(--amber-h)]">₹{total.toLocaleString("en-IN")}</span></div>
              <Link to="/booking/$packageId" params={{ packageId: p.id }} className="block text-center mt-4 px-5 py-3 rounded-full bg-[var(--amber-h)] text-[var(--twilight-deep)] font-semibold">Book This Package</Link>
              <Link to="/contact" className="block text-center mt-2 px-5 py-3 rounded-full border border-[var(--teal-s)] text-[var(--teal-s)] font-semibold">Request Custom Quote</Link>
              <div className="mt-4 text-xs text-[var(--stone)] space-y-1 font-sans-ui">
                <div>✓ Free cancellation up to 30 days</div>
                <div>✓ 0% EMI from ₹{Math.round(total / 12).toLocaleString("en-IN")}/mo</div>
                <div>✓ Expert assigned within 2 hours</div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </PageWrap>
  );
}

function Stepper({ label, v, set, min }: { label: string; v: number; set: (n: number) => void; min: number }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm font-sans-ui">{label}</span>
      <div className="flex items-center bg-[var(--cloud)] rounded-lg">
        <button onClick={() => set(Math.max(min, v - 1))} className="w-8 h-9">−</button>
        <span className="w-8 text-center font-semibold">{v}</span>
        <button onClick={() => set(v + 1)} className="w-8 h-9">+</button>
      </div>
    </div>
  );
}
