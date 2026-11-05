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
      <div className="space-y-8">
        <section>
          <h2 className="rn-heading text-3xl font-semibold">Insights</h2>
          <p className="mt-3 max-w-3xl text-base rn-muted">
            Thought pieces and technical perspectives on technology, data and artificial intelligence.
          </p>
        </section>

        <Panel title="Current Themes" subtitle="Editorial direction">
          <ul className="space-y-2 text-sm text-slate-700">
            {insightTopics.map((topic) => (
              <li key={topic} className="rn-card-soft p-3">{topic}</li>
            ))}
          </ul>
        </Panel>
      </div>
    </CorporateShell>
  );
}
