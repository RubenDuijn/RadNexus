import { Panel } from "@/components/ui/panel";
import { StatusBadge } from "@/components/ui/status-badge";

const steps = [
  {
    name: "SAP / ERP Systems",
    detail: "Primary ERP ingestion target with roadmap support for non-SAP systems.",
    state: "Planned" as const,
  },
  {
    name: "Data Extraction and Integration",
    detail: "Pipelines for curated replication and harmonization.",
    state: "Planned" as const,
  },
  {
    name: "PostgreSQL Enterprise Data Platform",
    detail: "SAP-inspired relational schema with migration-driven evolution.",
    state: "Available" as const,
  },
  {
    name: "Python Processing and Business Logic",
    detail: "FastAPI and deterministic logic layer under active implementation.",
    state: "Available" as const,
  },
  {
    name: "Semantic Business Layer",
    detail: "Business metric definitions and governed dimension mappings.",
    state: "Planned" as const,
  },
  {
    name: "AI Investigation Engine",
    detail: "Natural-language investigation with SQL traceability and evidence.",
    state: "Planned" as const,
  },
  {
    name: "Business Intelligence Interface",
    detail: "Executive and analyst-facing reporting and exploration workspace.",
    state: "Available" as const,
  },
];

export default function SystemArchitecturePage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-semibold text-slate-100">System Architecture</h1>
        <p className="mt-2 text-sm text-slate-400">
          End-to-end architecture from enterprise systems to explainable intelligence outputs.
        </p>
      </section>

      <Panel
        title="Architecture Flow"
        subtitle="Implementation state is explicit for every layer. Future adapters are ERP and database agnostic."
      >
        <ol className="space-y-3">
          {steps.map((step, index) => (
            <li key={step.name}>
              <div className="rounded-lg border border-slate-800 bg-slate-950/85 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-200">{step.name}</p>
                  <StatusBadge status={step.state} />
                </div>
                <p className="mt-2 text-sm text-slate-400">{step.detail}</p>
              </div>
              {index < steps.length - 1 && <div className="px-2 py-2 text-center text-slate-500">↓</div>}
            </li>
          ))}
        </ol>
      </Panel>
    </div>
  );
}
