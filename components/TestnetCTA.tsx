"use client";

import { motion } from "framer-motion";
import { useWaitlist } from "./WaitlistProvider";

export default function TestnetCTA() {
  const { open } = useWaitlist();

  return (
    <section id="testnet" className="mx-auto max-w-3xl px-6 py-28 text-center sm:px-10 sm:py-40">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-silver-dark"
      >
        Flibber Testnet
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="silver-gradient-text bg-[length:200%_100%] animate-shimmer text-4xl font-medium tracking-tight sm:text-5xl"
      >
        Coming soon.
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <button
          id="waitlist"
          onClick={open}
          className="mt-10 rounded-full bg-platinum px-8 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-black transition-transform hover:scale-[1.02]"
        >
          Join waitlist
        </button>
      </motion.div>
    </section>
  );
}
