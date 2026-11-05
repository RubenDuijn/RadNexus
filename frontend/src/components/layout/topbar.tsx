"use client";

import Link from "next/link";

import { MobileNav } from "@/components/layout/mobile-nav";
import { getClientEnvironmentLabel } from "@/lib/environment";

export function Topbar() {
  const environmentLabel =
    typeof window !== "undefined"
      ? getClientEnvironmentLabel()
      : process.env.NODE_ENV === "development"
        ? "LOCAL DEVELOPMENT"
        : "DEMO ENVIRONMENT";

  return (
    <header className="rn-topbar sticky top-0 z-30 border-b px-4 py-3 backdrop-blur lg:px-8">
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <Link
          href="https://radnexus.dev/"
          aria-label="Open RAD NEXUS corporate homepage"
          className="rn-wordmark-link rn-nav-focus cursor-pointer rounded-sm text-xs font-semibold uppercase tracking-[0.2em]"
        >
          RAD NEXUS
        </Link>

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground)] sm:text-sm">
            RAD NEXUS INTELLIGENCE
          </h2>
          <p className="mt-1 truncate text-[11px] text-[var(--muted)] sm:text-xs">
            {environmentLabel} | Active company: NEXORA Industries
          </p>
        </div>

        <div className="flex items-center gap-2 sm:ml-auto">
          <span className="hidden rounded-md border border-[var(--line-strong)] bg-white px-2.5 py-1 text-xs text-[var(--muted)] sm:inline-flex">
            User: Analyst
          </span>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
