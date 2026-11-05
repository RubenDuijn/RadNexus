type WorkspaceContextProps = {
  className?: string;
};

export function WorkspaceContext({ className }: WorkspaceContextProps) {
  return (
    <section
      aria-label="Active workspace context"
      className={["rn-workspace-context", className].filter(Boolean).join(" ")}
    >
      <p className="rn-workspace-environment">Demo environment</p>
      <p className="rn-workspace-company">Active company: NEXORA Industries</p>
    </section>
  );
}