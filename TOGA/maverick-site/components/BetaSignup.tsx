"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function BetaSignup() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="beta"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 border-t border-white/10"
      style={{ background: "#080808" }}
    >
      <motion.div
        className="max-w-xl mx-auto text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Eyebrow */}
        <p
          className="text-xs uppercase tracking-widest text-white/40 mb-4"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          JOIN THE BETA
        </p>

        {/* H2 */}
        <h2 className="text-3xl md:text-4xl font-semibold text-white">
          Join the mission.
        </h2>

        {/* Subhead */}
        <p className="text-base text-white/50 mt-4 mb-8">
          Be first in the cockpit. Beta launching 2026.
        </p>

        {/* Form or Thank-you */}
        {submitted ? (
          <p className="text-sm text-white/60">
            You&apos;re on the list. We&apos;ll be in touch.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-transparent border border-white/20 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/50"
            />
            <button
              type="submit"
              className="font-semibold text-sm px-6 py-3 rounded-sm hover:opacity-90 whitespace-nowrap transition-opacity duration-200"
              style={{ background: "#ffffff", color: "#000000" }}
            >
              Join →
            </button>
          </form>
        )}

        {/* Disclaimer */}
        <p
          className="text-xs text-white/30 mt-4"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          No spam. Mission-critical updates only.
        </p>
      </motion.div>
    </section>
  );
}
