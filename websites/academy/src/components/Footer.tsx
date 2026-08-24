import { Link } from "@tanstack/react-router";
import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground mt-24">
      <div className="container mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-10 w-10 rounded-xl bg-gradient-brand grid place-items-center">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="font-display font-bold text-lg">ExcelEdge Academy</span>
          </div>
          <p className="text-sm text-white/70">Where Future Toppers Are Made. Trusted by 10,000+ students across India.</p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Programs</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/courses" className="hover:text-accent">IIT-JEE</Link></li>
            <li><Link to="/courses" className="hover:text-accent">NEET-UG</Link></li>
            <li><Link to="/courses" className="hover:text-accent">Class 10 & 12 Boards</Link></li>
            <li><Link to="/courses" className="hover:text-accent">Foundation (6-10)</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
            <li><Link to="/faculty" className="hover:text-accent">Faculty</Link></li>
            <li><Link to="/results" className="hover:text-accent">Results</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Reach Us</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-accent" /> Coaching Hub, Kota, Rajasthan</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 text-accent" /> +91 98765 43210</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-accent" /> hello@exceledge.in</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} ExcelEdge Academy. All rights reserved.
      </div>
    </footer>
  );
}
