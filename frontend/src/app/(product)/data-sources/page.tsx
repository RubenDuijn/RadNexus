import { Panel } from "@/components/ui/panel";
import { StatusBadge } from "@/components/ui/status-badge";

const sources = [
  {
    source: "SAP / ERP replication",
    status: "Planned",
    detail: "Primary enterprise source system. Mapping to SAP-inspired schema is in progress.",
  },
  {
    source: "Secondary ERP and non-SAP systems",
    status: "Planned",
    detail: "Architecture supports adding additional ERP and database connectors beyond SAP.",
  },
  {
    source: "External macroeconomic indicators",
    status: "Planned",
    detail: "ECB, OECD and industrial indices are planned as separate curated datasets.",
  },
  {
    source: "Backend health probes",
    status: "Implemented",
    detail: "FastAPI health and database connectivity probes are integrated.",
  },
];

export default function DataSourcesPage() {
  return (
    <div className="space-y-7">
      <section>
        <h1 className="rn-heading text-3xl font-semibold">Data Sources</h1>
        <p className="mt-3 text-sm rn-muted">Inventory of implemented and planned data source integrations.</p>
      </section>

      <Panel title="Source Registry" subtitle="Implementation and connectivity state by source family">
        <ul className="space-y-3">
          {sources.map((item) => (
            <li key={item.source} className="rn-card-soft p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium text-slate-800">{item.source}</p>
                <StatusBadge status={item.status === "Implemented" ? "Available" : "Planned"} />
              </div>
              <p className="mt-2 text-sm rn-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
