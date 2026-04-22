"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const channels = [
  {
    name: "# general-squawk",
    members: "2,847 members",
    dotOpacity: "rgba(255,255,255,0.6)",
  },
  {
    name: "# study-pods",
    members: "1,203 members",
    dotOpacity: "rgba(255,255,255,0.3)",
  },
  {
    name: "# ops-squad",
    members: "891 members",
    dotOpacity: "rgba(255,255,255,0.2)",
  },
];

export default function Community() {
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
          COMMUNITY
        </motion.p>

        {/* H2 */}
        <motion.h2
          className="text-3xl md:text-4xl font-semibold text-white mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
        >
          Speak. Share. Squawk.
        </motion.h2>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — copy */}
          <motion.p
            className="text-base text-white/50 max-w-sm leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            Aviation is a discipline best learned together. Connect with student
            pilots, instructors, and aviators worldwide in channels built for
            the cockpit, not the classroom.
          </motion.p>

          {/* Right — channel list with perspective */}
          <div className="flex flex-col" style={{ perspective: "800px" }}>
            {channels.map((channel, i) => (
              <motion.div
                key={channel.name}
                className="flex flex-row items-center gap-3 py-4"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                initial={{ opacity: 0, x: 40, rotateY: -12 }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0, rotateY: 0 }
                    : { opacity: 0, x: 40, rotateY: -12 }
                }
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: 0.15 + i * 0.1,
                }}
              >
                {/* Status dot */}
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: channel.dotOpacity }}
                />
                {/* Channel name */}
                <span className="text-sm text-white font-medium flex-1">
                  {channel.name}
                </span>
                {/* Member count */}
                <span
                  className="text-xs text-white/30"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {channel.members}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
