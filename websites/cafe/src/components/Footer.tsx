import { Link } from "@tanstack/react-router";
import { Coffee, Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-32">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Coffee className="w-6 h-6 text-accent" />
            <span className="font-display text-2xl">Brew Haven</span>
          </div>
          <p className="text-sm text-primary-foreground/70 leading-relaxed">
            Where every cup tells a story. Crafted with passion since 2014.
          </p>
        </div>
        <div>
          <h4 className="font-display text-lg mb-4 text-accent">Visit</h4>
          <p className="text-sm text-primary-foreground/70 leading-relaxed">
            142 Mulberry Street<br />
            New York, NY 10013<br />
            Mon–Sun · 7am – 9pm
          </p>
        </div>
        <div>
          <h4 className="font-display text-lg mb-4 text-accent">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/menu" className="hover:text-accent">Menu</Link></li>
            <li><Link to="/about" className="hover:text-accent">Our Story</Link></li>
            <li><Link to="/gallery" className="hover:text-accent">Gallery</Link></li>
            <li><Link to="/reservation" className="hover:text-accent">Reservations</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg mb-4 text-accent">Follow</h4>
          <div className="flex gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full border border-primary-foreground/20 grid place-items-center hover:bg-accent hover:text-espresso hover:border-accent transition-colors"
                aria-label="Social link"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-6 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} Brew Haven Café · Brewed with love
      </div>
    </footer>
  );
}
