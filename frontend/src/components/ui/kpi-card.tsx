import { DataStateTag } from "@/components/ui/data-state-tag";
import { DataStateLabel } from "@/lib/demo-data";

type KpiCardProps = {
  title: string;
  value: string;
  note: string;
  dataState: DataStateLabel;
};

export function KpiCard({ title, value, note, dataState }: KpiCardProps) {
  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900/85 px-4 py-4">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{title}</p>
      <p className="mt-3 text-2xl font-semibold text-slate-100">{value}</p>
      <p className="mt-2 text-sm text-slate-400">{note}</p>
      <div className="mt-3">
        <DataStateTag label={dataState} />
      </div>
    </article>
  );
}
