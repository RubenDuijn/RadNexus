from decimal import Decimal
from typing import Optional

from sqlalchemy import CHAR, ForeignKey, Index, Numeric
from sqlalchemy.orm import Mapped, mapped_column

from radnexus_intelligence.db.base import Base
from radnexus_intelligence.db.models.mixins import RadNexusTimestampsMixin


class KNB1(Base, RadNexusTimestampsMixin):
    __tablename__ = "KNB1"
    __table_args__ = (
        Index("ix_knb1_bukrs", "BUKRS"),
        Index("ix_knb1_akont", "AKONT"),
    )

    MANDT: Mapped[str] = mapped_column(CHAR(3), nullable=False, default="100")
    KUNNR: Mapped[str] = mapped_column(ForeignKey("KNA1.KUNNR"), primary_key=True)
    BUKRS: Mapped[str] = mapped_column(ForeignKey("T001.BUKRS"), primary_key=True)
    AKONT: Mapped[str] = mapped_column(CHAR(10), nullable=False)
    ZTERM: Mapped[Optional[str]] = mapped_column(CHAR(4), nullable=True)
    ZWELS: Mapped[Optional[str]] = mapped_column(CHAR(10), nullable=True)
    KLIMK: Mapped[Optional[Decimal]] = mapped_column(Numeric(15, 2), nullable=True)
    SPERR: Mapped[str] = mapped_column(CHAR(1), nullable=False, default="")
