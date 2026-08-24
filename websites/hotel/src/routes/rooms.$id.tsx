import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { rooms } from "../lib/data";
import { Check, X, ChevronLeft, ChevronRight, Wifi, Wind, Coffee, Bath, Tv, Utensils, Waves, Bed } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/rooms/$id")({
  head: ({ params }) => {
    const r = rooms.find((x) => x.id === params.id);
    return {
      meta: [
        { title: r ? `${r.name} — Seagrove Resort & Spa` : "Room — Seagrove" },
        { name: "description", content: r?.description[0] ?? "Seagrove ocean-facing accommodation." },
        { property: "og:title", content: r?.name ?? "Room — Seagrove" },
        { property: "og:description", content: r?.description[0]?.slice(0, 150) ?? "" },
        { property: "og:image", content: r?.images[0] ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    const r = rooms.find((x) => x.id === params.id);
    if (!r) throw notFound();
    return r;
  },
  component: RoomDetail,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center pt-24 bg-ivory">
      <div className="text-center">
        <h1 className="font-display italic text-5xl text-ocean">Room not found</h1>
        <Link to="/rooms" className="inline-block mt-6 text-teal story-link">View all rooms →</Link>
      </div>
    </div>
  ),
});

function RoomDetail() {
  const room = Route.useLoaderData() as (typeof rooms)[number];
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [nights, setNights] = useState(3);
  const [guests, setGuests] = useState(2);
  const subtotal = room.price * nights;
  const taxes = Math.round(subtotal * 0.18);
  const total = subtotal + taxes;
  const similar = useMemo(() => rooms.filter((r) => r.id !== room.id).slice(0, 3), [room.id]);

  return (
    <>
      <div className="pt-24 bg-ivory">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <motion.button layoutId={`img-${room.id}-0`} onClick={() => setLightbox(0)} className="md:col-span-7 aspect-[16/11] rounded-2xl overflow-hidden">
              <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
            </motion.button>
            <div className="md:col-span-5 grid grid-cols-2 gap-3">
              {[1,2].map((idx) => (
                <motion.button key={idx} layoutId={`img-${room.id}-${idx}`} onClick={() => setLightbox(idx)} className="aspect-square rounded-2xl overflow-hidden">
                  <img src={room.images[idx % room.images.length]} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
                </motion.button>
              ))}
              <button onClick={() => setLightbox(0)} className="col-span-2 aspect-[16/9] rounded-2xl bg-ocean-deep text-ivory text-xs font-sub uppercase tracking-[0.22em] hover:bg-ocean transition">View All {room.images.length} Photos</button>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-ivory py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <p className="text-[11px] font-sub uppercase tracking-[0.32em] text-gold">{room.type} · {room.view}</p>
            <h1 className="font-display italic text-4xl md:text-6xl text-ocean mt-2">{room.name}</h1>
            <p className="text-3xl font-display italic text-gold mt-4">From ₹{room.price.toLocaleString("en-IN")} <span className="text-base text-driftwood not-italic font-sub">/ night</span></p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-10 border-y border-border py-6">
              <Stat label="Size" value={`${room.size} sqm`} />
              <Stat label="Guests" value={String(room.guests)} />
              <Stat label="Beds" value={room.beds} />
              <Stat label="View" value={room.view} />
              <Stat label="Floor" value={room.floor} />
            </div>

            <h2 className="font-display italic text-3xl text-ocean mt-12 mb-5">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {room.amenities.map((a) => (
                <div key={a} className="flex items-center gap-2.5 text-sm font-sub text-ocean/85">
                  <span className="w-7 h-7 rounded-full bg-sand flex items-center justify-center text-teal"><AmenityIcon name={a} /></span>
                  {a}
                </div>
              ))}
            </div>

            <h2 className="font-display italic text-3xl text-ocean mt-12 mb-5">The Room</h2>
            <div className="space-y-5 text-ocean/80 font-sub leading-relaxed">
              {room.description.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <div className="border border-border rounded-2xl p-6 bg-card">
                <p className="text-[10px] font-sub uppercase tracking-[0.22em] text-gold">Floor Plan</p>
                <p className="font-display italic text-2xl text-ocean mt-1">Room layout</p>
                <div className="aspect-video bg-sand rounded-xl mt-4 flex items-center justify-center text-driftwood font-sub text-xs uppercase tracking-widest">Blueprint preview</div>
                <button onClick={() => toast.success("Floor plan downloading…")} className="mt-4 text-xs font-sub uppercase tracking-[0.22em] text-teal story-link">Download Floor Plan →</button>
              </div>
              <div className="border border-border rounded-2xl p-6 bg-card">
                <p className="text-[10px] font-sub uppercase tracking-[0.22em] text-gold">Within Walking Distance</p>
                <p className="font-display italic text-2xl text-ocean mt-1">Nearby</p>
                <ul className="mt-4 space-y-2.5 text-sm font-sub text-ocean/80">
                  <li className="flex justify-between border-b border-border pb-2"><span>Beach</span><span className="text-driftwood">2 min</span></li>
                  <li className="flex justify-between border-b border-border pb-2"><span>Tides Restaurant</span><span className="text-driftwood">4 min</span></li>
                  <li className="flex justify-between border-b border-border pb-2"><span>The Spa</span><span className="text-driftwood">3 min</span></li>
                  <li className="flex justify-between"><span>Infinity Pool</span><span className="text-driftwood">1 min</span></li>
                </ul>
              </div>
            </div>

            <h2 className="font-display italic text-3xl text-ocean mt-16 mb-5">Similar Rooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {similar.map((s) => (
                <Link key={s.id} to="/rooms/$id" params={{ id: s.id }} className="group block rounded-xl overflow-hidden border border-border hover:border-gold transition">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={s.images[0]} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-3">
                    <p className="font-display italic text-lg text-ocean">{s.name}</p>
                    <p className="text-xs text-driftwood font-sub mt-0.5">From ₹{s.price.toLocaleString("en-IN")}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 self-start">
            <div className="border-2 border-gold rounded-2xl p-6 bg-card shadow-xl">
              <p className="text-[10px] font-sub uppercase tracking-[0.22em] text-gold">Reserve</p>
              <p className="font-display italic text-2xl text-ocean mt-1">Your Stay</p>
              <div className="grid grid-cols-2 gap-3 mt-5">
                <Field label="Check-in" value="15 Dec 2025" />
                <Field label="Check-out" value="18 Dec 2025" />
              </div>
              <div className="mt-4">
                <p className="text-[10px] font-sub uppercase tracking-[0.22em] text-driftwood mb-1.5">Nights</p>
                <Stepper value={nights} onChange={setNights} min={1} max={30} />
              </div>
              <div className="mt-3">
                <p className="text-[10px] font-sub uppercase tracking-[0.22em] text-driftwood mb-1.5">Guests</p>
                <Stepper value={guests} onChange={setGuests} min={1} max={room.guests} />
              </div>
              <div className="mt-6 space-y-2 text-sm font-sub border-t border-border pt-4">
                <Row a={`₹${room.price.toLocaleString("en-IN")} × ${nights} nights`} b={`₹${subtotal.toLocaleString("en-IN")}`} />
                <Row a="Taxes & fees (18%)" b={`₹${taxes.toLocaleString("en-IN")}`} />
              </div>
              <div className="border-t border-border pt-4 mt-3 flex justify-between items-baseline">
                <span className="font-sub text-xs uppercase tracking-[0.22em] text-driftwood">Total</span>
                <AnimatePresence mode="wait">
                  <motion.span key={total} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="font-display italic text-3xl text-gold">
                    ₹{total.toLocaleString("en-IN")}
                  </motion.span>
                </AnimatePresence>
              </div>
              <Link to="/booking" className="block w-full text-center bg-gold text-ocean-deep py-4 rounded-full mt-5 text-xs font-sub font-semibold uppercase tracking-[0.22em] hover:bg-gold-soft transition">Reserve Now</Link>
              <ul className="mt-5 space-y-2 text-xs font-sub text-ocean/75">
                <li className="flex gap-2"><Check size={14} className="text-teal" /> Complimentary breakfast</li>
                <li className="flex gap-2"><Check size={14} className="text-teal" /> Airport transfer included</li>
                <li className="flex gap-2"><Check size={14} className="text-teal" /> Welcome amenity in suite</li>
              </ul>
              <a href="https://wa.me/919822200111" className="block text-center mt-5 text-xs font-sub uppercase tracking-[0.2em] text-teal story-link">Need help? Chat with us →</a>
            </div>
          </aside>
        </div>
      </section>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox images={room.images} index={lightbox} onClose={() => setLightbox(null)} onNav={(i) => setLightbox(i)} roomId={room.id} />
        )}
      </AnimatePresence>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-sub uppercase tracking-[0.22em] text-driftwood">{label}</p>
      <p className="font-display text-lg text-ocean mt-1">{value}</p>
    </div>
  );
}
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border rounded-xl px-3 py-2.5">
      <p className="text-[9px] font-sub uppercase tracking-[0.22em] text-driftwood">{label}</p>
      <p className="font-sub text-sm text-ocean mt-0.5">{value}</p>
    </div>
  );
}
function Stepper({ value, onChange, min, max }: { value: number; onChange: (n:number)=>void; min: number; max: number }) {
  return (
    <div className="flex items-center justify-between border border-border rounded-full px-2 py-1.5">
      <button onClick={() => onChange(Math.max(min, value - 1))} className="w-8 h-8 rounded-full border border-border hover:border-gold hover:text-gold transition flex items-center justify-center">−</button>
      <span className="font-sub text-sm">{value}</span>
      <button onClick={() => onChange(Math.min(max, value + 1))} className="w-8 h-8 rounded-full border border-border hover:border-gold hover:text-gold transition flex items-center justify-center">+</button>
    </div>
  );
}
function Row({ a, b }: { a: string; b: string }) {
  return <div className="flex justify-between text-ocean/85"><span>{a}</span><span>{b}</span></div>;
}

