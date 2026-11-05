type StatusPillProps = {
  label: string;
  healthy: boolean;
};

export function StatusPill({ label, healthy }: StatusPillProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2",
        healthy ? "rn-badge rn-badge-success" : "rn-badge rn-badge-warning",
      ].join(" ")}
    >
      <span className={healthy ? "h-2 w-2 rounded-full bg-[#2c8b63]" : "h-2 w-2 rounded-full bg-[#a36e34]"} />
      {label}
    </span>
  );
}
