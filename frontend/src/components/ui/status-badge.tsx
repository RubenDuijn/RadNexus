import { HealthStatus } from "@/lib/platform-health";

type StatusBadgeProps = {
  status: HealthStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<HealthStatus, string> = {
    Available: "border border-emerald-300 bg-emerald-50 text-emerald-700",
    "Not Connected": "border border-amber-300 bg-amber-50 text-amber-700",
    Planned: "border border-blue-300 bg-blue-50 text-blue-700",
  };

  return <span className={["rounded-md px-2 py-1 text-xs font-medium", styles[status]].join(" ")}>{status}</span>;
}
