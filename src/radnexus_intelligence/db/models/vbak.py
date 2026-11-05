from datetime import date
from decimal import Decimal
from typing import Optional

from sqlalchemy import CHAR, Date, ForeignKey, Index, Numeric
from sqlalchemy.orm import Mapped, mapped_column

from radnexus_intelligence.db.base import Base
from radnexus_intelligence.db.models.mixins import RadNexusTimestampsMixin


class VBAK(Base, RadNexusTimestampsMixin):
    __tablename__ = "VBAK"
    __table_args__ = (
        Index("ix_vbak_vkorg", "VKORG"),
        Index("ix_vbak_kunnr", "KUNNR"),
        Index("ix_vbak_audat", "AUDAT"),
    )

    MANDT: Mapped[str] = mapped_column(CHAR(3), nullable=False, default="100")
    VBELN: Mapped[str] = mapped_column(CHAR(10), primary_key=True)
    VKORG: Mapped[str] = mapped_column(ForeignKey("TVKO.VKORG"), nullable=False)
    KUNNR: Mapped[str] = mapped_column(ForeignKey("KNA1.KUNNR"), nullable=False)
    BUKRS: Mapped[str] = mapped_column(ForeignKey("T001.BUKRS"), nullable=False)
    AUDAT: Mapped[date] = mapped_column(Date, nullable=False)
    WAERK: Mapped[str] = mapped_column(CHAR(5), nullable=False)
    NETWR: Mapped[Decimal] = mapped_column(Numeric(15, 2), nullable=False, default=0)
    VKBUR: Mapped[Optional[str]] = mapped_column(CHAR(4), nullable=True)
