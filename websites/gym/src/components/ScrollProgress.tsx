import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#E8192C] z-[100] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
