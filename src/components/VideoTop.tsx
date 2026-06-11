"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2 } from "lucide-react";

export function VideoTop() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);

  // Autoplay muted on mount
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  // Pause when scrolled off-screen, resume when back
  useEffect(() => {
    const el = containerRef.current;
    const v = videoRef.current;
    if (!el || !v) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else if (!v.paused) v.pause();
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    if (!next) {
      v.volume = 1;
      v.play().catch(() => {});
    }
    setMuted(next);
  };

  return (
    <section className="relative overflow-hidden bg-dark1 pt-28 pb-0 md:pt-36">
      <div className="absolute inset-0 noise" />
      <div className="absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-gold/10 blur-[120px]" />
      <div className="absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-gold/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative mb-6 flex flex-col items-center text-center md:mb-10"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 backdrop-blur">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
            Watch the story
          </span>
        </div>
      </motion.div>

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-video w-full overflow-hidden bg-black"
      >
        <video
          ref={videoRef}
          src="/video/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Floating sound chip — only thing on the video */}
        <AnimatePresence>
          {muted && (
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.3 }}
              onClick={toggleMute}
              className="absolute right-4 top-4 z-20 flex items-center gap-2 rounded-full bg-gold/95 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-dark1 shadow-2xl backdrop-blur transition hover:bg-goldLight md:right-6 md:top-6 md:px-5 md:py-2.5 md:text-xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-dark1/40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-dark1" />
              </span>
              <Volume2 size={13} />
              Tap for sound
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
