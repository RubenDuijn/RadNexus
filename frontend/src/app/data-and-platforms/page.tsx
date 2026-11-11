import Link from "next/link";

import { CorporateShell } from "@/components/layout/corporate-shell";
import { Panel } from "@/components/ui/panel";
import { coreBusinessAreas } from "@/lib/corporate-content";

export default function DataAndPlatformsPage() {
  const area = coreBusinessAreas.find((item) => item.slug === "data-and-platforms");
  if (!area) {
    return null;
  }

  return (
    <CorporateShell>
      <div className="space-y-8">
        <section>
          <p className="rn-eyebrow">Core business area</p>
          <h2 className="rn-heading mt-3 text-3xl font-semibold">{area.title}</h2>
          <p className="mt-3 max-w-3xl text-base rn-muted">
            {area.positioning}
          </p>
          <p className="mt-3 max-w-3xl text-sm text-slate-700">
            {area.detailIntro}
          </p>
        </section>

        <Panel title="Business Value" subtitle="Trusted data for business execution">
          <p className="text-sm text-slate-700">{area.value}</p>
        </Panel>

        <Panel title="Capabilities" subtitle="Architecture, migration, and governance foundations">
          <ul className="space-y-2 text-sm text-slate-700">
            {area.capabilities.map((capability) => (
              <li key={capability} className="rn-card-soft p-3">{capability}</li>
            ))}
          </ul>
        </Panel>

        <Panel title="Validation Principle" subtitle="Preserve trusted logic during modernisation">
          <div className="space-y-3 text-sm text-slate-700">
            <p>{area.detailDelivery}</p>
            <p>
              This includes side-by-side validation of migrated datasets, reconciliation of core KPIs, and explicit control over
              business definitions used across analytics and AI workflows.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/technology-and-transformation" className="rn-btn-secondary inline-flex rounded-md px-3 py-2 text-sm font-medium">
                Explore Technology & Transformation
              </Link>
              <Link href="/ai-and-intelligence" className="rn-btn-secondary inline-flex rounded-md px-3 py-2 text-sm font-medium">
                Connect to AI & Intelligence
              </Link>
            </div>
          </div>
        </Panel>
      </div>
    </CorporateShell>
  );
}
