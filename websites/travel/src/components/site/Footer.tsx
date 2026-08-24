import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Compass, Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Footer() {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState(false);
  return (
    <footer className="bg-[#070D18] text-white border-t-[3px] border-[var(--amber-h)] mt-0">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center pb-12 border-b border-white/10">
          <div>
            <h3 className="font-display text-3xl">Stay inspired.</h3>
            <p className="text-white/65 text-sm mt-2 font-sans-ui">Get exclusive deals & travel inspiration. No spam, ever.</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (email) { setToast(true); setEmail(""); setTimeout(() => setToast(false), 4000); } }} className="flex gap-2">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address"
              className="flex-1 px-5 py-3 rounded-full bg-white/8 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--amber-h)]" />
            <button type="submit" className="px-6 py-3 rounded-full bg-[var(--amber-h)] text-[var(--twilight-deep)] font-semibold whitespace-nowrap">Subscribe →</button>
          </form>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Compass className="w-6 h-6 text-[var(--amber-h)]" />
              <span className="font-display text-xl">WANDERNEST</span>
            </div>
            <p className="text-white/65 text-sm leading-relaxed mb-4 font-sans-ui max-w-xs">India's most trusted family travel agency. 18 years, 50,000+ families, 500+ destinations.</p>
            <p className="text-white/60 text-sm">14th Floor, Mittal Court,<br/>Nariman Point, Mumbai 400021</p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 rounded-full bg-white/8 hover:bg-[var(--amber-h)] hover:text-[var(--twilight-deep)] flex items-center justify-center transition"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/8 hover:bg-[var(--amber-h)] hover:text-[var(--twilight-deep)] flex items-center justify-center transition"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/8 hover:bg-[var(--amber-h)] hover:text-[var(--twilight-deep)] flex items-center justify-center transition"><Youtube className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/8 hover:bg-[var(--success)] hover:text-white flex items-center justify-center transition"><MessageCircle className="w-4 h-4" /></a>
            </div>
          </div>

          {[
            { h: "Destinations", links: ["Kerala","Maldives","Thailand","Bali","Europe","Singapore","Dubai"], to: "/destinations" },
            { h: "Packages", links: ["Family Tours","Honeymoon","Group Tours","Custom Packages","School Trips"], to: "/packages" },
            { h: "Support", links: ["Visa Assistance","Travel Insurance","Airport Transfers","EMI Options","Cancellation Policy"], to: "/visa" },
          ].map((c) => (
            <div key={c.h}>
              <h4 className="font-sans-ui font-semibold text-white text-sm tracking-wide mb-4">{c.h}</h4>
              <ul className="space-y-2 text-sm text-white/65">
                {c.links.map((l) => <li key={l}><Link to={c.to} className="hover:text-[var(--amber-h)] transition">{l}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-white/50">
          <div>
            © 2025 WanderNest Travel Pvt. Ltd. | IATA: 14-3 5557 8 | GST: 27AAACW1234A1Z5
            <div className="mt-1">Member — Indian Association of Tour Operators (IATO)</div>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Refund Policy</a>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50 bg-[var(--success)] text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-medium">
            You're in! 🎉 Check your inbox for a welcome gift.
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
