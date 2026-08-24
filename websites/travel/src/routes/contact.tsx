import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import { PHONE, EMAIL, WHATSAPP, branches } from "@/data/site";
import { PageWrap, SectionHeader } from "@/components/site/UI";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact WanderNest — Talk to a Travel Expert" },
      { name: "description", content: "Reach WanderNest's travel experts. 5 branches across India. Call, WhatsApp or email — we reply within 2 hours." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", dest: "", msg: "" });

  return (
    <PageWrap>
      <section className="bg-[var(--twilight-deep)] pt-32 pb-20 text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <SectionHeader light overline="LET'S TALK" title="Plan Your Dream Holiday" subtitle="Drop us a line — our experts respond within 2 hours, every working day." />
          <div className="grid lg:grid-cols-2 gap-10 mt-8">
            <div className="bg-white/5 rounded-2xl p-6 lg:p-8 border border-white/10">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[var(--success)] mx-auto flex items-center justify-center text-white text-3xl">✓</div>
                  <h3 className="font-display text-3xl mt-5">Got it!</h3>
                  <p className="text-white/70 mt-2 font-sans-ui">Our travel expert will reach out within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
                  <Field label="Your Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                    <Field label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
                  </div>
                  <Field label="Destination of Interest" value={form.dest} onChange={(v) => setForm({ ...form, dest: v })} placeholder="Kerala, Maldives, Europe…" />
                  <div>
                    <label className="text-xs uppercase tracking-wider text-white/60 font-sans-ui font-semibold">Tell us about your trip</label>
                    <textarea value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} rows={4} className="w-full mt-2 bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white outline-none focus:border-[var(--amber-h)] font-sans-ui" />
                  </div>
                  <button type="submit" className="w-full px-6 py-3.5 rounded-full bg-[var(--amber-h)] text-[var(--twilight-deep)] font-sans-ui font-semibold flex items-center justify-center gap-2"><Send className="w-4 h-4" /> Send Inquiry</button>
                </form>
              )}
            </div>

            <div className="space-y-4">
              <a href={`tel:${PHONE.replace(/\s/g,"")}`} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[var(--amber-h)] transition">
                <div className="w-12 h-12 rounded-full bg-[var(--amber-h)]/20 text-[var(--amber-h)] flex items-center justify-center"><Phone className="w-5 h-5" /></div>
                <div><div className="text-xs uppercase tracking-wider text-white/55 font-sans-ui">Call</div><div className="font-display text-xl">{PHONE}</div></div>
              </a>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#25D366] transition">
                <div className="w-12 h-12 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center"><MessageCircle className="w-5 h-5" /></div>
                <div><div className="text-xs uppercase tracking-wider text-white/55 font-sans-ui">WhatsApp</div><div className="font-display text-xl">Chat instantly</div></div>
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[var(--teal-s)] transition">
                <div className="w-12 h-12 rounded-full bg-[var(--teal-s)]/20 text-[var(--teal-s)] flex items-center justify-center"><Mail className="w-5 h-5" /></div>
                <div><div className="text-xs uppercase tracking-wider text-white/55 font-sans-ui">Email</div><div className="font-display text-xl">{EMAIL}</div></div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--cloud)] py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <SectionHeader overline="OUR BRANCHES" title="Visit Us In Person" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {branches.map((b) => (
              <div key={b.city} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[var(--amber-h)] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display text-xl text-[var(--twilight-deep)]">{b.city}</h3>
                    <p className="text-sm text-[var(--stone)] font-sans-ui mt-1">{b.address}</p>
                    <a href={`tel:${b.phone.replace(/\s/g,"")}`} className="text-sm text-[var(--teal-s)] font-sans-ui font-semibold mt-3 inline-flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {b.phone}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrap>
  );
}

function Field({ label, value, onChange, type = "text", required, placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-white/60 font-sans-ui font-semibold">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} placeholder={placeholder}
        className="w-full mt-2 bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white outline-none focus:border-[var(--amber-h)] font-sans-ui" />
    </div>
  );
}
