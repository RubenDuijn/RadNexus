import { CorporateShell } from "@/components/layout/corporate-shell";
import { Panel } from "@/components/ui/panel";

export default function CompanyPage() {
  return (
    <CorporateShell>
      <div className="space-y-8">
        <section>
          <h2 className="rn-heading text-3xl font-semibold">Company</h2>
          <p className="mt-3 max-w-3xl text-base rn-muted">
            RAD NEXUS is an independent technology company focused on enterprise data, business intelligence,
            artificial intelligence and technology modernisation.
          </p>
        </section>

        <Panel title="Purpose">
          <p className="text-sm text-slate-700">
            Helping organisations access the knowledge already stored in enterprise systems through better data foundations,
            structured business logic, and evidence-based answers.
          </p>
        </Panel>

        <Panel title="Operating Model" subtitle="Built to deliver consulting engagements and develop proprietary products">
          <p className="text-sm text-slate-700">
            RAD NEXUS combines architecture and transformation expertise with product development capacity. Product
            development and consulting are aligned but intentionally distinct.
          </p>
        </Panel>
      </div>
    </CorporateShell>
  );
}
