import { Panel } from "@/components/ui/panel";

const sources = [
  {
    source: "SAP / ERP replication",
    status: "Planned",
    detail: "Primary enterprise source system. Mapping to SAP-like schema in progress.",
  },
  {
    source: "External macroeconomic indicators",
    status: "Planned",
    detail: "ECB, OECD and industrial indices are planned as separate curated datasets.",
  },
  {
    source: "Frontend status probes",
    status: "Implemented",
    detail: "FastAPI health and database connectivity probes are integrated.",
  },
];

export default function DataSourcesPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-semibold text-slate-100">Data Sources</h1>
        <p className="mt-2 text-sm text-slate-400">Inventory of implemented and planned data source integrations.</p>
      </section>

      <Panel title="Source Registry">
        <ul className="space-y-3">
          {sources.map((item) => (
            <li key={item.source} className="rounded-lg border border-slate-800 bg-slate-950 p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium text-slate-200">{item.source}</p>
                <span className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300">{item.status}</span>
              </div>
              <p className="mt-2 text-sm text-slate-400">{item.detail}</p>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
