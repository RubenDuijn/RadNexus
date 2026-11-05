from decimal import Decimal
from typing import Optional

from sqlalchemy import CHAR, ForeignKey, ForeignKeyConstraint, Index, Numeric
from sqlalchemy.orm import Mapped, mapped_column

from radnexus_intelligence.db.base import Base
from radnexus_intelligence.db.models.mixins import RadNexusTimestampsMixin


class LIPS(Base, RadNexusTimestampsMixin):
    __tablename__ = "LIPS"
    __table_args__ = (
        ForeignKeyConstraint(["VGBEL", "VGPOS"], ["VBAP.VBELN", "VBAP.POSNR"], name="fk_lips_vbap"),
        Index("ix_lips_matnr", "MATNR"),
        Index("ix_lips_werks", "WERKS"),
        Index("ix_lips_vgbel_vgpos", "VGBEL", "VGPOS"),
    )

    MANDT: Mapped[str] = mapped_column(CHAR(3), nullable=False, default="100")
    VBELN: Mapped[str] = mapped_column(ForeignKey("LIKP.VBELN"), primary_key=True)
    POSNR: Mapped[str] = mapped_column(CHAR(6), primary_key=True)
    VGBEL: Mapped[str] = mapped_column(CHAR(10), nullable=False)
    VGPOS: Mapped[str] = mapped_column(CHAR(6), nullable=False)
    MATNR: Mapped[str] = mapped_column(ForeignKey("MARA.MATNR"), nullable=False)
    WERKS: Mapped[Optional[str]] = mapped_column(ForeignKey("T001W.WERKS"), nullable=True)
    LFIMG: Mapped[Decimal] = mapped_column(Numeric(15, 3), nullable=False, default=0)
    VRKME: Mapped[Optional[str]] = mapped_column(CHAR(3), nullable=True)
