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
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-slate-100">Labs & Innovation</h2>
          <p className="mt-2 text-sm text-slate-400">
            Experimental and product incubation area where new technology ideas are explored and validated.
          </p>
        </section>

        <Panel title="Focus Areas" subtitle="Strategic business area">
          <ul className="space-y-1 text-sm text-slate-300">
            {focusAreas.map((area) => (
              <li key={area}>- {area}</li>
            ))}
          </ul>
        </Panel>
      </div>
    </CorporateShell>
  );
}
