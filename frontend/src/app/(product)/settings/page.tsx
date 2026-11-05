import { headers } from "next/headers";

import { Panel } from "@/components/ui/panel";
import { resolveEnvironmentLabel } from "@/lib/environment";

export default async function SettingsPage() {
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") || headerStore.get("host") || "localhost:3000";
  const hostName = host.split(":")[0] || host;
  const environmentLabel = resolveEnvironmentLabel(hostName);

  return (
    <div className="space-y-7">
      <section>
        <h1 className="rn-heading text-3xl font-semibold">Settings</h1>
        <p className="mt-3 text-sm rn-muted">
          Environment and workspace settings for frontend-backend integration.
        </p>
      </section>

      <Panel title="Environment" subtitle="Configured via frontend environment variables">
        <dl className="space-y-3 text-sm">
          <div className="rn-card-soft p-3">
            <dt className="text-slate-500">Backend Base URL</dt>
            <dd className="mt-1 font-mono text-slate-700">NEXT_PUBLIC_API_BASE_URL</dd>
          </div>
          <div className="rn-card-soft p-3">
            <dt className="text-slate-500">Current Environment</dt>
            <dd className="mt-1 text-slate-700">{environmentLabel}</dd>
          </div>
        </dl>
      </Panel>
    </div>
  );
}
