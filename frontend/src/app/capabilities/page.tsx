import { CorporateShell } from "@/components/layout/corporate-shell";
import { Panel } from "@/components/ui/panel";
import { businessPillars } from "@/lib/corporate-content";

export default function CapabilitiesPage() {
  return (
    <CorporateShell>
      <div className="space-y-8">
        <section>
          <h2 className="rn-heading text-3xl font-semibold">Capabilities</h2>
          <p className="mt-3 max-w-3xl text-base rn-muted">
            Strategic capability map across AI, data, enterprise technology, and innovation.
          </p>
        </section>

        <section className="grid gap-4 xl:grid-cols-2">
          {businessPillars.map((pillar) => (
            <Panel key={pillar.title} title={pillar.title} subtitle={pillar.state}>
              <div className="space-y-2 text-sm text-slate-700">
                <div className="rn-card-soft p-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Business problem</p>
                  <p className="mt-1">{pillar.problem}</p>
                </div>
                <div className="rn-card-soft p-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Technical capability</p>
                  <p className="mt-1">{pillar.capability}</p>
                </div>
                <div className="rn-card-soft p-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Business outcome</p>
                  <p className="mt-1">{pillar.outcome}</p>
                </div>
              </div>
            </Panel>
          ))}
        </section>
      </div>
    </CorporateShell>
  );
}
