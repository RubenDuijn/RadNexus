import { DataStateLabel } from "@/lib/demo-data";

type DataStateTagProps = {
  label: DataStateLabel;
};

export function DataStateTag({ label }: DataStateTagProps) {
  const styles: Record<DataStateTagProps["label"], string> = {
    "Connected live data": "rn-badge",
    "Synthetic demonstration data": "rn-badge",
    "Illustrative metric": "rn-badge",
    "Planned data": "rn-badge",
    "Unavailable data": "rn-badge",
  };

  return <span className={styles[label]}>{label}</span>;
}
