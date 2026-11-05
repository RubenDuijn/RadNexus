import Link from "next/link";
import { notFound } from "next/navigation";

import { Panel } from "@/components/ui/panel";
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

  return (
    <div className="space-y-6">
      <div>
        <Link href="/data-explorer" className="text-sm text-blue-300 hover:text-blue-200">
          Back to catalog
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-slate-100">{meta.name}</h1>
        <p className="mt-1 text-sm text-slate-400">{meta.description}</p>
      </div>

      <Panel title="Field Definitions" subtitle="Current schema tranche metadata">
        {meta.fields.length === 0 ? (
          <p className="text-sm text-slate-400">No field metadata yet. Table is planned and not implemented.</p>
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

      <Panel title="Relationships" subtitle="Foreign key and dependency map">
        <ul className="space-y-2 text-sm text-slate-300">
          {meta.relationships.map((relationship) => (
            <li key={relationship} className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
              {relationship}
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Data Preview" subtitle="Demonstration snapshot until table preview endpoints are introduced">
        {previewRows.length === 0 ? (
          <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 text-sm text-slate-400">
            No preview rows are available yet for {meta.name}. This table is currently in a metadata-only state.
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
