# Flibber

Move value. Never lose it.

A Next.js 15 (App Router, TypeScript, Tailwind CSS, Framer Motion) marketing site for
Flibber's Slotting Mechanism, with a progressive waitlist backed by Resend.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Resend (transactional email)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in your own values:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes | API key from your [Resend](https://resend.com) account. Used server-side only — never exposed to the browser. |
| `RESEND_FROM_EMAIL` | Yes | A sender address on a domain verified in Resend, e.g. `Flibber <waitlist@flibber.xyz>`. |
| `RESEND_TO_EMAIL` | No | Destination inbox for waitlist submissions. Defaults to `flibberfdn@gmail.com` if unset. |

Without `RESEND_API_KEY` and `RESEND_FROM_EMAIL` set, the `/api/waitlist` route returns a
generic error to the visitor and logs the missing-configuration reason server-side — it never
leaks configuration details to the client.

## Resend setup checklist

1. Create a Resend account and verify a sending domain (e.g. `flibber.xyz`).
2. Generate an API key in the Resend dashboard.
3. Set `RESEND_FROM_EMAIL` to an address on that verified domain — sending from an unverified
   domain will cause deliveries to fail.
4. Confirm `flibberfdn@gmail.com` (or your chosen `RESEND_TO_EMAIL`) can receive mail from your
   sending domain.

## Deploying to Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. In **Project Settings → Environment Variables**, add for the **Production** environment
   (and Preview, if you want waitlist submissions to work on preview deployments too):
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `RESEND_TO_EMAIL` (optional)
4. Deploy. Vercel runs `npm install` and `npm run build` automatically.
5. After deploying, submit a test entry through the waitlist to confirm mail arrives at the
   destination inbox.

### Redeploying after adding env vars

If you added or changed environment variables after the first deploy, trigger a new deployment
(Vercel dashboard → Deployments → Redeploy) — environment variable changes do not apply
retroactively to an existing build.

## Project structure

```
app/
  page.tsx              Home page (all sections)
  api/waitlist/route.ts Server-side waitlist handler (Resend)
  privacy/               Privacy Policy
  terms/                 Terms of Service
  docs/                  Documentation placeholder
components/
  Hero.tsx               Hero + hero slotting phone
  UtilitiesSection.tsx   Three utilities, scroll-linked phone
  SlottingMechanism.tsx  Slotting explainer
  TestnetCTA.tsx          Testnet coming soon + waitlist trigger
  Waitlist.tsx            Progressive one-question-at-a-time panel
  WaitlistProvider.tsx    Global open/close state
  Nav.tsx / Footer.tsx    Navigation and footer
  PhoneFrame.tsx          Reusable phone chrome
  SlotScene.tsx           Cross-chain / hero product interface
  FiatScene.tsx           On-ramp / off-ramp product interface
  LaunchpadScene.tsx      NFT admission lifecycle product interface
```

## Notes

- No API keys are ever sent to the browser — all Resend calls happen inside the server-only
  `app/api/waitlist/route.ts` route (`export const runtime = "nodejs"`).
- Reduced-motion is respected globally via `prefers-reduced-motion` in `app/globals.css`.
- Update social links in `components/Footer.tsx` and `components/Nav.tsx` if handles change.
- This project pins `next` to `15.1.9`, the patched release for CVE-2025-66478 (critical RCE in
  the App Router's RSC protocol). If you bump the Next.js version later, check
  [nextjs.org/blog/CVE-2025-66478](https://nextjs.org/blog/CVE-2025-66478) first, and rotate
  `RESEND_API_KEY` and any other secrets after upgrading, per the official advisory.
