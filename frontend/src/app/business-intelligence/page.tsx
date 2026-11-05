import { RevenueBarChart } from "@/components/charts/revenue-bar-chart";
import { RevenueLineChart } from "@/components/charts/revenue-line-chart";
import { Panel } from "@/components/ui/panel";
import { revenueByCountry, revenueByMonth, revenueByProductGroup } from "@/lib/demo-data";

const profitabilityDemo = [
  { customer: "Helios Industriehandel", margin: 18.2 },
  { customer: "Nova Equipos SL", margin: 13.1 },
  { customer: "Apex Manufacturing", margin: 20.4 },
  { customer: "Nordic Process AB", margin: 16.8 },
];

export default function BusinessIntelligencePage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-semibold text-slate-100">Business Intelligence</h1>
        <p className="mt-2 text-sm text-slate-400">
          Reporting workspace prepared for deterministic SQL-backed metrics. Current visuals use clearly labelled
          demonstration data.
        </p>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Panel title="Sales by Month" subtitle="Demonstration data">
          <RevenueLineChart data={revenueByMonth} />
        </Panel>
        <Panel title="Sales by Country" subtitle="Demonstration data">
          <RevenueBarChart data={revenueByCountry} xKey="country" yKey="revenue" />
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Panel title="Revenue by Product Group" subtitle="Demonstration data">
          <RevenueBarChart data={revenueByProductGroup} xKey="group" yKey="revenue" />
        </Panel>
        <Panel title="Customer Profitability" subtitle="Demonstration data">
          <RevenueBarChart data={profitabilityDemo} xKey="customer" yKey="margin" />
        </Panel>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Panel title="Gross Margin" subtitle="Demonstration metric">
          <p className="text-3xl font-semibold text-blue-200">31.4%</p>
        </Panel>
        <Panel title="Inventory Valuation" subtitle="Demonstration metric">
          <p className="text-3xl font-semibold text-blue-200">EUR 96.8M</p>
        </Panel>
        <Panel title="Data Source State" subtitle="Backend reporting endpoints pending">
          <p className="text-sm text-slate-300">Prepared for SQL report endpoints in upcoming backend iterations.</p>
        </Panel>
      </section>
    </div>
  );
}
