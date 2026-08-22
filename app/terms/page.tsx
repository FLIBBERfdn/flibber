import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of the Flibber website and waitlist.",
};

export default function TermsOfService() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-28 sm:px-10">
      <Link href="/" className="font-mono text-[10px] uppercase tracking-[0.14em] text-silver-dark">
        &larr; Flibber
      </Link>
      <h1 className="mb-2 mt-8 text-3xl font-medium tracking-tight text-platinum">
        Terms of Service
      </h1>
      <p className="mb-12 text-sm text-silver-dark">Last updated August 2026</p>

      <div className="space-y-10 text-sm leading-relaxed text-silver">
        <Section title="Use of this website">
          By using this website, you agree to use it only for lawful purposes and in a manner
          that does not infringe the rights of, or restrict or inhibit the use of, this site by
          any third party.
        </Section>

        <Section title="Testnet access">
          The Flibber testnet is experimental software currently in development. Joining the
          waitlist does not guarantee access, a specific launch date, or continued availability
          once access is granted.
        </Section>

        <Section title="Experimental software, no guarantees">
          Flibber is provided on an "as is" and "as available" basis. We make no warranties,
          express or implied, regarding uptime, performance, or fitness for a particular
          purpose. Testnet assets and interfaces may change or be discontinued at any time.
        </Section>

        <Section title="No financial advice">
          Nothing on this website constitutes financial, investment, legal, or tax advice.
          Digital assets carry risk, and you are solely responsible for your own decisions.
        </Section>

        <Section title="User responsibilities">
          You are responsible for the accuracy of the information you submit, including your
          wallet address and social usernames, and for keeping your own credentials secure.
        </Section>

        <Section title="Prohibited activity">
          You may not use this website to submit false information, attempt unauthorized access
          to our systems, or interfere with the operation of the site or waitlist.
        </Section>

        <Section title="Intellectual property">
          The Flibber name, logo, and website content are the property of Flibber and may not be
          used without permission.
        </Section>

        <Section title="Third-party links">
          This website links to third-party platforms such as X, Telegram, Discord, LinkedIn,
          and YouTube. We are not responsible for the content or practices of those platforms.
        </Section>

        <Section title="Limitation of liability">
          To the fullest extent permitted by law, Flibber shall not be liable for any indirect,
          incidental, or consequential damages arising from your use of this website or
          participation in the testnet.
        </Section>

        <Section title="Changes to these terms">
          We may update these terms from time to time. Continued use of the website after
          changes take effect constitutes acceptance of the revised terms.
        </Section>

        <Section title="Termination">
          We reserve the right to suspend or terminate waitlist or testnet access for any user
          who violates these terms.
        </Section>

        <Section title="Contact">
          Questions about these terms can be sent to{" "}
          <a href="mailto:flibberfdn@gmail.com" className="text-platinum underline underline-offset-4">
            flibberfdn@gmail.com
          </a>
          .
        </Section>

        <p className="pt-6 text-xs text-silver-dark">
          These terms are provided for general informational purposes and should be reviewed by
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
