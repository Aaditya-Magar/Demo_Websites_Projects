import { motion, useScroll, useSpring } from "framer-motion";

export function CursorAndProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-gold origin-left z-[100]"
    />
  );
}
