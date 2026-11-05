from datetime import date
from decimal import Decimal

from fastapi.testclient import TestClient
from sqlalchemy import create_engine, event
from sqlalchemy.orm import Session
from sqlalchemy.pool import StaticPool

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
from radnexus_intelligence.db.session import get_db_session
from radnexus_intelligence.main import app


def _seed_for_endpoint(session: Session) -> None:
    session.add(T001(BUKRS="1000", BUTXT="NEXORA Germany", LAND1="DEU", WAERS="EUR", KTOPL="INT1"))
    session.add(TVKO(VKORG="1000", BUKRS="1000", WAERS="EUR"))
    session.add(T001W(WERKS="P100", NAME1="Primary Plant", BUKRS="1000", LAND1="DEU"))
    session.add(KNA1(KUNNR="CUST000001", NAME1="Helios Industriehandel", LAND1="DEU", KTOKD="Z001"))
    session.add(MARA(MATNR="MAT000000000000001", MTART="FERT", MATKL="AUTOMAT", MEINS="EA"))
    session.commit()

    session.add(
        VBAK(
            VBELN="5000000300",
            VKORG="1000",
            KUNNR="CUST000001",
            BUKRS="1000",
            AUDAT=date(2026, 10, 1),
            WAERK="EUR",
            NETWR=Decimal("50.00"),
        )
    )
    session.add(
        VBAP(
            VBELN="5000000300",
            POSNR="000010",
            MATNR="MAT000000000000001",
            WERKS="P100",
            KWMENG=Decimal("5.000"),
            VRKME="EA",
            WAERK="EUR",
            NETWR=Decimal("50.00"),
        )
    )
    session.commit()

    session.add(
        LIKP(
            VBELN="8000000300",
            VKORG="1000",
            BUKRS="1000",
            KUNNR="CUST000001",
            VGBEL="5000000300",
            LFDAT=date(2026, 10, 10),
            WAERK="EUR",
        )
    )
    session.add(
        LIPS(
            VBELN="8000000300",
            POSNR="000010",
            VGBEL="5000000300",
            VGPOS="000010",
            MATNR="MAT000000000000001",
            WERKS="P100",
            LFIMG=Decimal("5.000"),
            VRKME="EA",
        )
    )
    session.commit()

    session.add(
        VBRK(
            VBELN="9000000300",
            FKDAT=date(2026, 10, 12),
            VKORG="1000",
            BUKRS="1000",
            KUNRG="CUST000001",
            WAERK="EUR",
            FKART="F2",
            NETWR=Decimal("50.00"),
        )
    )
    session.add(
        VBRP(
            VBELN="9000000300",
            POSNR="000010",
            VGBEL="8000000300",
            VGPOS="000010",
            AUBEL="5000000300",
            AUPOS="000010",
            MATNR="MAT000000000000001",
            WERKS="P100",
            FKIMG=Decimal("5.000"),
            VRKME="EA",
            WAERK="EUR",
            NETWR=Decimal("50.00"),
        )
    )
    session.commit()


def test_revenue_analytics_endpoint_returns_expected_payload() -> None:
    engine = create_engine(
        "sqlite+pysqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )

    @event.listens_for(engine, "connect")
    def set_sqlite_pragma(dbapi_connection, _connection_record):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()

    Base.metadata.create_all(bind=engine)

    with Session(engine) as session:
        _seed_for_endpoint(session)

    def override_get_db_session():
        with Session(engine) as override_session:
            yield override_session

    app.dependency_overrides[get_db_session] = override_get_db_session

    try:
        client = TestClient(app)
        response = client.get(
            "/api/v1/analytics/revenue-by-country-month",
            params={"start_date": "2026-10-01", "end_date": "2026-10-31"},
        )

        assert response.status_code == 200
        payload = response.json()
        assert payload["data_state"] == "Connected live data"
        assert payload["meta"]["source"] == "live-transactional-data"
        assert payload["results"] == [
            {
                "month": "2026-10",
                "country": "DEU",
                "currency": "EUR",
                "revenue": 50.0,
                "transaction_count": 1,
            }
        ]
    finally:
        app.dependency_overrides.clear()


def test_revenue_analytics_endpoint_validates_date_range() -> None:
    engine = create_engine(
        "sqlite+pysqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )

    @event.listens_for(engine, "connect")
    def set_sqlite_pragma(dbapi_connection, _connection_record):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()

    Base.metadata.create_all(bind=engine)

    def override_get_db_session():
        with Session(engine) as override_session:
            yield override_session

    app.dependency_overrides[get_db_session] = override_get_db_session

    client = TestClient(app)
    try:
        response = client.get(
            "/api/v1/analytics/revenue-by-country-month",
            params={"start_date": "2026-11-01", "end_date": "2026-10-01"},
        )
        assert response.status_code == 422
    finally:
        app.dependency_overrides.clear()
