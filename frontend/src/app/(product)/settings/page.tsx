import { headers } from "next/headers";

import { Panel } from "@/components/ui/panel";
import { resolveEnvironmentLabel } from "@/lib/environment";

export default async function SettingsPage() {
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") || headerStore.get("host") || "localhost:3000";
  const hostName = host.split(":")[0] || host;
  const environmentLabel = resolveEnvironmentLabel(hostName);

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-semibold text-slate-100">Settings</h1>
        <p className="mt-2 text-sm text-slate-400">
          Environment and workspace settings for frontend-backend integration.
        </p>
      </section>

      <Panel title="Environment" subtitle="Configured via frontend environment variables">
        <dl className="space-y-3 text-sm">
          <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
            <dt className="text-slate-400">Backend Base URL</dt>
            <dd className="mt-1 font-mono text-slate-200">NEXT_PUBLIC_API_BASE_URL</dd>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
            <dt className="text-slate-400">Current Environment</dt>
            <dd className="mt-1 text-slate-200">{environmentLabel}</dd>
          </div>
        </dl>
      </Panel>
    </div>
  );
}
