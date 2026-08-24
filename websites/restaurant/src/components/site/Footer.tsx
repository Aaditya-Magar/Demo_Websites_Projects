import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[color:var(--dark-brown)] text-cream/80 pt-16 pb-8 mt-20 border-t border-gold/20">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display text-2xl text-gradient-gold">Royal Spice House</h3>
          <p className="mt-3 text-sm leading-relaxed">Authentic Taste. Royal Experience. A celebration of India's culinary heritage since 2009.</p>
          <div className="flex gap-3 mt-5">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="h-9 w-9 grid place-items-center rounded-full border border-gold/30 hover:bg-gold hover:text-[color:var(--dark-brown)] transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-gold text-lg mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/menu" className="hover:text-gold">Menu</Link></li>
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/gallery" className="hover:text-gold">Gallery</Link></li>
            <li><Link to="/reservation" className="hover:text-gold">Reservations</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-gold text-lg mb-4">Hours</h4>
          <ul className="space-y-2 text-sm">
            <li>Mon – Thu · 12:00 – 23:00</li>
            <li>Fri – Sun · 12:00 – 00:30</li>
            <li>Lunch · Dinner · Late Night</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-gold text-lg mb-4">Visit Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><MapPin className="h-4 w-4 text-gold mt-0.5"/> 42 Heritage Lane, Connaught Place, New Delhi</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 text-gold mt-0.5"/> +91 98765 43210</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 text-gold mt-0.5"/> hello@royalspicehouse.in</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-12 pt-6 border-t border-gold/15 text-xs text-cream/50 flex flex-col md:flex-row justify-between gap-2">
        <span>© {new Date().getFullYear()} Royal Spice House. All rights reserved.</span>
        <span>Crafted with passion in India.</span>
      </div>
    </footer>
  );
}
