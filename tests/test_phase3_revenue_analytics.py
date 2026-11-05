from datetime import date
from decimal import Decimal

from sqlalchemy import create_engine, event
from sqlalchemy.orm import Session

from radnexus_intelligence.db.base import Base
from radnexus_intelligence.db.models import (
    KNA1,
    LIKP,
    LIPS,
    MARA,
    T001,
    T001W,
    TVKO,
    VBAK,
    VBAP,
    VBRK,
    VBRP,
)
from radnexus_intelligence.services.revenue_analytics import get_revenue_by_country_month


def _create_sqlite_engine():
    engine = create_engine("sqlite+pysqlite:///:memory:")

    @event.listens_for(engine, "connect")
    def set_sqlite_pragma(dbapi_connection, _connection_record):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()

    Base.metadata.create_all(bind=engine)
    return engine


def _seed_transactions(session: Session) -> None:
    session.add(T001(BUKRS="1000", BUTXT="NEXORA Germany", LAND1="DEU", WAERS="EUR", KTOPL="INT1"))
    session.add(TVKO(VKORG="1000", BUKRS="1000", WAERS="EUR"))
    session.add(T001W(WERKS="P100", NAME1="Primary Plant", BUKRS="1000", LAND1="DEU"))

    session.add(KNA1(KUNNR="CUST000001", NAME1="Helios Industriehandel", LAND1="DEU", KTOKD="Z001"))
    session.add(KNA1(KUNNR="CUST000002", NAME1="Alpine Process AG", LAND1="CHE", KTOKD="Z001"))

    session.add(MARA(MATNR="MAT000000000000001", MTART="FERT", MATKL="AUTOMAT", MEINS="EA"))
    session.commit()

    session.add(
        VBAK(
            VBELN="5000000100",
            VKORG="1000",
            KUNNR="CUST000001",
            BUKRS="1000",
            AUDAT=date(2026, 10, 1),
            WAERK="EUR",
            NETWR=Decimal("210.00"),
        )
    )
    session.add(
        VBAP(
            VBELN="5000000100",
            POSNR="000010",
            MATNR="MAT000000000000001",
            WERKS="P100",
            KWMENG=Decimal("21.000"),
            VRKME="EA",
            WAERK="EUR",
            NETWR=Decimal("210.00"),
        )
    )
    session.commit()

    session.add(
        LIKP(
            VBELN="8000000100",
            VKORG="1000",
            BUKRS="1000",
            KUNNR="CUST000001",
            VGBEL="5000000100",
            LFDAT=date(2026, 10, 5),
            WADAT_IST=date(2026, 10, 5),
            WAERK="EUR",
        )
    )
    session.add(
        LIPS(
            VBELN="8000000100",
            POSNR="000010",
            VGBEL="5000000100",
            VGPOS="000010",
            MATNR="MAT000000000000001",
            WERKS="P100",
            LFIMG=Decimal("21.000"),
            VRKME="EA",
        )
    )
    session.commit()

    session.add(
        VBRK(
            VBELN="9000000100",
            FKDAT=date(2026, 10, 20),
            VKORG="1000",
            BUKRS="1000",
            KUNRG="CUST000001",
            WAERK="EUR",
            FKART="F2",
            NETWR=Decimal("100.00"),
        )
    )
    session.add(
        VBRP(
            VBELN="9000000100",
            POSNR="000010",
            VGBEL="8000000100",
            VGPOS="000010",
            AUBEL="5000000100",
            AUPOS="000010",
            MATNR="MAT000000000000001",
            WERKS="P100",
            FKIMG=Decimal("10.000"),
            VRKME="EA",
            WAERK="EUR",
            NETWR=Decimal("100.00"),
        )
    )

    session.add(
        VBRK(
            VBELN="9000000101",
            FKDAT=date(2026, 10, 22),
            VKORG="1000",
            BUKRS="1000",
            KUNRG="CUST000001",
            WAERK="EUR",
            FKART="G2",
            NETWR=Decimal("20.00"),
        )
    )
    session.add(
        VBRP(
            VBELN="9000000101",
            POSNR="000010",
            VGBEL="8000000100",
            VGPOS="000010",
            AUBEL="5000000100",
            AUPOS="000010",
            MATNR="MAT000000000000001",
            WERKS="P100",
            FKIMG=Decimal("2.000"),
            VRKME="EA",
            WAERK="EUR",
            NETWR=Decimal("20.00"),
        )
    )

    session.add(
        VBRK(
            VBELN="9000000102",
            FKDAT=date(2026, 10, 25),
            VKORG="1000",
            BUKRS="1000",
            KUNRG="CUST000001",
            WAERK="EUR",
            FKART="F2",
            FKSTO="X",
            NETWR=Decimal("10.00"),
        )
    )
    session.add(
        VBRP(
            VBELN="9000000102",
            POSNR="000010",
            VGBEL="8000000100",
            VGPOS="000010",
            AUBEL="5000000100",
            AUPOS="000010",
            MATNR="MAT000000000000001",
            WERKS="P100",
            FKIMG=Decimal("1.000"),
            VRKME="EA",
            WAERK="EUR",
            NETWR=Decimal("10.00"),
        )
    )
    session.commit()

    session.add(
        VBAK(
            VBELN="5000000200",
            VKORG="1000",
            KUNNR="CUST000002",
            BUKRS="1000",
            AUDAT=date(2026, 11, 1),
            WAERK="CHF",
            NETWR=Decimal("70.00"),
        )
    )
    session.add(
        VBAP(
            VBELN="5000000200",
            POSNR="000010",
            MATNR="MAT000000000000001",
            WERKS="P100",
            KWMENG=Decimal("7.000"),
            VRKME="EA",
            WAERK="CHF",
            NETWR=Decimal("70.00"),
        )
    )
    session.commit()
    session.add(
        LIKP(
            VBELN="8000000200",
            VKORG="1000",
            BUKRS="1000",
            KUNNR="CUST000002",
            VGBEL="5000000200",
            LFDAT=date(2026, 11, 2),
            WADAT_IST=date(2026, 11, 2),
            WAERK="CHF",
        )
    )
    session.add(
        LIPS(
            VBELN="8000000200",
            POSNR="000010",
            VGBEL="5000000200",
            VGPOS="000010",
            MATNR="MAT000000000000001",
            WERKS="P100",
            LFIMG=Decimal("7.000"),
            VRKME="EA",
        )
    )
    session.commit()
    session.add(
        VBRK(
            VBELN="9000000200",
            FKDAT=date(2026, 11, 5),
            VKORG="1000",
            BUKRS="1000",
            KUNRG="CUST000002",
            WAERK="CHF",
            FKART="F2",
            NETWR=Decimal("70.00"),
        )
    )
    session.add(
        VBRP(
            VBELN="9000000200",
            POSNR="000010",
            VGBEL="8000000200",
            VGPOS="000010",
            AUBEL="5000000200",
            AUPOS="000010",
            MATNR="MAT000000000000001",
            WERKS="P100",
            FKIMG=Decimal("7.000"),
            VRKME="EA",
            WAERK="CHF",
            NETWR=Decimal("70.00"),
        )
    )

    session.add(
        VBRK(
            VBELN="9000000999",
            FKDAT=date(2026, 10, 28),
            VKORG="1000",
            BUKRS="1000",
            KUNRG="CUST000001",
            WAERK="EUR",
            FKART="F2",
            NETWR=Decimal("30.00"),
        )
    )
    session.add(
        VBRP(
            VBELN="9000000999",
            POSNR="000010",
            VGBEL=None,
            VGPOS=None,
            AUBEL=None,
            AUPOS=None,
            MATNR="MAT000000000000001",
            WERKS="P100",
            FKIMG=Decimal("3.000"),
            VRKME="EA",
            WAERK="EUR",
            NETWR=Decimal("30.00"),
        )
    )

    session.commit()


def test_revenue_by_country_month_aggregates_deterministically() -> None:
    engine = _create_sqlite_engine()
    with Session(engine) as session:
        _seed_transactions(session)

        result = get_revenue_by_country_month(
            session=session,
            start_date=date(2026, 10, 1),
            end_date=date(2026, 11, 30),
        )

        assert result.excluded_inconsistent_reference_count == 1
        assert [(row.month, row.country, row.currency, row.revenue, row.transaction_count) for row in result.rows] == [
            ("2026-10", "DEU", "EUR", Decimal("70.00"), 3),
            ("2026-11", "CHE", "CHF", Decimal("70.00"), 1),
        ]


def test_revenue_by_country_month_filters() -> None:
    engine = _create_sqlite_engine()
    with Session(engine) as session:
        _seed_transactions(session)

        result = get_revenue_by_country_month(
            session=session,
            start_date=date(2026, 10, 1),
            end_date=date(2026, 12, 31),
            country="DEU",
            currency="EUR",
        )

        assert len(result.rows) == 1
        assert result.rows[0].month == "2026-10"
        assert result.rows[0].country == "DEU"
        assert result.rows[0].currency == "EUR"
        assert result.rows[0].revenue == Decimal("70.00")
        assert result.rows[0].transaction_count == 3
