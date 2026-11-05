import Link from "next/link";

import { RevenueBarChart } from "@/components/charts/revenue-bar-chart";
import { RevenueLineChart } from "@/components/charts/revenue-line-chart";
import { DataStateTag } from "@/components/ui/data-state-tag";
import { KpiCard } from "@/components/ui/kpi-card";
import { Panel } from "@/components/ui/panel";
import {
  customerConcentrationDemo,
  inventoryPositionDemo,
  keyChangesAndExceptions,
  kpiCards,
  revenueByCountry,
  revenueByMonth,
  revenueByProductGroup,
} from "@/lib/demo-data";

const executiveSignals = [
  {
    title: "How is the business performing?",
    detail: "Revenue and gross margin are stable in this illustrative period, with visible variation by region and product group.",
    state: "Demonstration metric" as const,
  },
  {
    title: "What has changed?",
    detail: "Germany and selected product lines show deceleration signals that require deeper investigation.",
    state: "Demonstration metric" as const,
  },
  {
    title: "Where are the risks?",
    detail: "Margin pressure and finished-goods inventory buildup are flagged as management watch areas.",
    state: "Synthetic company data" as const,
  },
  {
    title: "Where are the opportunities?",
    detail: "Customer concentration and product mix analysis can help identify growth and profitability levers.",
    state: "Demonstration metric" as const,
  },
  {
    title: "What needs management attention now?",
    detail: "Validate decline drivers and margin assumptions with detailed BI reports and AI investigation workflows.",
    state: "Planned functionality" as const,
  },
];

export default function OverviewPage() {

  return (
    <div className="space-y-7">
      <section className="rn-card p-6 lg:p-7">
        <p className="rn-eyebrow">Executive Overview</p>
        <h1 className="rn-heading mt-3 text-3xl font-semibold">NEXORA Industries Enterprise Overview</h1>
        <p className="mt-3 text-sm rn-muted">
          Executive intelligence workspace focused on business performance, trends, risks, opportunities, and management priorities.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <DataStateTag label="Synthetic company data" />
          <DataStateTag label="Demonstration metric" />
          <DataStateTag label="Planned functionality" />
          <DataStateTag label="Real database value" />
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards
          .filter((card) => ["Total Revenue", "Gross Margin", "Countries", "Production Plants"].includes(card.title))
          .map((card) => (
          <KpiCard key={card.title} {...card} />
        ))}
      </section>

      <Panel title="Executive Briefing" subtitle="Summary signals for board and leadership discussion">
        <div className="grid gap-3 lg:grid-cols-2">
          {executiveSignals.map((signal) => (
            <article key={signal.title} className="rn-card-soft p-3">
              <p className="text-sm font-medium text-slate-800">{signal.title}</p>
              <p className="mt-1 text-sm rn-muted">{signal.detail}</p>
              <div className="mt-2">
                <DataStateTag label={signal.state} />
              </div>
            </article>
          ))}
        </div>
      </Panel>

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
        <Panel title="Drill-down Navigation" subtitle="Executive summary first, technical and analytical detail on demand">
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

        <Panel title="Observations and Exceptions" subtitle="Illustrative business observations; validate with deeper analysis">
          <ul className="space-y-3">
            {keyChangesAndExceptions.map((entry) => (
              <li key={entry.title} className="rn-card-soft p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-slate-800">{entry.title}</p>
                  <DataStateTag label={entry.state} />
                </div>
                <p className="mt-1 text-sm rn-muted">{entry.detail}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </section>
    </div>
  );
}
