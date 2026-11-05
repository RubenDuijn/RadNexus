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
            Product portfolio under development. Rad Nexus Intelligence is the first flagship product.
          </p>
        </section>

        <Panel title="Rad Nexus Intelligence" subtitle="AI-native enterprise intelligence platform">
          <p className="text-sm text-slate-700">
            Product application demonstrating enterprise reporting, data exploration, and AI investigation workflows.
            NEXORA Industries is a fictional demonstration company used for product design and technical validation.
          </p>
          <div className="mt-4">
            <Link
              href="/overview"
              className="rn-btn-primary inline-flex rounded-md px-3 py-2 text-sm font-medium"
            >
              Open Product Application
            </Link>
          </div>
        </Panel>
      </div>
    </CorporateShell>
  );
}
