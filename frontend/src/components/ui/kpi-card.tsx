type KpiCardProps = {
  title: string;
  value: string;
  note: string;
  dataState: string;
};

export function KpiCard({ title, value, note, dataState }: KpiCardProps) {
  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-4">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{title}</p>
      <p className="mt-3 text-2xl font-semibold text-slate-100">{value}</p>
      <p className="mt-2 text-sm text-slate-400">{note}</p>
      <p className="mt-3 inline-flex rounded-md border border-blue-500/40 bg-blue-500/10 px-2 py-1 text-xs text-blue-200">
        {dataState}
      </p>
    </article>
  );
}
