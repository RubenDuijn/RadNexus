import { DataStateLabel } from "@/lib/demo-data";

type DataStateTagProps = {
  label: DataStateLabel;
};

export function DataStateTag({ label }: DataStateTagProps) {
  const styles: Record<DataStateTagProps["label"], string> = {
    "Real database value": "border-emerald-400/40 bg-emerald-500/10 text-emerald-200",
    "Synthetic company data": "border-indigo-400/40 bg-indigo-500/10 text-indigo-200",
    "Demonstration metric": "border-cyan-400/40 bg-cyan-500/10 text-cyan-200",
    "Planned functionality": "border-slate-500/50 bg-slate-700/20 text-slate-300",
  };

  return <span className={["inline-flex rounded-md border px-2 py-1 text-xs font-medium", styles[label]].join(" ")}>{label}</span>;
}
