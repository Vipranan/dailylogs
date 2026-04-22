"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import EcosystemScene from "@/components/EcosystemScene";

const bullets = [
  "Auto-sync flight data from XB70 directly to your logbook",
  "AI briefings powered by Skynet real-time intelligence",
  "One profile. Every platform. Zero friction.",
];

export default function Ecosystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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

        {/* 3D Ecosystem Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          style={{ width: "100%", marginBottom: "48px" }}
        >
          <EcosystemScene />
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
