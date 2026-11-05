import Link from "next/link";
import { headers } from "next/headers";

import { RevenueBarChart } from "@/components/charts/revenue-bar-chart";
import { RevenueLineChart } from "@/components/charts/revenue-line-chart";
import { DataStateTag } from "@/components/ui/data-state-tag";
import { KpiCard } from "@/components/ui/kpi-card";
import { Panel } from "@/components/ui/panel";
import { StatusBadge } from "@/components/ui/status-badge";
import { BackendStatus } from "@/lib/api";
import {
  customerConcentrationDemo,
  dataGenerationStatus,
  inventoryPositionDemo,
  keyChangesAndExceptions,
  kpiCards,
  recentActivity,
  revenueByCountry,
  revenueByMonth,
  revenueByProductGroup,
} from "@/lib/demo-data";
import { buildPlatformHealth } from "@/lib/platform-health";

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

export default async function OverviewPage() {
  const connectivity = await getConnectivity();
  const platformHealth = buildPlatformHealth(connectivity.api, connectivity.db);

  return (
    <div className="space-y-7">
      <section className="rn-card p-6 lg:p-7">
        <p className="rn-eyebrow">Executive Overview</p>
        <h1 className="rn-heading mt-3 text-3xl font-semibold">NEXORA Industries Enterprise Overview</h1>
        <p className="mt-3 text-sm rn-muted">
          Executive workspace for reporting period context, business performance, exceptions, and platform readiness.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <DataStateTag label="Synthetic company data" />
          <DataStateTag label="Demonstration metric" />
          <DataStateTag label="Planned functionality" />
          <DataStateTag label="Real database value" />
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((card) => (
          <KpiCard key={card.title} {...card} />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Panel title="Sales Development" subtitle="Demonstration metric - SQL-backed trend calculations pending">
          <RevenueLineChart data={revenueByMonth} />
        </Panel>
        <Panel title="Country Performance" subtitle="Demonstration metric - country variance report planned">
          <RevenueBarChart data={revenueByCountry} xKey="country" yKey="revenue" />
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Panel title="Product Group Performance" subtitle="Demonstration metric - product profitability drill-down planned">
          <RevenueBarChart data={revenueByProductGroup} xKey="group" yKey="revenue" />
        </Panel>
        <Panel title="Customer Concentration" subtitle="Synthetic company data - concentration analytics scaffold">
          <RevenueBarChart data={customerConcentrationDemo} xKey="customer" yKey="share" />
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Panel title="Inventory Position" subtitle="Demonstration metric - inventory valuation logic pending SQL layer">
          <RevenueBarChart data={inventoryPositionDemo} xKey="category" yKey="amount" />
        </Panel>
        <Panel title="Important Changes and Exceptions" subtitle="Current explanatory signal feed">
          <ul className="space-y-3">
            {keyChangesAndExceptions.map((entry) => (
              <li key={entry.title} className="rn-card-soft p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-800">{entry.title}</p>
                  <DataStateTag label={entry.state} />
                </div>
                <p className="mt-2 text-sm rn-muted">{entry.detail}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Panel title="Platform and Data-Source Health" subtitle="Runtime probes and implementation roadmap status">
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

      <section className="grid gap-4 xl:grid-cols-2">
        <Panel title="Drill-down Navigation" subtitle="Move directly from executive view into detailed workspaces">
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href="/business-intelligence" className="rn-btn-secondary rounded-lg px-3 py-2 text-sm">
              Open management reports
            </Link>
            <Link href="/data-explorer" className="rn-btn-secondary rounded-lg px-3 py-2 text-sm">
              Open table explorer
            </Link>
            <Link href="/data-explorer/KNA1" className="rn-btn-secondary rounded-lg px-3 py-2 text-sm">
              Inspect customer master data
            </Link>
            <Link href="/ai-intelligence" className="rn-btn-secondary rounded-lg px-3 py-2 text-sm">
              Launch AI investigation workspace
            </Link>
          </div>
        </Panel>

        <Panel title="Recent Business and Platform Activity" subtitle="Demonstration timeline while transactional feeds are pending">
          <ul className="space-y-3">
            {recentActivity.map((activity) => (
              <li key={activity.title} className="rn-card-soft p-3">
                <p className="font-medium text-slate-800">{activity.title}</p>
                <p className="mt-1 text-sm rn-muted">{activity.detail}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#0f6f8c]">{activity.source}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </section>
    </div>
  );
}
