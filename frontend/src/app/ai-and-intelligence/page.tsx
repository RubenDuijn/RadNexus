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
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-slate-100">AI & Intelligence</h2>
          <p className="mt-2 text-sm text-slate-400">
            AI capability pillar focused on practical integration with enterprise systems and decision workflows.
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
