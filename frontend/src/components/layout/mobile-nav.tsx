"use client";

import Link from "next/link";

import { navItems } from "@/lib/navigation";

export function MobileNav() {
  return (
    <nav className="border-b border-[#dfd7ca] bg-[#f8f5ef]/95 px-4 py-3 lg:hidden">
      <ul className="flex gap-2 overflow-x-auto pb-1">
        {navItems.map((item) => {
          return (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                className="rn-chip inline-flex px-3 py-1.5 text-xs font-medium"
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
