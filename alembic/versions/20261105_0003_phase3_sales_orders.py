"""phase3_sales_orders

Revision ID: 20261105_0003
Revises: 20261105_0002
Create Date: 2026-11-05 15:30:00.000000

"""

from collections.abc import Sequence
from typing import Optional, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "20261105_0003"
down_revision: Optional[str] = "20261105_0002"
branch_labels: Optional[Union[str, Sequence[str]]] = None
depends_on: Optional[Union[str, Sequence[str]]] = None


def upgrade() -> None:
    op.create_table(
        "VBAK",
        sa.Column("MANDT", sa.CHAR(length=3), nullable=False, server_default="100"),
        sa.Column("VBELN", sa.CHAR(length=10), nullable=False),
        sa.Column("VKORG", sa.CHAR(length=4), nullable=False),
        sa.Column("KUNNR", sa.CHAR(length=10), nullable=False),
        sa.Column("BUKRS", sa.CHAR(length=4), nullable=False),
        sa.Column("AUDAT", sa.Date(), nullable=False),
        sa.Column("WAERK", sa.CHAR(length=5), nullable=False),
        sa.Column("NETWR", sa.Numeric(precision=15, scale=2), nullable=False, server_default="0"),
        sa.Column("VKBUR", sa.CHAR(length=4), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.ForeignKeyConstraint(["BUKRS"], ["T001.BUKRS"], name="fk_vbak_bukrs_t001"),
        sa.ForeignKeyConstraint(["KUNNR"], ["KNA1.KUNNR"], name="fk_vbak_kunnr_kna1"),
        sa.ForeignKeyConstraint(["VKORG"], ["TVKO.VKORG"], name="fk_vbak_vkorg_tvko"),
        sa.PrimaryKeyConstraint("VBELN", name="pk_vbak"),
    )
    op.create_index("ix_vbak_audat", "VBAK", ["AUDAT"], unique=False)
    op.create_index("ix_vbak_kunnr", "VBAK", ["KUNNR"], unique=False)
    op.create_index("ix_vbak_vkorg", "VBAK", ["VKORG"], unique=False)

    op.create_table(
        "VBAP",
        sa.Column("MANDT", sa.CHAR(length=3), nullable=False, server_default="100"),
        sa.Column("VBELN", sa.CHAR(length=10), nullable=False),
        sa.Column("POSNR", sa.CHAR(length=6), nullable=False),
        sa.Column("MATNR", sa.CHAR(length=18), nullable=False),
        sa.Column("WERKS", sa.CHAR(length=4), nullable=True),
        sa.Column("KWMENG", sa.Numeric(precision=15, scale=3), nullable=False, server_default="0"),
        sa.Column("VRKME", sa.CHAR(length=3), nullable=True),
        sa.Column("WAERK", sa.CHAR(length=5), nullable=False),
        sa.Column("NETWR", sa.Numeric(precision=15, scale=2), nullable=False, server_default="0"),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.ForeignKeyConstraint(["MATNR"], ["MARA.MATNR"], name="fk_vbap_matnr_mara"),
        sa.ForeignKeyConstraint(["VBELN"], ["VBAK.VBELN"], name="fk_vbap_vbeln_vbak"),
        sa.ForeignKeyConstraint(["WERKS"], ["T001W.WERKS"], name="fk_vbap_werks_t001w"),
        sa.PrimaryKeyConstraint("VBELN", "POSNR", name="pk_vbap"),
    )
    op.create_index("ix_vbap_matnr", "VBAP", ["MATNR"], unique=False)
    op.create_index("ix_vbap_werks", "VBAP", ["WERKS"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_vbap_werks", table_name="VBAP")
    op.drop_index("ix_vbap_matnr", table_name="VBAP")
    op.drop_table("VBAP")

    op.drop_index("ix_vbak_vkorg", table_name="VBAK")
    op.drop_index("ix_vbak_kunnr", table_name="VBAK")
    op.drop_index("ix_vbak_audat", table_name="VBAK")
    op.drop_table("VBAK")
