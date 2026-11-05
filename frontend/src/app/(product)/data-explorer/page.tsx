"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Panel } from "@/components/ui/panel";
import { StatusBadge } from "@/components/ui/status-badge";
import { areas, TableArea, tableCatalog } from "@/lib/schema-catalog";

export default function DataExplorerPage() {
  const [query, setQuery] = useState("");
  const [areaFilter, setAreaFilter] = useState<TableArea | "All">("All");
  const [implementationFilter, setImplementationFilter] = useState<"All" | "Implemented" | "Planned">("All");

  const filteredTables = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return tableCatalog.filter((table) => {
      const matchesArea = areaFilter === "All" || table.area === areaFilter;
      const matchesImplementation =
        implementationFilter === "All" || table.implementationStatus === implementationFilter;
      const matchesQuery =
        normalized.length === 0 ||
        table.name.toLowerCase().includes(normalized) ||
        table.description.toLowerCase().includes(normalized) ||
        table.sapSourceTable.toLowerCase().includes(normalized);

      return matchesArea && matchesImplementation && matchesQuery;
    });
  }, [areaFilter, implementationFilter, query]);

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-semibold text-slate-100">Data Explorer</h1>
        <p className="mt-2 text-sm text-slate-400">
          SAP-inspired catalog with implementation metadata, relationship structure, and explicit connection status.
        </p>
      </section>

      <Panel title="Catalog Filters" subtitle="Search by table, business meaning, or SAP source mapping">
        <div className="grid gap-3 md:grid-cols-3">
          <label className="space-y-1">
            <span className="text-xs uppercase tracking-[0.12em] text-slate-400">Search</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="e.g. KNA1, inventory, SAP MARA"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-400/50"
            />
          </label>
          <label className="space-y-1">
            <span className="text-xs uppercase tracking-[0.12em] text-slate-400">Business Area</span>
            <select
              value={areaFilter}
              onChange={(event) => setAreaFilter(event.target.value as TableArea | "All")}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-400/50"
            >
              <option value="All">All</option>
              {areas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1">
            <span className="text-xs uppercase tracking-[0.12em] text-slate-400">Implementation</span>
            <select
              value={implementationFilter}
              onChange={(event) =>
                setImplementationFilter(event.target.value as "All" | "Implemented" | "Planned")
              }
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-400/50"
            >
              <option value="All">All</option>
              <option value="Implemented">Implemented</option>
              <option value="Planned">Planned</option>
            </select>
          </label>
        </div>
      </Panel>

      <Panel
        title="Table Registry"
        subtitle={`${filteredTables.length} table entries shown. Implemented requires backend schema and field metadata.`}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-xs uppercase tracking-[0.12em] text-slate-400">
                <th className="py-2 pr-4">Table</th>
                <th className="py-2 pr-4">Business Description</th>
                <th className="py-2 pr-4">Area</th>
                <th className="py-2 pr-4">Implementation</th>
                <th className="py-2 pr-4">Connection</th>
                <th className="py-2 pr-4">Sample Records</th>
                <th className="py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredTables.map((table) => (
                <tr key={table.name} className="border-b border-slate-900 text-slate-200">
                  <td className="py-2 pr-4 font-mono text-cyan-200">{table.name}</td>
                  <td className="py-2 pr-4">{table.description}</td>
                  <td className="py-2 pr-4">{table.area}</td>
                  <td className="py-2 pr-4">
                    <span
                      className={[
                        "rounded-md border px-2 py-1 text-xs font-medium",
                        table.implementationStatus === "Implemented"
                          ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-200"
                          : "border-sky-400/40 bg-sky-500/10 text-sky-200",
                      ].join(" ")}
                    >
                      {table.implementationStatus}
                    </span>
                  </td>
                  <td className="py-2 pr-4">
                    <StatusBadge status={table.connectionStatus === "Available" ? "Available" : "Not Connected"} />
                  </td>
                  <td className="py-2 pr-4">
                    <StatusBadge
                      status={table.sampleRecordsState === "Available" ? "Available" : "Not Connected"}
                    />
                  </td>
                  <td className="py-2">
                    <Link
                      href={`/data-explorer/${table.name}`}
                      className="inline-flex rounded-md border border-cyan-500/50 bg-cyan-500/10 px-2 py-1 text-xs text-cyan-100"
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
    </div>
  );
}
