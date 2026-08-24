import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Flame, Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import { LOCATIONS } from "@/lib/data";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="bg-black border-t-4 border-[#E8192C] mt-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="grid place-items-center h-9 w-9 rounded-sm bg-[#E8192C] text-white">
              <Flame size={20} strokeWidth={2.5} />
            </span>
            <span className="font-display text-3xl tracking-wider leading-none">
              <span className="text-[#E8192C]">IRON</span><span className="text-white">PEAK</span>
            </span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            Mumbai's premium gym for those who refuse to settle. Forge your limits.
          </p>
          <p className="mt-4 font-condensed uppercase tracking-widest text-xs text-[#E8192C]">
            Forge Your Limits
          </p>
        </div>

        <div>
          <h4 className="font-condensed uppercase tracking-widest text-sm text-white mb-5">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link to="/" className="hover:text-[#E8192C]">Home</Link></li>
            <li><Link to="/classes" className="hover:text-[#E8192C]">Classes</Link></li>
            <li><Link to="/trainers" className="hover:text-[#E8192C]">Trainers</Link></li>
            <li><Link to="/schedule" className="hover:text-[#E8192C]">Schedule</Link></li>
            <li><Link to="/gallery" className="hover:text-[#E8192C]">Gallery</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-condensed uppercase tracking-widest text-sm text-white mb-5">Programs</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li>HIIT</li>
            <li>Powerlifting</li>
            <li>Boxing</li>
            <li>Yoga & Mobility</li>
            <li>CrossFit</li>
            <li>Personal Training</li>
          </ul>
        </div>

        <div>
          <h4 className="font-condensed uppercase tracking-widest text-sm text-white mb-5">Locations</h4>
          <ul className="space-y-3 text-xs text-white/60">
            {LOCATIONS.map((l) => (
              <li key={l.id}>
                <div className="text-white font-condensed uppercase tracking-wider text-sm">{l.name}</div>
                <div>{l.address}</div>
                <div className="text-[#E8192C]">{l.hours}</div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-condensed uppercase tracking-widest text-sm text-white mb-5">Connect</h4>
          <div className="flex gap-3 mb-6">
            {[Instagram, Facebook, Youtube, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="grid place-items-center h-10 w-10 border border-white/15 text-white/70 hover:bg-[#E8192C] hover:text-white hover:border-[#E8192C] transition-colors"
                aria-label="social"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); if (email) { setSent(true); setEmail(""); setTimeout(() => setSent(false), 2500); } }}
            className="space-y-2"
          >
            <label className="block font-condensed text-xs uppercase tracking-widest text-white/60">Newsletter</label>
            <div className="flex">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="you@email.com"
                className="flex-1 bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#E8192C]"
              />
              <button className="bg-[#E8192C] text-white px-4 font-condensed uppercase text-xs tracking-widest">Join</button>
            </div>
            {sent && <p className="text-[#E8192C] text-xs font-condensed uppercase tracking-widest">Subscribed ✓</p>}
          </form>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between text-xs text-white/40 gap-2">
          <p>© 2025 Iron Peak Circle. All rights reserved. Mumbai, India.</p>
          <p className="font-condensed uppercase tracking-widest">Built for those who lift different.</p>
        </div>
      </div>
    </footer>
  );
}
