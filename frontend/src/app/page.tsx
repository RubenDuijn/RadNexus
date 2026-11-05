import Link from "next/link";

import { CorporateShell } from "@/components/layout/corporate-shell";
import { Panel } from "@/components/ui/panel";
import { businessPillars, flagshipProductSummary, maturityNotes } from "@/lib/corporate-content";

export default function HomePage() {
  return (
    <CorporateShell>
      <div className="space-y-8 lg:space-y-10">
        <section className="rn-card grid gap-6 p-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:p-10">
          <div>
          <p className="rn-eyebrow">Independent Technology Company</p>
          <h2 className="rn-heading mt-3 text-4xl font-semibold lg:text-5xl">RAD NEXUS</h2>
          <p className="mt-2 text-base text-slate-700">Technology · Data · Artificial Intelligence</p>
          <p className="mt-5 max-w-3xl text-2xl leading-tight text-slate-800">Turning complex technology into business advantage.</p>
          <p className="mt-4 max-w-3xl text-base rn-muted">
            We help organisations modernise enterprise technology, unlock the value of their data and apply
            artificial intelligence to real business challenges.
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
          </div>
          <div className="rn-card-soft p-6">
            <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Connected Enterprise Intelligence</p>
            <div className="relative mt-4 h-48 overflow-hidden rounded-xl border border-[#ddd5c8] bg-[#fffdf9]">
              <div className="absolute left-6 top-8 h-3 w-3 rounded-full bg-[#0f6f8c]" />
              <div className="absolute left-20 top-16 h-2.5 w-2.5 rounded-full bg-[#2c6db0]" />
              <div className="absolute left-38 top-10 h-3 w-3 rounded-full bg-[#1f8a5a]" />
              <div className="absolute left-24 top-30 h-2.5 w-2.5 rounded-full bg-[#a1690b]" />
              <div className="absolute left-50 top-24 h-3 w-3 rounded-full bg-[#0f6f8c]" />
              <div className="absolute left-8 top-40 h-2.5 w-2.5 rounded-full bg-[#2c6db0]" />
              <div className="absolute left-44 top-40 h-2.5 w-2.5 rounded-full bg-[#1f8a5a]" />
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 260 190" fill="none" aria-hidden="true">
                <path d="M25 35C54 41 67 56 92 64C116 72 132 52 150 50C171 47 183 57 208 63" stroke="#b8ccd6" strokeWidth="2" />
                <path d="M44 80C67 82 85 107 108 114C126 120 146 103 164 106C186 109 205 129 232 133" stroke="#c7d9cc" strokeWidth="2" />
                <path d="M35 145C61 145 78 127 102 125C127 123 145 142 171 144C193 146 215 133 238 127" stroke="#d9cfbd" strokeWidth="2" />
              </svg>
            </div>
            <p className="mt-4 text-sm rn-muted">
              Enterprise systems, modern data architecture, and intelligence workflows brought into one decision-ready model.
            </p>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-2">
          {businessPillars.map((pillar) => (
            <Panel key={pillar.title} title={pillar.title} subtitle={pillar.state}>
              <div className="space-y-2 text-sm text-slate-700">
                <div className="rn-card-soft p-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Business problem</p>
                  <p className="mt-1">{pillar.problem}</p>
                </div>
                <div className="rn-card-soft p-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Technical capability</p>
                  <p className="mt-1">{pillar.capability}</p>
                </div>
                <div className="rn-card-soft p-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Business outcome</p>
                  <p className="mt-1">{pillar.outcome}</p>
                </div>
              </div>
            </Panel>
          ))}
        </section>

        <Panel title="Flagship Product" subtitle="Rad Nexus Intelligence">
          <div className="grid gap-3 lg:grid-cols-3">
            <div className="rn-card-soft p-3">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Ambition</p>
              <p className="mt-1 text-sm text-slate-700">{flagshipProductSummary.ambition}</p>
            </div>
            <div className="rn-card-soft p-3">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Current demonstration scope</p>
              <p className="mt-1 text-sm text-slate-700">{flagshipProductSummary.currentState}</p>
            </div>
            <div className="rn-card-soft p-3">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Planned capability expansion</p>
              <p className="mt-1 text-sm text-slate-700">{flagshipProductSummary.plannedState}</p>
            </div>
          </div>
        </Panel>

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
