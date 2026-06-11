"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Timer, MapPin, Shirt, Sparkles, Zap, Package, Clock } from "lucide-react";
import { WaitlistForm } from "@/components/WaitlistForm";
import { CountdownClock } from "@/components/CountdownClock";
import { VideoTop } from "@/components/VideoTop";

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="relative">
      {/* ===== TOP VIDEO ===== */}
      <VideoTop />

      {/* ===== HERO COPY (immediately below video) ===== */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-dark1 pt-12 md:pt-16"
      >
        {/* Decorative bg restored */}
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="aurora absolute -left-1/4 top-0 h-[700px] w-[700px] rounded-full bg-gold/15 blur-[140px]" />
        <div
          className="aurora absolute -right-1/4 bottom-0 h-[700px] w-[700px] rounded-full bg-gold/10 blur-[150px]"
          style={{ animationDelay: "-9s" }}
        />
        <div className="absolute inset-0 noise" />

        <motion.div
          style={{ y: titleY, opacity }}
          className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 text-center md:px-10 md:pb-32"
        >
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
            id="waitlist"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.7 }}
            className="mt-14 flex w-full flex-col items-center gap-4"
          >
            <WaitlistForm />
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[10px] uppercase tracking-[0.3em] text-white/40"
          >
            <span className="flex items-center gap-2">
              <span className="h-px w-6 bg-white/20" /> Bangalore
            </span>
            <span className="flex items-center gap-2">
              <span className="h-px w-6 bg-white/20" /> Mumbai
            </span>
            <span className="flex items-center gap-2">
              <span className="h-px w-6 bg-white/20" /> Delhi
            </span>
            <span className="flex items-center gap-2">
              <span className="h-px w-6 bg-white/20" /> Hyderabad
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="relative overflow-hidden border-t border-white/5 bg-dark2 py-24 md:py-40">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
              <span className="h-px w-8 bg-gold" /> How it works
              <span className="h-px w-8 bg-gold" />
            </div>
            <h2 className="font-display text-4xl leading-tight md:text-6xl">
              From browse to bag.
              <br />
              <span className="italic text-white/40">Sixty minutes flat.</span>
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3 md:gap-6">
            {[
              {
                icon: Shirt,
                step: "01",
                title: "Pick your piece",
                copy: "Browse curated drops from luxury houses and emerging ateliers — all stocked in your city.",
              },
              {
                icon: Zap,
                step: "02",
                title: "We dispatch instantly",
                copy: "The moment you order, our hyperlocal rider is matched. No warehouses, no shipping — just speed.",
              },
              {
                icon: Package,
                step: "03",
                title: "60 minutes. Done.",
                copy: "Door delivery in under an hour. Try it on. Keep what you love, return the rest — same rider.",
              },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                className="group relative rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition hover:border-gold/40 hover:bg-white/[0.04]"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15 text-gold transition group-hover:rotate-6 group-hover:bg-gold group-hover:text-dark1">
                    <s.icon size={22} />
                  </div>
                  <span className="font-display text-5xl text-white/10">{s.step}</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl">{s.title}</h3>
                <p className="mt-3 text-sm text-white/55 md:text-base">{s.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 60 MIN HERO STRIP ===== */}
      <section className="relative overflow-hidden bg-dark1 py-24 md:py-32">
        <div className="absolute inset-0 noise" />
        <div className="absolute -top-40 left-1/2 h-96 w-[600px] -translate-x-1/2 rounded-full bg-gold/15 blur-[120px]" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 text-center md:px-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="font-display text-[28vw] font-light leading-none tracking-tighter md:text-[16rem]">
              <span className="bg-gradient-to-b from-white via-white to-white/20 bg-clip-text text-transparent">
                60
              </span>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-6 py-2 text-xs font-bold uppercase tracking-[0.3em] text-dark1 md:px-8 md:py-3 md:text-sm"
            >
              Minute Delivery
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-20 max-w-2xl text-balance text-lg text-white/60 md:text-xl"
          >
            We rebuilt fashion delivery from the ground up. Hyperlocal hubs.
            Real-time dispatch. Premium pieces moving at quick-commerce speed.
          </motion.p>

          <div className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] md:grid-cols-4">
            {[
              { val: "60", suf: "min", lbl: "Door delivery" },
              { val: "200+", suf: "", lbl: "Curated brands" },
              { val: "4", suf: "cities", lbl: "At launch" },
              { val: "24/7", suf: "", lbl: "Try & return" },
            ].map((s, i) => (
              <motion.div
                key={s.lbl}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-dark1 px-6 py-8 text-left"
              >
                <div className="font-display text-4xl md:text-5xl">
                  {s.val}
                  {s.suf && <span className="text-xl text-gold md:text-2xl"> {s.suf}</span>}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-white/40">
                  {s.lbl}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CALDEL ===== */}
      <section className="relative overflow-hidden border-t border-white/5 bg-dark2 py-24 md:py-32">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 max-w-2xl"
          >
            <div className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
              <span className="h-px w-8 bg-gold" /> Why CALDEL
            </div>
            <h2 className="font-display text-4xl leading-tight md:text-6xl">
              Built for the way you
              <br />
              <span className="italic text-gold">actually shop.</span>
            </h2>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Timer,
                title: "Hyperlocal speed",
                copy: "Riders from dark stores near you. Not warehouses across the country.",
              },
              {
                icon: Sparkles,
                title: "Curated only",
                copy: "Every brand vetted by our atelier team. No knock-offs, no noise.",
              },
              {
                icon: Clock,
                title: "Try at home",
                copy: "Same rider waits while you try on. Keep what fits, send back the rest.",
              },
              {
                icon: MapPin,
                title: "City-first launch",
                copy: "We start with four metros and grow neighbourhood by neighbourhood.",
              },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                whileHover={{ y: -6 }}
                className="group rounded-3xl border border-white/10 bg-white/[0.02] p-7 transition hover:border-gold/40"
              >
                <s.icon
                  size={20}
                  className="text-gold transition group-hover:scale-110"
                />
                <h3 className="mt-5 font-display text-xl md:text-2xl">{s.title}</h3>
                <p className="mt-2 text-sm text-white/55">{s.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative overflow-hidden border-t border-white/5 bg-dark1 py-28 md:py-40">
        <div className="absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-gold/15 blur-[140px]" />
        <div className="absolute inset-0 noise" />

        <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
              <span className="h-1.5 w-1.5 animate-pulseGold rounded-full bg-gold" />
              Early access — invite only
            </div>
            <h2 className="font-display text-5xl leading-tight text-balance md:text-7xl">
              First 1,000 members get
              <br />
              <span className="italic text-gold">free delivery for life.</span>
            </h2>
            <p className="mt-6 text-base text-white/60 md:text-lg">
              Drop your email or phone. We'll reach out the day CALDEL opens in your city.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-12 flex justify-center"
          >
            <WaitlistForm />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
