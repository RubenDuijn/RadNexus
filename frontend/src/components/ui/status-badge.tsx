import { HealthStatus } from "@/lib/platform-health";

type StatusBadgeProps = {
  status: HealthStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<HealthStatus, string> = {
    Available: "border border-emerald-300 bg-emerald-50 text-emerald-700",
    "Not Connected": "border border-amber-300 bg-amber-50 text-amber-700",
    Planned: "border border-sky-300 bg-sky-50 text-sky-700",
  };

  return <span className={["rounded-md px-2 py-1 text-xs font-medium", styles[status]].join(" ")}>{status}</span>;
}
