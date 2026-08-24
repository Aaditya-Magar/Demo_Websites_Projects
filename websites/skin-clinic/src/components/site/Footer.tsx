import { Sparkles, Instagram, Facebook, Youtube, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-20 pb-10 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full gradient-pink grid place-items-center shadow-glow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-display text-xl font-semibold">DermaGlow</div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-white/60">Skin Clinic</div>
            </div>
          </div>
          <p className="mt-6 text-white/70 leading-relaxed text-sm">
            India's most trusted dermatology clinic — pairing world-class technology with deeply personal skincare since 2014.
          </p>
          <div className="flex gap-3 mt-6">
            {[Instagram, Facebook, Youtube].map((I, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/15 grid place-items-center hover:bg-accent hover:border-accent transition-all">
                <I className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="text-xs uppercase tracking-[0.25em] text-white/50 mb-5">Explore</div>
          <ul className="space-y-3 text-sm text-white/80">
            {["Home", "About", "Doctors", "Results", "Reviews", "Contact"].map((l) => (
              <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-accent transition">{l}</a></li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <div className="text-xs uppercase tracking-[0.25em] text-white/50 mb-5">Treatments</div>
          <ul className="space-y-3 text-sm text-white/80">
            {["Acne Treatment", "Skin Whitening", "Laser Hair Removal", "Anti-Aging / Botox", "Pigmentation", "Hair Loss"].map((l) => (
              <li key={l}><a href="#treatments" className="hover:text-accent transition">{l}</a></li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <div className="text-xs uppercase tracking-[0.25em] text-white/50 mb-5">Contact</div>
          <ul className="space-y-4 text-sm text-white/80">
            <li className="flex gap-3"><MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" /><span>12 Lane 6, Koregaon Park, Pune 411001 · Linking Road, Bandra West, Mumbai</span></li>
            <li className="flex gap-3"><Phone className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" /><span>+91 98220 12345</span></li>
            <li className="flex gap-3"><Mail className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" /><span>care@dermaglow.in</span></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-center text-xs text-white/50">
        <p>© {new Date().getFullYear()} DermaGlow Skin Clinic. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-accent">Privacy Policy</a>
          <a href="#" className="hover:text-accent">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}