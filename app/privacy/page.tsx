import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Flibber collects, uses, and protects your information.",
};

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-28 sm:px-10">
      <Link href="/" className="font-mono text-[10px] uppercase tracking-[0.14em] text-silver-dark">
        &larr; Flibber
      </Link>
      <h1 className="mb-2 mt-8 text-3xl font-medium tracking-tight text-platinum">
        Privacy Policy
      </h1>
      <p className="mb-12 text-sm text-silver-dark">Last updated August 2026</p>

      <div className="space-y-10 text-sm leading-relaxed text-silver">
        <Section title="Information we collect">
          When you join the Flibber waitlist, we collect the information you submit directly:
          your name or alias, email address, EVM wallet address, X username, Telegram username,
          Discord username, and a link to a public X post. We do not request or store private
          keys, seed phrases, or wallet passwords.
        </Section>

        <Section title="How we use it">
          We use waitlist information to manage access to the Flibber testnet, communicate
          product updates, and understand demand across our community channels. We do not sell
          your information to third parties.
        </Section>

        <Section title="Server logs">
          Like most web services, our infrastructure automatically logs technical data such as
          IP address, browser type, and request timestamps for security and reliability
          purposes.
        </Section>

        <Section title="Cookies">
          Flibber's website does not currently use tracking or advertising cookies. If this
          changes, this policy will be updated accordingly.
        </Section>

        <Section title="Third-party services">
          Waitlist emails are processed through Resend, our transactional email provider.
          Submitted information is transmitted to Resend solely to deliver your waitlist
          confirmation to our team, and is subject to Resend's own privacy practices.
        </Section>

        <Section title="Data retention">
          We retain waitlist information for as long as necessary to manage testnet access and
          community communications, or until you request deletion.
        </Section>

        <Section title="Security">
          We take reasonable technical and organizational measures to protect the information
          you share with us. No system is perfectly secure, and we cannot guarantee absolute
          protection against unauthorized access.
        </Section>

        <Section title="Your rights">
          You may request access to, correction of, or deletion of your waitlist information at
          any time by contacting us at the address below.
        </Section>

        <Section title="Contact">
          Questions about this policy can be sent to{" "}
          <a href="mailto:flibberfdn@gmail.com" className="text-platinum underline underline-offset-4">
            flibberfdn@gmail.com
          </a>
          .
        </Section>

        <p className="pt-6 text-xs text-silver-dark">
          This policy is provided for general informational purposes and should be reviewed by
          qualified legal counsel before being relied upon as final legal advice.
        </p>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-base font-medium text-platinum">{title}</h2>
      <p>{children}</p>
    </section>
  );
}
