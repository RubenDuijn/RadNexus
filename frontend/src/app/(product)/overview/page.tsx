import { RevenueBarChart } from "@/components/charts/revenue-bar-chart";
import { RevenueLineChart } from "@/components/charts/revenue-line-chart";
import { KpiCard } from "@/components/ui/kpi-card";
import { Panel } from "@/components/ui/panel";
import { headers } from "next/headers";
import {
  dataGenerationStatus,
  kpiCards,
  recentActivity,
  revenueByCountry,
  revenueByMonth,
  revenueByProductGroup,
} from "@/lib/demo-data";

async function getConnectivity() {
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") || headerStore.get("host") || "localhost:3000";
  const protocol = headerStore.get("x-forwarded-proto") || "http";
  const appBaseUrl = `${protocol}://${host}`;

  const [apiRes, dbRes] = await Promise.all([
    fetch(`${appBaseUrl}/api/backend/health`, { cache: "no-store" }).catch(() => null),
    fetch(`${appBaseUrl}/api/backend/health-db`, { cache: "no-store" }).catch(() => null),
  ]);

  const apiPayload = apiRes ? await apiRes.json() : { reachable: false, message: "Unavailable" };
  const dbPayload = dbRes ? await dbRes.json() : { reachable: false, message: "Unavailable" };

  return {
    api: apiPayload,
    db: dbPayload,
  };
}

export default async function OverviewPage() {
  const connectivity = await getConnectivity();

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-semibold text-slate-100">NEXORA Industries Overview</h1>
        <p className="mt-2 text-sm text-slate-400">
          Demonstration dashboard for Rad Nexus Intelligence. Metrics marked as demonstration are not live database
          results.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {kpiCards.map((card) => (
          <KpiCard key={card.title} {...card} />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Panel
          title="Revenue Development Over Time"
          subtitle="Demonstration data - prepared for SQL-backed monthly revenue series"
        >
          <RevenueLineChart data={revenueByMonth} />
        </Panel>
        <Panel title="Revenue by Country" subtitle="Demonstration data - country split pending report endpoints">
          <RevenueBarChart data={revenueByCountry} xKey="country" yKey="revenue" />
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Panel title="Revenue by Product Group" subtitle="Demonstration data - planned BI query output">
          <RevenueBarChart data={revenueByProductGroup} xKey="group" yKey="revenue" />
        </Panel>
        <Panel title="Platform Status" subtitle="Backend status uses FastAPI health endpoints when available">
          <div className="space-y-3 text-sm text-slate-300">
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
              <p className="font-medium">API Connectivity</p>
              <p className="mt-1 text-slate-400">{connectivity.api.message}</p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
              <p className="font-medium">Database Connectivity</p>
              <p className="mt-1 text-slate-400">{connectivity.db.message}</p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
              <p className="font-medium">Data generation status</p>
              <ul className="mt-2 space-y-1 text-slate-400">
                {dataGenerationStatus.map((item) => (
                  <li key={item.label}>
                    {item.label}: {item.status}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Panel>
      </section>

      <Panel title="Recent Business Activity" subtitle="Demonstration timeline while transactional feeds are pending">
        <ul className="space-y-3">
          {recentActivity.map((activity) => (
            <li key={activity.title} className="rounded-lg border border-slate-800 bg-slate-950 p-3">
              <p className="font-medium text-slate-200">{activity.title}</p>
              <p className="mt-1 text-sm text-slate-400">{activity.detail}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.12em] text-blue-300">{activity.source}</p>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
