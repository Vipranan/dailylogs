"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PhoneModel from "@/components/PhoneModel";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Left text column transforms
  const textOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textRotateX = useTransform(scrollYProgress, [0, 1], [0, 8]);

  // Right phone column transforms
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const phoneOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section
      ref={heroRef}
      className="min-h-screen pt-16 lg:pt-20 flex items-center"
      style={{ background: "#080808", perspective: "1000px" }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column — Text Content */}
          <motion.div
            className="flex flex-col gap-6"
            style={{
              opacity: textOpacity,
              y: textY,
              rotateX: textRotateX,
              transformPerspective: 800,
            }}
          >
            {/* Eyebrow */}
            <motion.p
              className="text-xs uppercase tracking-widest text-white/40"
              style={{ fontFamily: "var(--font-geist-mono)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              AI CO-PILOT · BETA 2026
            </motion.p>

            {/* H1 */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              Your AI Co&#8209;Pilot. Anytime, Anywhere.
            </motion.h1>

            {/* Subhead */}
            <motion.p
              className="text-base md:text-lg text-white/50 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              Discipline. Passion. Precision. — Master the skies with
              AI-driven training built for the modern aviator.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-row flex-wrap gap-3 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            >
              {/* Primary CTA */}
              <button
                className="font-semibold text-sm px-6 py-3 rounded-sm tracking-wide transition-opacity duration-200 hover:opacity-90"
                style={{ background: "#ffffff", color: "#000000" }}
              >
                Join the Beta →
              </button>

              {/* Secondary CTA */}
              <button
                className="text-sm px-6 py-3 rounded-sm transition-colors duration-200 hover:border-white/60"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#ffffff",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.borderColor =
                    "rgba(255,255,255,0.6)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.borderColor =
                    "rgba(255,255,255,0.3)")
                }
              >
                Learn More
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column — 3D Phone */}
          <motion.div
            className="flex justify-center lg:justify-end items-center lg:h-auto h-[420px]"
            style={{
              y: phoneY,
              opacity: phoneOpacity,
              position: "relative",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          >
            {/* Floating glowing orb behind phone */}
            <motion.div
              style={{
                position: "absolute",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.03), transparent 70%)",
                filter: "blur(40px)",
                zIndex: 0,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <div
              className="flex flex-col items-center justify-center h-full"
              style={{ position: "relative", zIndex: 1 }}
            >
              <div style={{ width: "100%", height: "520px" }}>
                <PhoneModel />
              </div>
              <p
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "10px",
                  letterSpacing: "3px",
                  color: "rgba(255,255,255,0.25)",
                  textTransform: "uppercase",
                  marginTop: "16px",
                }}
              >
                Drag to rotate
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
