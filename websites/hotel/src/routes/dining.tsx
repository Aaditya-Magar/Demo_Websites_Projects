import { createFileRoute } from "@tanstack/react-router";
import { restaurants } from "../lib/data";
import { PageHero, Reveal, Overline } from "../components/SectionPrimitives";
import { toast } from "sonner";

export const Route = createFileRoute("/dining")({
  head: () => ({
    meta: [
      { title: "Dining — Seagrove Resort & Spa" },
      { name: "description", content: "Three restaurants at Seagrove: Tides seafood grill, Ember rooftop bar, Saffron Indian fine dining." },
      { property: "og:title", content: "Dining at Seagrove" },
      { property: "og:description", content: "Three restaurants. One unforgettable culinary voyage." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200" },
    ],
  }),
  component: Dining,
});

function Dining() {
  return (
    <>
      <PageHero title="A Culinary Voyage" subtitle="Three restaurants. One unforgettable journey through flavour." image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920" />
      <section className="bg-ivory py-20">
        <div className="max-w-[1300px] mx-auto px-6 lg:px-10 space-y-24">
          {restaurants.map((r, i) => (
            <Reveal key={r.id}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${i % 2 ? "lg:flex-row-reverse" : ""}`}>
                <div className={`relative aspect-[5/4] rounded-2xl overflow-hidden ${i % 2 ? "lg:order-2" : ""}`}>
                  <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <Overline>{r.tag}</Overline>
                  <h2 className="font-display italic text-5xl text-ocean mt-3">{r.name}</h2>
                  <p className="text-driftwood text-sm font-sub mt-2">{r.timings} · {r.dress}</p>
                  <p className="mt-5 text-ocean/80 font-sub leading-relaxed">{r.description}</p>
                  <ul className="mt-6 space-y-2">
                    {r.signature.map((s) => <li key={s} className="text-sm font-sub text-ocean border-l-2 border-gold pl-3">{s}</li>)}
                  </ul>
                  <button onClick={() => toast.success(`Reservation request sent for ${r.name}.`)} className="mt-8 bg-gold text-ocean-deep px-7 py-3.5 rounded-full text-xs font-sub uppercase tracking-[0.22em] hover:bg-gold-soft transition">Book a Table</button>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-sand rounded-2xl p-8 md:p-12">
              <img src="https://images.unsplash.com/photo-1547592180-85f173990554?w=1200" alt="Private dining" className="aspect-[5/4] object-cover rounded-xl w-full" />
              <div>
                <Overline>Private Dining</Overline>
                <h2 className="font-display italic text-4xl text-ocean mt-3">Celebrate in Seclusion</h2>
                <p className="mt-4 text-ocean/80 font-sub">Private beach dinners under the stars, in-suite tasting menus, and bespoke celebration packages crafted by our executive chef.</p>
                <button onClick={() => toast.success("Our private dining team will reach out within the hour.")} className="mt-7 border border-ocean text-ocean px-7 py-3.5 rounded-full text-xs font-sub uppercase tracking-[0.22em] hover:bg-ocean hover:text-ivory transition">Enquire for Private Dining</button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
