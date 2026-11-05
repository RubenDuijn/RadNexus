import { DataStateLabel } from "@/lib/demo-data";

type DataStateTagProps = {
  label: DataStateLabel;
};

export function DataStateTag({ label }: DataStateTagProps) {
  const styles: Record<DataStateTagProps["label"], string> = {
    "Real database value": "border border-emerald-300 bg-emerald-50 text-emerald-700",
    "Synthetic company data": "border border-violet-300 bg-violet-50 text-violet-700",
    "Demonstration metric": "border border-sky-300 bg-sky-50 text-sky-700",
    "Planned functionality": "border border-slate-300 bg-slate-100 text-slate-700",
  };

  return <span className={["inline-flex rounded-md px-2 py-1 text-xs font-medium", styles[label]].join(" ")}>{label}</span>;
}
