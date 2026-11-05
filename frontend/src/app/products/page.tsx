import Link from "next/link";

import { CorporateShell } from "@/components/layout/corporate-shell";
import { Panel } from "@/components/ui/panel";

export default function ProductsPage() {
  return (
    <CorporateShell>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-slate-100">Products</h2>
          <p className="mt-2 text-sm text-slate-400">
            Product portfolio under development. Rad Nexus Intelligence is the first flagship product.
          </p>
        </section>

        <Panel title="Rad Nexus Intelligence" subtitle="AI-native enterprise intelligence platform">
          <p className="text-sm text-slate-300">
            Product application demonstrating enterprise reporting, data exploration, and AI investigation workflows.
            NEXORA Industries is a fictional demonstration company used for product design and technical validation.
          </p>
          <div className="mt-4">
            <Link
              href="/overview"
              className="inline-flex rounded-md border border-cyan-400/50 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-100"
            >
              Open Product Application
            </Link>
          </div>
        </Panel>
      </div>
    </CorporateShell>
  );
}
