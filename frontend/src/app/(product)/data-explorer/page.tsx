"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Panel } from "@/components/ui/panel";
import { Reveal } from "@/components/ui/reveal";
import { StatusBadge } from "@/components/ui/status-badge";
import { areas, ImplementationStatus, TableArea, tableCatalog } from "@/lib/schema-catalog";

const implementationStatuses: ImplementationStatus[] = [
  "Implemented",
  "In development",
  "Planned",
  "Not started",
  "Unavailable",
];

const implementationStyles: Record<ImplementationStatus, string> = {
  Implemented: "rn-badge",
  "In development": "rn-badge",
  Planned: "rn-badge",
  "Not started": "rn-badge",
  Unavailable: "rn-badge",
};

export default function DataExplorerPage() {
  const [query, setQuery] = useState("");
  const [areaFilter, setAreaFilter] = useState<TableArea | "All">("All");
  const [implementationFilter, setImplementationFilter] = useState<"All" | ImplementationStatus>("All");

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
    <div className="space-y-7">
      <Reveal>
        <section>
          <h1 className="rn-heading text-3xl font-semibold">Data Explorer</h1>
          <p className="mt-3 text-sm rn-muted">
            SAP-inspired catalog with implementation metadata, relationship structure, and explicit connection status.
          </p>
        </section>
      </Reveal>

      <Reveal delayMs={40}>
        <Panel title="Catalog Filters" subtitle="Search by table, business meaning, or SAP source mapping">
        <div className="grid gap-3 md:grid-cols-3">
          <label className="space-y-1">
            <span className="text-xs uppercase tracking-[0.12em] text-slate-500">Search</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="e.g. KNA1, inventory, SAP MARA"
              className="rn-control"
            />
          </label>
          <label className="space-y-1">
            <span className="text-xs uppercase tracking-[0.12em] text-slate-500">Business Area</span>
            <select
              value={areaFilter}
              onChange={(event) => setAreaFilter(event.target.value as TableArea | "All")}
              className="rn-control"
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
            <span className="text-xs uppercase tracking-[0.12em] text-slate-500">Implementation</span>
            <select
              value={implementationFilter}
              onChange={(event) =>
                setImplementationFilter(event.target.value as "All" | ImplementationStatus)
              }
              className="rn-control"
            >
              <option value="All">All</option>
              {implementationStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
        </div>
        </Panel>
      </Reveal>

      <Reveal delayMs={80}>
        <Panel
          title="Table Registry"
          subtitle={`${filteredTables.length} table entries shown. Implementation status indicates backend schema and field metadata readiness.`}
        >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead>
              <tr className="rn-table-head text-xs uppercase tracking-[0.12em]">
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
                <tr key={table.name} className="rn-table-row">
                  <td className="py-2 pr-4 font-mono text-[var(--accent)]">{table.name}</td>
                  <td className="py-2 pr-4">{table.description}</td>
                  <td className="py-2 pr-4">{table.area}</td>
                  <td className="py-2 pr-4">
                    <span className={implementationStyles[table.implementationStatus]}>
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
                      className="rn-btn-secondary inline-flex rounded-md px-2 py-1 text-xs"
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
      </Reveal>
    </div>
  );
}
