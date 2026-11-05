import { CorporateShell } from "@/components/layout/corporate-shell";
import { Panel } from "@/components/ui/panel";

const capabilities = [
  "SAP and ERP modernization",
  "Software architecture",
  "Enterprise integration",
  "Technology consulting",
];

export default function TechnologyAndTransformationPage() {
  return (
    <CorporateShell>
      <div className="space-y-8">
        <section>
          <h2 className="rn-heading text-3xl font-semibold">Technology & Transformation</h2>
          <p className="mt-3 max-w-3xl text-base rn-muted">
            Transformation capabilities across legacy modernization, integration, and architecture design.
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
