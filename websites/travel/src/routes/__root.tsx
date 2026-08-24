import { Outlet, Link, createRootRoute, HeadContent, Scripts, useRouterState } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import appCss from "../styles.css?url";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CustomCursor, ScrollProgress, WhatsAppFab } from "@/components/site/UI";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--twilight-deep)] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display text-[var(--amber-h)]">404</h1>
        <h2 className="mt-4 text-xl font-display text-white">Off the map.</h2>
        <p className="mt-2 text-sm text-white/65">This page doesn't exist — let's get you back on the road.</p>
        <Link to="/" className="mt-6 inline-block px-5 py-2.5 rounded-full bg-[var(--amber-h)] text-[var(--twilight-deep)] font-semibold">Back to Home</Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "WanderNest — India's Most Trusted Family Travel Agency" },
      { name: "description", content: "Handcrafted holidays for families, couples & explorers. 500+ destinations, 18 years of expertise. Plan your dream trip with WanderNest." },
      { name: "author", content: "WanderNest Travel Pvt. Ltd." },
      { property: "og:title", content: "WanderNest — The World Is Waiting" },
      { property: "og:description", content: "Premium family & honeymoon travel agency. 50,000+ families served." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <AnimatePresence mode="wait">
        <main key={path}>
          <Outlet />
        </main>
      </AnimatePresence>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
