import Link from "next/link";

import { RevenueByCountryMonthLive } from "@/components/overview/revenue-by-country-month-live";
import { RevenueBarChart } from "@/components/charts/revenue-bar-chart";
import { RevenueLineChart } from "@/components/charts/revenue-line-chart";
import { DataStateTag } from "@/components/ui/data-state-tag";
import { KpiCard } from "@/components/ui/kpi-card";
import { Panel } from "@/components/ui/panel";
import { Reveal } from "@/components/ui/reveal";
import { WorkspaceContext } from "@/components/ui/workspace-context";
import { tableCatalog } from "@/lib/schema-catalog";
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

const aiExampleQuestions = [
  "Why did revenue decline in Germany last quarter?",
  "Which customers generate the highest margins?",
  "Which products have growing sales but declining profitability?",
  "Where is inventory increasing?",
  "Which suppliers are putting pressure on costs?",
];

const sapFoundationGroups = [
  {
    title: "Sales",
    tables: [
      { name: "VBAK", description: "Sales Document Header" },
      { name: "VBAP", description: "Sales Document Items" },
      { name: "LIKP", description: "Delivery Header" },
      { name: "LIPS", description: "Delivery Items" },
      { name: "VBRK", description: "Billing Header" },
      { name: "VBRP", description: "Billing Items" },
    ],
  },
  {
    title: "Customers",
    tables: [
      { name: "KNA1", description: "General Customer Data" },
      { name: "KNB1", description: "Customer Company Code Data" },
    ],
  },
  {
    title: "Materials and Inventory",
    tables: [
      { name: "MARA", description: "General Material Data" },
      { name: "MARC", description: "Material Plant Data" },
      { name: "MARD", description: "Storage Location Data" },
    ],
  },
  {
    title: "Purchasing and Suppliers",
    tables: [
      { name: "EKKO", description: "Purchasing Document Header" },
      { name: "EKPO", description: "Purchasing Document Items" },
      { name: "LFA1", description: "Supplier General Data" },
      { name: "LFB1", description: "Supplier Company Code Data" },
    ],
  },
  {
    title: "Finance",
    tables: [
      { name: "BKPF", description: "Accounting Document Header" },
      { name: "BSEG", description: "Accounting Document Line Items" },
    ],
  },
];

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
  const groupedTables = sapFoundationGroups
    .map((group) => ({
      title: group.title,
      tables: group.tables
        .map((table) => {
          const catalog = tableCatalog.find((item) => item.name === table.name);
          if (!catalog) {
            return null;
          }

          return {
            ...table,
            area: catalog.area,
            implementationStatus: catalog.implementationStatus,
            hasData: catalog.sampleRecordsState === "Available",
          };
        })
        .filter((table): table is NonNullable<typeof table> => table !== null),
    }))
    .filter((group) => group.tables.length > 0);

  const prominentTableNames = ["VBAK", "VBRP", "KNA1", "MARA", "EKKO", "BKPF"];
  const prominentTables = groupedTables
    .flatMap((group) => group.tables)
    .filter((table) => prominentTableNames.includes(table.name));

  return (
    <div className="space-y-7">
      <Reveal>
        <section className="rn-card rn-overview-context-card p-6 lg:p-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)] sm:hidden">Overview</p>
          <p className="rn-eyebrow hidden sm:block">Executive Overview</p>
          <div className="mt-3">
            <WorkspaceContext />
          </div>
          <h2 className="rn-heading mt-3 text-3xl font-semibold">NEXORA Industries Enterprise Overview</h2>
          <p className="mt-3 text-sm rn-muted">
            Executive intelligence workspace focused on business performance, trends, risks, opportunities, and management priorities.
          </p>
        </section>
      </Reveal>

      <Reveal>
        <section className="grid gap-4 xl:grid-cols-2">
          <article className="rn-card p-6 lg:p-7">
            <p className="rn-eyebrow">AI Intelligence Workspace</p>
            <h1 className="rn-heading mt-3 text-3xl font-semibold">Ask your enterprise data.</h1>
            <h2 className="mt-2 text-xl font-semibold text-slate-800">Get business intelligence in natural language.</h2>
            <p className="mt-3 text-sm rn-muted">
              Explore sales, profitability, customers, inventory and operations. Ask questions that previously required weeks of reporting development.
            </p>

            <div className="mt-5 rounded-2xl border border-[color-mix(in_srgb,var(--accent)_26%,white)] bg-[color-mix(in_srgb,var(--accent)_7%,white)] p-4 lg:p-5">
              <label htmlFor="overview-ai-question" className="text-xs font-semibold uppercase tracking-[0.13em] text-[var(--accent)]">
                Natural-language question
              </label>
              <textarea
                id="overview-ai-question"
                className="rn-control mt-2 h-28 resize-y border-[color-mix(in_srgb,var(--accent)_24%,white)] bg-white"
                placeholder="Ask a business question about enterprise data..."
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {aiExampleQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    className="rn-btn-secondary rounded-full px-3 py-1.5 text-xs"
                  >
                    {question}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs rn-muted">Preview interface only. Live AI query execution requires backend and database connectivity.</p>
                <button type="button" className="rn-btn-primary rounded-md px-4 py-2 text-sm">
                  Submit question
                </button>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <DataStateTag label="Planned data" />
              <span className="rn-badge rn-badge-warning">Not Connected</span>
            </div>
          </article>

          <Panel
            title="Revenue Development"
            subtitle="Synthetic demonstration data - monthly trend shown as a representative executive signal"
          >
            <div className="space-y-5">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Monthly Revenue Trend</p>
                <RevenueLineChart data={revenueByMonth} />
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Revenue by Country</p>
                <RevenueBarChart data={revenueByCountry} xKey="country" yKey="revenue" />
              </div>
            </div>
            <div className="mt-3">
              <DataStateTag label="Synthetic demonstration data" />
            </div>
          </Panel>
        </section>
      </Reveal>

      <Reveal delayMs={40}>
        <Panel
          title="Your SAP data. Your business intelligence."
          subtitle="Connect enterprise data structures across sales, finance, procurement, inventory and operations to create a unified foundation for business intelligence."
        >
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {prominentTables.map((table) => (
                <Link
                  key={table.name}
                  href={`/data-explorer/${table.name}`}
                  className="rn-nav-focus rn-card-soft block p-3 transition-colors hover:border-[var(--line-strong)] hover:bg-white"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-mono text-sm font-semibold text-[var(--accent)]">{table.name}</p>
                    {table.hasData && <span className="rn-badge rn-badge-success">Data available</span>}
                  </div>
                  <p className="mt-1 text-sm text-slate-700">{table.description}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-500">{table.area}</p>
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs rn-muted">Prominent enterprise tables for quick entry. Explore the full catalog in Data Explorer.</p>
              <Link href="/data-explorer" className="rn-btn-secondary rounded-md px-3 py-2 text-sm font-medium">
                Open Data Explorer
              </Link>
            </div>
          </div>
        </Panel>
      </Reveal>

      <Reveal delayMs={110}>
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpiCards
            .filter((card) => ["Total Revenue", "Gross Margin", "Countries", "Production Plants"].includes(card.title))
            .map((card) => (
              <KpiCard key={card.title} {...card} animateValue />
            ))}
        </section>
      </Reveal>

      <Reveal delayMs={130}>
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

      <Reveal delayMs={145}>
        <RevenueByCountryMonthLive />
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

      <Reveal delayMs={170}>
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

      <Reveal delayMs={170}>
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

      <Reveal delayMs={170}>
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
