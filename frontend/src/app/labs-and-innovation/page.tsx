import Link from "next/link";

import { CorporateShell } from "@/components/layout/corporate-shell";
import { Panel } from "@/components/ui/panel";
import { coreBusinessAreas } from "@/lib/corporate-content";

export default function LabsAndInnovationPage() {
  const area = coreBusinessAreas.find((item) => item.slug === "labs-and-innovation");
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

        <Panel title="Business Value" subtitle="Innovation with practical enterprise intent">
          <p className="text-sm text-slate-700">{area.value}</p>
        </Panel>

        <Panel title="Capabilities" subtitle="Research, prototyping, and product incubation">
          <ul className="space-y-2 text-sm text-slate-700">
            {area.capabilities.map((capability) => (
              <li key={capability} className="rn-card-soft p-3">{capability}</li>
            ))}
          </ul>
        </Panel>

        <Panel title="RAD NEXUS LABS" subtitle="R&D environment and innovation pipeline">
          <div className="space-y-3 text-sm text-slate-700">
            <p>{area.detailDelivery}</p>
            <p>
              Successful experiments are matured into reusable intellectual property, product capabilities, and implementation
              patterns that can support real organisations.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/products" className="rn-btn-primary inline-flex rounded-md px-3 py-2 text-sm font-medium">
                View Product Portfolio
              </Link>
              <Link href="/ai-and-intelligence" className="rn-btn-secondary inline-flex rounded-md px-3 py-2 text-sm font-medium">
                See AI & Intelligence
              </Link>
            </div>
          </div>
        </Panel>
      </div>
    </CorporateShell>
  );
}
