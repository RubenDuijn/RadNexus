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
    <article className="rn-card px-4 py-4">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{title}</p>
      <p className="mt-3 text-2xl font-semibold text-slate-800">{value}</p>
      <p className="mt-2 text-sm rn-muted">{note}</p>
      <div className="mt-3">
        <DataStateTag label={dataState} />
      </div>
    </article>
  );
}
