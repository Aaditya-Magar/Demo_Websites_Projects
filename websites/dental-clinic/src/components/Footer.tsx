import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <Link to="/" className="font-display text-2xl font-bold text-primary-foreground tracking-tight">
              Dantam <span className="text-saffron">Dental</span>
            </Link>
            <p className="text-primary-foreground/50 font-body text-sm mt-2">
              India's trusted dental care — your smile, our pride.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {[
              { label: "Services", to: "/services" },
              { label: "About", to: "/about" },
              { label: "Testimonials", to: "/testimonials" },
              { label: "Contact", to: "/contact" },
            ].map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm text-primary-foreground/60 hover:text-saffron font-body transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/40 font-body">
            © {new Date().getFullYear()} Dantam Dental Clinic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
