import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ArrowRight, Calendar, Users } from "lucide-react";
import { packages, PHONE } from "@/data/site";
import { PageWrap } from "@/components/site/UI";

export const Route = createFileRoute("/booking/$packageId")({
  component: Booking,
});

function Booking() {
  const { packageId } = useParams({ from: "/booking/$packageId" });
  const pkg = packages.find((p) => p.id === packageId);
  const [step, setStep] = useState(1);
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);

  if (!pkg) {
    return (
      <PageWrap>
        <div className="min-h-[60vh] flex items-center justify-center bg-[var(--cloud)] pt-32">
          <div className="text-center">
            <h1 className="font-display text-4xl text-[var(--twilight-deep)]">Package not found</h1>
            <Link to="/packages" className="mt-6 inline-block px-6 py-3 rounded-full bg-[var(--amber-h)] text-[var(--twilight-deep)] font-semibold">View All Packages</Link>
          </div>
        </div>
      </PageWrap>
    );
  }

  const total = pkg.price * (adults + kids * 0.5);

  return (
    <PageWrap>
      <section className="bg-[var(--twilight-deep)] pt-32 pb-16">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 lg:p-8 shadow-2xl">
            {done ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-[var(--success)] mx-auto flex items-center justify-center text-white text-4xl">✓</div>
                <h2 className="font-display text-3xl mt-5 text-[var(--twilight-deep)]">Booking Request Received</h2>
                <p className="text-[var(--stone)] mt-2 font-sans-ui">A travel expert will call you within 2 hours to confirm details and process payment.</p>
                <Link to="/" className="mt-6 inline-block px-6 py-3 rounded-full bg-[var(--amber-h)] text-[var(--twilight-deep)] font-semibold">Back to Home</Link>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-6 text-sm font-sans-ui">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className={`flex-1 h-1.5 rounded-full ${step >= s ? "bg-[var(--amber-h)]" : "bg-[var(--cloud)]"}`} />
                  ))}
                </div>
                <h2 className="font-display italic text-3xl text-[var(--twilight-deep)] mb-1">{pkg.name}</h2>
                <p className="text-sm text-[var(--stone)] font-sans-ui mb-6">{pkg.nights}N / {pkg.days}D · {pkg.destination}</p>

                {step === 1 && (
                  <div className="space-y-5">
                    <h3 className="font-display text-xl text-[var(--twilight-deep)]">Travellers & Date</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Stepper label="Adults" v={adults} set={setAdults} min={1} max={10} />
                      <Stepper label="Children" v={kids} set={setKids} min={0} max={8} />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-[var(--stone)] font-sans-ui font-semibold flex items-center gap-1.5"><Calendar className="w-3 h-3" /> Departure Date</label>
                      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full mt-2 bg-[var(--cloud)] rounded-lg px-4 py-3 font-sans-ui outline-none focus:ring-2 focus:ring-[var(--amber-h)]" />
                    </div>
                    <button onClick={() => setStep(2)} className="w-full px-6 py-3.5 rounded-full bg-[var(--amber-h)] text-[var(--twilight-deep)] font-sans-ui font-semibold flex items-center justify-center gap-2">Continue <ArrowRight className="w-4 h-4" /></button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="font-display text-xl text-[var(--twilight-deep)]">Your Details</h3>
                    <Field label="Full Name" v={name} set={setName} required />
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Email" v={email} set={setEmail} type="email" required />
                      <Field label="Phone" v={phone} set={setPhone} type="tel" required />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button onClick={() => setStep(1)} className="px-6 py-3 rounded-full border border-[var(--border)] font-sans-ui">Back</button>
                      <button onClick={() => setStep(3)} disabled={!name || !email || !phone} className="flex-1 px-6 py-3.5 rounded-full bg-[var(--amber-h)] text-[var(--twilight-deep)] font-sans-ui font-semibold disabled:opacity-50">Review</button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <h3 className="font-display text-xl text-[var(--twilight-deep)]">Confirm Your Booking</h3>
                    <div className="bg-[var(--cloud)] rounded-xl p-5 space-y-2 text-sm font-sans-ui text-[var(--twilight-deep)]">
                      <Row k="Package" v={pkg.name} />
                      <Row k="Travellers" v={`${adults} adults${kids ? `, ${kids} kids` : ""}`} />
                      <Row k="Departure" v={date || "—"} />
                      <Row k="Lead traveller" v={name} />
                      <Row k="Contact" v={`${email} · ${phone}`} />
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setStep(2)} className="px-6 py-3 rounded-full border border-[var(--border)] font-sans-ui">Back</button>
                      <button onClick={() => setDone(true)} className="flex-1 px-6 py-3.5 rounded-full bg-[var(--success)] text-white font-sans-ui font-semibold flex items-center justify-center gap-2"><Check className="w-4 h-4" /> Confirm Booking</button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <aside className="bg-white rounded-2xl overflow-hidden shadow-2xl h-fit">
            <img src={pkg.image} alt={pkg.name} className="w-full h-44 object-cover" />
            <div className="p-5">
              <div className="font-display italic text-xl text-[var(--twilight-deep)]">{pkg.name}</div>
              <div className="text-xs text-[var(--stone)] mt-1 font-sans-ui flex items-center gap-2"><Users className="w-3 h-3" /> {pkg.nights}N / {pkg.days}D</div>
              <div className="mt-4 pt-4 border-t border-[var(--border)] space-y-1.5 text-sm font-sans-ui">
                <div className="flex justify-between text-[var(--stone)]"><span>Per person</span><span>₹{pkg.price.toLocaleString("en-IN")}</span></div>
                <div className="flex justify-between text-[var(--stone)]"><span>Travellers</span><span>{adults}A {kids ? `+ ${kids}C` : ""}</span></div>
              </div>
              <div className="mt-3 pt-3 border-t border-[var(--border)] flex justify-between items-end">
                <span className="text-xs text-[var(--stone)] font-sans-ui">Total estimate</span>
                <span className="font-display text-3xl text-[var(--amber-h)]">₹{Math.round(total).toLocaleString("en-IN")}</span>
              </div>
              <a href={`tel:${PHONE.replace(/\s/g,"")}`} className="mt-4 block text-center px-4 py-2.5 rounded-full border border-[var(--teal-s)] text-[var(--teal-s)] text-sm font-sans-ui font-semibold">Need help? {PHONE}</a>
            </div>
          </aside>
        </div>
      </section>
    </PageWrap>
  );
}

function Field({ label, v, set, type = "text", required }: { label: string; v: string; set: (s: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-[var(--stone)] font-sans-ui font-semibold">{label}</label>
      <input type={type} value={v} onChange={(e) => set(e.target.value)} required={required}
        className="w-full mt-2 bg-[var(--cloud)] rounded-lg px-4 py-3 font-sans-ui outline-none focus:ring-2 focus:ring-[var(--amber-h)]" />
    </div>
  );
}
function Stepper({ label, v, set, min, max }: { label: string; v: number; set: (n: number) => void; min: number; max: number }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-[var(--stone)] font-sans-ui font-semibold">{label}</label>
      <div className="mt-2 flex items-center bg-[var(--cloud)] rounded-lg">
        <button type="button" onClick={() => set(Math.max(min, v - 1))} className="w-10 h-11 text-lg">−</button>
        <span className="flex-1 text-center font-sans-ui font-semibold">{v}</span>
        <button type="button" onClick={() => set(Math.min(max, v + 1))} className="w-10 h-11 text-lg">+</button>
      </div>
    </div>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return <div className="flex justify-between"><span className="text-[var(--stone)]">{k}</span><span className="font-semibold">{v}</span></div>;
}