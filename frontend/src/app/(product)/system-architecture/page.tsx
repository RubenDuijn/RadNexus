import { headers } from "next/headers";

import { StatusBadge } from "@/components/ui/status-badge";
import { BackendStatus } from "@/lib/api";
import { DataStateTag } from "@/components/ui/data-state-tag";
import { dataGenerationStatus } from "@/lib/demo-data";
import { Panel } from "@/components/ui/panel";
import { buildPlatformHealth } from "@/lib/platform-health";

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

type ConnectivityState = {
  api: BackendStatus | null;
  db: BackendStatus | null;
};

async function getConnectivity(): Promise<ConnectivityState> {
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") || headerStore.get("host") || "localhost:3000";
  const protocol = headerStore.get("x-forwarded-proto") || "http";
  const appBaseUrl = `${protocol}://${host}`;

  const [apiRes, dbRes] = await Promise.all([
    fetch(`${appBaseUrl}/api/backend/health`, { cache: "no-store" }).catch(() => null),
    fetch(`${appBaseUrl}/api/backend/health-db`, { cache: "no-store" }).catch(() => null),
  ]);

  const apiPayload = apiRes ? ((await apiRes.json()) as BackendStatus) : null;
  const dbPayload = dbRes ? ((await dbRes.json()) as BackendStatus) : null;

  return {
    api: apiPayload,
    db: dbPayload,
  };
}

export default async function SystemArchitecturePage() {
  const connectivity = await getConnectivity();
  const platformHealth = buildPlatformHealth(connectivity.api, connectivity.db);

  return (
    <div className="space-y-7">
      <section>
        <h1 className="rn-heading text-3xl font-semibold">System Architecture</h1>
        <p className="mt-3 text-sm rn-muted">
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
              <div className="rn-card-soft p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-700">{step.name}</p>
                  <StatusBadge status={step.state} />
                </div>
                <p className="mt-2 text-sm rn-muted">{step.detail}</p>
              </div>
              {index < steps.length - 1 && <div className="px-2 py-2 text-center text-slate-400">↓</div>}
            </li>
          ))}
        </ol>
      </Panel>

      <section className="grid gap-4 xl:grid-cols-2">
        <Panel title="Platform Health" subtitle="Runtime probe visibility moved from executive overview into technical architecture context">
          <ul className="space-y-2">
            {platformHealth.map((item) => (
              <li key={item.id} className="rn-card-soft p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-800">{item.label}</p>
                  <StatusBadge status={item.status} />
                </div>
                <p className="mt-1 text-sm rn-muted">{item.detail}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.1em] text-slate-500">{item.source}</p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Data Foundation Progress" subtitle="Schema and generation readiness by capability">
          <ul className="space-y-3">
            {dataGenerationStatus.map((item) => (
              <li key={item.label} className="rn-card-soft p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-800">{item.label}</p>
                  <p className="text-sm rn-muted">{item.status}</p>
                </div>
                <div className="mt-2">
                  <DataStateTag label={item.type} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </section>
    </div>
  );
}
