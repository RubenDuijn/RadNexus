"use client";

import Link from "next/link";

import { navItems } from "@/lib/navigation";

export function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-76 shrink-0 border-r border-slate-800/80 bg-slate-950/90 lg:block">
      <div className="border-b border-slate-800 px-6 py-6">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Rad Nexus Intelligence</p>
        <h1 className="mt-2 text-lg font-semibold text-slate-100">Enterprise Command Workspace</h1>
        <p className="mt-2 text-sm text-slate-400">From enterprise data to business intelligence.</p>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg border border-transparent px-3 py-2 text-sm text-slate-300 transition-colors hover:border-slate-700 hover:bg-slate-900/80 hover:text-slate-100"
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
