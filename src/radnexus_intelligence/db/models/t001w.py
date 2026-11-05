from sqlalchemy import CHAR, ForeignKey, Index, String
from sqlalchemy.orm import Mapped, mapped_column

from radnexus_intelligence.db.base import Base
from radnexus_intelligence.db.models.mixins import RadNexusTimestampsMixin


class T001W(Base, RadNexusTimestampsMixin):
    __tablename__ = "T001W"
    __table_args__ = (
        Index("ix_t001w_bukrs", "BUKRS"),
        Index("ix_t001w_land1", "LAND1"),
    )

    MANDT: Mapped[str] = mapped_column(CHAR(3), nullable=False, default="100")
    WERKS: Mapped[str] = mapped_column(CHAR(4), primary_key=True)
    NAME1: Mapped[str] = mapped_column(String(100), nullable=False)
    BUKRS: Mapped[str] = mapped_column(ForeignKey("T001.BUKRS"), nullable=False)
    LAND1: Mapped[str] = mapped_column(CHAR(3), nullable=False)
