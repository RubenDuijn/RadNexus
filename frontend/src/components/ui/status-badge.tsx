import { HealthStatus } from "@/lib/platform-health";

type StatusBadgeProps = {
  status: HealthStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<HealthStatus, string> = {
    Available: "rn-badge rn-badge-success",
    "Not Connected": "rn-badge rn-badge-warning",
    Planned: "rn-badge",
  };

  return <span className={styles[status]}>{status}</span>;
}
