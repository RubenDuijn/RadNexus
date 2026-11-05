from datetime import date
from decimal import Decimal
from typing import Optional

from sqlalchemy import CHAR, Date, ForeignKey, Index, Numeric
from sqlalchemy.orm import Mapped, mapped_column

from radnexus_intelligence.db.base import Base
from radnexus_intelligence.db.models.mixins import RadNexusTimestampsMixin


class LIKP(Base, RadNexusTimestampsMixin):
    __tablename__ = "LIKP"
    __table_args__ = (
        Index("ix_likp_vkorg", "VKORG"),
        Index("ix_likp_kunnr", "KUNNR"),
        Index("ix_likp_lfdat", "LFDAT"),
        Index("ix_likp_vgbel", "VGBEL"),
    )

    MANDT: Mapped[str] = mapped_column(CHAR(3), nullable=False, default="100")
    VBELN: Mapped[str] = mapped_column(CHAR(10), primary_key=True)
    VKORG: Mapped[str] = mapped_column(ForeignKey("TVKO.VKORG"), nullable=False)
    BUKRS: Mapped[str] = mapped_column(ForeignKey("T001.BUKRS"), nullable=False)
    KUNNR: Mapped[str] = mapped_column(ForeignKey("KNA1.KUNNR"), nullable=False)
    VGBEL: Mapped[Optional[str]] = mapped_column(ForeignKey("VBAK.VBELN"), nullable=True)
    LFDAT: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    WADAT_IST: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    WAERK: Mapped[str] = mapped_column(CHAR(5), nullable=False)
    BTGEW: Mapped[Optional[Decimal]] = mapped_column(Numeric(15, 3), nullable=True)
    GEWEI: Mapped[Optional[str]] = mapped_column(CHAR(3), nullable=True)
