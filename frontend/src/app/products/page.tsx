import Link from "next/link";

import { CorporateShell } from "@/components/layout/corporate-shell";
import { Panel } from "@/components/ui/panel";

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
