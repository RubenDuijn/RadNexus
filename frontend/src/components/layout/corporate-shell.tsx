"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const corporateNav = [
  { label: "Company", href: "/company" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "AI & Intelligence", href: "/ai-and-intelligence" },
  { label: "Data & Platforms", href: "/data-and-platforms" },
  { label: "Technology & Transformation", href: "/technology-and-transformation" },
  { label: "Products", href: "/products" },
  { label: "Labs & Innovation", href: "/labs-and-innovation" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export function CorporateShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <div className="rn-corporate-shell">
      <header className="rn-corporate-header sticky top-0 z-30 border-b backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-4 lg:px-8">
          <div className="mr-auto">
            <Link
              href="https://radnexus.dev/"
              aria-label="Open RAD NEXUS corporate homepage"
              className="rn-eyebrow rn-wordmark-link rn-nav-focus inline-flex cursor-pointer rounded-sm"
            >
              RAD NEXUS
            </Link>
            <h1 className="text-sm font-semibold text-[var(--foreground)] sm:text-base">Technology · Data · Artificial Intelligence</h1>
          </div>
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="corporate-mobile-drawer"
            aria-label="Toggle corporate navigation"
            className="rn-menu-button inline-flex h-9 items-center gap-2 rounded-md border border-[var(--line-strong)] bg-white px-3 text-xs font-medium text-[var(--foreground)] lg:hidden"
            onClick={() => setMobileOpen((value) => !value)}
          >
            <span aria-hidden="true" className="font-mono text-sm leading-none">≡</span>
            Menu
          </button>
          <Link
            href="/overview"
            className="rn-btn-primary rounded-md px-3 py-1.5 text-xs font-medium"
          >
            Open Product Application
          </Link>
        </div>

        <nav className="hidden border-t border-[var(--line)] lg:block">
          <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 lg:px-8">
            {corporateNav.map((item) => (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  className="rn-chip rn-nav-focus inline-flex px-3 py-1.5 text-xs"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {mobileOpen && (
          <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Corporate navigation menu">
            <button
              type="button"
              aria-label="Close corporate navigation menu"
              className="rn-mobile-drawer-overlay absolute inset-0"
              onClick={() => setMobileOpen(false)}
            />
            <nav id="corporate-mobile-drawer" className="rn-mobile-drawer absolute right-0 top-0 h-full w-[84vw] max-w-80 p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Corporate navigation</p>
                <button
                  type="button"
                  className="rn-menu-button inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--line-strong)] bg-white text-[var(--foreground)]"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close corporate navigation drawer"
                >
                  ×
                </button>
              </div>
              <ul className="space-y-2">
                {corporateNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="rn-nav-focus block rounded-lg border border-transparent px-3 py-2 text-sm text-[var(--foreground)] hover:border-[var(--line-strong)] hover:bg-[var(--surface-2)]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">{children}</main>
    </div>
  );
}
