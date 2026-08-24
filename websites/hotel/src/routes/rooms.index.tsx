import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { rooms } from "../lib/data";
import { PageHero, Reveal } from "../components/SectionPrimitives";
import { BedDouble, Users, MapPin } from "lucide-react";

export const Route = createFileRoute("/rooms/")({
  head: () => ({
    meta: [
      { title: "Rooms & Villas — Seagrove Resort & Spa" },
      { name: "description", content: "48 ocean-facing accommodations on Candolim Beach. Suites, villas, cottages and family rooms." },
      { property: "og:title", content: "Rooms & Villas — Seagrove" },
      { property: "og:description", content: "48 ocean-facing accommodations on Candolim Beach." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200" },
    ],
  }),
  component: RoomsList,
});

const filters = ["All", "Suites", "Villas", "Cottages", "Family Rooms"] as const;
type Filter = typeof filters[number];

function RoomsList() {
  const [active, setActive] = useState<Filter>("All");
  const [sort, setSort] = useState("popular");
  const list = useMemo(() => {
    let l = active === "All" ? rooms : rooms.filter((r) => r.category === active);
    if (sort === "price-asc") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "size-desc") l = [...l].sort((a, b) => b.size - a.size);
    return l;
  }, [active, sort]);

  return (
    <>
      <PageHero
        title="Our Rooms & Villas"
        subtitle="48 ocean-facing accommodations, each uniquely designed."
        image="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920"
      />
      <section className="bg-ivory py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-12">
            <div className="flex flex-wrap gap-1 relative">
              {filters.map((f) => (
                <button key={f} onClick={() => setActive(f)} className="relative px-5 py-2.5 text-xs font-sub uppercase tracking-[0.2em] text-ocean/70 hover:text-ocean">
                  {f}
                  {active === f && (
                    <motion.span layoutId="filter-underline" className="absolute left-3 right-3 -bottom-px h-[2px] bg-gold" />
                  )}
                </button>
              ))}
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-transparent border border-border rounded-full px-5 py-2.5 text-xs font-sub uppercase tracking-[0.2em] text-ocean">
              <option value="popular">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="size-desc">Size: Large to Small</option>
            </select>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {list.map((r) => (
                <motion.article
                  key={r.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-card rounded-2xl overflow-hidden border border-border hover:border-gold hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group"
                >
                  <RoomCarousel images={r.images} alt={r.name} badge={r.badge} price={r.price} />
                  <div className="p-6">
                    <h3 className="font-display italic text-2xl text-ocean">{r.name}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 text-xs font-sub text-driftwood">
                      <span className="flex items-center gap-1.5"><MapPin size={12} className="text-teal" /> {r.size} sqm</span>
                      <span className="flex items-center gap-1.5"><Users size={12} className="text-teal" /> {r.guests}</span>
                      <span className="flex items-center gap-1.5"><BedDouble size={12} className="text-teal" /> {r.beds}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {r.highlights.map((h) => (
                        <span key={h} className="text-[10px] uppercase tracking-wider border border-teal/40 text-teal px-2.5 py-1 rounded-full">{h}</span>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-6">
                      <Link to="/rooms/$id" params={{ id: r.id }} className="flex-1 text-center border border-border text-xs font-sub uppercase tracking-[0.2em] py-3 rounded-full hover:border-gold hover:text-gold transition">View Room</Link>
                      <Link to="/booking" className="flex-1 text-center bg-gold text-ocean-deep text-xs font-sub uppercase tracking-[0.2em] py-3 rounded-full hover:bg-gold-soft transition">Book Now</Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function RoomCarousel({ images, alt, badge, price }: { images: string[]; alt: string; badge?: string; price: number }) {
  const [i, setI] = useState(0);
  return (
    <div className="relative aspect-[16/11] overflow-hidden">
      {images.map((src, idx) => (
        <img key={idx} src={src} alt={alt} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${idx === i ? "opacity-100" : "opacity-0"}`} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/60 to-transparent" />
      {badge && <span className="absolute top-4 left-4 text-[9px] uppercase tracking-[0.22em] bg-gold text-ocean-deep px-2.5 py-1 rounded-full font-sub font-semibold">{badge}</span>}
      <span className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.22em] bg-ocean-deep/70 text-gold px-3 py-1.5 rounded-full font-sub backdrop-blur-sm">From ₹{price.toLocaleString("en-IN")} / night</span>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, idx) => (
          <button key={idx} onClick={(e) => { e.preventDefault(); setI(idx); }} className={`w-2 h-2 rounded-full transition ${idx === i ? "bg-gold w-6" : "bg-ivory/60"}`} />
        ))}
      </div>
    </div>
  );
}
