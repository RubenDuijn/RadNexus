from typing import Optional

from sqlalchemy import CHAR, ForeignKey, Index
from sqlalchemy.orm import Mapped, mapped_column

from radnexus_intelligence.db.base import Base
from radnexus_intelligence.db.models.mixins import RadNexusTimestampsMixin


class LFB1(Base, RadNexusTimestampsMixin):
    __tablename__ = "LFB1"
    __table_args__ = (
        Index("ix_lfb1_bukrs", "BUKRS"),
        Index("ix_lfb1_akont", "AKONT"),
    )

    MANDT: Mapped[str] = mapped_column(CHAR(3), nullable=False, default="100")
    LIFNR: Mapped[str] = mapped_column(ForeignKey("LFA1.LIFNR"), primary_key=True)
    BUKRS: Mapped[str] = mapped_column(ForeignKey("T001.BUKRS"), primary_key=True)
    AKONT: Mapped[str] = mapped_column(CHAR(10), nullable=False)
    ZTERM: Mapped[Optional[str]] = mapped_column(CHAR(4), nullable=True)
    SPERR: Mapped[str] = mapped_column(CHAR(1), nullable=False, default="")
