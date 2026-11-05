from collections import defaultdict
from dataclasses import dataclass
from datetime import date
from decimal import Decimal
from typing import Optional

from sqlalchemy import and_, select
from sqlalchemy.orm import Session

from radnexus_intelligence.db.models.kna1 import KNA1
from radnexus_intelligence.db.models.lips import LIPS
from radnexus_intelligence.db.models.vbap import VBAP
from radnexus_intelligence.db.models.vbrk import VBRK
from radnexus_intelligence.db.models.vbrp import VBRP


CREDIT_NOTE_OR_RETURN_TYPES = {"G2", "L2", "RE"}


@dataclass(frozen=True)
class RevenueByCountryMonthRow:
	month: str
	country: str
	currency: str
	revenue: Decimal
	transaction_count: int


@dataclass(frozen=True)
class RevenueByCountryMonthResult:
	rows: list[RevenueByCountryMonthRow]
	excluded_inconsistent_reference_count: int


def _month_key(value: date) -> str:
	return f"{value.year:04d}-{value.month:02d}"


def _normalize_country(value: Optional[str]) -> str:
	if not value:
		return "UNK"
	normalized = value.strip().upper()
	return normalized if normalized else "UNK"


def _normalize_currency(value: Optional[str]) -> str:
	if not value:
		return "UNK"
	normalized = value.strip().upper()
	return normalized if normalized else "UNK"


def _signed_revenue(netwr: Decimal, fkart: str, fksto: str) -> Decimal:
	amount = Decimal(netwr)
	billing_type = (fkart or "").strip().upper()
	cancellation_flag = (fksto or "").strip().upper()

	if cancellation_flag == "X" or billing_type in CREDIT_NOTE_OR_RETURN_TYPES:
		return -abs(amount)

	return amount


def get_revenue_by_country_month(
	session: Session,
	start_date: date,
	end_date: date,
	country: Optional[str] = None,
	currency: Optional[str] = None,
) -> RevenueByCountryMonthResult:
	if start_date > end_date:
		raise ValueError("start_date must be less than or equal to end_date")

	country_filter = country.strip().upper() if country else None
	currency_filter = currency.strip().upper() if currency else None

	statement = (
		select(
			VBRK.FKDAT.label("billing_date"),
			VBRK.FKART.label("billing_type"),
			VBRK.FKSTO.label("cancellation_flag"),
			VBRK.WAERK.label("currency"),
			KNA1.LAND1.label("country"),
			VBRP.NETWR.label("netwr"),
			VBRP.VGBEL.label("delivery_ref_doc"),
			VBRP.VGPOS.label("delivery_ref_item"),
			LIPS.VBELN.label("delivery_doc_exists"),
			VBRP.AUBEL.label("sales_ref_doc"),
			VBRP.AUPOS.label("sales_ref_item"),
			VBAP.VBELN.label("sales_doc_exists"),
		)
		.join(VBRP, VBRP.VBELN == VBRK.VBELN)
		.outerjoin(KNA1, KNA1.KUNNR == VBRK.KUNRG)
		.outerjoin(LIPS, and_(LIPS.VBELN == VBRP.VGBEL, LIPS.POSNR == VBRP.VGPOS))
		.outerjoin(VBAP, and_(VBAP.VBELN == VBRP.AUBEL, VBAP.POSNR == VBRP.AUPOS))
		.where(VBRK.FKDAT >= start_date)
		.where(VBRK.FKDAT <= end_date)
	)

	if currency_filter:
		statement = statement.where(VBRK.WAERK == currency_filter)

	rows = session.execute(statement).all()
	aggregated: dict[tuple[str, str, str], dict[str, Decimal | int]] = defaultdict(
		lambda: {"revenue": Decimal("0"), "transaction_count": 0}
	)

	excluded_inconsistent_reference_count = 0

	for row in rows:
		billing_date: Optional[date] = row.billing_date
		if billing_date is None:
			excluded_inconsistent_reference_count += 1
			continue

		has_delivery_ref_pair = bool(row.delivery_ref_doc and row.delivery_ref_item)
		has_sales_ref_pair = bool(row.sales_ref_doc and row.sales_ref_item)
		has_delivery_match = row.delivery_doc_exists is not None
		has_sales_match = row.sales_doc_exists is not None

		if has_delivery_ref_pair and not has_delivery_match:
			excluded_inconsistent_reference_count += 1
			continue

		if has_sales_ref_pair and not has_sales_match:
			excluded_inconsistent_reference_count += 1
			continue

		if not has_delivery_ref_pair and not has_sales_ref_pair:
			excluded_inconsistent_reference_count += 1
			continue

		normalized_country = _normalize_country(row.country)
		if country_filter and normalized_country != country_filter:
			continue

		normalized_currency = _normalize_currency(row.currency)
		month = _month_key(billing_date)
		signed_revenue = _signed_revenue(
			netwr=Decimal(row.netwr),
			fkart=row.billing_type,
			fksto=row.cancellation_flag,
		)

		key = (month, normalized_country, normalized_currency)
		aggregated[key]["revenue"] += signed_revenue
		aggregated[key]["transaction_count"] += 1

	result_rows: list[RevenueByCountryMonthRow] = []
	for month, country_code, currency_code in sorted(aggregated.keys()):
		entry = aggregated[(month, country_code, currency_code)]
		result_rows.append(
			RevenueByCountryMonthRow(
				month=month,
				country=country_code,
				currency=currency_code,
				revenue=entry["revenue"],
				transaction_count=int(entry["transaction_count"]),
			)
		)

	return RevenueByCountryMonthResult(
		rows=result_rows,
		excluded_inconsistent_reference_count=excluded_inconsistent_reference_count,
	)
