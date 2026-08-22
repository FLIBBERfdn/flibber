"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const STEPS = [
  { key: "create", label: "Create collection" },
  { key: "review", label: "Review" },
  { key: "admission", label: "Market admission" },
  { key: "cold", label: "Cold market" },
  { key: "traction", label: "Traction" },
  { key: "hot", label: "Hot market" },
] as const;

export default function LaunchpadScene() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      setActive((i) => (i + 1) % STEPS.length);
    }, 1300);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="flex h-full w-full flex-col bg-[#0A0A0A] px-5 pb-7 pt-11">
      <div className="mb-5 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-silver-dark">
          Admission status
        </span>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-4">
        <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.18em] text-silver-dark">
          Collection
        </p>
        <p className="text-sm text-platinum">Untitled Genesis</p>
      </div>

      <div className="mt-6 flex flex-1 flex-col justify-center gap-0">
        {STEPS.map((step, i) => {
          const done = i < active;
          const current = i === active;
          return (
            <div key={step.key} className="flex items-start gap-3 pb-4 last:pb-0">
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{
                    scale: current ? 1.15 : 1,
                    backgroundColor: done || current ? "#B8BEC8" : "rgba(255,255,255,0.06)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex h-4 w-4 items-center justify-center rounded-full"
                >
                  {done && <Check className="h-2.5 w-2.5 text-black" strokeWidth={3} />}
                </motion.div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`mt-1 h-4 w-px ${
                      done ? "bg-silver/50" : "bg-white/[0.06]"
                    }`}
                  />
                )}
              </div>
              <span
                className={`pt-[1px] font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${
                  current ? "text-platinum" : done ? "text-silver" : "text-silver-dark"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="rounded-full border border-white/10 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-silver-dark"
        >
          {active === STEPS.length - 1 ? "Review complete" : STEPS[active].label}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
