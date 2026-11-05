import { CorporateShell } from "@/components/layout/corporate-shell";
import { Panel } from "@/components/ui/panel";

export default function CompanyPage() {
  return (
    <CorporateShell>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-slate-100">Company</h2>
          <p className="mt-2 text-sm text-slate-400">
            RAD NEXUS is an independent technology company focused on technology, data and artificial intelligence.
          </p>
        </section>

        <Panel title="Purpose">
          <p className="text-sm text-slate-300">
            Helping organizations modernize technology, unlock enterprise data and apply artificial intelligence to
            real business problems.
          </p>
        </Panel>

        <Panel title="Operating Model" subtitle="Built to deliver consulting engagements and develop proprietary products">
          <p className="text-sm text-slate-300">
            RAD NEXUS combines architecture and transformation expertise with product development capacity. Product
            development and consulting are aligned but intentionally distinct.
          </p>
        </Panel>
      </div>
    </CorporateShell>
  );
}
