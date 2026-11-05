from typing import Optional

from sqlalchemy import CHAR, ForeignKey, ForeignKeyConstraint, Index
from sqlalchemy.orm import Mapped, mapped_column

from radnexus_intelligence.db.base import Base
from radnexus_intelligence.db.models.mixins import RadNexusTimestampsMixin


class MARC(Base, RadNexusTimestampsMixin):
    __tablename__ = "MARC"
    __table_args__ = (
        ForeignKeyConstraint(["WERKS"], ["T001W.WERKS"], name="fk_marc_werks_t001w"),
        Index("ix_marc_werks", "WERKS"),
        Index("ix_marc_dismm", "DISMM"),
    )

    MANDT: Mapped[str] = mapped_column(CHAR(3), nullable=False, default="100")
    MATNR: Mapped[str] = mapped_column(ForeignKey("MARA.MATNR"), primary_key=True)
    WERKS: Mapped[str] = mapped_column(CHAR(4), primary_key=True)
    DISMM: Mapped[Optional[str]] = mapped_column(CHAR(2), nullable=True)
    BESKZ: Mapped[Optional[str]] = mapped_column(CHAR(1), nullable=True)
    EKGRP: Mapped[Optional[str]] = mapped_column(CHAR(3), nullable=True)
    LVORM: Mapped[str] = mapped_column(CHAR(1), nullable=False, default="")
