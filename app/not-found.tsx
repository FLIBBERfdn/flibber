import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-silver-dark">404</p>
      <h1 className="text-2xl font-medium tracking-tight text-platinum">Page not found</h1>
      <Link
        href="/"
        className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-silver-dark underline underline-offset-4 hover:text-platinum"
      >
        Back to Flibber
      </Link>
    </main>
  );
}
