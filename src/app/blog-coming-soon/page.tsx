"use client";

import Link from "next/link";

export default function BlogComingSoonPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#202123] px-6 py-12 text-center text-[#ececf1]">
      <div className="max-w-xl space-y-6">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white/60">
          Blog
        </span>
        <h1 className="text-3xl font-semibold md:text-4xl">Blog coming soon.</h1>
        <p className="text-sm leading-relaxed text-white/70 md:text-base">
          I&apos;ll be writing blogs as I learn new skills and expand my knowledge on new technical concepts.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Back to portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
