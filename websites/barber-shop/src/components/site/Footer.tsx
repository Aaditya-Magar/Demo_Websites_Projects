import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border bg-background">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="font-display text-3xl tracking-widest">
            CUT<span className="gradient-text">CRAFT</span>
          </Link>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            We don't edit videos. We craft stories. A premium edit studio for creators, brands and agencies who refuse to look average.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Youtube, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="rounded-full border border-border p-2.5 transition hover:border-primary hover:text-primary">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg tracking-wider">Studio</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
            <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
            <li><Link to="/portfolio" className="hover:text-foreground">Work</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg tracking-wider">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>hello@cutcraft.studio</li>
            <li>Los Angeles · Remote</li>
            <li><Link to="/contact" className="text-electric">Start a project →</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-6 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} CutCraft Studios. Crafted frame by frame.
      </div>
    </footer>
  );
}
