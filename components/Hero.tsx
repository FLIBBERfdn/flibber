"use client";

import { motion } from "framer-motion";
import PhoneFrame from "./PhoneFrame";
import SlotScene from "./SlotScene";
import { useWaitlist } from "./WaitlistProvider";
import Link from "next/link";

// ── Update this URL once your dApp is deployed on Vercel ──────────
const DAPP_URL = "https://app.flibber.xyz";

export default function Hero() {
  const { open } = useWaitlist();

  return (
    <section className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col items-center justify-center gap-16 px-6 pt-28 sm:px-10 lg:flex-row lg:justify-between lg:gap-8 lg:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(184,190,200,0.08),transparent)]"
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl text-center lg:text-left"
      >
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-silver-dark">
          Flibber &middot; Slotting Mechanism
        </p>
        <h1 className="text-balance text-5xl font-medium leading-[1.05] tracking-tightest sm:text-6xl">
          <span className="silver-gradient-text bg-[length:200%_100%] animate-shimmer">
            Move value.
          </span>
          <br />
          <span className="text-platinum">Keep value.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-balance text-base leading-relaxed text-silver-dark lg:mx-0">
          Flibber&rsquo;s Slotting Mechanism powers deterministic value movement
          across cross-chain assets, fiat and digital markets.
        </p>
        <div className="mt-9 flex gap-4 justify-center lg:justify-start">
          {/* Primary — launches the dApp */}
          <a
            href={DAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-platinum px-7 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-black transition-transform hover:scale-[1.02]"
          >
            Launch App
          </a>
          {/* Secondary — opens waitlist */}
          <button
            onClick={open}
            className="rounded-full border border-silver-dark/30 px-7 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-silver-dark transition-transform hover:scale-[1.02]"
          >
            Join Waitlist
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <PhoneFrame>
          <SlotScene fromAsset="BNB" fromAmount="$1,000" toAsset="SOL" />
        </PhoneFrame>
      </motion.div>
    </section>
  );
}
