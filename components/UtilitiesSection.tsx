"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PhoneFrame from "./PhoneFrame";
import SlotScene from "./SlotScene";
import FiatScene from "./FiatScene";
import LaunchpadScene from "./LaunchpadScene";

const UTILITIES = [
  {
    key: "cross-chain",
    title: "Cross-chain trading",
    copy: "Slot in one asset and slot out another. The value you hold determines what you receive — never a traditional bridge, never a wrapped placeholder.",
    scene: <SlotScene fromAsset="BNB" fromAmount="$1,000" toAsset="SOL" />,
  },
  {
    key: "fiat",
    title: "Fiat hybrids",
    copy: "On-ramp from fiat into digital assets, or off-ramp back out. The same Slotting Mechanism settles both directions, across supported currencies.",
    scene: <FiatScene />,
  },
  {
    key: "launchpad",
    title: "NFT tiered launchpad",
    copy: "Collections enter review before admission. Traction — not deposits — moves a collection from the cold market into the hot market.",
    scene: <LaunchpadScene />,
  },
] as const;

export default function UtilitiesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idx = itemRefs.current.findIndex((el) => el === visible.target);
          if (idx !== -1) setActive(idx);
        }
      },
      { root: container, threshold: [0.5, 0.75] }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const el = itemRefs.current[index];
    const container = containerRef.current;
    if (!el || !container) return;
    container.scrollTo({ left: el.offsetLeft - container.offsetLeft, behavior: "smooth" });
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
      <div className="mb-10 flex items-end justify-between gap-6 sm:mb-14">
        <h2 className="max-w-md text-balance text-3xl font-medium tracking-tight text-platinum sm:text-4xl">
          Three utilities, one mechanism.
        </h2>
        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <button
            onClick={() => scrollToIndex(Math.max(active - 1, 0))}
            disabled={active === 0}
            aria-label="Previous utility"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-silver transition-colors hover:border-white/30 hover:text-platinum disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            onClick={() => scrollToIndex(Math.min(active + 1, UTILITIES.length - 1))}
            disabled={active === UTILITIES.length - 1}
            aria-label="Next utility"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-silver transition-colors hover:border-white/30 hover:text-platinum disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-8 lg:gap-10 [&::-webkit-scrollbar]:hidden"
      >
        {UTILITIES.map((u, i) => (
          <div
            key={u.key}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="flex w-[82vw] shrink-0 snap-center flex-col items-center text-center sm:w-[360px] lg:w-[320px]"
          >
            <PhoneFrame>{u.scene}</PhoneFrame>
            <h3 className="mb-3 mt-8 text-xl font-medium tracking-tight text-platinum sm:text-2xl">
              {u.title}
            </h3>
            <p className="max-w-xs text-balance text-sm leading-relaxed text-silver-dark">
              {u.copy}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-2">
        {UTILITIES.map((u, i) => (
          <button
            key={u.key}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to ${u.title}`}
            className="p-1.5"
          >
            <span
              className={`block h-1 rounded-full transition-all ${
                i === active ? "w-6 bg-silver-bright" : "w-1.5 bg-white/15"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
