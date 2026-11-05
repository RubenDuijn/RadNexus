import Link from "next/link";
import { notFound } from "next/navigation";

import { Panel } from "@/components/ui/panel";
import { StatusBadge } from "@/components/ui/status-badge";
import { tableCatalog } from "@/lib/schema-catalog";
import { getPreviewRows } from "@/lib/table-preview";

export default async function TableDetailPage({ params }: { params: Promise<{ table: string }> }) {
  const { table } = await params;
  const tableName = table.toUpperCase();
  const meta = tableCatalog.find((item) => item.name === tableName);

  if (!meta) {
    notFound();
  }

  const previewRows = getPreviewRows(tableName);
  const columns = previewRows.length > 0 ? Object.keys(previewRows[0]) : [];
  const hasFieldMetadata = meta.implementationStatus === "Implemented" && meta.fields.length > 0;

  return (
    <div className="space-y-6">
      <div>
        <Link href="/data-explorer" className="text-sm text-cyan-300 hover:text-cyan-200">
          Back to catalog
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-slate-100">{meta.name}</h1>
        <p className="mt-1 text-sm text-slate-400">{meta.description}</p>
      </div>

      <Panel title="Table Context" subtitle="Business and implementation metadata">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Business area</p>
            <p className="mt-1 text-sm text-slate-200">{meta.area}</p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">SAP source mapping</p>
            <p className="mt-1 text-sm text-slate-200">{meta.sapSourceTable}</p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Implementation status</p>
            <p className="mt-2 text-sm text-slate-200">{meta.implementationStatus}</p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Connection status</p>
            <div className="mt-2">
              <StatusBadge status={meta.connectionStatus === "Available" ? "Available" : "Not Connected"} />
            </div>
          </div>
        </div>
      </Panel>

      <Panel title="Keys and Relationships" subtitle="Primary keys, foreign keys, and relationship dependencies">
        <div className="grid gap-3 lg:grid-cols-3">
          <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Primary keys</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-200">
              {meta.primaryKeys.length > 0 ? meta.primaryKeys.map((key) => <li key={key}>{key}</li>) : <li>Not defined</li>}
            </ul>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Foreign keys</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-200">
              {meta.foreignKeys.length > 0 ? meta.foreignKeys.map((key) => <li key={key}>{key}</li>) : <li>Not defined</li>}
            </ul>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Relationships</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-200">
              {meta.relationships.map((relationship) => (
                <li key={relationship}>{relationship}</li>
              ))}
            </ul>
          </div>
        </div>
      </Panel>

      <Panel title="Field Definitions" subtitle="Current schema tranche metadata">
        {!hasFieldMetadata ? (
          <p className="text-sm text-slate-400">No field metadata is available yet. This table remains in planned state.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-xs uppercase tracking-[0.12em] text-slate-400">
                  <th className="py-2 pr-4">Field</th>
                  <th className="py-2 pr-4">Type</th>
                  <th className="py-2 pr-4">Key</th>
                  <th className="py-2 pr-4">Nullable</th>
                  <th className="py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                {meta.fields.map((field) => (
                  <tr key={field.name} className="border-b border-slate-900 text-slate-200">
                    <td className="py-2 pr-4 font-mono">{field.name}</td>
                    <td className="py-2 pr-4">{field.dataType}</td>
                    <td className="py-2 pr-4">{field.key || "-"}</td>
                    <td className="py-2 pr-4">{field.nullable ? "Yes" : "No"}</td>
                    <td className="py-2">{field.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      <Panel title="Rad Nexus Extension Fields" subtitle="Platform-specific semantic extension layer">
        <ul className="space-y-2 text-sm text-slate-300">
          {meta.radNexusExtensions.map((extension) => (
            <li key={extension} className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 font-mono text-slate-200">
              {extension}
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Record and Sample Availability" subtitle="Connection and sample row readiness">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Record count</p>
            <p className="mt-2 text-sm text-slate-200">
              {meta.recordCount === null ? "Not connected to runtime count endpoint" : meta.recordCount.toLocaleString()}
            </p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Sample records status</p>
            <div className="mt-2">
              <StatusBadge status={meta.sampleRecordsState === "Available" ? "Available" : "Not Connected"} />
            </div>
          </div>
        </div>
      </Panel>

      <Panel title="Sample Records" subtitle="Illustrative demonstration rows when available">
        {previewRows.length === 0 ? (
          <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 text-sm text-slate-400">
            No sample rows are available for {meta.name}. Sample data is not connected for this table.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-xs uppercase tracking-[0.12em] text-slate-400">
                  {columns.map((column) => (
                    <th key={column} className="py-2 pr-4">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewRows.map((row, index) => (
                  <tr key={`${tableName}-${index}`} className="border-b border-slate-900 text-slate-200">
                    {columns.map((column) => (
                      <td key={column} className="py-2 pr-4">
                        {String(row[column])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}
