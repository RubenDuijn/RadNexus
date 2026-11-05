import { CorporateShell } from "@/components/layout/corporate-shell";
import { Panel } from "@/components/ui/panel";

export default function ContactPage() {
  return (
    <CorporateShell>
      <div className="space-y-8">
        <section>
          <h2 className="rn-heading text-3xl font-semibold">Contact</h2>
          <p className="mt-3 max-w-3xl text-base rn-muted">
            Contact RAD NEXUS to discuss technology modernization, enterprise data programs, and AI initiatives.
          </p>
        </section>

        <Panel title="Engagement Scope" subtitle="Consulting and product conversations">
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="rn-card-soft p-3">Technology and architecture consulting</li>
            <li className="rn-card-soft p-3">Data and platform strategy</li>
            <li className="rn-card-soft p-3">Rad Nexus Intelligence product collaboration</li>
          </ul>
        </Panel>
      </div>
    </CorporateShell>
  );
}
