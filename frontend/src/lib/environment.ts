const localHostNames = new Set(["localhost", "127.0.0.1", "::1"]);

export function isLocalHost(hostName: string): boolean {
  const normalized = hostName.trim().toLowerCase();

  if (localHostNames.has(normalized)) {
    return true;
  }

  return normalized.endsWith(".local");
}

export function resolveEnvironmentLabel(hostName: string): "LOCAL DEVELOPMENT" | "DEMO ENVIRONMENT" {
  return isLocalHost(hostName) ? "LOCAL DEVELOPMENT" : "DEMO ENVIRONMENT";
}

export function getClientEnvironmentLabel(): "LOCAL DEVELOPMENT" | "DEMO ENVIRONMENT" {
  if (typeof window === "undefined") {
    return "DEMO ENVIRONMENT";
  }

  return resolveEnvironmentLabel(window.location.hostname);
}
