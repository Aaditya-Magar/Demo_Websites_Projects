import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Smile, Shield, Heart, ArrowRight, Star } from "lucide-react";

const highlights = [
  { icon: Smile, title: "Cosmetic Dentistry", desc: "Veneers, whitening & smile makeovers" },
  { icon: Shield, title: "Preventive Care", desc: "Regular check-ups & professional cleanings" },
  { icon: Heart, title: "Family Dentistry", desc: "Gentle care for every age group" },
];

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />

        <section className="py-16 sm:py-20 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="text-accent font-body text-sm font-semibold tracking-widest uppercase">Our Expertise</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-3">Why Choose Dantam Dental?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {highlights.map((item, i) => (
                <div
                  key={item.title}
                  className="bg-card rounded-lg p-6 sm:p-8 shadow-elegant border border-border hover:border-accent/30 transition-all duration-300 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className="w-14 h-14 rounded-lg gradient-accent flex items-center justify-center mb-5">
                    <item.icon className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground font-body">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
                <Link to="/services">
                  View All Services <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 gradient-primary">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-saffron text-saffron" />
              ))}
            </div>
            <blockquote className="font-display text-xl sm:text-2xl text-primary-foreground/90 italic max-w-2xl mx-auto mb-6">
              "Dantam Dental gave me the confidence to smile again. The best dental experience in Mumbai!"
            </blockquote>
            <p className="text-saffron font-semibold font-body">— Priya Sharma, Mumbai</p>
            <div className="mt-8">
              <Button asChild variant="outline" className="border-saffron/50 text-saffron hover:bg-saffron hover:text-accent-foreground font-semibold">
                <Link to="/testimonials">Read More Stories</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">Ready for Your Best Smile?</h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto mb-8">
              Book your consultation today. Walk-ins welcome at all our clinics across India.
            </p>
            <Button asChild size="lg" className="gradient-accent text-accent-foreground font-semibold shadow-accent px-10">
              <Link to="/contact">
                Book Appointment <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    </PageTransition>
  );
};

export default Index;
