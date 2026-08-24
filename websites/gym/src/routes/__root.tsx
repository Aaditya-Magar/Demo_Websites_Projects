import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import PageTransition from "@/components/PageTransition";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Toast from "@/components/Toast";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-[10rem] leading-none text-[#E8192C]">404</h1>
        <h2 className="font-display text-3xl tracking-wider text-white">Off The Mat</h2>
        <p className="mt-3 text-sm text-white/60">This page doesn't exist. Get back to training.</p>
        <div className="mt-8">
          <Link to="/" className="inline-flex items-center justify-center bg-[#E8192C] text-white px-6 py-3 font-condensed font-bold uppercase tracking-widest text-sm">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Iron Peak Circle — Portfolio Gym UI" },
      { name: "description", content: "A portfolio gym landing page built with React, Tailwind CSS, TanStack Router, and motion-driven UI. Fully static and ready for Vercel." },
      { name: "author", content: "Iron Peak Circle Portfolio" },
      { property: "og:title", content: "Iron Peak Circle — Portfolio Gym UI" },
      { property: "og:description", content: "A premium gym marketing website prototype built as a frontend portfolio project." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200" },
      { name: "theme-color", content: "#080808" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-black text-white">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main className="pt-0 min-h-screen">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <WhatsAppFloat />
      <Toast />
    </>
  );
}
