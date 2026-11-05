import { Panel } from "@/components/ui/panel";

const steps = [
  { name: "SAP / ERP Systems", state: "Planned" },
  { name: "Data Integration", state: "Planned" },
  { name: "PostgreSQL", state: "Implemented" },
  { name: "Python Business Logic", state: "Implemented" },
  { name: "Semantic Layer", state: "Planned" },
  { name: "AI Intelligence", state: "Planned" },
  { name: "Business User", state: "Implemented (frontend scaffold)" },
];

export default function SystemArchitecturePage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-semibold text-slate-100">System Architecture</h1>
        <p className="mt-2 text-sm text-slate-400">Current and target architecture for Rad Nexus Intelligence.</p>
      </section>

      <Panel title="Architecture Flow" subtitle="Implemented components are marked explicitly">
        <div className="flex flex-wrap items-center gap-3">
          {steps.map((step, index) => (
            <div key={step.name} className="flex items-center gap-3">
              <div className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3">
                <p className="text-sm font-medium text-slate-100">{step.name}</p>
                <p className="mt-1 text-xs text-slate-400">{step.state}</p>
              </div>
              {index < steps.length - 1 && <span className="text-slate-500">-&gt;</span>}
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
