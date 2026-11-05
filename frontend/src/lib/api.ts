export type BackendStatus = {
  reachable: boolean;
  message: string;
  source: "backend" | "demo";
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
