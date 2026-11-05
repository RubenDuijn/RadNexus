import { CorporateShell } from "@/components/layout/corporate-shell";
import { Panel } from "@/components/ui/panel";

const capabilities = [
  "Enterprise data engineering",
  "Data architecture",
  "Business intelligence",
  "Data modernization",
  "Data platform implementation",
];

export default function DataAndPlatformsPage() {
  return (
    <CorporateShell>
      <div className="space-y-8">
        <section>
          <h2 className="rn-heading text-3xl font-semibold">Data & Platforms</h2>
          <p className="mt-3 max-w-3xl text-base rn-muted">
            Data platform capabilities that connect source systems, governed models, and business intelligence.
          </p>
        </section>

        <Panel title="Focus Areas" subtitle="Strategic business area">
          <ul className="space-y-2 text-sm text-slate-700">
            {capabilities.map((capability) => (
              <li key={capability} className="rn-card-soft p-3">{capability}</li>
            ))}
          </ul>
        </Panel>
      </div>
    </CorporateShell>
  );
}
