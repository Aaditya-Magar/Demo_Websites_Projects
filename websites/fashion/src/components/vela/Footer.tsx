import { Instagram, Facebook, Youtube } from "lucide-react";

const cols = [
  { title: "Shop", links: ["New Arrivals", "Women", "Men", "Accessories", "Sale"] },
  { title: "Help", links: ["Sizing Guide", "Returns", "Shipping", "FAQ", "Track Order"] },
  { title: "Company", links: ["About Us", "Sustainability", "Careers", "Press"] },
  { title: "Contact", links: ["hello@wearVELA.com", "+91 98765 43210", "Mumbai, India"] },
];

const PaymentIcon = ({ label }: { label: string }) => (
  <div className="flex h-7 w-12 items-center justify-center border border-vela-cream/20 text-[9px] font-semibold uppercase tracking-wider text-vela-cream/70">
    {label}
  </div>
);

export const Footer = () => {
  return (
    <footer id="contact" className="bg-vela-charcoal px-6 py-20 text-vela-cream md:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="border-b border-vela-cream/10 pb-12 text-center">
          <h2 className="font-display text-7xl font-light tracking-vela md:text-9xl">VELA</h2>
          <p className="mt-2 font-display text-xl italic text-vela-cream/70">Wear the Story</p>
        </div>

        <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-4">
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="mb-5 text-xs uppercase tracking-wider-2 text-vela-terracotta">{c.title}</h4>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-vela-cream/70 transition hover:text-vela-cream">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-8 border-t border-vela-cream/10 pt-10 md:flex-row">
          <div className="flex gap-5">
            <a href="#" aria-label="Instagram" className="text-vela-cream/60 transition hover:text-vela-terracotta">
              <Instagram size={18} strokeWidth={1.4} />
            </a>
            <a href="#" aria-label="Pinterest" className="text-vela-cream/60 transition hover:text-vela-terracotta">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 0C5.4 0 0 5.4 0 12c0 5.1 3.2 9.4 7.6 11.1-.1-.9-.2-2.4 0-3.4.2-.9 1.4-5.6 1.4-5.6s-.4-.7-.4-1.8c0-1.7 1-3 2.2-3 1 0 1.5.8 1.5 1.7 0 1-.7 2.6-1 4-.3 1.2.6 2.1 1.7 2.1 2.1 0 3.7-2.2 3.7-5.4 0-2.8-2-4.8-4.9-4.8-3.3 0-5.3 2.5-5.3 5.1 0 1 .4 2.1.9 2.7.1.1.1.2.1.3-.1.4-.3 1.2-.3 1.4-.1.2-.2.3-.4.2-1.5-.7-2.4-2.9-2.4-4.6 0-3.8 2.7-7.2 7.9-7.2 4.1 0 7.3 2.9 7.3 6.9 0 4.1-2.6 7.5-6.2 7.5-1.2 0-2.4-.6-2.7-1.4 0 0-.6 2.3-.7 2.8-.3 1-1 2.3-1.5 3.1 1.1.4 2.3.5 3.5.5 6.6 0 12-5.4 12-12S18.6 0 12 0z"/>
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="text-vela-cream/60 transition hover:text-vela-terracotta">
              <Facebook size={18} strokeWidth={1.4} />
            </a>
            <a href="#" aria-label="YouTube" className="text-vela-cream/60 transition hover:text-vela-terracotta">
              <Youtube size={18} strokeWidth={1.4} />
            </a>
          </div>

          <div className="flex gap-2">
            <PaymentIcon label="Visa" />
            <PaymentIcon label="MC" />
            <PaymentIcon label="UPI" />
            <PaymentIcon label="Razor" />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 text-xs text-vela-cream/40 md:flex-row">
          <p>© 2025 VELA. All rights reserved.</p>
          <p>Made in India, Worn Everywhere.</p>
        </div>
      </div>
    </footer>
  );
};
