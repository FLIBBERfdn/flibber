"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";

type Stage = "idle" | "slot" | "matching" | "settling" | "received";

const STAGE_LABELS: Record<Stage, string> = {
  idle: "SLOTTING",
  slot: "SLOTTING",
  matching: "MATCHING",
  settling: "SETTLING",
  received: "RECEIVED",
};

const SEQUENCE: Stage[] = ["idle", "slot", "matching", "settling", "received"];

export default function SlotScene({
  fromAsset,
  fromAmount,
  toAsset,
}: {
  fromAsset: string;
  fromAmount: string;
  toAsset: string;
}) {
  const [index, setIndex] = useState(0);
  const stage = SEQUENCE[index];

  useEffect(() => {
    const holdTime = stage === "received" ? 2200 : stage === "idle" ? 1800 : 1100;
    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % SEQUENCE.length);
    }, holdTime);
    return () => clearTimeout(t);
  }, [stage]);

  return (
    <div className="flex h-full w-full flex-col justify-between bg-[#0A0A0A] px-5 pb-7 pt-11">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-silver-dark">
          {STAGE_LABELS[stage]}
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-silver" />
      </div>

      <div className="flex flex-1 flex-col justify-center gap-3">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-4">
          <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.18em] text-silver-dark">
            You have
          </p>
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-2xl font-medium text-platinum">
              {fromAmount}
            </span>
            <span className="text-sm text-silver">{fromAsset}</span>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <AnimatePresence mode="wait">
            {stage === "idle" ? (
              <motion.div
                key="arrow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-full border border-white/10 p-1.5"
              >
                <ArrowDown className="h-3.5 w-3.5 text-silver-dark" strokeWidth={1.5} />
              </motion.div>
            ) : (
              <motion.div
                key="pulse"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative flex h-7 w-7 items-center justify-center"
              >
                <motion.span
                  animate={{ rotate: stage === "matching" ? 360 : 0 }}
                  transition={{ duration: 1.1, ease: "linear", repeat: stage === "matching" ? Infinity : 0 }}
                  className="absolute h-full w-full rounded-full border border-silver/40 border-t-silver"
                />
                <span className="h-1.5 w-1.5 rounded-full bg-silver" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-4">
          <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.18em] text-silver-dark">
            {stage === "received" ? "Received" : "You want"}
          </p>
          <div className="flex items-baseline justify-between">
            <AnimatePresence mode="wait">
              <motion.span
                key={stage === "received" ? "amt-filled" : "amt-empty"}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="font-mono text-2xl font-medium text-platinum"
              >
                {stage === "received" ? fromAmount : "—"}
              </motion.span>
            </AnimatePresence>
            <span className="text-sm text-silver">{toAsset}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        tabIndex={-1}
        className="w-full rounded-full bg-platinum py-3 text-center font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-black"
      >
        {stage === "received" ? "Slotted" : "Slot"}
      </button>
    </div>
  );
}
