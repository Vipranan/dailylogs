"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const features = [
  {
    id: "study",
    title: "Study Mode",
    description:
      "Global training manuals, AI-driven assessments, smart flashcards with live streak tracking, and instructor sync.",
    inverted: false,
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    id: "preflight",
    title: "Pre-Flight Mode",
    description:
      "AI-powered ICAO/FAA flight planner with live weather, NOTAMs, weight & balance, and fuel visualization.",
    inverted: false,
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
  {
    id: "logbook",
    title: "Logbook Mode",
    description:
      "Automatic flight logging via XB70 sync. Hour tracking, currency management, worldwide certification.",
    inverted: false,
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      </svg>
    ),
  },
  {
    id: "ai",
    title: "Captain MAVERICK AI",
    description:
      "Adaptive learning, real-time flight briefing, cross-ecosystem sync, and live intelligence integration.",
    inverted: true,
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
      </svg>
    ),
  },
];

const staggerDelays = [0, 0.1, 0.2, 0.3];

export default function Features() {
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
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          FEATURES
        </motion.p>

        {/* H2 */}
        <motion.h2
          className="text-3xl md:text-4xl font-semibold text-white mb-12 md:mb-16"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
        >
          Everything a pilot needs. One platform.
        </motion.h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className={[
                "rounded-lg p-6 md:p-8 transition-all duration-300 cursor-default",
                feature.inverted
                  ? "hover:scale-[1.01]"
                  : "border border-white/10 hover:border-white/25 hover:scale-[1.01]",
              ].join(" ")}
              style={
                feature.inverted
                  ? { background: "#ffffff" }
                  : { background: "#0d0d0d" }
              }
              initial={{ opacity: 0, y: 24 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
              }
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: staggerDelays[index],
              }}
            >
              {/* Icon container */}
              <div
                className="w-8 h-8 rounded flex items-center justify-center"
                style={
                  feature.inverted
                    ? { background: "rgba(0,0,0,0.08)", color: "#000000" }
                    : { background: "rgba(255,255,255,0.08)", color: "#ffffff" }
                }
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3
                className="text-lg font-semibold mt-4 mb-2"
                style={{ color: feature.inverted ? "#000000" : "#ffffff" }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: feature.inverted
                    ? "rgba(0,0,0,0.5)"
                    : "rgba(255,255,255,0.5)",
                }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
