"use client";

import { useEffect, useMemo, useState } from "react";

import { RevenueBarChart } from "@/components/charts/revenue-bar-chart";
import { RevenueLineChart } from "@/components/charts/revenue-line-chart";
import { DataStateTag } from "@/components/ui/data-state-tag";
import { Panel } from "@/components/ui/panel";
import { RevenueByCountryMonthPayload } from "@/lib/api";

type ApiState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "empty" }
  | { status: "ready"; payload: RevenueByCountryMonthPayload };

const defaultStartDate = "2026-10-01";
const defaultEndDate = "2026-12-31";

export function RevenueByCountryMonthLive() {
  const [state, setState] = useState<ApiState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setState({ status: "loading" });

      try {
        const response = await fetch(
          `/api/backend/analytics/revenue-by-country-month?start_date=${defaultStartDate}&end_date=${defaultEndDate}`,
          {
            method: "GET",
            cache: "no-store",
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          const message = `Analytics endpoint unavailable (HTTP ${response.status})`;
          if (!cancelled) {
            setState({ status: "error", message });
          }
          return;
        }

        const payload = (await response.json()) as RevenueByCountryMonthPayload;
        if (!payload.results || payload.results.length === 0) {
          if (!cancelled) {
            setState({ status: "empty" });
          }
          return;
        }

        if (!cancelled) {
          setState({ status: "ready", payload });
        }
      } catch {
        if (!cancelled) {
          setState({ status: "error", message: "Analytics endpoint unreachable from frontend runtime" });
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const derived = useMemo(() => {
    if (state.status !== "ready") {
      return {
        monthSeries: [] as Array<{ month: string; revenue: number }>,
        countrySeries: [] as Array<{ country: string; revenue: number }>,
      };
    }

    const monthMap = new Map<string, number>();
    const countryMap = new Map<string, number>();

    for (const row of state.payload.results) {
      monthMap.set(row.month, (monthMap.get(row.month) || 0) + row.revenue);
      countryMap.set(row.country, (countryMap.get(row.country) || 0) + row.revenue);
    }

    const monthSeries = [...monthMap.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([month, revenue]) => ({ month, revenue }));

    const countrySeries = [...countryMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([country, revenue]) => ({ country, revenue }));

    return { monthSeries, countrySeries };
  }, [state]);

  const showError = state.status === "error";
  const showEmpty = state.status === "empty";
  const showLoading = state.status === "loading";

  return (
    <section className="grid gap-4 xl:grid-cols-2">
      <Panel title="Country Performance" subtitle="Live deterministic metric - billing revenue by customer country and month">
        {state.status === "ready" ? (
          <>
            <RevenueBarChart data={derived.countrySeries} xKey="country" yKey="revenue" />
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <DataStateTag label="Connected live data" />
              <span className="rn-badge">Source: VBRK/VBRP</span>
            </div>
          </>
        ) : null}

        {showLoading ? <p className="text-sm rn-muted">Loading live revenue analytics...</p> : null}
        {showEmpty ? <p className="text-sm rn-muted">No billing transactions were found for the selected date range.</p> : null}
        {showError ? (
          <div className="space-y-2">
            <p className="text-sm rn-muted">{state.message}</p>
            <DataStateTag label="Unavailable data" />
          </div>
        ) : null}
      </Panel>

      <Panel title="Sales Development Detail" subtitle="Live deterministic metric - monthly billing revenue trend">
        {state.status === "ready" ? (
          <>
            <RevenueLineChart data={derived.monthSeries} />
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <DataStateTag label="Connected live data" />
              <span className="rn-badge">No cross-currency summation</span>
            </div>
          </>
        ) : null}

        {showLoading ? <p className="text-sm rn-muted">Loading live revenue analytics...</p> : null}
        {showEmpty ? <p className="text-sm rn-muted">No monthly series available in the selected date range.</p> : null}
        {showError ? (
          <div className="space-y-2">
            <p className="text-sm rn-muted">{state.message}</p>
            <DataStateTag label="Unavailable data" />
          </div>
        ) : null}
      </Panel>
    </section>
  );
}
