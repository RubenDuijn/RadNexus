import { CorporateShell } from "@/components/layout/corporate-shell";
import { Panel } from "@/components/ui/panel";

export default function ContactPage() {
  return (
    <CorporateShell>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-slate-100">Contact</h2>
          <p className="mt-2 text-sm text-slate-400">
            Contact RAD NEXUS to discuss technology modernization, enterprise data programs, and AI initiatives.
          </p>
        </section>

        <Panel title="Engagement Scope" subtitle="Consulting and product conversations">
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">Technology and architecture consulting</li>
            <li className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">Data and platform strategy</li>
            <li className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">Rad Nexus Intelligence product collaboration</li>
          </ul>
        </Panel>
      </div>
    </CorporateShell>
  );
}
