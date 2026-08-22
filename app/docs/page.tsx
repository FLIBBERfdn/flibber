import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Flibber documentation.",
};

export default function Docs() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-6 sm:px-10">
      <Link href="/" className="mb-8 font-mono text-[10px] uppercase tracking-[0.14em] text-silver-dark">
        &larr; Flibber
      </Link>
      <h1 className="mb-4 text-3xl font-medium tracking-tight text-platinum">Documentation</h1>
      <p className="max-w-md leading-relaxed text-silver-dark">
        Full technical documentation for the Slotting Mechanism, testnet, and integrations is
        being finalized alongside the testnet launch. Join the waitlist to be notified when it
        goes live.
      </p>
    </main>
  );
}
