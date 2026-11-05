import Link from "next/link";

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
  return (
    <div className="rn-corporate-shell bg-[#f7f5f1]">
      <header className="sticky top-0 z-20 border-b border-[#ddd5c8] bg-[#f7f5f1]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-4 lg:px-8">
          <div className="mr-auto">
            <Link
              href="https://radnexus.dev/"
              aria-label="Open RAD NEXUS corporate homepage"
              className="rn-eyebrow inline-flex cursor-pointer rounded-sm outline-none hover:text-[#0f6f8c] focus-visible:ring-2 focus-visible:ring-[#0f6f8c]/40"
            >
              RAD NEXUS
            </Link>
            <h1 className="text-base font-semibold text-slate-800">Technology · Data · Artificial Intelligence</h1>
          </div>
          <Link
            href="/overview"
            className="rn-btn-primary rounded-md px-3 py-1.5 text-xs font-medium"
          >
            Open Product Application
          </Link>
        </div>
        <nav className="border-t border-[#e6dfd4]">
          <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 lg:px-8">
            {corporateNav.map((item) => (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  className="rn-chip inline-flex px-3 py-1.5 text-xs"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">{children}</main>
    </div>
  );
}
