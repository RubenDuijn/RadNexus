"use client";

import Link from "next/link";

import { MobileNav } from "@/components/layout/mobile-nav";

export function Topbar() {
  return (
    <header className="rn-topbar sticky top-0 z-30 border-b px-4 py-3 backdrop-blur lg:px-8">
      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          href="https://radnexus.dev/"
          aria-label="Open RAD NEXUS corporate homepage"
          className="rn-wordmark-link rn-nav-focus shrink-0 cursor-pointer rounded-sm text-xs font-semibold uppercase tracking-[0.2em]"
        >
          RAD NEXUS
        </Link>

        <div className="min-w-0 flex-1 px-1 sm:px-2">
          <h2 className="truncate text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground)] sm:text-sm">
            RAD NEXUS INTELLIGENCE
          </h2>
          <p className="mt-1 truncate text-[11px] text-[var(--muted)] sm:text-xs">
            DEMO ENVIRONMENT | Active company: NEXORA Industries
          </p>
        </div>

        <div className="shrink-0 lg:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
