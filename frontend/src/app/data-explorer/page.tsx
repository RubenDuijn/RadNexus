import Link from "next/link";

import { Panel } from "@/components/ui/panel";
import { areas, tableCatalog } from "@/lib/schema-catalog";

export default function DataExplorerPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-semibold text-slate-100">Data Explorer</h1>
        <p className="mt-2 text-sm text-slate-400">
          SAP-inspired catalog. Table descriptions and metadata are available now; live row preview endpoints are
          planned.
        </p>
      </section>

      <section className="space-y-4">
        {areas.map((area) => {
          const areaTables = tableCatalog.filter((table) => table.area === area);

          return (
            <Panel key={area} title={area}>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 text-xs uppercase tracking-[0.12em] text-slate-400">
                      <th className="py-2 pr-4">Table</th>
                      <th className="py-2 pr-4">Description</th>
                      <th className="py-2 pr-4">Status</th>
                      <th className="py-2 pr-4">Fields</th>
                      <th className="py-2">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {areaTables.map((table) => (
                      <tr key={table.name} className="border-b border-slate-900 text-slate-200">
                        <td className="py-2 pr-4 font-mono text-blue-200">{table.name}</td>
                        <td className="py-2 pr-4">{table.description}</td>
                        <td className="py-2 pr-4">{table.status}</td>
                        <td className="py-2 pr-4">{table.fields.length}</td>
                        <td className="py-2">
                          <Link
                            href={`/data-explorer/${table.name}`}
                            className="inline-flex rounded-md border border-blue-500/50 bg-blue-500/10 px-2 py-1 text-xs text-blue-200"
                          >
                            Open
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          );
        })}
      </section>
    </div>
  );
}
