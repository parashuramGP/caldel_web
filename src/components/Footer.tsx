"use client";

import { motion } from "framer-motion";
import { Instagram, Twitter, Mail } from "lucide-react";

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

        <div className="flex items-center gap-3">
          {[Instagram, Twitter, Mail].map((Icon, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ y: -3, scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-gold hover:text-gold"
            >
              <Icon size={15} />
            </motion.a>
          ))}
        </div>

        <div className="text-[11px] text-white/40">
          © {new Date().getFullYear()} CALDEL · Crafted in India
        </div>
      </div>
    </footer>
  );
}
