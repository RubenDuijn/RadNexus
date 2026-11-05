import { Panel } from "@/components/ui/panel";
import { StatusBadge } from "@/components/ui/status-badge";

const exampleQuestions = [
  "Why did sales decline in Germany?",
  "Which customers contributed most to the decline?",
  "Which products have increasing revenue but declining margins?",
  "Why did profitability fall despite increasing revenue?",
  "Which suppliers are creating the greatest cost pressure?",
  "Compare actual sales with German industrial production.",
  "What would happen if prices increased by 2%?",
];

const investigationStages = [
  { title: "1. Interpreted business question", state: "Planned" as const, detail: "Question intent parsing and business term normalization." },
  { title: "2. Investigation plan", state: "Planned" as const, detail: "Stepwise plan with hypothesis and validation points." },
  { title: "3. Relevant tables and definitions", state: "Available" as const, detail: "Metadata can already map SAP-inspired table structures." },
  { title: "4. Executed SQL queries", state: "Not Connected" as const, detail: "Query execution log UI is prepared but backend execution is not connected." },
  { title: "5. Results and evidence", state: "Not Connected" as const, detail: "Result cards and evidence traces will be populated by backend outputs." },
  { title: "6. Charts and breakdowns", state: "Planned" as const, detail: "Multi-granularity visual analysis blocks are designed but not wired." },
  { title: "7. Conclusions and confidence", state: "Planned" as const, detail: "Narrative conclusion with confidence scoring is reserved for backend logic." },
  { title: "8. Suggested follow-up questions", state: "Planned" as const, detail: "Follow-up prompt generation is scaffolded for future AI integration." },
];

export default function AiIntelligencePage() {
  return (
    <div className="space-y-7">
      <section>
        <h1 className="rn-heading text-3xl font-semibold">AI Intelligence Investigation Workspace</h1>
        <p className="mt-3 text-sm rn-muted">
          Central enterprise differentiator: natural-language business investigation with transparent evidence workflow.
        </p>
      </section>

      <Panel
        title="Question Workspace"
        subtitle="Interface scaffold only. No AI execution or simulated analytical conclusions are generated in current build."
      >
        <div className="space-y-4">
          <textarea
            className="rn-control h-36"
            placeholder="Ask an enterprise question, for example: Why did sales decline in Germany?"
          />
          <div className="flex flex-wrap gap-2">
            {exampleQuestions.map((question) => (
              <button
                key={question}
                type="button"
                className="rn-btn-secondary rounded-md px-3 py-1.5 text-sm"
              >
                {question}
              </button>
            ))}
          </div>
          <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-700">
            AI provider and SQL execution backends are not connected yet. This page currently defines interaction and audit structure.
          </div>
        </div>
      </Panel>

      <Panel title="Investigation Lifecycle" subtitle="End-to-end explainable investigation flow">
        <div className="grid gap-3 xl:grid-cols-2">
          {investigationStages.map((stage) => (
            <article key={stage.title} className="rn-card-soft p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium text-slate-800">{stage.title}</p>
                <StatusBadge status={stage.state} />
              </div>
              <p className="mt-2 text-sm rn-muted">{stage.detail}</p>
            </article>
          ))}
        </div>
      </Panel>

      <section className="grid gap-4 xl:grid-cols-2">
        <Panel title="Planned SQL Evidence Log" subtitle="Query lineage and reproducibility">
          <div className="rn-card-soft p-3 text-sm rn-muted">
            SQL execution records will appear here with query text, execution time, row counts, and table lineage once backend integration is available.
          </div>
        </Panel>

        <Panel title="Planned Conclusion Workspace" subtitle="Decision-ready narrative output">
          <div className="rn-card-soft p-3 text-sm rn-muted">
            Investigation outputs will include confidence, assumptions, evidence links, and suggested next questions when AI pipeline integration is complete.
          </div>
        </Panel>
      </section>
    </div>
  );
}
