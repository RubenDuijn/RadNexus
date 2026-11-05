from decimal import Decimal
from typing import Optional

from sqlalchemy import CHAR, ForeignKey, Index, Numeric
from sqlalchemy.orm import Mapped, mapped_column

from radnexus_intelligence.db.base import Base
from radnexus_intelligence.db.models.mixins import RadNexusTimestampsMixin


class VBAP(Base, RadNexusTimestampsMixin):
    __tablename__ = "VBAP"
    __table_args__ = (
        Index("ix_vbap_matnr", "MATNR"),
        Index("ix_vbap_werks", "WERKS"),
    )

    MANDT: Mapped[str] = mapped_column(CHAR(3), nullable=False, default="100")
    VBELN: Mapped[str] = mapped_column(ForeignKey("VBAK.VBELN"), primary_key=True)
    POSNR: Mapped[str] = mapped_column(CHAR(6), primary_key=True)
    MATNR: Mapped[str] = mapped_column(ForeignKey("MARA.MATNR"), nullable=False)
    WERKS: Mapped[Optional[str]] = mapped_column(ForeignKey("T001W.WERKS"), nullable=True)
    KWMENG: Mapped[Decimal] = mapped_column(Numeric(15, 3), nullable=False, default=0)
    VRKME: Mapped[Optional[str]] = mapped_column(CHAR(3), nullable=True)
    WAERK: Mapped[str] = mapped_column(CHAR(5), nullable=False)
    NETWR: Mapped[Decimal] = mapped_column(Numeric(15, 2), nullable=False, default=0)
