import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Clock, Phone, Mail, Send } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Remove records written by older demo versions. Medical/contact data must
    // never be retained in script-readable browser storage.
    localStorage.removeItem("appointments");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const message = form.message.trim();
    if (
      name.length < 2 ||
      name.length > 80 ||
      email.length > 254 ||
      phone.length > 20 ||
      message.length > 1_000
    ) {
      toast({ title: "Please check your details", description: "One or more fields are invalid or too long." });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
      toast({ title: "Appointment Requested! 🎉", description: "Our team will call you within 2 hours to confirm your booking." });
    }, 800);
  };

  const contactInfo = [
    { icon: MapPin, label: "Dantam Dental, Andheri West, Mumbai 400058" },
    { icon: Phone, label: "+91 98765 43210" },
    { icon: Mail, label: "care@dantamdental.in" },
    { icon: Clock, label: "Mon–Sat: 9AM–8PM | Sun: 10AM–2PM" },
  ];

  const clinics = [
    "Mumbai — Andheri, Bandra, Thane",
    "Delhi — Connaught Place, Dwarka",
    "Bangalore — Koramangala, Whitefield",
    "Hyderabad — Banjara Hills",
    "Chennai — T. Nagar",
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24">
          <div className="gradient-primary py-16 sm:py-20 mb-12 sm:mb-16">
            <div className="container mx-auto px-4 sm:px-6 text-center">
              <span className="text-saffron font-body text-sm font-semibold tracking-widest uppercase">Get In Touch</span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground mt-3 mb-4">Book Your Visit</h1>
              <p className="text-primary-foreground/70 font-body max-w-xl mx-auto text-base sm:text-lg">
                Walk-ins welcome! Or book online and we'll confirm within 2 hours.
              </p>
            </div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
              <div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-8">Contact Information</h3>
                <div className="space-y-5">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg gradient-accent flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-accent-foreground" />
                      </div>
                      <p className="text-muted-foreground font-body pt-3 text-sm sm:text-base">{item.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 p-6 bg-secondary rounded-lg border border-border">
                  <h4 className="font-display font-semibold text-foreground mb-3">Our Clinics Across India</h4>
                  <ul className="space-y-2">
                    {clinics.map((c) => (
                      <li key={c} className="text-sm text-muted-foreground font-body flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-accent flex-shrink-0" /> {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 p-6 bg-card rounded-lg border border-border shadow-elegant">
                  <h4 className="font-display font-semibold text-foreground mb-2">Dental Emergency?</h4>
                  <p className="text-sm text-muted-foreground font-body">
                    Call our 24/7 emergency helpline: <span className="text-accent font-semibold">+91 98765 00000</span>
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="bg-card rounded-lg p-6 sm:p-8 shadow-elegant border border-border space-y-5">
                <Input placeholder="Full Name" required minLength={2} maxLength={80} autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-secondary border-border font-body" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input type="email" placeholder="Email" required maxLength={254} autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-secondary border-border font-body" />
                  <Input type="tel" placeholder="Phone (+91)" maxLength={20} autoComplete="tel" inputMode="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-secondary border-border font-body" />
                </div>
                <select required value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="w-full h-10 rounded-md border border-border bg-secondary px-3 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="">Select Service</option>
                  <option value="whitening">Teeth Whitening</option>
                  <option value="crowns">Dental Crowns & Bridges</option>
                  <option value="preventive">Preventive Care & Cleaning</option>
                  <option value="cosmetic">Cosmetic Dentistry</option>
                  <option value="implants">Dental Implants</option>
                  <option value="orthodontics">Orthodontics & Aligners</option>
                  <option value="rct">Root Canal Treatment</option>
                  <option value="pediatric">Pediatric Dentistry</option>
                  <option value="other">Other</option>
                </select>
                <Textarea placeholder="Tell us about your dental needs..." maxLength={1000} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="bg-secondary border-border font-body min-h-[100px]" />
                <Button type="submit" disabled={loading} className="w-full gradient-accent text-accent-foreground font-semibold text-base shadow-accent hover:opacity-90 transition-opacity" size="lg">
                  {loading ? "Sending..." : (<><Send className="w-4 h-4 mr-2" />Request Appointment</>)}
                </Button>
                <p className="text-xs text-muted-foreground text-center font-body">No payment required. We'll confirm your slot via phone call.</p>
              </form>
            </div>
          </div>
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    </PageTransition>
  );
};

export default Contact;
