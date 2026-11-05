import { Panel } from "@/components/ui/panel";

const exampleQuestions = [
  "Why did sales decline in Germany?",
  "Which customers contribute most to revenue?",
  "Which products have declining margins?",
  "Compare sales performance across countries.",
  "What is our current inventory exposure?",
];

export default function AiIntelligencePage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-semibold text-slate-100">AI Intelligence</h1>
        <p className="mt-2 text-sm text-slate-400">
          Interface scaffold for the future controlled natural-language investigation engine.
        </p>
      </section>

      <Panel
        title="Question Workspace"
        subtitle="Visual interface only. No AI execution or simulated analysis is performed yet."
      >
        <div className="space-y-4">
          <textarea
            className="h-36 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-blue-500"
            placeholder="Ask a business question..."
          />
          <div className="flex flex-wrap gap-2">
            {exampleQuestions.map((question) => (
              <button
                key={question}
                type="button"
                className="rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-slate-300 hover:border-blue-500 hover:text-blue-200"
              >
                {question}
              </button>
            ))}
          </div>
          <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-amber-200">
            AI engine integration pending. This page currently captures UX structure only.
          </div>
        </div>
      </Panel>
    </div>
  );
}
