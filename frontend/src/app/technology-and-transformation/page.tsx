import Link from "next/link";

import { CorporateShell } from "@/components/layout/corporate-shell";
import { Panel } from "@/components/ui/panel";
import { coreBusinessAreas } from "@/lib/corporate-content";

export default function TechnologyAndTransformationPage() {
  const area = coreBusinessAreas.find((item) => item.slug === "technology-and-transformation");
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

        <Panel title="Business Value" subtitle="Engineering-focused transformation delivery">
          <p className="text-sm text-slate-700">{area.value}</p>
        </Panel>

        <Panel title="Capabilities" subtitle="Implementation scope across systems and architecture">
          <ul className="space-y-2 text-sm text-slate-700">
            {area.capabilities.map((capability) => (
              <li key={capability} className="rn-card-soft p-3">{capability}</li>
            ))}
          </ul>
        </Panel>

        <Panel title="Delivery Discipline" subtitle="Bridge strategy and implementation">
          <div className="space-y-3 text-sm text-slate-700">
            <p>{area.detailDelivery}</p>
            <p>
              Program execution is designed to reduce delivery risk by integrating business-process decisions, architecture design,
              and engineering implementation from the same operating model.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/data-and-platforms" className="rn-btn-secondary inline-flex rounded-md px-3 py-2 text-sm font-medium">
                Explore Data & Platforms
              </Link>
              <Link href="/contact" className="rn-btn-primary inline-flex rounded-md px-3 py-2 text-sm font-medium">
                Discuss a Transformation Scope
              </Link>
            </div>
          </div>
        </Panel>
      </div>
    </CorporateShell>
  );
}
