import { CartProvider } from "@/context/CartContext";
import { Loader } from "@/components/vela/Loader";

import { Navbar } from "@/components/vela/Navbar";
import { Hero } from "@/components/vela/Hero";
import { Collections } from "@/components/vela/Collections";
import { ProductGrid } from "@/components/vela/ProductGrid";
import { Showcase } from "@/components/vela/Showcase";
import { Lookbook } from "@/components/vela/Lookbook";
import { Sustainability } from "@/components/vela/Sustainability";
import { Testimonials } from "@/components/vela/Testimonials";
import { InstagramStrip } from "@/components/vela/InstagramStrip";
import { Newsletter } from "@/components/vela/Newsletter";
import { Footer } from "@/components/vela/Footer";
import { CartDrawer } from "@/components/vela/CartDrawer";

const Index = () => {
  return (
    <CartProvider>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <Collections />
        <ProductGrid />
        <Showcase />
        <Lookbook />
        <Sustainability />
        <Testimonials />
        <InstagramStrip />
        <Newsletter />
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
};

export default Index;
