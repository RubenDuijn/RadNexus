import { RevenueBarChart } from "@/components/charts/revenue-bar-chart";
import { RevenueLineChart } from "@/components/charts/revenue-line-chart";
import { DataStateTag } from "@/components/ui/data-state-tag";
import { Panel } from "@/components/ui/panel";
import { revenueByCountry, revenueByMonth, revenueByProductGroup } from "@/lib/demo-data";

const reportCategories = [
  "Sales performance",
  "Customer profitability",
  "Product profitability",
  "Country performance",
  "Gross margin",
  "Inventory",
  "Purchasing",
  "Finance",
];

const profitabilityDemo = [
  { customer: "Helios Industriehandel", revenue: 49.8, margin: 18.2 },
  { customer: "Nova Equipos SL", revenue: 37.4, margin: 13.1 },
  { customer: "Apex Manufacturing", revenue: 44.1, margin: 20.4 },
  { customer: "Nordic Process AB", revenue: 29.6, margin: 16.8 },
];

export default function BusinessIntelligencePage() {
  return (
    <div className="space-y-7">
      <section>
        <h1 className="rn-heading text-3xl font-semibold">Business Intelligence Workspace</h1>
        <p className="mt-3 text-sm rn-muted">
          Structured management reporting prepared for deterministic SQL and Python business logic outputs.
        </p>
      </section>

      <Panel title="Report Catalog" subtitle="Planned management reporting families">
        <div className="flex flex-wrap gap-2">
          {reportCategories.map((category) => (
            <span
              key={category}
              className="rn-chip px-3 py-1.5 text-xs font-medium"
            >
              {category}
            </span>
          ))}
        </div>
      </Panel>

      <Panel title="Reporting Controls" subtitle="Illustrative control surface while backend query endpoints are pending">
        <div className="grid gap-3 lg:grid-cols-4">
          <label className="space-y-1">
            <span className="text-xs uppercase tracking-[0.12em] text-slate-500">Reporting period</span>
            <select className="rn-control">
              <option>FY 2026 - Q4</option>
              <option>FY 2026 - Q3</option>
            </select>
          </label>
          <label className="space-y-1">
            <span className="text-xs uppercase tracking-[0.12em] text-slate-500">Country filter</span>
            <select className="rn-control">
              <option>All countries</option>
              <option>Germany</option>
              <option>France</option>
              <option>Spain</option>
            </select>
          </label>
          <label className="space-y-1">
            <span className="text-xs uppercase tracking-[0.12em] text-slate-500">Product group</span>
            <select className="rn-control">
              <option>All groups</option>
              <option>Industrial Components</option>
              <option>Automation Modules</option>
              <option>Energy Systems</option>
            </select>
          </label>
          <div className="flex items-end gap-2">
            <button
              type="button"
              className="rn-btn-primary rounded-md px-3 py-2 text-sm"
            >
              Apply filters
            </button>
            <button
              type="button"
              className="rn-btn-secondary rounded-md px-3 py-2 text-sm"
            >
              Export CSV
            </button>
          </div>
        </div>
      </Panel>

      <section className="grid gap-4 md:grid-cols-4">
        <Panel title="Revenue" subtitle="Illustrative metric">
          <p className="text-3xl font-semibold text-slate-800">EUR 428.6M</p>
          <div className="mt-2">
            <DataStateTag label="Illustrative metric" />
          </div>
        </Panel>
        <Panel title="Gross Margin" subtitle="Illustrative metric">
          <p className="text-3xl font-semibold text-slate-800">31.4%</p>
          <div className="mt-2">
            <DataStateTag label="Illustrative metric" />
          </div>
        </Panel>
        <Panel title="Inventory Value" subtitle="Planned SQL measure">
          <p className="text-3xl font-semibold text-slate-700">EUR 96.8M</p>
          <div className="mt-2">
            <DataStateTag label="Planned data" />
          </div>
        </Panel>
        <Panel title="Purchasing Cost Pressure" subtitle="Planned SQL + semantic layer output">
          <p className="text-3xl font-semibold text-slate-700">N/A</p>
          <div className="mt-2">
            <DataStateTag label="Planned data" />
          </div>
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Panel title="Sales by Month" subtitle="Illustrative metric">
          <RevenueLineChart data={revenueByMonth} />
        </Panel>
        <Panel title="Sales by Country" subtitle="Illustrative metric">
          <RevenueBarChart data={revenueByCountry} xKey="country" yKey="revenue" />
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Panel title="Product Group Revenue" subtitle="Illustrative metric">
          <RevenueBarChart data={revenueByProductGroup} xKey="group" yKey="revenue" />
        </Panel>
        <Panel title="Customer Profitability" subtitle="Illustrative metric">
          <RevenueBarChart data={profitabilityDemo} xKey="customer" yKey="margin" />
        </Panel>
      </section>

      <Panel title="Detailed Report Table" subtitle="Illustrative rows for layout and export workflow">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="rn-table-head text-xs uppercase tracking-[0.12em]">
                <th className="py-2 pr-4">Customer</th>
                <th className="py-2 pr-4">Revenue (EUR M)</th>
                <th className="py-2 pr-4">Margin (%)</th>
                <th className="py-2">Data State</th>
              </tr>
            </thead>
            <tbody>
              {profitabilityDemo.map((row) => (
                <tr key={row.customer} className="rn-table-row">
                  <td className="py-2 pr-4">{row.customer}</td>
                  <td className="py-2 pr-4">{row.revenue.toFixed(1)}</td>
                  <td className="py-2 pr-4">{row.margin.toFixed(1)}</td>
                  <td className="py-2">
                    <DataStateTag label="Illustrative metric" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
