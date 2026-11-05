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
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-slate-100">Data & Platforms</h2>
          <p className="mt-2 text-sm text-slate-400">
            Data platform capabilities that connect source systems, governed models, and business intelligence.
          </p>
        </section>

        <Panel title="Focus Areas" subtitle="Strategic business area">
          <ul className="space-y-1 text-sm text-slate-300">
            {capabilities.map((capability) => (
              <li key={capability}>- {capability}</li>
            ))}
          </ul>
        </Panel>
      </div>
    </CorporateShell>
  );
}
