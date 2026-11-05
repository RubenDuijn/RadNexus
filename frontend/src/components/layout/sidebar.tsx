"use client";

import Link from "next/link";

import { navItems } from "@/lib/navigation";

export function Sidebar() {
  return (
    <aside className="rn-sidebar hidden min-h-screen w-76 shrink-0 border-r lg:block">
      <div className="border-b border-[var(--line)] px-4 py-4">
        <Link
          href="https://radnexus.dev/"
          aria-label="Open RAD NEXUS corporate homepage"
          className="rn-wordmark-link rn-nav-focus inline-flex cursor-pointer rounded-sm text-xs font-semibold uppercase tracking-[0.2em]"
        >
          RAD NEXUS
        </Link>
      </div>
      <nav className="p-4 pt-6">
        <ul className="space-y-2">
          {navItems.map((item) => {
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rn-nav-focus block rounded-lg border border-transparent px-3 py-2 text-sm text-[var(--muted)] transition-colors hover:border-[var(--line-strong)] hover:bg-white hover:text-[var(--foreground)]"
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
