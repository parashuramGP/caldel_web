"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "already" | "error";

export function WaitlistForm() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || status === "loading") return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: value }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Try again.");
        return;
      }
      setStatus(data.already ? "already" : "success");
      setValue("");
    } catch {
      setStatus("error");
      setMessage("Network error. Check your connection.");
    }
  };

  return (
    <div className="w-full max-w-xl">
      <form
        onSubmit={submit}
        className="group relative flex items-center gap-2 rounded-full border border-white/20 bg-white/5 p-2 backdrop-blur transition focus-within:border-gold/60 focus-within:bg-white/[0.08] focus-within:shadow-[0_0_60px_-10px_rgba(201,168,76,0.5)]"
      >
        <input
          type="text"
          inputMode="email"
          autoComplete="email"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (status !== "idle" && status !== "loading") setStatus("idle");
          }}
          placeholder="Email or phone number"
          className="flex-1 bg-transparent px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none md:text-base"
          disabled={status === "loading"}
        />
        <button
          type="submit"
          disabled={status === "loading" || !value.trim()}
          className="group/btn relative flex items-center gap-2 overflow-hidden rounded-full bg-gold px-5 py-3 text-xs font-bold uppercase tracking-widest text-dark1 transition hover:bg-goldLight disabled:opacity-60 md:px-7 md:text-sm"
        >
          <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover/btn:translate-x-full" />
          <AnimatePresence mode="wait">
            {status === "loading" ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="relative flex items-center gap-2"
              >
                <Loader2 size={14} className="animate-spin" />
                <span className="hidden md:inline">Joining</span>
              </motion.span>
            ) : status === "success" || status === "already" ? (
              <motion.span
                key="ok"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="relative flex items-center gap-2"
              >
                <Check size={14} />
                <span className="hidden md:inline">Done</span>
              </motion.span>
            ) : (
              <motion.span
                key="cta"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="relative flex items-center gap-2"
              >
                <span>Join Waitlist</span>
                <ArrowRight size={14} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </form>

      <div className="min-h-[28px] pl-5 pt-3 text-xs">
        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.p
              key="s"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center gap-2 text-gold"
            >
              <span className="h-1.5 w-1.5 animate-pulseGold rounded-full bg-gold" />
              You're on the list. We'll be in touch when CALDEL goes live in your city.
            </motion.p>
          )}
          {status === "already" && (
            <motion.p
              key="a"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="text-white/60"
            >
              You're already on the waitlist — sit tight.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              key="e"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="text-red-300"
            >
              {message}
            </motion.p>
          )}
          {status === "idle" && (
            <motion.p
              key="i"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-white/40"
            >
              No spam. Just a single message when we launch in your city.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
