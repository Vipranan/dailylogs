"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export default function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  const handleJoinBeta = () => {
    const el = document.getElementById("beta");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(8,8,8,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="flex flex-row items-center justify-between px-6 md:px-12 h-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="rounded-sm flex-shrink-0"
            style={{ width: 20, height: 20, background: "#ffffff" }}
          />
          <span
            className="text-sm uppercase tracking-widest text-white"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            TOGA
          </span>
        </div>

        {/* Center nav links — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-8">
          {["About", "XB70", "Skynet", "Careers"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.5)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#ffffff")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(255,255,255,0.5)")
              }
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Join Beta button */}
          <button
            onClick={handleJoinBeta}
            className="text-xs font-semibold px-4 py-2 rounded-sm tracking-wider transition-opacity duration-200 hover:opacity-80"
            style={{ background: "#ffffff", color: "#000000" }}
          >
            Join Beta
          </button>

          {/* Hamburger — visible on mobile only */}
          <button
            className="flex md:hidden flex-col gap-1.5 items-center justify-center"
            aria-label="Open menu"
          >
            <span
              className="block rounded-full"
              style={{
                width: 20,
                height: 1.5,
                background: "#ffffff",
              }}
            />
            <span
              className="block rounded-full"
              style={{
                width: 20,
                height: 1.5,
                background: "#ffffff",
              }}
            />
            <span
              className="block rounded-full"
              style={{
                width: 20,
                height: 1.5,
                background: "#ffffff",
              }}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
