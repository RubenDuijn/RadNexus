"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { navItems } from "@/lib/navigation";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="product-mobile-drawer"
        aria-label="Toggle product navigation"
        onClick={() => setOpen((value) => !value)}
        className="rn-menu-button inline-flex h-9 items-center gap-2 rounded-md border border-[var(--line-strong)] bg-white px-3 text-xs font-medium text-[var(--foreground)] lg:hidden"
      >
        <span aria-hidden="true" className="font-mono text-sm leading-none">≡</span>
        Menu
      </button>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Product navigation menu">
          <button
            type="button"
            aria-label="Close navigation menu"
            className="rn-mobile-drawer-overlay absolute inset-0"
            onClick={() => setOpen(false)}
          />
          <nav id="product-mobile-drawer" className="rn-mobile-drawer absolute right-0 top-0 h-full w-[84vw] max-w-80 p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Navigation</p>
              <button
                type="button"
                className="rn-menu-button inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--line-strong)] bg-white text-[var(--foreground)]"
                onClick={() => setOpen(false)}
                aria-label="Close navigation drawer"
              >
                ×
              </button>
            </div>
            <ul className="space-y-2">
              {navItems.map((item) => {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="rn-nav-focus block rounded-lg border border-transparent px-3 py-2 text-sm text-[var(--foreground)] hover:border-[var(--line-strong)] hover:bg-[var(--surface-2)]"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
