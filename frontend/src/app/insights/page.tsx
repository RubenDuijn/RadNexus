import { CorporateShell } from "@/components/layout/corporate-shell";
import { Panel } from "@/components/ui/panel";

const insightTopics = [
  "Enterprise AI implementation patterns",
  "Data platform architecture decisions",
  "ERP modernization lessons",
  "Applied analytics and intelligence workflows",
];

export default function InsightsPage() {
  return (
    <CorporateShell>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-slate-100">Insights</h2>
          <p className="mt-2 text-sm text-slate-400">
            Thought pieces and technical perspectives on technology, data and artificial intelligence.
          </p>
        </section>

        <Panel title="Current Themes" subtitle="Editorial direction">
          <ul className="space-y-1 text-sm text-slate-300">
            {insightTopics.map((topic) => (
              <li key={topic}>- {topic}</li>
            ))}
          </ul>
        </Panel>
      </div>
    </CorporateShell>
  );
}
