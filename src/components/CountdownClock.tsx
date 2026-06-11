"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function getRemaining() {
  if (typeof window === "undefined") return { mm: "60", ss: "00" };
  const total = 60 * 60 * 1000;
  const now = Date.now();
  const ms = total - (now % total);
  const mm = Math.floor(ms / 60000);
  const ss = Math.floor((ms % 60000) / 1000);
  return {
    mm: String(mm).padStart(2, "0"),
    ss: String(ss).padStart(2, "0"),
  };
}

export function CountdownClock() {
  const [t, setT] = useState({ mm: "60", ss: "00" });
  useEffect(() => {
    setT(getRemaining());
    const id = setInterval(() => setT(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 backdrop-blur">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
      </span>
      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">
        Delivering in
      </span>
      <span className="flex items-baseline gap-1 font-display text-xl tabular-nums">
        <Digit value={t.mm} />
        <span className="text-gold">:</span>
        <Digit value={t.ss} />
      </span>
      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">min</span>
    </div>
  );
}

function Digit({ value }: { value: string }) {
  return (
    <motion.span
      key={value}
      initial={{ y: -6, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="inline-block min-w-[1.4em] text-center"
    >
      {value}
    </motion.span>
  );
}
