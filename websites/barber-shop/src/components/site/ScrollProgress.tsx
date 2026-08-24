import { motion, useScroll, useSpring } from "framer-motion";
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX: w, transformOrigin: "0 50%" }}
      className="fixed inset-x-0 top-0 z-[100] h-[2px] bg-gradient-to-r from-primary via-electric to-primary"
    />
  );
}
