import Link from "next/link";

import { CorporateShell } from "@/components/layout/corporate-shell";
import { Panel } from "@/components/ui/panel";
import { businessPillars, maturityNotes } from "@/lib/corporate-content";

export default function HomePage() {
  return (
    <CorporateShell>
      <div className="space-y-6">
        <section className="rounded-xl border border-slate-800/90 bg-slate-900/70 p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">Independent Technology Company</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-100">RAD NEXUS</h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            RAD NEXUS helps organizations modernize technology, unlock enterprise data, and apply artificial
            intelligence to real business problems.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/products"
              className="rounded-md border border-cyan-400/50 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-100"
            >
              View Products
            </Link>
            <Link
              href="/overview"
              className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200"
            >
              Open Rad Nexus Intelligence
            </Link>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-2">
          {businessPillars.map((pillar) => (
            <Panel key={pillar.title} title={pillar.title} subtitle={pillar.state}>
              <ul className="space-y-1 text-sm text-slate-300">
                {pillar.items.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </Panel>
          ))}
        </section>

        <Panel title="Strategic Clarity" subtitle="Company scope and product scope are intentionally separated">
          <ul className="space-y-2 text-sm text-slate-300">
            {maturityNotes.map((note) => (
              <li key={note} className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
                {note}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </CorporateShell>
  );
}
