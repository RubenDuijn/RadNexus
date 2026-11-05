import { BackendStatus } from "@/lib/api";

export type HealthStatus = "Available" | "Not Connected" | "Planned";

export type PlatformHealthItem = {
  id: string;
  label: string;
  status: HealthStatus;
  detail: string;
  source: "Frontend" | "Backend Probe" | "Roadmap";
};

function statusFromProbe(status: BackendStatus | null, successLabel: string): Pick<PlatformHealthItem, "status" | "detail"> {
  if (!status) {
    return {
      status: "Not Connected",
      detail: "Probe has not returned a result yet.",
    };
  }

  return {
    status: status.reachable ? "Available" : "Not Connected",
    detail: status.reachable ? successLabel : status.message,
  };
}

export function buildPlatformHealth(apiStatus: BackendStatus | null, dbStatus: BackendStatus | null): PlatformHealthItem[] {
  const api = statusFromProbe(apiStatus, "FastAPI health endpoint responded.");
  const db = statusFromProbe(dbStatus, "Database health endpoint responded.");

  return [
    {
      id: "frontend",
      label: "Frontend availability",
      status: "Available",
      detail: "Next.js interface is serving pages.",
      source: "Frontend",
    },
    {
      id: "backend",
      label: "Backend API availability",
      status: api.status,
      detail: api.detail,
      source: "Backend Probe",
    },
    {
      id: "database",
      label: "Database connectivity",
      status: db.status,
      detail: db.detail,
      source: "Backend Probe",
    },
    {
      id: "migrations",
      label: "Database migrations",
      status: "Planned",
      detail: "Migration-state endpoint is not connected to frontend health reporting yet.",
      source: "Roadmap",
    },
    {
      id: "generation",
      label: "Data generation",
      status: "Planned",
      detail: "Synthetic data generation pipeline is in roadmap phase.",
      source: "Roadmap",
    },
    {
      id: "external",
      label: "External data-source connectivity",
      status: "Planned",
      detail: "External connectors are not wired into runtime health checks yet.",
      source: "Roadmap",
    },
    {
      id: "ai-provider",
      label: "AI provider connectivity",
      status: "Planned",
      detail: "AI provider integration is not connected in this build.",
      source: "Roadmap",
    },
  ];
}
