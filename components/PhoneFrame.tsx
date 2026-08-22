"use client";

import { ReactNode } from "react";

export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[300px]">
      <div className="relative rounded-[42px] bg-gradient-to-b from-[#1a1b1d] to-[#0a0a0a] p-[10px] shadow-phone">
        <div className="absolute left-1/2 top-[10px] z-10 h-[22px] w-[110px] -translate-x-1/2 rounded-full bg-[#050505]" />
        <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[32px] bg-[#0A0A0A] ring-1 ring-white/5">
          {children}
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -bottom-10 h-24 bg-[radial-gradient(ellipse_at_center,rgba(184,190,200,0.18),transparent_70%)] blur-2xl"
      />
    </div>
  );
}
