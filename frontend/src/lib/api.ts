export type BackendStatus = {
  reachable: boolean;
  message: string;
  source: "backend" | "demo";
};

export type RevenueByCountryMonthRow = {
  month: string;
  country: string;
  currency: string;
  revenue: number;
  transaction_count: number;
};

export type RevenueByCountryMonthPayload = {
  data_state: "Connected live data";
  meta: {
    source: "live-transactional-data";
    reporting_date: string;
    revenue_measure: string;
    country_dimension: string;
    currency_handling: string;
    cancellation_credit_return_treatment: string;
    excluded_inconsistent_reference_count: number;
  };
  results: RevenueByCountryMonthRow[];
};

const defaultBaseUrl = "http://localhost:8000";
const probeTimeoutMs = 2500;

export function getBackendBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL || defaultBaseUrl;
}

export async function fetchBackendHealth(path: "/health" | "/health/db"): Promise<BackendStatus> {
  const baseUrl = getBackendBaseUrl();
  const controller = new AbortController();
  const timeoutHandle = setTimeout(() => controller.abort(), probeTimeoutMs);

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });

    clearTimeout(timeoutHandle);

    if (!response.ok) {
      return {
        reachable: false,
        message: `Backend responded with HTTP ${response.status}`,
        source: "backend",
      };
    }

    return {
      reachable: true,
      message: path === "/health" ? "API reachable" : "Database reachable",
      source: "backend",
    };
  } catch {
    clearTimeout(timeoutHandle);

    return {
      reachable: false,
      message: "Backend unreachable or timed out from frontend",
      source: "demo",
    };
  }
}

export async function fetchBackendRevenueByCountryMonth(params: {
  startDate: string;
  endDate: string;
  country?: string;
  currency?: string;
}): Promise<{ ok: true; payload: RevenueByCountryMonthPayload } | { ok: false; status: number; message: string }> {
  const baseUrl = getBackendBaseUrl();
  const controller = new AbortController();
  const timeoutHandle = setTimeout(() => controller.abort(), probeTimeoutMs);

  const searchParams = new URLSearchParams({
    start_date: params.startDate,
    end_date: params.endDate,
  });

  if (params.country) {
    searchParams.set("country", params.country);
  }

  if (params.currency) {
    searchParams.set("currency", params.currency);
  }

  try {
    const response = await fetch(`${baseUrl}/api/v1/analytics/revenue-by-country-month?${searchParams.toString()}`, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });

    clearTimeout(timeoutHandle);

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        message: `Backend responded with HTTP ${response.status}`,
      };
    }

    const payload = (await response.json()) as RevenueByCountryMonthPayload;
    return { ok: true, payload };
  } catch {
    clearTimeout(timeoutHandle);
    return {
      ok: false,
      status: 503,
      message: "Backend unreachable or timed out from frontend",
    };
  }
}
