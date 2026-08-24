import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, LineChart, ListChecks, Moon, Sun, CheckCircle2 } from "lucide-react";
import { applyTheme, getTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Habits", icon: ListChecks, end: true },
  { to: "/journal", label: "Journal", icon: CalendarDays },
  { to: "/analytics", label: "Insights", icon: LineChart },
];

export default function Layout() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const location = useLocation();

  useEffect(() => {
    const t = getTheme();
    setTheme(t);
    applyTheme(t);
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5"
          >
            <div className="relative grid h-9 w-9 place-items-center rounded-xl gradient-primary glow">
              <CheckCircle2 className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="font-display text-base font-bold leading-tight tracking-tight">
                SimpleHabits
              </h1>
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Local · Private
              </p>
            </div>
          </motion.div>

          <nav className="hidden items-center gap-1 rounded-full border border-border/60 bg-card/60 p-1 backdrop-blur sm:flex">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end} className="relative">
                {({ isActive }) => (
                  <span
                    className={cn(
                      "relative z-10 flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                      isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navpill"
                        className="absolute inset-0 -z-10 rounded-full gradient-primary glow"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <n.icon className="h-3.5 w-3.5" />
                    {n.label}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-full border border-border/60 bg-card/60 p-2 text-muted-foreground transition-all hover:scale-105 hover:text-foreground"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <nav className="fixed bottom-3 left-1/2 z-30 -translate-x-1/2 rounded-full border border-border/60 bg-card/80 p-1 backdrop-blur-xl shadow-lg sm:hidden">
        <div className="flex">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end}>
              {({ isActive }) => (
                <span
                  className={cn(
                    "relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium transition-colors",
                    isActive ? "text-primary-foreground" : "text-muted-foreground",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="mobpill"
                      className="absolute inset-0 -z-10 rounded-full gradient-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <n.icon className="h-4 w-4" />
                  {isActive && n.label}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
      <div className="h-20 sm:hidden" />
    </div>
  );
}
