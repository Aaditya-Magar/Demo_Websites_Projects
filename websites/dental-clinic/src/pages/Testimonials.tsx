import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const testimonials = [
  { name: "Priya Sharma", city: "Mumbai", text: "Dr. Mehta and her team completely transformed my smile with veneers. The clinic is spotless, the staff is warm, and the results are beyond what I imagined!", rating: 5, treatment: "Porcelain Veneers" },
  { name: "Rajesh Kumar", city: "Delhi", text: "I got my dental implants done here and the experience was painless. The technology they use is world-class. Highly recommend to everyone!", rating: 5, treatment: "Dental Implants" },
  { name: "Ananya Iyer", city: "Bangalore", text: "My kids love going to Dantam Dental! The pediatric team is so patient and caring. No more crying before dentist visits.", rating: 5, treatment: "Pediatric Dentistry" },
  { name: "Vikram Singh", city: "Hyderabad", text: "Best teeth whitening experience! Done in just one sitting and the results are amazing. Very affordable compared to other clinics.", rating: 5, treatment: "Teeth Whitening" },
  { name: "Meera Patel", city: "Chennai", text: "I was scared of root canals but Dr. Mehta made it completely painless. Single sitting and I was back to work the same day!", rating: 5, treatment: "Root Canal Treatment" },
  { name: "Arjun Reddy", city: "Mumbai", text: "Got invisible aligners and the transformation over 6 months was incredible. The team tracked my progress at every step. Truly premium care.", rating: 5, treatment: "Invisible Aligners" },
];

const Testimonials = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24">
          <div className="gradient-primary py-16 sm:py-20 mb-12 sm:mb-16">
            <div className="container mx-auto px-4 sm:px-6 text-center">
              <span className="text-saffron font-body text-sm font-semibold tracking-widest uppercase">Patient Stories</span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground mt-3 mb-4">What Our Patients Say</h1>
              <p className="text-primary-foreground/70 font-body max-w-xl mx-auto text-base sm:text-lg">
                Real stories from real patients across India who trust Dantam Dental for their smile.
              </p>
            </div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  className="bg-card border border-border rounded-lg p-6 sm:p-8 shadow-elegant hover:shadow-accent/20 transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-saffron text-saffron" />
                    ))}
                  </div>
                  <p className="text-foreground/80 font-body leading-relaxed mb-6 italic">"{t.text}"</p>
                  <div className="border-t border-border pt-4">
                    <div className="font-display font-semibold text-foreground">{t.name}</div>
                    <div className="text-sm text-muted-foreground font-body">{t.city}</div>
                    <div className="text-xs text-accent font-semibold font-body mt-1">{t.treatment}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12 sm:mt-16 p-8 sm:p-12 gradient-primary rounded-lg">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary-foreground mb-4">Join 50,000+ Happy Patients</h2>
              <p className="text-primary-foreground/70 font-body mb-6 max-w-lg mx-auto">Your smile transformation is just one appointment away.</p>
              <Button asChild size="lg" className="gradient-accent text-accent-foreground font-semibold shadow-accent">
                <Link to="/contact">Book Your Visit</Link>
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

export default Testimonials;
