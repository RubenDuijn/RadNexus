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

const investigationTrack = [
  "Revenue development",
  "Product contribution",
  "Customer contribution",
  "Sales volume evolution",
  "Pricing and margin movement",
  "Relevant external economic indicators",
];

const resultFramework = [
  {
    label: "Verified findings",
    detail: "Statements supported by executed queries and traceable evidence.",
    state: "Not Connected" as const,
  },
  {
    label: "Correlations",
    detail: "Observed patterns that may explain performance but do not prove causality.",
    state: "Planned" as const,
  },
  {
    label: "Hypotheses",
    detail: "Candidate explanations to test in follow-up analysis.",
    state: "Planned" as const,
  },
  {
    label: "Confidence and limitations",
    detail: "Expected confidence scoring and explicit data limitations in final narrative.",
    state: "Planned" as const,
  },
];

export default function AiIntelligencePage() {
  return (
    <div className="space-y-7">
      <section>
        <h1 className="rn-heading text-3xl font-semibold">AI Intelligence Investigation Workspace</h1>
        <p className="mt-3 text-sm rn-muted">
          Central differentiator: natural-language business investigation that keeps evidence, assumptions, and limitations explicit.
        </p>
      </section>

      <Panel title="Investigation Vision" subtitle="Question to evidence workflow for executive and analyst use">
        <div className="grid gap-3 lg:grid-cols-3">
          <div className="rn-card-soft p-3">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Business question</p>
            <p className="mt-1 text-sm text-slate-700">Why did revenue decline in Germany?</p>
          </div>
          <div className="rn-card-soft p-3">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Investigation</p>
            <p className="mt-1 text-sm text-slate-700">Structured analysis across commercial, operational, and macroeconomic dimensions.</p>
          </div>
          <div className="rn-card-soft p-3">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Result</p>
            <p className="mt-1 text-sm text-slate-700">Findings, supporting evidence, confidence limits, and suggested follow-up questions.</p>
          </div>
        </div>
      </Panel>

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
          <div className="rn-alert-warning rounded-lg p-3 text-sm">
            AI provider and SQL execution backends are not connected yet. This page currently defines interaction and audit structure.
          </div>
        </div>
      </Panel>

      <Panel title="Investigation Scope" subtitle="Planned analysis domains for each business question">
        <div className="grid gap-2 md:grid-cols-2">
          {investigationTrack.map((item) => (
            <div key={item} className="rn-card-soft p-3 text-sm text-slate-700">
              {item}
            </div>
          ))}
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

        <Panel title="Result Framework" subtitle="How findings, correlations, and hypotheses will be distinguished">
          <div className="space-y-2">
            {resultFramework.map((item) => (
              <article key={item.label} className="rn-card-soft p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-800">{item.label}</p>
                  <StatusBadge status={item.state} />
                </div>
                <p className="mt-1 text-sm rn-muted">{item.detail}</p>
              </article>
            ))}
          </div>
        </Panel>
      </section>
    </div>
  );
}
