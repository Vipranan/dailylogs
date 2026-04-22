"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const bullets = [
  "Auto-sync flight data from XB70 directly to your logbook",
  "AI briefings powered by Skynet real-time intelligence",
  "One profile. Every platform. Zero friction.",
];

function ConnectingLine({ direction = "right" }: { direction?: "right" | "left" }) {
  return (
    <div className="flex-1 relative flex items-center" style={{ height: "2px" }}>
      <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.2)" }} />
      {/* Animated traveling dot */}
      <motion.div
        className="absolute w-2 h-2 rounded-full"
        style={{
          background: "#ffffff",
          top: "50%",
          translateY: "-50%",
          left: 0,
        }}
        animate={{ x: direction === "right" ? ["0%", "100%"] : ["100%", "0%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export default function Ecosystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Scroll-linked diagram tilt
  const diagramRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-8, 0, 8]);
  const diagramRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [6, 0, -4]);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 md:px-12"
      style={{ background: "#080808" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          className="text-xs uppercase tracking-widest text-white/40 mb-4"
          style={{ fontFamily: "var(--font-geist-mono)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          ECOSYSTEM
        </motion.p>

        {/* H2 */}
        <motion.h2
          className="text-3xl md:text-4xl font-semibold text-white mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
        >
          Built to connect.
        </motion.h2>

        {/* Connected Diagram — scroll-linked tilt wrapper */}
        <motion.div
          className="flex flex-row items-center justify-center mb-16 max-w-2xl mx-auto"
          style={{
            rotateY: diagramRotateY,
            rotateX: diagramRotateX,
            transformPerspective: 1200,
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
          {/* XB70 Node */}
          <motion.div
            className="flex flex-col items-center gap-3"
            whileHover={{ scale: 1.1, rotateY: 15 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center"
              style={{ background: "transparent" }}
            />
            <span
              className="text-xs tracking-widest text-white/60"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              XB70
            </span>
          </motion.div>

          {/* Line XB70 → TOGA */}
          <ConnectingLine direction="right" />

          {/* TOGA Node (hero / center) */}
          <motion.div
            className="flex flex-col items-center gap-3"
            whileHover={{ scale: 1.05, rotateY: -10 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: "#ffffff", border: "2px solid #ffffff" }}
            />
            <span
              className="text-xs tracking-widest text-black font-semibold"
              style={{ fontFamily: "var(--font-geist-mono)", color: "#ffffff" }}
            >
              TOGA
            </span>
          </motion.div>

          {/* Line TOGA → SKYNET */}
          <ConnectingLine direction="right" />

          {/* SKYNET Node */}
          <motion.div
            className="flex flex-col items-center gap-3"
            whileHover={{ scale: 1.1, rotateY: 15 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center"
              style={{ background: "transparent" }}
            />
            <span
              className="text-xs tracking-widest text-white/60"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              SKYNET
            </span>
          </motion.div>
        </motion.div>

        {/* Bullet Points */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 sm:gap-10 justify-center"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
        >
          {bullets.map((bullet, i) => (
            <div key={i} className="flex items-start gap-2">
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "#ffffff" }}
              />
              <p className="text-sm text-white/50 leading-relaxed max-w-[220px]">
                {bullet}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
