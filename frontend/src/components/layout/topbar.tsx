"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { StatusPill } from "@/components/ui/status-pill";
import { BackendStatus } from "@/lib/api";
import { getClientEnvironmentLabel } from "@/lib/environment";

type ConnectivityState = {
  api: BackendStatus | null;
  db: BackendStatus | null;
  loading: boolean;
};

const initialState: ConnectivityState = {
  api: null,
  db: null,
  loading: true,
};

export function Topbar() {
  const [state, setState] = useState<ConnectivityState>(initialState);
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

        setState({ api, db, loading: false });
      } catch {
        if (!mounted) {
          return;
        }

        setState({
          api: { reachable: false, message: "Health probe failed", source: "demo" },
          db: { reachable: false, message: "Health probe failed", source: "demo" },
          loading: false,
        });
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800/90 bg-slate-950/95 px-5 py-3 backdrop-blur lg:px-8">
      <div className="flex flex-wrap items-center gap-3">
        <div className="mr-auto">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-100">RAD NEXUS INTELLIGENCE</h2>
          <p className="mt-1 text-xs text-slate-400">{environmentLabel} | Active company: NEXORA Industries</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/"
            className="rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-slate-300 hover:border-slate-500 hover:text-slate-100"
          >
            RAD NEXUS Site
          </Link>
          {state.loading ? (
            <StatusPill label="Checking backend probes" healthy={false} />
          ) : (
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
          )}
          <span className="rounded-md border border-slate-700 px-2.5 py-1 text-xs text-slate-300">User: Analyst</span>
        </div>
      </div>
    </header>
  );
}
