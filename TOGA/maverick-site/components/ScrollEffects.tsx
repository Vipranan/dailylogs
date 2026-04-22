"use client";

import { useScroll, useTransform, motion } from "framer-motion";

export default function ScrollEffects({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "2px",
          background: "white",
          zIndex: 100,
          scaleX,
          transformOrigin: "left",
          width: "100%",
        }}
      />
      {children}
    </>
  );
}
