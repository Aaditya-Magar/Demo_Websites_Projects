import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import WhatsAppButton from "@/components/WhatsAppButton";
import dentistPortrait from "@/assets/dentist-portrait.jpg";
import { Award, GraduationCap, Users, MapPin, Clock, Heart } from "lucide-react";

const About = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24">
          <div className="gradient-primary py-16 sm:py-20 mb-12 sm:mb-16">
            <div className="container mx-auto px-4 sm:px-6 text-center">
              <span className="text-saffron font-body text-sm font-semibold tracking-widest uppercase">About Us</span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground mt-3 mb-4">Meet Our Team</h1>
              <p className="text-primary-foreground/70 font-body max-w-xl mx-auto text-base sm:text-lg">
                Dedicated professionals committed to making India smile with world-class dental care.
              </p>
            </div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 sm:mb-24">
              <div className="relative opacity-0 animate-fade-in-left" style={{ animationDelay: "0.2s" }}>
                <div className="rounded-lg overflow-hidden shadow-elegant">
                  <img src={dentistPortrait} alt="Dr. Priya Mehta" className="w-full h-[400px] sm:h-[500px] object-cover" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 sm:w-32 h-24 sm:h-32 rounded-lg gradient-accent opacity-20 -z-10" />
              </div>

              <div className="opacity-0 animate-fade-in-right" style={{ animationDelay: "0.3s" }}>
                <span className="text-accent font-body text-sm font-semibold tracking-widest uppercase">Lead Dentist</span>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">Dr. Priya Mehta</h2>
                <p className="text-muted-foreground font-body text-base sm:text-lg leading-relaxed mb-8">
                  With over 20 years of experience in cosmetic, restorative, and implant dentistry,
                  Dr. Mehta is one of India's most respected dental surgeons. Trained at AIIMS Delhi
                  and with advanced fellowships from the UK, she combines cutting-edge global techniques
                  with compassionate, patient-first care.
                </p>
                <div className="space-y-5">
                  {[
                    { icon: GraduationCap, title: "AIIMS Delhi, BDS & MDS", sub: "Gold Medalist — Prosthodontics" },
                    { icon: Award, title: "Fellow, Royal College of Surgeons", sub: "Edinburgh, United Kingdom" },
                    { icon: Users, title: "50,000+ Patients Treated", sub: "Across clinics in Mumbai, Delhi & Bangalore" },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <div className="font-display font-semibold text-foreground">{item.title}</div>
                        <div className="text-sm text-muted-foreground font-body">{item.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                { icon: Heart, title: "Patient-First Care", desc: "Every treatment starts with listening. We prioritize your comfort and concerns above all." },
                { icon: MapPin, title: "Pan-India Presence", desc: "Clinics in Mumbai, Delhi, Bangalore, Hyderabad, and Chennai — more coming soon." },
                { icon: Clock, title: "Flexible Timings", desc: "Early morning, late evening, and Sunday slots available for working professionals." },
              ].map((item, i) => (
                <div key={item.title} className="bg-secondary rounded-lg p-6 sm:p-8 border border-border opacity-0 animate-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
                  <item.icon className="w-8 h-8 text-accent mb-4" />
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground font-body leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    </PageTransition>
  );
};

export default About;
