"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PAIRS = [
  { from: "BNB", to: "SOL" },
  { from: "USD", to: "ETH" },
  { from: "TON", to: "NGN" },
];

export default function SlottingMechanism() {
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<"enter" | "match" | "exit">("enter");

  useEffect(() => {
    const durations = { enter: 1100, match: 900, exit: 1400 };
    const t = setTimeout(() => {
      if (phase === "enter") setPhase("match");
      else if (phase === "match") setPhase("exit");
      else {
        setPhase("enter");
        setI((p) => (p + 1) % PAIRS.length);
      }
    }, durations[phase]);
    return () => clearTimeout(t);
  }, [phase]);

  const pair = PAIRS[i];

  return (
    <section className="mx-auto max-w-3xl px-6 py-28 text-center sm:px-10 sm:py-36">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-silver-dark"
      >
        The Slotting Mechanism
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="text-balance text-3xl font-medium leading-snug tracking-tight text-platinum sm:text-4xl"
      >
        Flibber matches what enters the system with the value a user wants out.
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="relative mx-auto mt-20 flex h-40 w-40 items-center justify-center"
      >
        <div
          aria-hidden
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(184,190,200,0.14),transparent_70%)] blur-xl"
        />
        <motion.div
          animate={{
            rotate: phase === "match" ? 360 : 0,
            scale: phase === "match" ? 1.06 : 1,
          }}
          transition={{ duration: phase === "match" ? 0.9 : 0.4, ease: phase === "match" ? "linear" : "easeOut" }}
          className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent"
        >
          <AnimatePresence mode="wait">
            {phase !== "match" ? (
              <motion.span
                key={phase === "enter" ? `in-${pair.from}` : `out-${pair.to}`}
                initial={{ opacity: 0, y: phase === "enter" ? -16 : 0, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: phase === "enter" ? 0 : 16, scale: 0.85 }}
                transition={{ duration: 0.45 }}
                className="font-mono text-sm tracking-[0.1em] text-platinum"
              >
                {phase === "enter" ? pair.from : pair.to}
              </motion.span>
            ) : (
              <motion.span
                key="match"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-2 w-2 rounded-full bg-silver-bright"
              />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-silver-dark">
        {phase === "enter" && "Value enters"}
        {phase === "match" && "Matching"}
        {phase === "exit" && "Value exits"}
      </p>
    </section>
  );
}
