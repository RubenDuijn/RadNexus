from decimal import Decimal
from typing import Optional

from sqlalchemy import CHAR, ForeignKeyConstraint, Index, Numeric
from sqlalchemy.orm import Mapped, mapped_column

from radnexus_intelligence.db.base import Base
from radnexus_intelligence.db.models.mixins import RadNexusTimestampsMixin


class MARD(Base, RadNexusTimestampsMixin):
    __tablename__ = "MARD"
    __table_args__ = (
        ForeignKeyConstraint(["MATNR", "WERKS"], ["MARC.MATNR", "MARC.WERKS"], name="fk_mard_marc"),
        ForeignKeyConstraint(["WERKS", "LGORT"], ["T001L.WERKS", "T001L.LGORT"], name="fk_mard_t001l"),
        Index("ix_mard_werks", "WERKS"),
        Index("ix_mard_lgort", "LGORT"),
    )

    MANDT: Mapped[str] = mapped_column(CHAR(3), nullable=False, default="100")
    MATNR: Mapped[str] = mapped_column(CHAR(18), primary_key=True)
    WERKS: Mapped[str] = mapped_column(CHAR(4), primary_key=True)
    LGORT: Mapped[str] = mapped_column(CHAR(4), primary_key=True)
    LABST: Mapped[Decimal] = mapped_column(Numeric(15, 3), nullable=False, default=0)
    INSME: Mapped[Decimal] = mapped_column(Numeric(15, 3), nullable=False, default=0)
    SPEME: Mapped[Decimal] = mapped_column(Numeric(15, 3), nullable=False, default=0)
    LGPBE: Mapped[Optional[str]] = mapped_column(CHAR(10), nullable=True)
