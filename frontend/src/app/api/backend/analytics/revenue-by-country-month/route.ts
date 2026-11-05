import { NextRequest, NextResponse } from "next/server";

import { fetchBackendRevenueByCountryMonth } from "@/lib/api";

const defaultStartDate = "2026-10-01";
const defaultEndDate = "2026-12-31";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const startDate = searchParams.get("start_date") || defaultStartDate;
  const endDate = searchParams.get("end_date") || defaultEndDate;
  const country = searchParams.get("country") || undefined;
  const currency = searchParams.get("currency") || undefined;

  const result = await fetchBackendRevenueByCountryMonth({
    startDate,
    endDate,
    country,
    currency,
  });

  if (!result.ok) {
    return NextResponse.json(
      {
        data_state: "Unavailable data",
        message: result.message,
      },
      { status: result.status || 503 }
    );
  }

  return NextResponse.json(result.payload, { status: 200 });
}
