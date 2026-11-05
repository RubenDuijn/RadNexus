"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { StatusPill } from "@/components/ui/status-pill";
import { BackendStatus } from "@/lib/api";
import { getClientEnvironmentLabel } from "@/lib/environment";

type ConnectivityState = {
  api: BackendStatus | null;
  db: BackendStatus | null;
};

type TopbarProps = {
  initialApiStatus: BackendStatus;
  initialDbStatus: BackendStatus;
};

export function Topbar({ initialApiStatus, initialDbStatus }: TopbarProps) {
  const [state, setState] = useState<ConnectivityState>({
    api: initialApiStatus,
    db: initialDbStatus,
  });
  const environmentLabel =
    typeof window !== "undefined"
      ? getClientEnvironmentLabel()
      : process.env.NODE_ENV === "development"
        ? "LOCAL DEVELOPMENT"
        : "DEMO ENVIRONMENT";

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const [apiRes, dbRes] = await Promise.all([
          fetch("/api/backend/health", { cache: "no-store" }),
          fetch("/api/backend/health-db", { cache: "no-store" }),
        ]);

        const api = (await apiRes.json()) as BackendStatus;
        const db = (await dbRes.json()) as BackendStatus;

        if (!mounted) {
          return;
        }

        setState({ api, db });
      } catch {
        if (!mounted) {
          return;
        }

        setState({
          api: { reachable: false, message: "Health probe failed", source: "demo" },
          db: { reachable: false, message: "Health probe failed", source: "demo" },
        });
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-[#ddd5c8] bg-[#f7f4ee]/95 px-5 py-3 backdrop-blur lg:px-8">
      <div className="flex flex-wrap items-center gap-3">
        <div className="mr-auto">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-800">RAD NEXUS INTELLIGENCE</h2>
          <p className="mt-1 text-xs text-slate-600">{environmentLabel} | Active company: NEXORA Industries</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/"
            className="rn-btn-secondary rounded-md px-2.5 py-1 text-xs"
          >
            RAD NEXUS Site
          </Link>
          <>
            <StatusPill
              label={`API ${state.api?.reachable ? "Available" : "Not connected"}`}
              healthy={Boolean(state.api?.reachable)}
            />
            <StatusPill
              label={`Database ${state.db?.reachable ? "Available" : "Not connected"}`}
              healthy={Boolean(state.db?.reachable)}
            />
          </>
          <span className="rounded-md border border-[#d3cabd] bg-white px-2.5 py-1 text-xs text-slate-700">User: Analyst</span>
        </div>
      </div>
    </header>
  );
}
