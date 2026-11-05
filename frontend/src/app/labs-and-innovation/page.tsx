import { CorporateShell } from "@/components/layout/corporate-shell";
import { Panel } from "@/components/ui/panel";

const focusAreas = [
  "Research and development",
  "Experimental applications",
  "Prototypes",
  "Proprietary software products",
];

export default function LabsAndInnovationPage() {
  return (
    <CorporateShell>
      <div className="space-y-8">
        <section>
          <h2 className="rn-heading text-3xl font-semibold">Labs & Innovation</h2>
          <p className="mt-3 max-w-3xl text-base rn-muted">
            Experimental and product incubation area where new technology ideas are explored and validated.
          </p>
        </section>

        <Panel title="Focus Areas" subtitle="Strategic business area">
          <ul className="space-y-2 text-sm text-slate-700">
            {focusAreas.map((area) => (
              <li key={area} className="rn-card-soft p-3">{area}</li>
            ))}
          </ul>
        </Panel>
      </div>
    </CorporateShell>
  );
}
