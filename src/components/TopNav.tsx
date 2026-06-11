"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: scrolled ? "rgba(10,10,10,0.65)" : "rgba(10,10,10,0)",
        borderColor: scrolled ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0)",
      }}
      transition={{ duration: 0.35 }}
      className={cn(
        "glass fixed inset-x-0 top-0 z-50 border-b",
        scrolled ? "backdrop-blur-xl" : ""
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-dark1"
          >
            <span className="text-sm font-bold">C</span>
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ letterSpacing: "0.35em" }}
            className="select-none font-display text-xl font-light tracking-[0.22em] text-white md:text-2xl"
          >
            CALDEL
          </motion.span>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 md:flex"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
            Launching soon
          </span>
        </motion.div>

        <motion.a
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          href="#waitlist"
          className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-dark1 transition hover:bg-gold md:px-5"
        >
          Get Early Access
        </motion.a>
      </div>
    </motion.header>
  );
}
