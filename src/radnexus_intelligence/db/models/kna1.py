from sqlalchemy import CHAR, Index, String
from sqlalchemy.orm import Mapped, mapped_column
from typing import Optional

from radnexus_intelligence.db.base import Base
from radnexus_intelligence.db.models.mixins import RadNexusTimestampsMixin


class KNA1(Base, RadNexusTimestampsMixin):
    __tablename__ = "KNA1"
    __table_args__ = (
        Index("ix_kna1_land1", "LAND1"),
        Index("ix_kna1_name1", "NAME1"),
    )

    MANDT: Mapped[str] = mapped_column(CHAR(3), nullable=False, default="100")
    KUNNR: Mapped[str] = mapped_column(CHAR(10), primary_key=True)
    NAME1: Mapped[str] = mapped_column(String(120), nullable=False)
    LAND1: Mapped[str] = mapped_column(CHAR(3), nullable=False)
    REGIO: Mapped[Optional[str]] = mapped_column(CHAR(3), nullable=True)
    ORT01: Mapped[Optional[str]] = mapped_column(String(80), nullable=True)
    PSTLZ: Mapped[Optional[str]] = mapped_column(String(10), nullable=True)
    STRAS: Mapped[Optional[str]] = mapped_column(String(120), nullable=True)
    KTOKD: Mapped[str] = mapped_column(CHAR(4), nullable=False)
    LOEVM: Mapped[str] = mapped_column(CHAR(1), nullable=False, default="")
