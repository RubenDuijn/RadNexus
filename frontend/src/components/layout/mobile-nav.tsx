"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

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

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const drawer =
    open && typeof document !== "undefined"
      ? createPortal(
          <div className="fixed inset-0 z-[100] lg:hidden" role="dialog" aria-modal="true" aria-label="Product navigation menu">
            <button
              type="button"
              aria-label="Close navigation menu"
              className="rn-mobile-drawer-overlay absolute inset-0"
              onClick={() => setOpen(false)}
            />

            <nav
              id="product-mobile-drawer"
              className="rn-mobile-drawer absolute right-2 top-2 w-[min(86vw,22rem)] rounded-2xl"
              style={{
                maxHeight: "calc(100dvh - max(0.5rem, env(safe-area-inset-top)) - max(0.5rem, env(safe-area-inset-bottom)) - 1rem)",
                paddingTop: "max(0.75rem, env(safe-area-inset-top))",
                paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
                paddingLeft: "0.9rem",
                paddingRight: "0.9rem",
              }}
            >
              <div className="mb-3 flex items-center justify-between">
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

              <ul className="max-h-[calc(100dvh-11rem)] space-y-2 overflow-y-auto overscroll-contain pr-1">
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
          </div>,
          document.body,
        )
      : null;

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
      {drawer}
    </>
  );
}
