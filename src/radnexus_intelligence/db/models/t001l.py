from sqlalchemy import CHAR, ForeignKey, Index, String
from sqlalchemy.orm import Mapped, mapped_column

from radnexus_intelligence.db.base import Base
from radnexus_intelligence.db.models.mixins import RadNexusTimestampsMixin


class T001L(Base, RadNexusTimestampsMixin):
    __tablename__ = "T001L"
    __table_args__ = (
        Index("ix_t001l_werks", "WERKS"),
        Index("ix_t001l_lgobe", "LGOBE"),
    )

    MANDT: Mapped[str] = mapped_column(CHAR(3), nullable=False, default="100")
    WERKS: Mapped[str] = mapped_column(ForeignKey("T001W.WERKS"), primary_key=True)
    LGORT: Mapped[str] = mapped_column(CHAR(4), primary_key=True)
    LGOBE: Mapped[str] = mapped_column(String(100), nullable=False)
