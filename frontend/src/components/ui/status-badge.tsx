import { HealthStatus } from "@/lib/platform-health";

type StatusBadgeProps = {
  status: HealthStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<HealthStatus, string> = {
    Available: "border-emerald-400/40 bg-emerald-500/10 text-emerald-200",
    "Not Connected": "border-amber-400/40 bg-amber-500/10 text-amber-200",
    Planned: "border-sky-400/40 bg-sky-500/10 text-sky-200",
  };

  return <span className={["rounded-md border px-2 py-1 text-xs font-medium", styles[status]].join(" ")}>{status}</span>;
}
