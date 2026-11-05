"use client";

import Link from "next/link";

import { navItems } from "@/lib/navigation";

export function MobileNav() {
  return (
    <nav className="border-b border-slate-800/90 bg-slate-950/95 px-4 py-3 lg:hidden">
      <ul className="flex gap-2 overflow-x-auto pb-1">
        {navItems.map((item) => {
          return (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                className="inline-flex rounded-md border border-slate-700/70 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-slate-500 hover:text-slate-100"
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
