import { CorporateShell } from "@/components/layout/corporate-shell";
import { Panel } from "@/components/ui/panel";

const capabilities = [
  "Enterprise AI programs",
  "AI agent orchestration",
  "Natural-language enterprise interfaces",
  "Intelligent automation workflows",
  "AI integration into enterprise applications",
];

export default function AiAndIntelligencePage() {
  return (
    <CorporateShell>
      <div className="space-y-8">
        <section>
          <h2 className="rn-heading text-3xl font-semibold">AI & Intelligence</h2>
          <p className="mt-3 max-w-3xl text-base rn-muted">
            AI capability pillar focused on practical integration with enterprise systems and decision workflows.
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
