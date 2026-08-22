"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useWaitlist } from "./WaitlistProvider";

// ── Update this URL once your dApp is deployed ────────────────────
const DAPP_URL = "https://app.flibber.xyz";

const links = [
  { label: "Documentation", href: "/docs" },
  { label: "Community",     href: "https://t.me/flibber_xyz" },
  { label: "Waitlist",      href: "#waitlist", action: "waitlist" as const },
  { label: "Contact",       href: "mailto:flibberfdn@gmail.com" },
];

export default function Nav() {
  const { open } = useWaitlist();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-white/[0.06] bg-black/60 px-6 backdrop-blur-md sm:px-10">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2" aria-label="Flibber home">
        <Image src="/logo.png" alt="Flibber" width={28} height={28} className="rounded-lg" />
        <span className="font-mono text-sm font-medium tracking-wide text-platinum">FLIBBER</span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden items-center gap-6 md:flex">
        {links.map(link =>
          link.action === "waitlist" ? (
            <button
              key={link.label}
              onClick={open}
              className="font-mono text-[11px] uppercase tracking-[0.15em] text-silver-dark transition-colors hover:text-platinum"
            >
              {link.label}
            </button>
          ) : (
            <Link
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="font-mono text-[11px] uppercase tracking-[0.15em] text-silver-dark transition-colors hover:text-platinum"
            >
              {link.label}
            </Link>
          )
        )}
      </nav>

      {/* Launch App button */}
      <a
        href={DAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-platinum px-5 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-black transition-transform hover:scale-[1.02]"
      >
        Launch App
      </a>
    </header>
  );
}
