from datetime import date
from typing import Literal, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from radnexus_intelligence.core.config import settings
from radnexus_intelligence.db.session import check_database_connection, get_db_session
from radnexus_intelligence.services.revenue_analytics import get_revenue_by_country_month

router = APIRouter()


class RevenueByCountryMonthItem(BaseModel):
    month: str = Field(description="Reporting month in YYYY-MM format based on VBRK.FKDAT")
    country: str = Field(description="Customer country based on KNA1.LAND1; UNK when missing")
    currency: str = Field(description="Transaction currency")
    revenue: float = Field(description="Net billed value after cancellation/credit treatment")
    transaction_count: int = Field(description="Number of billing item transactions in the aggregate")


class RevenueByCountryMonthMeta(BaseModel):
    source: Literal["live-transactional-data"]
    reporting_date: str
    revenue_measure: str
    country_dimension: str
    currency_handling: str
    cancellation_credit_return_treatment: str
    excluded_inconsistent_reference_count: int


class RevenueByCountryMonthResponse(BaseModel):
    data_state: Literal["Connected live data"]
    meta: RevenueByCountryMonthMeta
    results: list[RevenueByCountryMonthItem]


@router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": settings.app_name}


@router.get("/health/db")
def health_db() -> dict[str, str]:
    check_database_connection()
    return {"status": "ok", "database": "reachable"}


@router.get("/api/v1/analytics/revenue-by-country-month", response_model=RevenueByCountryMonthResponse)
def revenue_by_country_month(
    start_date: date = Query(..., description="Inclusive start date (YYYY-MM-DD)"),
    end_date: date = Query(..., description="Inclusive end date (YYYY-MM-DD)"),
    country: Optional[str] = Query(default=None, min_length=2, max_length=3, description="Optional ISO-like country code filter"),
    currency: Optional[str] = Query(default=None, min_length=3, max_length=5, description="Optional currency filter"),
    db: Session = Depends(get_db_session),
) -> RevenueByCountryMonthResponse:
    if start_date > end_date:
        raise HTTPException(status_code=422, detail="start_date must be less than or equal to end_date")

    try:
        result = get_revenue_by_country_month(
            session=db,
            start_date=start_date,
            end_date=end_date,
            country=country,
            currency=currency,
        )
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc

    return RevenueByCountryMonthResponse(
        data_state="Connected live data",
        meta=RevenueByCountryMonthMeta(
            source="live-transactional-data",
            reporting_date="Billing date from VBRK.FKDAT",
            revenue_measure="Net billed item value from VBRP.NETWR, signed by billing type and cancellation flag",
            country_dimension="Customer country from KNA1.LAND1 via VBRK.KUNRG; UNK if missing",
            currency_handling="Aggregated by currency; no cross-currency summation",
            cancellation_credit_return_treatment="FKSTO='X' rows are negative; FKART in {G2,L2,RE} rows are negative",
            excluded_inconsistent_reference_count=result.excluded_inconsistent_reference_count,
        ),
        results=[
            RevenueByCountryMonthItem(
                month=row.month,
                country=row.country,
                currency=row.currency,
                revenue=float(row.revenue),
                transaction_count=row.transaction_count,
            )
            for row in result.rows
        ],
    )
