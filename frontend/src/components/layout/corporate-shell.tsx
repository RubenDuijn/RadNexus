import Link from "next/link";

const corporateNav = [
  { label: "Home", href: "/" },
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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-800/90 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-4 lg:px-8">
          <div className="mr-auto">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">RAD NEXUS</p>
            <h1 className="text-base font-semibold text-slate-100">Technology · Data · Artificial Intelligence</h1>
          </div>
          <Link
            href="/overview"
            className="rounded-md border border-cyan-400/50 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-100"
          >
            Open Product Application
          </Link>
        </div>
        <nav className="border-t border-slate-800/90">
          <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 lg:px-8">
            {corporateNav.map((item) => (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  className="inline-flex rounded-md border border-slate-700/70 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-300 hover:border-slate-500 hover:text-slate-100"
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
