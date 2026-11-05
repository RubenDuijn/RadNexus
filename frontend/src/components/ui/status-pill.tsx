type StatusPillProps = {
  label: string;
  healthy: boolean;
};

export function StatusPill({ label, healthy }: StatusPillProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-xs font-medium",
        healthy
          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
          : "border-amber-500/40 bg-amber-500/10 text-amber-200",
      ].join(" ")}
    >
      <span className={healthy ? "h-2 w-2 rounded-full bg-emerald-300" : "h-2 w-2 rounded-full bg-amber-300"} />
      {label}
    </span>
  );
}
