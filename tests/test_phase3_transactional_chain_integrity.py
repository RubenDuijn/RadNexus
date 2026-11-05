from datetime import date
from decimal import Decimal

import pytest
from sqlalchemy import create_engine, event
from sqlalchemy.exc import IntegrityError
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


def _create_sqlite_engine():
    engine = create_engine("sqlite+pysqlite:///:memory:")

    @event.listens_for(engine, "connect")
    def set_sqlite_pragma(dbapi_connection, _connection_record):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()

    Base.metadata.create_all(bind=engine)
    return engine


def _seed_reference_data(session: Session) -> None:
    session.add(T001(BUKRS="1000", BUTXT="NEXORA Germany", LAND1="DEU", WAERS="EUR", KTOPL="INT1"))
    session.add(TVKO(VKORG="1000", BUKRS="1000", WAERS="EUR"))
    session.add(T001W(WERKS="P100", NAME1="Primary Plant", BUKRS="1000", LAND1="DEU"))

    session.add(KNA1(KUNNR="CUST000001", NAME1="Helios Industriehandel", LAND1="DEU", KTOKD="Z001"))
    session.add(KNA1(KUNNR="CUST000002", NAME1="Alpine Process AG", LAND1="CHE", KTOKD="Z001"))

    session.add(MARA(MATNR="MAT000000000000001", MTART="FERT", MATKL="AUTOMAT", MEINS="EA"))

    session.commit()


def _insert_sales_chain_for_order(session: Session, order_id: str, item_id: str) -> None:
    session.add(
        VBAK(
            VBELN=order_id,
            VKORG="1000",
            KUNNR="CUST000001",
            BUKRS="1000",
            AUDAT=date(2026, 10, 1),
            WAERK="EUR",
            NETWR=Decimal("180.00"),
        )
    )
    session.add(
        VBAP(
            VBELN=order_id,
            POSNR=item_id,
            MATNR="MAT000000000000001",
            WERKS="P100",
            KWMENG=Decimal("18.000"),
            VRKME="EA",
            WAERK="EUR",
            NETWR=Decimal("180.00"),
        )
    )
    session.commit()


def test_valid_partial_delivery_and_billing_chain() -> None:
    engine = _create_sqlite_engine()

    with Session(engine) as session:
        _seed_reference_data(session)
        _insert_sales_chain_for_order(session, "5000000001", "000010")

        session.add(
            LIKP(
                VBELN="8000000001",
                VKORG="1000",
                BUKRS="1000",
                KUNNR="CUST000001",
                VGBEL="5000000001",
                LFDAT=date(2026, 10, 5),
                WADAT_IST=date(2026, 10, 5),
                WAERK="EUR",
            )
        )
        session.add(
            LIPS(
                VBELN="8000000001",
                POSNR="000010",
                VGBEL="5000000001",
                VGPOS="000010",
                MATNR="MAT000000000000001",
                WERKS="P100",
                LFIMG=Decimal("10.000"),
                VRKME="EA",
            )
        )
        session.add(
            LIPS(
                VBELN="8000000001",
                POSNR="000020",
                VGBEL="5000000001",
                VGPOS="000010",
                MATNR="MAT000000000000001",
                WERKS="P100",
                LFIMG=Decimal("8.000"),
                VRKME="EA",
            )
        )

        session.add(
            VBRK(
                VBELN="9000000001",
                FKDAT=date(2026, 10, 20),
                VKORG="1000",
                BUKRS="1000",
                KUNRG="CUST000001",
                WAERK="EUR",
                FKART="F2",
                NETWR=Decimal("180.00"),
            )
        )
        session.add(
            VBRP(
                VBELN="9000000001",
                POSNR="000010",
                VGBEL="8000000001",
                VGPOS="000010",
                AUBEL="5000000001",
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
            VBRP(
                VBELN="9000000001",
                POSNR="000020",
                VGBEL="8000000001",
                VGPOS="000020",
                AUBEL="5000000001",
                AUPOS="000010",
                MATNR="MAT000000000000001",
                WERKS="P100",
                FKIMG=Decimal("8.000"),
                VRKME="EA",
                WAERK="EUR",
                NETWR=Decimal("80.00"),
            )
        )

        session.commit()


def test_invalid_chain_rejects_missing_sales_item_reference() -> None:
    engine = _create_sqlite_engine()

    with Session(engine) as session:
        _seed_reference_data(session)
        _insert_sales_chain_for_order(session, "5000000002", "000010")

        session.add(
            LIKP(
                VBELN="8000000002",
                VKORG="1000",
                BUKRS="1000",
                KUNNR="CUST000001",
                VGBEL="5000000002",
                LFDAT=date(2026, 10, 7),
                WADAT_IST=date(2026, 10, 7),
                WAERK="EUR",
            )
        )
        session.commit()

        session.add(
            LIPS(
                VBELN="8000000002",
                POSNR="000010",
                VGBEL="5000000002",
                VGPOS="999999",
                MATNR="MAT000000000000001",
                WERKS="P100",
                LFIMG=Decimal("5.000"),
                VRKME="EA",
            )
        )

        with pytest.raises(IntegrityError):
            session.commit()


def test_invalid_chain_rejects_missing_delivery_reference() -> None:
    engine = _create_sqlite_engine()

    with Session(engine) as session:
        _seed_reference_data(session)
        _insert_sales_chain_for_order(session, "5000000003", "000010")

        session.add(
            VBRK(
                VBELN="9000000003",
                FKDAT=date(2026, 11, 4),
                VKORG="1000",
                BUKRS="1000",
                KUNRG="CUST000001",
                WAERK="EUR",
                FKART="F2",
                NETWR=Decimal("100.00"),
            )
        )
        session.commit()

        session.add(
            VBRP(
                VBELN="9000000003",
                POSNR="000010",
                VGBEL="8999999999",
                VGPOS="000010",
                AUBEL="5000000003",
                AUPOS="000010",
                MATNR="MAT000000000000001",
                WERKS="P100",
                FKIMG=Decimal("10.000"),
                VRKME="EA",
                WAERK="EUR",
                NETWR=Decimal("100.00"),
            )
        )

        with pytest.raises(IntegrityError):
            session.commit()
