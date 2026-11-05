import Link from "next/link";

import { CorporateShell } from "@/components/layout/corporate-shell";
import { Panel } from "@/components/ui/panel";

const productPrinciples = [
  {
    title: "Ask",
    detail:
      "Interact with enterprise data naturally, using business questions instead of relying exclusively on predefined reports.",
  },
  {
    title: "Investigate",
    detail: "Explore underlying business drivers, relationships and contributing factors.",
  },
  {
    title: "Validate",
    detail:
      "Compare analytical results against established enterprise reports, KPIs and recognised business definitions.",
  },
  {
    title: "Discover",
    detail: "Uncover relationships, trends and opportunities beyond predefined reporting.",
  },
];

export default function ProductsPage() {
  return (
    <CorporateShell>
      <div className="space-y-8">
        <section>
          <h2 className="rn-heading text-3xl font-semibold">Products</h2>
          <p className="mt-3 max-w-3xl text-base rn-muted">
            Product portfolio under development. RAD NEXUS INTELLIGENCE is the first flagship product.
          </p>
        </section>

        <Panel title="RAD NEXUS INTELLIGENCE" subtitle="From enterprise data to business understanding.">
          <div className="space-y-4 text-sm text-slate-700">
            <p>
              For decades, organisations have accumulated enormous amounts of valuable information across their enterprise
              systems. Yet finding meaningful answers often remains complex, time-consuming and dependent on specialist knowledge.
            </p>
            <p>RAD NEXUS is building a new way to access that knowledge.</p>
            <p>
              By combining enterprise data, structured business logic and artificial intelligence, we aim to make complex
              business questions easier to ask, investigate and answer.
            </p>
            <div className="rn-card-soft space-y-3 p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Product principle</p>
              <p className="text-base font-medium text-slate-800">Compare. Validate. Discover.</p>
              <p>
                Go beyond traditional reporting without losing sight of the numbers you trust.
              </p>
              <p>
                Ask questions in natural language, explore the results and compare them with established enterprise reports
                and KPIs.
              </p>
              <p className="text-sm rn-muted">
                RAD NEXUS INTELLIGENCE aims to connect the flexibility of AI-driven analysis with the consistency of
                structured business reporting - helping organisations validate results, investigate differences and
                discover insights that traditional reports may not reveal.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {productPrinciples.map((principle) => (
                <article key={principle.title} className="rn-card-soft p-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-500">{principle.title}</p>
                  <p className="mt-1 text-sm text-slate-700">{principle.detail}</p>
                </article>
              ))}
            </div>
            <p className="text-sm font-medium text-slate-800">
              Your established reports remain the reference. AI helps you ask the next question.
            </p>
            <p className="text-xs rn-muted">
              Comparison and validation workflows are a core product capability direction. The current build demonstrates
              interface patterns and illustrative data only.
            </p>
            <p className="font-medium text-slate-800">Ask the question. Explore the evidence. Understand the business.</p>
            <p>
              Not just another layer of reporting. A more intelligent way to work with the information organisations already have.
            </p>
            <p className="text-xs uppercase tracking-[0.08em] text-slate-500">
              Demonstration context uses the fictional enterprise NEXORA Industries and illustrative business data.
            </p>
          </div>
          <div className="mt-4">
            <Link
              href="/overview"
              className="rn-btn-primary inline-flex rounded-md px-3 py-2 text-sm font-medium"
            >
              Open RAD NEXUS INTELLIGENCE
            </Link>
          </div>
        </Panel>
      </div>
    </CorporateShell>
  );
}
