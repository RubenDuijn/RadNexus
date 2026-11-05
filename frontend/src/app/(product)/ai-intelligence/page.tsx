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
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-semibold text-slate-100">AI Intelligence Investigation Workspace</h1>
        <p className="mt-2 text-sm text-slate-400">
          Central enterprise differentiator: natural-language business investigation with transparent evidence workflow.
        </p>
      </section>

      <Panel
        title="Question Workspace"
        subtitle="Interface scaffold only. No AI execution or simulated analytical conclusions are generated in current build."
      >
        <div className="space-y-4">
          <textarea
            className="h-36 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-400/60"
            placeholder="Ask an enterprise question, for example: Why did sales decline in Germany?"
          />
          <div className="flex flex-wrap gap-2">
            {exampleQuestions.map((question) => (
              <button
                key={question}
                type="button"
                className="rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-slate-300 hover:border-cyan-500/50 hover:text-cyan-100"
              >
                {question}
              </button>
            ))}
          </div>
          <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-amber-200">
            AI provider and SQL execution backends are not connected yet. This page currently defines interaction and audit structure.
          </div>
        </div>
      </Panel>

      <Panel title="Investigation Lifecycle" subtitle="End-to-end explainable investigation flow">
        <div className="grid gap-3 xl:grid-cols-2">
          {investigationStages.map((stage) => (
            <article key={stage.title} className="rounded-lg border border-slate-800 bg-slate-950/85 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium text-slate-100">{stage.title}</p>
                <StatusBadge status={stage.state} />
              </div>
              <p className="mt-2 text-sm text-slate-400">{stage.detail}</p>
            </article>
          ))}
        </div>
      </Panel>

      <section className="grid gap-4 xl:grid-cols-2">
        <Panel title="Planned SQL Evidence Log" subtitle="Query lineage and reproducibility">
          <div className="rounded-lg border border-slate-800 bg-slate-950/85 p-3 text-sm text-slate-400">
            SQL execution records will appear here with query text, execution time, row counts, and table lineage once backend integration is available.
          </div>
        </Panel>

        <Panel title="Planned Conclusion Workspace" subtitle="Decision-ready narrative output">
          <div className="rounded-lg border border-slate-800 bg-slate-950/85 p-3 text-sm text-slate-400">
            Investigation outputs will include confidence, assumptions, evidence links, and suggested next questions when AI pipeline integration is complete.
          </div>
        </Panel>
      </section>
    </div>
  );
}
