"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const corporateNav = [
  { label: "Products", href: "/products", featured: true },
  { label: "Capabilities", href: "/capabilities" },
  { label: "AI & Intelligence", href: "/ai-and-intelligence", featured: true },
  { label: "Data & Platforms", href: "/data-and-platforms", featured: true },
  { label: "Technology & Transformation", href: "/technology-and-transformation" },
  { label: "Labs & Innovation", href: "/labs-and-innovation", featured: true },
  { label: "Insights", href: "/insights", featured: true },
  { label: "Company", href: "/company" },
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

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const mobileDrawer =
    mobileOpen && typeof document !== "undefined"
      ? createPortal(
          <div className="fixed inset-0 z-[100] lg:hidden" role="dialog" aria-modal="true" aria-label="Corporate navigation menu">
            <button
              type="button"
              aria-label="Close corporate navigation menu"
              className="rn-mobile-drawer-overlay absolute inset-0"
              onClick={() => setMobileOpen(false)}
            />

            <div
              className="absolute inset-0 flex items-start justify-end p-2"
              style={{
                paddingTop: "max(0.5rem, env(safe-area-inset-top))",
                paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))",
                paddingRight: "max(0.5rem, env(safe-area-inset-right))",
                paddingLeft: "max(0.5rem, env(safe-area-inset-left))",
              }}
            >
              <nav
                id="corporate-mobile-drawer"
                className="rn-mobile-drawer rn-mobile-drawer-corporate flex self-start flex-col overflow-hidden rounded-2xl p-3"
                style={{
                  maxHeight: "calc(100dvh - max(0.5rem, env(safe-area-inset-top)) - max(0.5rem, env(safe-area-inset-bottom)) - 1rem)",
                }}
              >
                <div className="mb-3 flex items-center justify-between">
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

                <ul className="max-h-[calc(100dvh-11rem)] space-y-2 overflow-y-auto overscroll-contain pr-1">
                  {corporateNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`rn-nav-focus block rounded-lg border px-3 py-2 text-sm hover:bg-[var(--surface-2)] ${
                          item.featured
                            ? "border-[color-mix(in_srgb,var(--accent)_45%,white)] bg-[color-mix(in_srgb,var(--accent)_8%,white)] font-medium text-[var(--accent)] hover:border-[var(--accent)]"
                            : "border-transparent text-[var(--foreground)] hover:border-[var(--line-strong)]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>,
          document.body,
        )
      : null;

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
                  className={`rn-chip rn-nav-focus inline-flex px-3 py-1.5 text-xs ${
                    item.featured
                      ? "border-[color-mix(in_srgb,var(--accent)_45%,white)] bg-[color-mix(in_srgb,var(--accent)_8%,white)] text-[var(--accent)]"
                      : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {mobileDrawer}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">{children}</main>
    </div>
  );
}
