import Link from "next/link";

import { RevenueBarChart } from "@/components/charts/revenue-bar-chart";
import { RevenueLineChart } from "@/components/charts/revenue-line-chart";
import { DataStateTag } from "@/components/ui/data-state-tag";
import { KpiCard } from "@/components/ui/kpi-card";
import { Panel } from "@/components/ui/panel";
import { Reveal } from "@/components/ui/reveal";
import {
  businessActivity,
  customerConcentrationDemo,
  inventoryPositionDemo,
  keyChangesAndExceptions,
  kpiCards,
  platformActivity,
  revenueByCountry,
  revenueByMonth,
  revenueByProductGroup,
} from "@/lib/demo-data";

const executiveSignals = [
  {
    title: "How is the business performing?",
    detail: "Illustrative revenue and gross-margin indicators suggest a stable period with variation by region and product group.",
    state: "Illustrative metric" as const,
  },
  {
    title: "What has changed?",
    detail: "Illustrative scenarios flag potential deceleration in Germany and selected product lines for deeper investigation.",
    state: "Illustrative metric" as const,
  },
  {
    title: "Where are the risks?",
    detail: "Hypothetical margin pressure and inventory buildup are highlighted as management watchpoints.",
    state: "Illustrative metric" as const,
  },
  {
    title: "Where are the opportunities?",
    detail: "Customer concentration and product mix analysis can identify growth and profitability levers when connected data is available.",
    state: "Planned data" as const,
  },
  {
    title: "What needs management attention now?",
    detail: "Validate decline drivers and margin assumptions with detailed BI reports and AI investigation workflows.",
    state: "Planned data" as const,
  },
];

export default function OverviewPage() {
  return (
    <div className="space-y-7">
      <Reveal>
        <section className="rn-card p-6 lg:p-7">
          <p className="rn-eyebrow">Executive Overview</p>
          <h1 className="rn-heading mt-3 text-3xl font-semibold">NEXORA Industries Enterprise Overview</h1>
          <p className="mt-3 text-sm rn-muted">
            Executive intelligence workspace focused on business performance, trends, risks, opportunities, and management priorities.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <DataStateTag label="Synthetic demonstration data" />
            <DataStateTag label="Illustrative metric" />
            <DataStateTag label="Planned data" />
            <DataStateTag label="Unavailable data" />
          </div>
        </section>
      </Reveal>

      <Reveal delayMs={40}>
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpiCards
            .filter((card) => ["Total Revenue", "Gross Margin", "Countries", "Production Plants"].includes(card.title))
            .map((card) => (
              <KpiCard key={card.title} {...card} animateValue />
            ))}
        </section>
      </Reveal>

      <Reveal delayMs={80}>
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
      </Reveal>

      <Reveal delayMs={120}>
        <section className="grid gap-4 xl:grid-cols-2">
          <Panel title="Sales Development" subtitle="Illustrative metric - SQL-backed trend calculations pending">
            <RevenueLineChart data={revenueByMonth} />
          </Panel>
          <Panel title="Country Performance" subtitle="Illustrative metric - country variance report planned">
            <RevenueBarChart data={revenueByCountry} xKey="country" yKey="revenue" />
          </Panel>
        </section>
      </Reveal>

      <Reveal delayMs={160}>
        <section className="grid gap-4 xl:grid-cols-2">
          <Panel title="Product Group Performance" subtitle="Illustrative metric - product profitability drill-down planned">
            <RevenueBarChart data={revenueByProductGroup} xKey="group" yKey="revenue" />
          </Panel>
          <Panel title="Customer Concentration" subtitle="Synthetic demonstration data - concentration analytics scaffold">
            <RevenueBarChart data={customerConcentrationDemo} xKey="customer" yKey="share" />
          </Panel>
        </section>
      </Reveal>

      <Reveal delayMs={200}>
        <section className="grid gap-4 xl:grid-cols-2">
          <Panel title="Inventory Position" subtitle="Illustrative metric - inventory valuation logic pending SQL layer">
            <RevenueBarChart data={inventoryPositionDemo} xKey="category" yKey="amount" />
          </Panel>
          <Panel title="Important Changes and Exceptions" subtitle="Current illustrative signal feed">
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
      </Reveal>

      <Reveal delayMs={240}>
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

          <Panel title="Business Observation Stream" subtitle="Illustrative business observations; validate with deeper analysis">
            <ul className="space-y-3">
              {businessActivity.map((entry) => (
                <li key={entry.title} className="rn-card-soft p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium text-slate-800">{entry.title}</p>
                    <DataStateTag label="Illustrative metric" />
                  </div>
                  <p className="mt-1 text-sm rn-muted">{entry.detail}</p>
                </li>
              ))}
            </ul>
          </Panel>
        </section>
      </Reveal>

      <Reveal delayMs={280}>
        <Panel title="Platform Activity Stream" subtitle="Implementation and platform events shown separately from executive business signals">
          <ul className="space-y-3">
            {platformActivity.map((entry) => (
              <li key={entry.title} className="rn-card-soft p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-slate-800">{entry.title}</p>
                  <span className="text-xs uppercase tracking-[0.12em] text-slate-500">{entry.source}</span>
                </div>
                <p className="mt-1 text-sm rn-muted">{entry.detail}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </Reveal>
    </div>
  );
}
