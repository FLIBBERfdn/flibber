"use client";

import { useState, useRef, useEffect, KeyboardEvent, RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Copy, ExternalLink, Check } from "lucide-react";

type WaitlistFormData = {
  name: string;
  email: string;
  evmAddress: string;
  xUsername: string;
  telegram: string;
  discord: string;
  xPostLink: string;
};

const EMPTY: WaitlistFormData = {
  name: "",
  email: "",
  evmAddress: "",
  xUsername: "",
  telegram: "",
  discord: "",
  xPostLink: "",
};

const SUGGESTED_POST =
  "I just joined the @flibber_xyz waitlist. Move value. Never lose it. flibber.xyz";

type Status = "idle" | "submitting" | "success" | "error";

export default function Waitlist({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WaitlistFormData>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const steps = [
    "name",
    "email",
    "evmAddress",
    "xUsername",
    "telegram",
    "discord",
    "xPost",
    "review",
  ] as const;

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setData(EMPTY);
      setStatus("idle");
    }
  }, [isOpen]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [step]);

  const current = steps[step];

  const canAdvance = (): boolean => {
    switch (current) {
      case "name":
        return data.name.trim().length > 0;
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
      case "evmAddress":
        return /^0x[a-fA-F0-9]{40}$/.test(data.evmAddress.trim());
      case "xUsername":
        return data.xUsername.trim().length > 0;
      case "telegram":
        return data.telegram.trim().length > 0;
      case "discord":
        return data.discord.trim().length > 0;
      case "xPost":
        return data.xPostLink.trim().length > 0;
      default:
        return true;
    }
  };

  const next = () => {
    if (!canAdvance()) return;
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const copyPost = async () => {
    try {
      await navigator.clipboard.writeText(SUGGESTED_POST);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — no-op
    }
  };

  const submit = async () => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && current !== "review") {
      e.preventDefault();
      next();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full flex-col bg-soft-black sm:w-[420px] sm:border-l sm:border-white/[0.06]"
          >
            <div className="flex items-center justify-between px-6 py-6 sm:px-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-silver-dark">
                Join waitlist
              </span>
              <button
                onClick={onClose}
                aria-label="Close waitlist"
                className="rounded-full p-1.5 text-silver-dark transition-colors hover:text-platinum"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex flex-1 flex-col justify-center px-6 sm:px-8" onKeyDown={handleKeyDown}>
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-4 text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-platinum">
                    <Check className="h-5 w-5 text-black" strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-medium tracking-tight text-platinum">
                    You&rsquo;re on the list.
                  </h3>
                  <p className="max-w-[280px] text-sm text-silver-dark">
                    We&rsquo;ll reach out as testnet access opens.
                  </p>
                </motion.div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {current === "name" && (
                      <Field
                        label="What should we call you?"
                        value={data.name}
                        onChange={(v) => setData({ ...data, name: v })}
                        placeholder="Name or alias"
                        inputRef={inputRef}
                      />
                    )}
                    {current === "email" && (
                      <Field
                        label="Your email"
                        value={data.email}
                        onChange={(v) => setData({ ...data, email: v })}
                        placeholder="you@example.com"
                        type="email"
                        inputRef={inputRef}
                      />
                    )}
                    {current === "evmAddress" && (
                      <Field
                        label="Your EVM address"
                        value={data.evmAddress}
                        onChange={(v) => setData({ ...data, evmAddress: v })}
                        placeholder="0x..."
                        inputRef={inputRef}
                      />
                    )}
                    {current === "xUsername" && (
                      <Field
                        label="Your X username"
                        value={data.xUsername}
                        onChange={(v) => setData({ ...data, xUsername: v })}
                        placeholder="@handle"
                        inputRef={inputRef}
                      />
                    )}
                    {current === "telegram" && (
                      <Field
                        label="Your Telegram username"
                        value={data.telegram}
                        onChange={(v) => setData({ ...data, telegram: v })}
                        placeholder="@handle"
                        inputRef={inputRef}
                      />
                    )}
                    {current === "discord" && (
                      <Field
                        label="Your Discord username"
                        value={data.discord}
                        onChange={(v) => setData({ ...data, discord: v })}
                        placeholder="username"
                        inputRef={inputRef}
                      />
                    )}
                    {current === "xPost" && (
                      <div>
                        <h3 className="mb-5 text-xl font-medium tracking-tight text-platinum">
                          Share it on X
                        </h3>
                        <div className="mb-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-sm text-silver">
                          {SUGGESTED_POST}
                        </div>
                        <div className="mb-5 flex gap-2">
                          <button
                            onClick={copyPost}
                            className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/10 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-platinum transition-colors hover:border-white/30"
                          >
                            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            {copied ? "Copied" : "Copy post"}
                          </button>
                          <a
                            href={`https://x.com/intent/tweet?text=${encodeURIComponent(SUGGESTED_POST)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/10 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-platinum transition-colors hover:border-white/30"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Open X
                          </a>
                        </div>
                        <Field
                          label="Paste your post link"
                          value={data.xPostLink}
                          onChange={(v) => setData({ ...data, xPostLink: v })}
                          placeholder="https://x.com/..."
                          inputRef={inputRef}
                          hideLabelAsHeading
                        />
                      </div>
                    )}
                    {current === "review" && (
                      <div>
                        <h3 className="mb-5 text-xl font-medium tracking-tight text-platinum">
                          Review
                        </h3>
                        <dl className="mb-6 space-y-3 text-sm">
                          {[
                            ["Name", data.name],
                            ["Email", data.email],
                            ["EVM address", data.evmAddress],
                            ["X", data.xUsername],
                            ["Telegram", data.telegram],
                            ["Discord", data.discord],
                            ["Post", data.xPostLink],
                          ].map(([k, v]) => (
                            <div key={k} className="flex justify-between gap-4 border-b border-white/[0.06] pb-3">
                              <dt className="text-silver-dark">{k}</dt>
                              <dd className="truncate text-right text-platinum">{v}</dd>
                            </div>
                          ))}
                        </dl>
                        {status === "error" && (
                          <p className="mb-4 text-sm text-silver-dark">
                            Something went wrong. Please try again.
                          </p>
                        )}
                        <button
                          onClick={submit}
                          disabled={status === "submitting"}
                          className="w-full rounded-full bg-platinum py-3.5 text-center font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-black transition-opacity disabled:opacity-50"
                        >
                          {status === "submitting" ? "Submitting" : "Submit"}
                        </button>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {status !== "success" && current !== "review" && (
              <div className="flex items-center justify-between px-6 pb-8 sm:px-8">
                <button
                  onClick={back}
                  disabled={step === 0}
                  className="font-mono text-[10px] uppercase tracking-[0.14em] text-silver-dark transition-opacity disabled:opacity-0"
                >
                  Back
                </button>
                <button
                  onClick={next}
                  disabled={!canAdvance()}
                  aria-label="Next"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-platinum text-black transition-opacity disabled:opacity-30"
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>
            )}
            {status !== "success" && current === "review" && (
              <div className="px-6 pb-8 sm:px-8">
                <button
                  onClick={back}
                  className="font-mono text-[10px] uppercase tracking-[0.14em] text-silver-dark"
                >
                  Back
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  inputRef,
  hideLabelAsHeading,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  inputRef?: RefObject<HTMLInputElement | null>;
  hideLabelAsHeading?: boolean;
}) {
  return (
    <div>
      {!hideLabelAsHeading ? (
        <h3 className="mb-5 text-xl font-medium tracking-tight text-platinum">{label}</h3>
      ) : (
        <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-silver-dark">
          {label}
        </label>
      )}
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-b border-white/10 bg-transparent pb-3 text-lg text-platinum placeholder:text-silver-dark/60 focus:border-silver focus:outline-none"
      />
    </div>
  );
}
