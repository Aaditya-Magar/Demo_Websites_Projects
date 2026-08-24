import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Welcome to Seagrove. Look for our offers in your inbox.");
    setEmail("");
  };
  return (
    <footer className="bg-ocean-deep text-ivory border-t-[3px] border-gold">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
        <form onSubmit={submit} className="flex flex-col md:flex-row items-center gap-4 pb-12 mb-12 border-b border-white/10">
          <div className="md:flex-1">
            <p className="font-display italic text-2xl text-ivory">Exclusive offers for our guests</p>
            <p className="text-ivory/60 text-sm font-sub mt-1">Quiet emails. Generous rates. No spam, ever.</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="bg-white/5 border border-white/15 rounded-full px-5 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold w-full md:w-72"
            />
            <button className="bg-gold text-ocean-deep px-6 py-3 rounded-full text-xs font-sub font-semibold uppercase tracking-wider hover:bg-gold-soft transition">Join</button>
          </div>
        </form>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-2xl">SEA<span className="text-teal">·</span>GROVE</p>
            <p className="text-ivory/60 text-sm mt-3 italic font-display">Where the sea meets stillness.</p>
            <p className="text-ivory/50 text-xs mt-4 font-sub">Candolim Beach, North Goa</p>
            <div className="flex gap-3 mt-6">
              {[Instagram, Facebook, Youtube].map((I, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-white/15 hover:border-gold hover:text-gold flex items-center justify-center transition">
                  <I size={15} />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Stay" items={[["Rooms","/rooms"],["Villas","/rooms"],["Suites","/rooms"],["Packages","/booking"],["Gift Vouchers","/contact"]]} />
          <FooterCol title="Discover" items={[["Dining","/dining"],["Spa","/spa"],["Experiences","/experiences"],["Gallery","/gallery"],["Events","/experiences"]]} />
          <FooterCol title="Company" items={[["About Us","/about"],["Awards","/about"],["Press","/about"],["Careers","/contact"],["Sustainability","/about"]]} />
          <FooterCol title="Contact" items={[["Address","/contact"],["+91 98222 00111","tel:+919822200111"],["hello@seagroveresort.com","mailto:hello@seagroveresort.com"],["Directions","/contact"],["WhatsApp","https://wa.me/919822200111"]]} />
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-xs font-sub text-ivory/45">
          <p>© 2025 Seagrove Resort & Spa Pvt. Ltd. · Member, Small Luxury Hotels of the World</p>
          <p className="flex gap-5">
            <a href="#" className="hover:text-gold">Privacy</a>
            <a href="#" className="hover:text-gold">Terms</a>
            <a href="#" className="hover:text-gold">Cookies</a>
          </p>
        </div>
      </div>

      <a
        href="https://wa.me/919822200111"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/90 bg-[#25D366] text-white shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition-transform duration-200 hover:scale-105 hover:bg-[#20BD5A] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
        aria-label="Chat with Seagrove on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true" fill="currentColor">
          <path d="M16.04 3a12.9 12.9 0 0 0-11.17 19.35L3 29l6.82-1.79A12.96 12.96 0 1 0 16.04 3Zm0 23.72c-1.91 0-3.78-.51-5.42-1.47l-.39-.23-4.05 1.06 1.08-3.95-.25-.4a10.72 10.72 0 1 1 9.03 4.99Zm5.88-8.03c-.32-.16-1.91-.94-2.21-1.05-.3-.11-.51-.16-.73.16-.21.32-.83 1.05-1.02 1.27-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.58-1.59a9.67 9.67 0 0 1-1.79-2.23c-.19-.32-.02-.5.14-.66.15-.14.32-.37.49-.56.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.73-1.75-1-2.4-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.86.4-.29.32-1.13 1.11-1.13 2.7 0 1.59 1.16 3.12 1.32 3.34.16.21 2.28 3.48 5.52 4.88.77.33 1.37.53 1.84.68.77.25 1.48.21 2.03.13.62-.09 1.91-.78 2.18-1.54.27-.75.27-1.4.19-1.54-.08-.13-.3-.21-.62-.37Z" />
        </svg>
      </a>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: [string,string][] }) {
  return (
    <div>
      <p className="text-gold text-xs font-sub uppercase tracking-[0.2em] mb-4">{title}</p>
      <ul className="space-y-2.5">
        {items.map(([label, href]) => (
          <li key={label}>
            {href.startsWith("http") || href.startsWith("tel") || href.startsWith("mailto") ? (
              <a href={href} className="text-ivory/70 hover:text-gold text-sm font-sub transition">{label}</a>
            ) : (
              <Link to={href} className="text-ivory/70 hover:text-gold text-sm font-sub transition">{label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
