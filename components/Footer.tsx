import Link from "next/link";

const SOCIALS = [
  { label: "X", href: "https://x.com/flibber_xyz" },
  { label: "Telegram", href: "https://t.me/flibber_xyz" },
  { label: "Discord", href: "https://discord.gg/BxHJWFhKE" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/flibber/" },
  { label: "YouTube", href: "https://youtube.com/@flibber_xyz" },
];

const PAGES = [
  { label: "Documentation", href: "/docs" },
  { label: "Waitlist", href: "#waitlist" },
  { label: "Testnet", href: "#testnet" },
  { label: "Contact", href: "mailto:flibberfdn@gmail.com" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14 sm:flex-row sm:items-start sm:justify-between sm:px-10">
        <div>
          <p className="mb-4 text-sm font-medium tracking-tight text-platinum">Flibber</p>
          <div className="flex flex-col gap-2.5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-silver-dark transition-colors hover:text-silver"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2.5 sm:items-end">
          {PAGES.map((p) => (
            <Link
              key={p.label}
              href={p.href}
              className="text-sm text-silver-dark transition-colors hover:text-silver"
            >
              {p.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-10 sm:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-silver-dark/70">
          © {new Date().getFullYear()} Flibber. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
