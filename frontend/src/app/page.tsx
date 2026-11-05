import Link from "next/link";

import { CorporateShell } from "@/components/layout/corporate-shell";
import { Panel } from "@/components/ui/panel";
import { businessPillars, maturityNotes } from "@/lib/corporate-content";

export default function HomePage() {
  return (
    <CorporateShell>
      <div className="space-y-8 lg:space-y-10">
        <section className="rn-card p-7 lg:p-10">
          <p className="rn-eyebrow">Independent Technology Company</p>
          <h2 className="rn-heading mt-3 text-4xl font-semibold lg:text-5xl">RAD NEXUS</h2>
          <p className="mt-2 text-base text-slate-700">Technology · Data · Artificial Intelligence</p>
          <p className="mt-5 max-w-3xl text-base rn-muted">
            RAD NEXUS helps organizations modernize technology, unlock enterprise data, and apply artificial
            intelligence to real business problems.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rn-btn-primary rounded-md px-4 py-2 text-sm font-medium"
            >
              View Products
            </Link>
            <Link
              href="/overview"
              className="rn-btn-secondary rounded-md px-4 py-2 text-sm font-medium"
            >
              Open Rad Nexus Intelligence
            </Link>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-2">
          {businessPillars.map((pillar) => (
            <Panel key={pillar.title} title={pillar.title} subtitle={pillar.state}>
              <ul className="space-y-2 text-sm text-slate-700">
                {pillar.items.map((item) => (
                  <li key={item} className="rn-card-soft p-3">{item}</li>
                ))}
              </ul>
            </Panel>
          ))}
        </section>

        <Panel title="Strategic Clarity" subtitle="Company scope and product scope are intentionally separated">
          <ul className="space-y-2 text-sm text-slate-700">
            {maturityNotes.map((note) => (
              <li key={note} className="rn-card-soft p-3">
                {note}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </CorporateShell>
  );
}
