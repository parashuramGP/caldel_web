"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { WaitlistForm } from "@/components/WaitlistForm";
import { CountdownClock } from "@/components/CountdownClock";
import { VideoTop } from "@/components/VideoTop";

export default function LandingPage() {
  return (
    <div className="relative">
      {/* ===== TOP VIDEO ===== */}
      <VideoTop />

      {/* ===== HERO COPY ===== */}
      <section
        id="waitlist"
        className="relative scroll-mt-24 overflow-hidden bg-dark1 pt-12 md:pt-16"
      >
        {/* Decorative bg */}
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="aurora absolute -left-1/4 top-0 h-[700px] w-[700px] rounded-full bg-gold/15 blur-[140px]" />
        <div
          className="aurora absolute -right-1/4 bottom-0 h-[700px] w-[700px] rounded-full bg-gold/10 blur-[150px]"
          style={{ animationDelay: "-9s" }}
        />
        <div className="absolute inset-0 noise" />

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 text-center md:px-10 md:pb-32">
          {/* Countdown chip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-10"
          >
            <CountdownClock />
          </motion.div>

          {/* Title */}
          <h1 className="font-display text-[14vw] font-light leading-[0.92] tracking-tight text-balance md:text-[8rem]">
            <span className="block">
              {"Fashion,".split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    delay: 0.4 + i * 0.05,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {ch}
                </motion.span>
              ))}
            </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="block bg-gradient-to-r from-goldLight via-gold to-goldLight bg-clip-text font-display italic text-transparent"
            >
              in 60 minutes.
            </motion.span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="mt-10 max-w-2xl text-base text-white/60 md:text-xl"
          >
            India's first hyperlocal fashion delivery. Curated drops from boutique houses,
            at your door before your coffee goes cold.
          </motion.p>

          {/* Waitlist form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.7 }}
            className="mt-14 flex w-full flex-col items-center gap-4"
          >
            <WaitlistForm />
          </motion.div>

          {/* Launch city */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="mt-16 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 backdrop-blur"
          >
            <MapPin size={13} className="text-gold" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
              Launching in Bangalore
            </span>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
