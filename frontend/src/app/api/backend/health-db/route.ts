import { NextResponse } from "next/server";

import { fetchBackendHealth } from "@/lib/api";

export async function GET() {
  const status = await fetchBackendHealth("/health/db");
  return NextResponse.json(status, {
    status: status.reachable ? 200 : 503,
  });
}
