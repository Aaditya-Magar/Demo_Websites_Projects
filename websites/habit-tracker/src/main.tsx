import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Default to dark mode unless user explicitly chose light
const storedTheme = localStorage.getItem("sht_theme");
if (storedTheme !== "light") {
  document.documentElement.classList.add("dark");
}

createRoot(document.getElementById("root")!).render(<App />);
