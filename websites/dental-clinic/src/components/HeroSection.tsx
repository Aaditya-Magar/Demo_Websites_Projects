import heroImage from "@/assets/hero-dental.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Modern dental clinic interior" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 py-28 sm:py-32">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <Sparkles className="w-5 h-5 text-saffron" />
            <span className="text-saffron font-body text-xs sm:text-sm font-semibold tracking-widest uppercase">
              India's Trusted Dental Care
            </span>
          </div>

          <h1
            className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-primary-foreground leading-tight mb-6 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Your Smile,{" "}
            <span className="text-saffron italic">Our Pride.</span>
          </h1>

          <p
            className="text-base sm:text-lg md:text-xl text-primary-foreground/80 font-body leading-relaxed mb-10 max-w-lg opacity-0 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            Experience world-class dental care at affordable prices. Advanced technology,
            compassionate doctors, and a tradition of excellence across India.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <Button
              asChild
              size="lg"
              className="gradient-accent text-accent-foreground font-semibold text-base px-8 shadow-accent hover:opacity-90 transition-opacity"
            >
              <Link to="/contact">
                Book Appointment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-saffron/50 text-saffron bg-transparent hover:bg-saffron/10 font-semibold text-base px-8"
            >
              <Link to="/services">Our Services</Link>
            </Button>
          </div>

          <div
            className="mt-12 sm:mt-16 grid grid-cols-3 gap-6 sm:gap-12 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.8s" }}
          >
            {[
              { value: "20+", label: "Years Experience" },
              { value: "50K+", label: "Happy Patients" },
              { value: "₹499", label: "Consultation" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-display font-bold text-saffron">{stat.value}</div>
                <div className="text-xs sm:text-sm text-primary-foreground/60 font-body mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
