"use client";

import Link from "next/link";

import { navItems } from "@/lib/navigation";

export function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-76 shrink-0 border-r border-[#ddd5c8] bg-[#f9f7f3] lg:block">
      <div className="border-b border-[#e5ded2] px-6 py-6">
        <p className="rn-eyebrow">Rad Nexus Intelligence</p>
        <h1 className="mt-2 text-lg font-semibold text-slate-800">Enterprise Intelligence Workspace</h1>
        <p className="mt-2 text-sm rn-muted">From enterprise data to business intelligence.</p>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg border border-transparent px-3 py-2 text-sm text-slate-700 transition-colors hover:border-[#d6cdbf] hover:bg-white hover:text-slate-900"
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
