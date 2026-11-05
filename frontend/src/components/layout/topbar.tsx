"use client";

import Link from "next/link";

import { MobileNav } from "@/components/layout/mobile-nav";

export function Topbar() {
  return (
    <header className="rn-topbar sticky top-0 z-30 border-b px-4 py-3.5 backdrop-blur lg:px-8">
      <div className="rn-product-header">
        <div className="flex items-center justify-between gap-3 lg:hidden">
          <Link
            href="https://radnexus.dev/"
            aria-label="Open RAD NEXUS corporate homepage"
            className="rn-wordmark-link rn-nav-focus shrink-0 cursor-pointer rounded-sm text-xs font-semibold uppercase tracking-[0.2em] sm:text-sm"
          >
            RAD NEXUS
          </Link>

          <div className="shrink-0">
            <MobileNav />
          </div>
        </div>

        <div className="rn-product-identity min-w-0 flex-1">
          <h2 className="rn-product-title">RAD NEXUS INTELLIGENCE</h2>
        </div>
      </div>
    </header>
  );
}
