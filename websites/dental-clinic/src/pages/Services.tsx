import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Smile, Shield, Zap, Heart, Eye, Crown, Stethoscope, Baby, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  { icon: Smile, title: "Teeth Whitening", description: "Professional laser whitening for a brighter, more radiant smile. Safe, painless, and effective.", price: "From ₹3,999" },
  { icon: Crown, title: "Dental Crowns & Bridges", description: "High-quality zirconia and porcelain crowns crafted for durability and a natural look.", price: "From ₹5,999" },
  { icon: Shield, title: "Preventive Care", description: "Comprehensive oral check-ups, scaling, polishing, and fluoride treatments.", price: "From ₹499" },
  { icon: Eye, title: "Cosmetic Dentistry", description: "Smile makeovers with veneers, composite bonding, and aesthetic enhancements.", price: "From ₹8,999" },
  { icon: Zap, title: "Dental Implants", description: "Titanium and ceramic implants with lifetime warranty. Painless procedure with quick recovery.", price: "From ₹18,999" },
  { icon: Heart, title: "Orthodontics & Aligners", description: "Invisible aligners, ceramic braces, and metal braces for perfect alignment.", price: "From ₹25,000" },
  { icon: Stethoscope, title: "Root Canal Treatment", description: "Painless single-sitting RCT with advanced rotary instruments and microscopic precision.", price: "From ₹3,499" },
  { icon: Baby, title: "Pediatric Dentistry", description: "Child-friendly dental care with gentle handling and fun clinic environment.", price: "From ₹299" },
];

const Services = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16 sm:pb-24">
          <div className="gradient-primary py-16 sm:py-20 mb-12 sm:mb-16">
            <div className="container mx-auto px-4 sm:px-6 text-center">
              <span className="text-saffron font-body text-sm font-semibold tracking-widest uppercase">What We Offer</span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground mt-3 mb-4">Our Dental Services</h1>
              <p className="text-primary-foreground/70 font-body max-w-xl mx-auto text-base sm:text-lg">
                Affordable world-class treatments for every dental need. All services available at our clinics across India.
              </p>
            </div>
          </div>

          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  className="group bg-card rounded-lg p-6 shadow-elegant hover:shadow-accent transition-all duration-500 border border-border hover:border-accent/30"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <div className="w-12 h-12 rounded-lg gradient-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">{service.description}</p>
                  <p className="text-accent font-semibold font-body text-sm">{service.price}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-16 sm:mt-20 p-8 sm:p-12 bg-secondary rounded-lg border border-border">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">Need a Custom Treatment Plan?</h2>
              <p className="text-muted-foreground font-body mb-6 max-w-lg mx-auto">
                Every smile is unique. Book a consultation and our experts will create a personalized treatment plan for you.
              </p>
              <Button asChild size="lg" className="gradient-accent text-accent-foreground font-semibold shadow-accent">
                <Link to="/contact">
                  Book Consultation <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    </PageTransition>
  );
};

export default Services;
