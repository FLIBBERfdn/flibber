import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://flibber.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Flibber — Move Value. Never Lose It.",
    template: "%s — Flibber",
  },
  description:
    "Flibber's Slotting Mechanism powers deterministic value movement across cross-chain assets, fiat and digital markets. Testnet coming soon.",
  keywords: [
    "Flibber",
    "Slotting Mechanism",
    "cross-chain trading",
    "fiat on-ramp",
    "fiat off-ramp",
    "NFT launchpad",
    "blockchain infrastructure",
  ],
  authors: [{ name: "Flibber" }],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Flibber",
    title: "Flibber — Move Value. Never Lose It.",
    description:
      "The Slotting Mechanism powers deterministic value movement across cross-chain assets, fiat and digital markets.",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Flibber" }],
  },
  twitter: {
    card: "summary",
    site: "@flibber_xyz",
    title: "Flibber — Move Value. Never Lose It.",
    description:
      "The Slotting Mechanism powers deterministic value movement across cross-chain assets, fiat and digital markets.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-deep-black text-platinum">
        {children}
      </body>
    </html>
  );
}
