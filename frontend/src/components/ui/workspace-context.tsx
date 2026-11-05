type WorkspaceContextProps = {
  className?: string;
};

export function WorkspaceContext({ className }: WorkspaceContextProps) {
  return (
    <section
      aria-label="Active workspace context"
      className={["rn-workspace-context", className].filter(Boolean).join(" ")}
    >
      <p className="rn-workspace-company">NEXORA Industries</p>
      <p className="rn-workspace-environment">DEMO ENVIRONMENT</p>
      <p className="rn-workspace-note">Fictional enterprise · Illustrative business data</p>
    </section>
  );
}