from decimal import Decimal
from typing import Optional

from sqlalchemy import CHAR, ForeignKey, ForeignKeyConstraint, Index, Numeric
from sqlalchemy.orm import Mapped, mapped_column

from radnexus_intelligence.db.base import Base
from radnexus_intelligence.db.models.mixins import RadNexusTimestampsMixin


class VBRP(Base, RadNexusTimestampsMixin):
    __tablename__ = "VBRP"
    __table_args__ = (
        ForeignKeyConstraint(["VGBEL", "VGPOS"], ["LIPS.VBELN", "LIPS.POSNR"], name="fk_vbrp_lips"),
        ForeignKeyConstraint(["AUBEL", "AUPOS"], ["VBAP.VBELN", "VBAP.POSNR"], name="fk_vbrp_vbap"),
        Index("ix_vbrp_vgbel_vgpos", "VGBEL", "VGPOS"),
        Index("ix_vbrp_aubel_aupos", "AUBEL", "AUPOS"),
        Index("ix_vbrp_matnr", "MATNR"),
    )

    MANDT: Mapped[str] = mapped_column(CHAR(3), nullable=False, default="100")
    VBELN: Mapped[str] = mapped_column(ForeignKey("VBRK.VBELN"), primary_key=True)
    POSNR: Mapped[str] = mapped_column(CHAR(6), primary_key=True)
    VGBEL: Mapped[Optional[str]] = mapped_column(CHAR(10), nullable=True)
    VGPOS: Mapped[Optional[str]] = mapped_column(CHAR(6), nullable=True)
    AUBEL: Mapped[Optional[str]] = mapped_column(CHAR(10), nullable=True)
    AUPOS: Mapped[Optional[str]] = mapped_column(CHAR(6), nullable=True)
    MATNR: Mapped[Optional[str]] = mapped_column(ForeignKey("MARA.MATNR"), nullable=True)
    WERKS: Mapped[Optional[str]] = mapped_column(ForeignKey("T001W.WERKS"), nullable=True)
    FKIMG: Mapped[Decimal] = mapped_column(Numeric(15, 3), nullable=False, default=0)
    VRKME: Mapped[Optional[str]] = mapped_column(CHAR(3), nullable=True)
    WAERK: Mapped[str] = mapped_column(CHAR(5), nullable=False)
    NETWR: Mapped[Decimal] = mapped_column(Numeric(15, 2), nullable=False, default=0)
