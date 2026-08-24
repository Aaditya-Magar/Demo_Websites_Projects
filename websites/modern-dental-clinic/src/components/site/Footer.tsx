import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="[&_span]:!text-white"><Logo light /></div>
          <p className="mt-4 max-w-sm text-sm text-white/70 leading-relaxed">
            SmileCraft Dental crafts confident, healthy smiles using world-class
            technology and a warm, human touch. Since 2009.
          </p>
          <div className="mt-6 flex gap-3">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-teal hover:text-navy-deep transition"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-base mb-4 text-teal">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/75">
            <li><a href="#home" className="hover:text-teal">Home</a></li>
            <li><a href="#services" className="hover:text-teal">Services</a></li>
            <li><a href="#why" className="hover:text-teal">About Us</a></li>
            <li><a href="#doctors" className="hover:text-teal">Our Doctors</a></li>
            <li><a href="#testimonials" className="hover:text-teal">Reviews</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base mb-4 text-teal">Services</h4>
          <ul className="space-y-2 text-sm text-white/75">
            <li>General Dentistry</li>
            <li>Teeth Whitening</li>
            <li>Dental Implants</li>
            <li>Orthodontics</li>
            <li>Pediatric Care</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base mb-4 text-teal">Get In Touch</h4>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex gap-2.5"><MapPin className="h-4 w-4 text-teal flex-none mt-0.5" /> 42 Dental Plaza, Health District, Mumbai 400001</li>
            <li className="flex gap-2.5"><Phone className="h-4 w-4 text-teal flex-none mt-0.5" /> +91 98765 43210</li>
            <li className="flex gap-2.5"><Mail className="h-4 w-4 text-teal flex-none mt-0.5" /> hello@smilecraftdental.com</li>
            <li className="pt-2 border-t border-white/10 mt-4">
              <div className="flex gap-2.5"><Clock className="h-4 w-4 text-teal flex-none mt-0.5" />
                <div>
                  <div>Mon–Fri: 9 AM – 7 PM</div>
                  <div>Saturday: 9 AM – 4 PM</div>
                  <div>Sunday: Closed</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/55">
          <p>© {new Date().getFullYear()} SmileCraft Dental. All rights reserved.</p>
          <p>Designed with <span className="text-teal">♥</span> for healthy smiles.</p>
        </div>
      </div>
    </footer>
  );
}
