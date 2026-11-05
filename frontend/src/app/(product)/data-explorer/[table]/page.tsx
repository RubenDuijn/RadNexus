import Link from "next/link";
import { notFound } from "next/navigation";

import { Panel } from "@/components/ui/panel";
import { Reveal } from "@/components/ui/reveal";
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
  const hasFieldMetadata = meta.fields.length > 0;

  return (
    <div className="space-y-7">
      <Reveal>
        <div>
          <Link href="/data-explorer" className="text-sm text-[var(--accent)] hover:text-[#1f5263]">
            Back to catalog
          </Link>
          <h1 className="rn-heading mt-2 text-3xl font-semibold">{meta.name}</h1>
          <p className="mt-1 text-sm rn-muted">{meta.description}</p>
        </div>
      </Reveal>

      <Reveal delayMs={40}>
        <Panel title="Table Context" subtitle="Business and implementation metadata">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rn-card-soft p-3">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Business area</p>
            <p className="mt-1 text-sm text-slate-700">{meta.area}</p>
          </div>
          <div className="rn-card-soft p-3">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">SAP source mapping</p>
            <p className="mt-1 text-sm text-slate-700">{meta.sapSourceTable}</p>
          </div>
          <div className="rn-card-soft p-3">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Implementation status</p>
            <p className="mt-2 text-sm text-slate-700">{meta.implementationStatus}</p>
          </div>
          <div className="rn-card-soft p-3">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Connection status</p>
            <div className="mt-2">
              <StatusBadge status={meta.connectionStatus === "Available" ? "Available" : "Not Connected"} />
            </div>
          </div>
        </div>
        </Panel>
      </Reveal>

      <Reveal delayMs={80}>
        <Panel title="Keys and Relationships" subtitle="Primary keys, foreign keys, and relationship dependencies">
        <div className="grid gap-3 lg:grid-cols-3">
          <div className="rn-card-soft p-3">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Primary keys</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              {meta.primaryKeys.length > 0 ? meta.primaryKeys.map((key) => <li key={key}>{key}</li>) : <li>Not defined</li>}
            </ul>
          </div>
          <div className="rn-card-soft p-3">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Foreign keys</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              {meta.foreignKeys.length > 0 ? meta.foreignKeys.map((key) => <li key={key}>{key}</li>) : <li>Not defined</li>}
            </ul>
          </div>
          <div className="rn-card-soft p-3">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Relationships</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              {meta.relationships.map((relationship) => (
                <li key={relationship}>{relationship}</li>
              ))}
            </ul>
          </div>
        </div>
        </Panel>
      </Reveal>

      <Reveal delayMs={120}>
        <Panel title="Field Definitions" subtitle="Current schema tranche metadata">
        {!hasFieldMetadata ? (
          <p className="text-sm rn-muted">
            No field metadata is available yet. Current implementation status: {meta.implementationStatus}.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="rn-table-head text-xs uppercase tracking-[0.12em]">
                  <th className="py-2 pr-4">Field</th>
                  <th className="py-2 pr-4">Type</th>
                  <th className="py-2 pr-4">Key</th>
                  <th className="py-2 pr-4">Nullable</th>
                  <th className="py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                {meta.fields.map((field) => (
                  <tr key={field.name} className="rn-table-row">
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
      </Reveal>

      <Reveal delayMs={160}>
        <Panel title="Rad Nexus Extension Fields" subtitle="Platform-specific semantic extension layer">
        <ul className="space-y-2 text-sm text-slate-700">
          {meta.radNexusExtensions.map((extension) => (
            <li key={extension} className="rn-card-soft px-3 py-2 font-mono text-slate-700">
              {extension}
            </li>
          ))}
        </ul>
        </Panel>
      </Reveal>

      <Reveal delayMs={200}>
        <Panel title="Record and Sample Availability" subtitle="Connection and sample row readiness">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rn-card-soft p-3">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Record count</p>
            <p className="mt-2 text-sm text-slate-700">
              {meta.recordCount === null ? "Not connected to runtime count endpoint" : meta.recordCount.toLocaleString()}
            </p>
          </div>
          <div className="rn-card-soft p-3">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Sample records status</p>
            <div className="mt-2">
              <StatusBadge status={meta.sampleRecordsState === "Available" ? "Available" : "Not Connected"} />
            </div>
          </div>
        </div>
        </Panel>
      </Reveal>

      <Reveal delayMs={240}>
        <Panel title="Sample Records" subtitle="Illustrative demonstration rows when available">
        {previewRows.length === 0 ? (
          <div className="rn-card-soft p-4 text-sm rn-muted">
            No sample rows are available for {meta.name}. Sample data is not connected for this table.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="rn-table-head text-xs uppercase tracking-[0.12em]">
                  {columns.map((column) => (
                    <th key={column} className="py-2 pr-4">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewRows.map((row, index) => (
                  <tr key={`${tableName}-${index}`} className="rn-table-row">
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
      </Reveal>
    </div>
  );
}
