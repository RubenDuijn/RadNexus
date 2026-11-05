type StatusPillProps = {
  label: string;
  healthy: boolean;
};

export function StatusPill({ label, healthy }: StatusPillProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-md px-2.5 py-1 text-xs font-medium",
        healthy
          ? "border border-emerald-300 bg-emerald-50 text-emerald-700"
          : "border border-amber-300 bg-amber-50 text-amber-700",
      ].join(" ")}
    >
      <span className={healthy ? "h-2 w-2 rounded-full bg-emerald-500" : "h-2 w-2 rounded-full bg-amber-500"} />
      {label}
    </span>
  );
}
