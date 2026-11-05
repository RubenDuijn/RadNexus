export type BackendStatus = {
  reachable: boolean;
  message: string;
  source: "backend" | "demo";
};

const defaultBaseUrl = "http://localhost:8000";

export function getBackendBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL || defaultBaseUrl;
}

export async function fetchBackendHealth(path: "/health" | "/health/db"): Promise<BackendStatus> {
  const baseUrl = getBackendBaseUrl();

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

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
    return {
      reachable: false,
      message: "Backend unreachable from frontend",
      source: "demo",
    };
  }
}
