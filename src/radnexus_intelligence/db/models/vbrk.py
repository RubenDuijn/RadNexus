from datetime import date
from decimal import Decimal
from typing import Optional

from sqlalchemy import CHAR, Date, ForeignKey, Index, Numeric
from sqlalchemy.orm import Mapped, mapped_column

from radnexus_intelligence.db.base import Base
from radnexus_intelligence.db.models.mixins import RadNexusTimestampsMixin


class VBRK(Base, RadNexusTimestampsMixin):
    __tablename__ = "VBRK"
    __table_args__ = (
        Index("ix_vbrk_fkdat", "FKDAT"),
        Index("ix_vbrk_kunrg", "KUNRG"),
        Index("ix_vbrk_waerk", "WAERK"),
        Index("ix_vbrk_fkart", "FKART"),
    )

    MANDT: Mapped[str] = mapped_column(CHAR(3), nullable=False, default="100")
    VBELN: Mapped[str] = mapped_column(CHAR(10), primary_key=True)
    FKDAT: Mapped[date] = mapped_column(Date, nullable=False)
    VKORG: Mapped[str] = mapped_column(ForeignKey("TVKO.VKORG"), nullable=False)
    BUKRS: Mapped[str] = mapped_column(ForeignKey("T001.BUKRS"), nullable=False)
    KUNRG: Mapped[str] = mapped_column(ForeignKey("KNA1.KUNNR"), nullable=False)
    WAERK: Mapped[str] = mapped_column(CHAR(5), nullable=False)
    FKART: Mapped[str] = mapped_column(CHAR(4), nullable=False)
    FKSTO: Mapped[str] = mapped_column(CHAR(1), nullable=False, default="")
    NETWR: Mapped[Decimal] = mapped_column(Numeric(15, 2), nullable=False, default=0)
    XBLNR: Mapped[Optional[str]] = mapped_column(CHAR(16), nullable=True)
