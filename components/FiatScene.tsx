"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CURRENCIES = ["USD", "GBP", "NGN", "GHS", "CAD"];

export default function FiatScene() {
  const [onRamp, setOnRamp] = useState(true);
  const [currencyIndex, setCurrencyIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrencyIndex((i) => {
        const next = (i + 1) % CURRENCIES.length;
        if (next === 0) setOnRamp((o) => !o);
        return next;
      });
    }, 1800);
    return () => clearInterval(t);
  }, []);

  const currency = CURRENCIES[currencyIndex];

  return (
    <div className="flex h-full w-full flex-col bg-[#0A0A0A] px-5 pb-7 pt-11">
      <div className="mb-6 flex rounded-full border border-white/[0.06] bg-white/[0.02] p-1">
        <div className="relative flex w-full">
          <motion.div
            className="absolute inset-y-0 w-1/2 rounded-full bg-platinum"
            animate={{ x: onRamp ? "0%" : "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <span
            className={`relative z-10 flex-1 py-2 text-center font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
              onRamp ? "text-black" : "text-silver-dark"
            }`}
          >
            On-ramp
          </span>
          <span
            className={`relative z-10 flex-1 py-2 text-center font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
              !onRamp ? "text-black" : "text-silver-dark"
            }`}
          >
            Off-ramp
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-3">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-4">
          <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.18em] text-silver-dark">
            {onRamp ? "Deposit" : "You send"}
          </p>
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-2xl font-medium text-platinum">$1,000</span>
            <span className="text-sm text-silver">{onRamp ? currency : "TON"}</span>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="h-6 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-4">
          <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.18em] text-silver-dark">
            {onRamp ? "Receive" : "Destination"}
          </p>
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-2xl font-medium text-platinum">$1,000</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={onRamp ? "eth" : currency}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-sm text-silver"
              >
                {onRamp ? "ETH" : currency}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5">
        {CURRENCIES.map((c, i) => (
          <span
            key={c}
            className={`h-1 w-1 rounded-full transition-colors ${
              i === currencyIndex ? "bg-silver" : "bg-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
