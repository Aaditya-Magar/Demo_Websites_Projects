import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { rooms } from "../lib/data";
import { PageHero, Overline } from "../components/SectionPrimitives";
import { Check } from "lucide-react";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book Your Stay — Seagrove Resort & Spa" },
      { name: "description", content: "Reserve your Seagrove stay direct for our best rate. Complimentary breakfast on stays of 3+ nights." },
      { property: "og:title", content: "Reserve Your Seagrove Stay" },
      { property: "og:description", content: "Direct rates. Complimentary breakfast. Welcome amenity in suite." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200" },
    ],
  }),
  component: Booking,
});

function Booking() {
  const [step, setStep] = useState(1);
  const [room, setRoom] = useState(rooms[0]);
  const [nights, setNights] = useState(3);
  const [extras, setExtras] = useState({ dining: false, spa: false });
  const [occasion, setOccasion] = useState("");
  const [done, setDone] = useState(false);

  const subtotal = room.price * nights;
  const diningCost = extras.dining ? 2500 * 2 * nights : 0;
  const spaCost = extras.spa ? 3000 * nights : 0;
  const taxes = Math.round((subtotal + diningCost + spaCost) * 0.18);
  const total = subtotal + diningCost + spaCost + taxes;

  return (
    <>
      <PageHero title="Reserve Your Seagrove Stay" subtitle="Direct rates. Best price guaranteed." image="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920" height="50vh" />
      <section className="bg-ivory py-16 min-h-[60vh]">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <div className="flex justify-center gap-3 md:gap-8 mb-12">
            {[1,2,3].map((n) => (
              <div key={n} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display text-lg ${step >= n ? "bg-gold text-ocean-deep" : "border border-border text-driftwood"}`}>{n}</div>
                <span className={`text-xs font-sub uppercase tracking-[0.2em] hidden md:inline ${step >= n ? "text-ocean" : "text-driftwood"}`}>{["Dates & Room","Extras","Confirm"][n-1]}</span>
                {n < 3 && <div className="w-8 md:w-16 h-px bg-border" />}
              </div>
            ))}
          </div>

          {done ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 border-2 border-gold rounded-2xl">
              <svg width="80" height="80" viewBox="0 0 60 60" className="mx-auto">
                <motion.circle cx="30" cy="30" r="28" stroke="#D4A853" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
                <motion.path d="M18 31 L27 40 L43 22" stroke="#D4A853" strokeWidth="3" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.6 }} />
              </svg>
              <h2 className="font-display italic text-4xl text-ocean mt-6">Your stay is reserved.</h2>
              <p className="text-driftwood font-sub mt-3">A confirmation has been sent. Our concierge team will be in touch within the hour.</p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
                {step === 1 && (
                  <div>
                    <Overline>Step 1</Overline>
                    <h2 className="font-display italic text-3xl text-ocean mt-2 mb-6">Select Dates & Room</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <Field label="Check-in" type="date" />
                      <Field label="Check-out" type="date" />
                      <Field label="Adults" defaultValue="2" />
                      <Field label="Children" defaultValue="0" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {rooms.map((r) => (
                        <button key={r.id} onClick={() => setRoom(r)} className={`flex gap-4 text-left border-2 rounded-2xl p-3 transition ${room.id === r.id ? "border-gold bg-card" : "border-border hover:border-gold/50"}`}>
                          <img src={r.images[0]} alt={r.name} className="w-24 h-24 object-cover rounded-xl shrink-0" />
                          <div className="flex-1">
                            <p className="font-display italic text-xl text-ocean">{r.name}</p>
                            <p className="text-xs font-sub text-driftwood mt-1">{r.size} sqm · {r.guests} guests</p>
                            <p className="text-gold font-sub text-sm mt-2">₹{r.price.toLocaleString("en-IN")} / night</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div>
                    <Overline>Step 2</Overline>
                    <h2 className="font-display italic text-3xl text-ocean mt-2 mb-6">Extras & Preferences</h2>
                    <div className="space-y-3">
                      <Toggle label="Add Dining Package" desc="Two meals daily at any restaurant — ₹2,500 / person / day" checked={extras.dining} onChange={(v) => setExtras({ ...extras, dining: v })} />
                      <Toggle label="Add Spa Credit" desc="₹3,000 daily credit at The Seagrove Spa" checked={extras.spa} onChange={(v) => setExtras({ ...extras, spa: v })} />
                    </div>
                    <div className="mt-8">
                      <p className="text-[10px] font-sub uppercase tracking-[0.22em] text-driftwood mb-3">Special Occasion</p>
                      <div className="flex flex-wrap gap-2">
                        {["None","Anniversary","Honeymoon","Birthday"].map((o) => (
                          <button key={o} onClick={() => setOccasion(o)} className={`px-4 py-2 rounded-full text-xs font-sub uppercase tracking-[0.18em] border transition ${occasion === o ? "border-gold text-gold bg-gold/5" : "border-border text-ocean/70 hover:border-gold/50"}`}>{o}</button>
                        ))}
                      </div>
                    </div>
                    <div className="mt-8">
                      <p className="text-[10px] font-sub uppercase tracking-[0.22em] text-driftwood mb-2">Special Requests</p>
                      <textarea rows={3} placeholder="Dietary restrictions, early check-in, late checkout…" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-sub focus:outline-none focus:border-gold" />
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div>
                    <Overline>Step 3</Overline>
                    <h2 className="font-display italic text-3xl text-ocean mt-2 mb-6">Your Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <Field label="Full Name" />
                      <Field label="Email" type="email" />
                      <Field label="Phone" />
                      <Field label="Nationality" />
                    </div>
                    <div className="border-2 border-gold rounded-2xl p-6 bg-card">
                      <p className="font-display italic text-2xl text-ocean">Order Summary</p>
                      <ul className="mt-4 space-y-2 text-sm font-sub text-ocean/85">
                        <li className="flex justify-between"><span>{room.name} × {nights} nights</span><span>₹{subtotal.toLocaleString("en-IN")}</span></li>
                        {extras.dining && <li className="flex justify-between"><span>Dining package</span><span>₹{diningCost.toLocaleString("en-IN")}</span></li>}
                        {extras.spa && <li className="flex justify-between"><span>Spa credit</span><span>₹{spaCost.toLocaleString("en-IN")}</span></li>}
                        <li className="flex justify-between"><span>Taxes & fees</span><span>₹{taxes.toLocaleString("en-IN")}</span></li>
                      </ul>
                      <div className="border-t border-border mt-4 pt-4 flex justify-between items-baseline">
                        <span className="font-sub text-xs uppercase tracking-[0.22em] text-driftwood">Total</span>
                        <span className="font-display italic text-3xl text-gold">₹{total.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {!done && (
            <div className="flex justify-between mt-10">
              <button disabled={step === 1} onClick={() => setStep(step - 1)} className="px-6 py-3 rounded-full text-xs font-sub uppercase tracking-[0.22em] border border-border text-ocean hover:border-gold disabled:opacity-30 transition">Back</button>
              {step < 3 ? (
                <div className="flex items-center gap-4">
                  <select value={nights} onChange={(e) => setNights(Number(e.target.value))} className="bg-transparent border border-border rounded-full px-4 py-2 text-xs font-sub">
                    {[1,2,3,4,5,6,7,10,14].map((n) => <option key={n} value={n}>{n} nights</option>)}
                  </select>
                  <button onClick={() => setStep(step + 1)} className="px-7 py-3 rounded-full bg-gold text-ocean-deep text-xs font-sub uppercase tracking-[0.22em] hover:bg-gold-soft transition">Continue</button>
                </div>
              ) : (
                <button onClick={() => setDone(true)} className="px-8 py-4 rounded-full bg-gold text-ocean-deep text-xs font-sub font-semibold uppercase tracking-[0.22em] hover:bg-gold-soft transition">Confirm Booking</button>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function Field({ label, type = "text", defaultValue }: { label: string; type?: string; defaultValue?: string }) {
  return (
    <div>
      <label className="text-[10px] font-sub uppercase tracking-[0.22em] text-driftwood">{label}</label>
      <input type={type} defaultValue={defaultValue} className="mt-1.5 w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-sub focus:outline-none focus:border-gold" />
    </div>
  );
}
function Toggle({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: (v:boolean)=>void }) {
  return (
    <button onClick={() => onChange(!checked)} className={`w-full text-left flex items-center gap-4 border-2 rounded-2xl p-5 transition ${checked ? "border-gold bg-card" : "border-border hover:border-gold/50"}`}>
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${checked ? "border-gold bg-gold text-ocean-deep" : "border-border"}`}>{checked && <Check size={14} />}</div>
      <div className="flex-1">
        <p className="font-sub text-ocean">{label}</p>
        <p className="text-xs text-driftwood mt-0.5">{desc}</p>
      </div>
    </button>
  );
}
