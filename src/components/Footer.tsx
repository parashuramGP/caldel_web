"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/caldel.blr?igsh=M2d6eTcyaWJkdGVo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-dark1 text-white">
      <div className="absolute inset-0 noise" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-12 md:flex-row md:justify-between md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-dark1 text-xs font-bold">
            C
          </div>
          <span className="tracking-[0.4em] text-sm font-bold">CALDEL</span>
        </motion.div>

        <motion.a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow CALDEL on Instagram"
          whileHover={{ y: -3, scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-white/70 transition hover:border-gold hover:bg-gold hover:text-dark1"
        >
          <Instagram size={15} />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em]">
            @caldel.blr
          </span>
        </motion.a>

        <div className="text-[11px] text-white/40">
          © {new Date().getFullYear()} CALDEL · Crafted in India
        </div>
      </div>
    </footer>
  );
}
