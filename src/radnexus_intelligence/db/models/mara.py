from decimal import Decimal
from typing import Optional

from sqlalchemy import CHAR, Index, Numeric
from sqlalchemy.orm import Mapped, mapped_column

from radnexus_intelligence.db.base import Base
from radnexus_intelligence.db.models.mixins import RadNexusTimestampsMixin


class MARA(Base, RadNexusTimestampsMixin):
    __tablename__ = "MARA"
    __table_args__ = (
        Index("ix_mara_mtart", "MTART"),
        Index("ix_mara_matkl", "MATKL"),
    )

    MANDT: Mapped[str] = mapped_column(CHAR(3), nullable=False, default="100")
    MATNR: Mapped[str] = mapped_column(CHAR(18), primary_key=True)
    MTART: Mapped[str] = mapped_column(CHAR(4), nullable=False)
    MATKL: Mapped[Optional[str]] = mapped_column(CHAR(9), nullable=True)
    MEINS: Mapped[str] = mapped_column(CHAR(3), nullable=False)
    BRGEW: Mapped[Optional[Decimal]] = mapped_column(Numeric(15, 3), nullable=True)
    GEWEI: Mapped[Optional[str]] = mapped_column(CHAR(3), nullable=True)
    LVORM: Mapped[str] = mapped_column(CHAR(1), nullable=False, default="")
