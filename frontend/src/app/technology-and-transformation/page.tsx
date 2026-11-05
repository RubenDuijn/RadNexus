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
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-slate-100">Technology & Transformation</h2>
          <p className="mt-2 text-sm text-slate-400">
            Transformation capabilities across legacy modernization, integration, and architecture design.
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
