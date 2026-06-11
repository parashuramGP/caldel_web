"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { cn } from "@/lib/cn";

export function VideoTop() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // Autoplay muted on mount
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, []);

  // Pause when scrolled off-screen, resume when back
  useEffect(() => {
    const el = containerRef.current;
    const v = videoRef.current;
    if (!el || !v) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().then(() => setPlaying(true)).catch(() => {});
        } else if (!v.paused) {
          v.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

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

  const goFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
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
        className="group relative aspect-video w-full overflow-hidden bg-black"
      >
          <video
            ref={videoRef}
            src="/video/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onTimeUpdate={(e) => {
              const v = e.currentTarget;
              if (v.duration) setProgress((v.currentTime / v.duration) * 100);
            }}
            onClick={togglePlay}
            className="absolute inset-0 h-full w-full cursor-pointer object-cover"
          />

          {/* Floating sound chip — always visible when muted */}
          <AnimatePresence>
            {muted && (
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.3 }}
                onClick={toggleMute}
                className="group/sound absolute right-4 top-4 z-20 flex items-center gap-2 rounded-full bg-gold/95 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-dark1 shadow-2xl backdrop-blur transition hover:bg-goldLight md:right-6 md:top-6 md:px-5 md:py-2.5 md:text-xs"
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

          {/* Bottom control bar — hover desktop, always mobile */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent pb-4 pt-12 opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
            <div className="pointer-events-auto mx-4 mb-3 h-1 overflow-hidden rounded-full bg-white/20 md:mx-6">
              <div
                className="h-full bg-gold transition-[width] duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="pointer-events-auto flex items-center justify-between px-4 md:px-6">
              <div className="flex items-center gap-2">
                <CtrlBtn onClick={togglePlay} label={playing ? "Pause" : "Play"}>
                  {playing ? <Pause size={15} /> : <Play size={15} className="ml-0.5 fill-white" />}
                </CtrlBtn>
                <CtrlBtn onClick={toggleMute} label={muted ? "Unmute" : "Mute"}>
                  {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </CtrlBtn>
              </div>
              <CtrlBtn onClick={goFullscreen} label="Fullscreen">
                <Maximize2 size={14} />
              </CtrlBtn>
            </div>
          </div>
      </motion.div>
    </section>
  );
}

function CtrlBtn({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition",
        "hover:bg-gold hover:text-dark1"
      )}
    >
      {children}
    </button>
  );
}
