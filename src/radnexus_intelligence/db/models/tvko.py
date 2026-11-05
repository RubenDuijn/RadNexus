from sqlalchemy import CHAR, ForeignKey, Index
from sqlalchemy.orm import Mapped, mapped_column

from radnexus_intelligence.db.base import Base
from radnexus_intelligence.db.models.mixins import RadNexusTimestampsMixin


class TVKO(Base, RadNexusTimestampsMixin):
    __tablename__ = "TVKO"
    __table_args__ = (Index("ix_tvko_bukrs", "BUKRS"),)

    MANDT: Mapped[str] = mapped_column(CHAR(3), nullable=False, default="100")
    VKORG: Mapped[str] = mapped_column(CHAR(4), primary_key=True)
    BUKRS: Mapped[str] = mapped_column(ForeignKey("T001.BUKRS"), nullable=False)
    WAERS: Mapped[str] = mapped_column(CHAR(5), nullable=False)
