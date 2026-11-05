import { CorporateShell } from "@/components/layout/corporate-shell";
import { Panel } from "@/components/ui/panel";
import { businessPillars } from "@/lib/corporate-content";

export default function CapabilitiesPage() {
  return (
    <CorporateShell>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-slate-100">Capabilities</h2>
          <p className="mt-2 text-sm text-slate-400">
            Strategic capability map across AI, data, enterprise technology, and innovation.
          </p>
        </section>

        <section className="grid gap-4 xl:grid-cols-2">
          {businessPillars.map((pillar) => (
            <Panel key={pillar.title} title={pillar.title} subtitle={pillar.state}>
              <ul className="space-y-1 text-sm text-slate-300">
                {pillar.items.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </Panel>
          ))}
        </section>
      </div>
    </CorporateShell>
  );
}
