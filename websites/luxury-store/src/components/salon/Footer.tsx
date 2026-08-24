import { Instagram, Facebook, Youtube, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative pt-20 pb-10 px-6 border-t border-border mt-10">
      <div className="absolute top-0 left-0 right-0 leading-[0] -translate-y-px">
        <svg viewBox="0 0 1440 60" className="w-full h-10 rotate-180" preserveAspectRatio="none">
          <path d="M0,30 C320,60 720,0 1440,40 L1440,0 L0,0 Z" fill="oklch(0.13 0.012 285)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <a href="#home" className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-display text-2xl">
              <span className="text-gradient-gold">Aura</span> Luxe
            </span>
          </a>
          <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
            A luxury salon & beauty studio crafting iconic looks since 2017.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/50 transition-colors"
                aria-label="Social"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {["Home", "Services", "Gallery", "Stylists", "Pricing"].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="hover:text-primary transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg">Services</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {["Haircut & Styling", "Hair Coloring", "Bridal Makeup", "Skincare", "Nail Art", "Spa Rituals"].map(
              (l) => (
                <li key={l} className="hover:text-primary transition-colors cursor-pointer">
                  {l}
                </li>
              ),
            )}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>14, Linking Road,<br />Bandra West, Mumbai 400050</li>
            <li>+91 98200 14725</li>
            <li>hello@auraluxe.studio</li>
          </ul>
        </div>
      </div>

      <div className="mt-14 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} Aura Luxe Salon & Studio. All rights reserved.</span>
        <span>Crafted with love in Mumbai · Bandra · Worli</span>
      </div>
    </footer>
  );
}
