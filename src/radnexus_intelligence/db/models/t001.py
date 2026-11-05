from sqlalchemy import CHAR, String
from sqlalchemy.orm import Mapped, mapped_column

from radnexus_intelligence.db.base import Base
from radnexus_intelligence.db.models.mixins import RadNexusTimestampsMixin


class T001(Base, RadNexusTimestampsMixin):
    __tablename__ = "T001"

    MANDT: Mapped[str] = mapped_column(CHAR(3), nullable=False, default="100")
    BUKRS: Mapped[str] = mapped_column(CHAR(4), primary_key=True)
    BUTXT: Mapped[str] = mapped_column(String(100), nullable=False)
    LAND1: Mapped[str] = mapped_column(CHAR(3), nullable=False)
    WAERS: Mapped[str] = mapped_column(CHAR(5), nullable=False)
    KTOPL: Mapped[str] = mapped_column(CHAR(4), nullable=False)