function AmenityIcon({ name }: { name: string }) {
  const n = name.toLowerCase();
  if (n.includes("wifi")) return <Wifi size={14} />;
  if (n.includes("air")) return <Wind size={14} />;
  if (n.includes("coffee") || n.includes("mini")) return <Coffee size={14} />;
  if (n.includes("rain") || n.includes("bath") || n.includes("jacuzzi")) return <Bath size={14} />;
  if (n.includes("tv")) return <Tv size={14} />;
  if (n.includes("dining")) return <Utensils size={14} />;
  if (n.includes("pool") || n.includes("ocean") || n.includes("sea")) return <Waves size={14} />;
  return <Bed size={14} />;
}

function Lightbox({ images, index, onClose, onNav, roomId }: { images: string[]; index: number; onClose: () => void; onNav: (i:number)=>void; roomId: string }) {
  const next = () => onNav((index + 1) % images.length);
  const prev = () => onNav((index - 1 + images.length) % images.length);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-ocean-deep/97 flex items-center justify-center p-6" onClick={onClose}>
      <button className="absolute top-6 right-6 text-ivory" onClick={onClose}><X size={28} /></button>
      <button className="absolute left-6 text-ivory hover:text-gold" onClick={(e) => { e.stopPropagation(); prev(); }}><ChevronLeft size={32} /></button>
      <button className="absolute right-6 text-ivory hover:text-gold" onClick={(e) => { e.stopPropagation(); next(); }}><ChevronRight size={32} /></button>
      <motion.img layoutId={`img-${roomId}-${index}`} src={images[index]} alt="" className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl" onClick={(e) => e.stopPropagation()} />
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ivory/70 font-sub text-xs uppercase tracking-[0.22em]">{index + 1} / {images.length}</p>
    </motion.div>
  );
}
