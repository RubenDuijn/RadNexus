"""phase3_delivery_billing_chain

Revision ID: 20261105_0004
Revises: 20261105_0003
Create Date: 2026-11-05 16:45:00.000000

"""

from collections.abc import Sequence
from typing import Optional, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "20261105_0004"
down_revision: Optional[str] = "20261105_0003"
branch_labels: Optional[Union[str, Sequence[str]]] = None
depends_on: Optional[Union[str, Sequence[str]]] = None


def upgrade() -> None:
    op.create_table(
        "LIKP",
        sa.Column("MANDT", sa.CHAR(length=3), nullable=False, server_default="100"),
        sa.Column("VBELN", sa.CHAR(length=10), nullable=False),
        sa.Column("VKORG", sa.CHAR(length=4), nullable=False),
        sa.Column("BUKRS", sa.CHAR(length=4), nullable=False),
        sa.Column("KUNNR", sa.CHAR(length=10), nullable=False),
        sa.Column("VGBEL", sa.CHAR(length=10), nullable=True),
        sa.Column("LFDAT", sa.Date(), nullable=True),
        sa.Column("WADAT_IST", sa.Date(), nullable=True),
        sa.Column("WAERK", sa.CHAR(length=5), nullable=False),
        sa.Column("BTGEW", sa.Numeric(precision=15, scale=3), nullable=True),
        sa.Column("GEWEI", sa.CHAR(length=3), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.ForeignKeyConstraint(["BUKRS"], ["T001.BUKRS"], name="fk_likp_bukrs_t001"),
        sa.ForeignKeyConstraint(["KUNNR"], ["KNA1.KUNNR"], name="fk_likp_kunnr_kna1"),
        sa.ForeignKeyConstraint(["VGBEL"], ["VBAK.VBELN"], name="fk_likp_vgbel_vbak"),
        sa.ForeignKeyConstraint(["VKORG"], ["TVKO.VKORG"], name="fk_likp_vkorg_tvko"),
        sa.PrimaryKeyConstraint("VBELN", name="pk_likp"),
    )
    op.create_index("ix_likp_kunnr", "LIKP", ["KUNNR"], unique=False)
    op.create_index("ix_likp_lfdat", "LIKP", ["LFDAT"], unique=False)
    op.create_index("ix_likp_vgbel", "LIKP", ["VGBEL"], unique=False)
    op.create_index("ix_likp_vkorg", "LIKP", ["VKORG"], unique=False)

    op.create_table(
        "LIPS",
        sa.Column("MANDT", sa.CHAR(length=3), nullable=False, server_default="100"),
        sa.Column("VBELN", sa.CHAR(length=10), nullable=False),
        sa.Column("POSNR", sa.CHAR(length=6), nullable=False),
        sa.Column("VGBEL", sa.CHAR(length=10), nullable=False),
        sa.Column("VGPOS", sa.CHAR(length=6), nullable=False),
        sa.Column("MATNR", sa.CHAR(length=18), nullable=False),
        sa.Column("WERKS", sa.CHAR(length=4), nullable=True),
        sa.Column("LFIMG", sa.Numeric(precision=15, scale=3), nullable=False, server_default="0"),
        sa.Column("VRKME", sa.CHAR(length=3), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.ForeignKeyConstraint(["MATNR"], ["MARA.MATNR"], name="fk_lips_matnr_mara"),
        sa.ForeignKeyConstraint(["VBELN"], ["LIKP.VBELN"], name="fk_lips_vbeln_likp"),
        sa.ForeignKeyConstraint(["VGBEL", "VGPOS"], ["VBAP.VBELN", "VBAP.POSNR"], name="fk_lips_vbap"),
        sa.ForeignKeyConstraint(["WERKS"], ["T001W.WERKS"], name="fk_lips_werks_t001w"),
        sa.PrimaryKeyConstraint("VBELN", "POSNR", name="pk_lips"),
    )
    op.create_index("ix_lips_matnr", "LIPS", ["MATNR"], unique=False)
    op.create_index("ix_lips_vgbel_vgpos", "LIPS", ["VGBEL", "VGPOS"], unique=False)
    op.create_index("ix_lips_werks", "LIPS", ["WERKS"], unique=False)

    op.create_table(
        "VBRK",
        sa.Column("MANDT", sa.CHAR(length=3), nullable=False, server_default="100"),
        sa.Column("VBELN", sa.CHAR(length=10), nullable=False),
        sa.Column("FKDAT", sa.Date(), nullable=False),
        sa.Column("VKORG", sa.CHAR(length=4), nullable=False),
        sa.Column("BUKRS", sa.CHAR(length=4), nullable=False),
        sa.Column("KUNRG", sa.CHAR(length=10), nullable=False),
        sa.Column("WAERK", sa.CHAR(length=5), nullable=False),
        sa.Column("FKART", sa.CHAR(length=4), nullable=False),
        sa.Column("FKSTO", sa.CHAR(length=1), nullable=False, server_default=""),
        sa.Column("NETWR", sa.Numeric(precision=15, scale=2), nullable=False, server_default="0"),
        sa.Column("XBLNR", sa.CHAR(length=16), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.ForeignKeyConstraint(["BUKRS"], ["T001.BUKRS"], name="fk_vbrk_bukrs_t001"),
        sa.ForeignKeyConstraint(["KUNRG"], ["KNA1.KUNNR"], name="fk_vbrk_kunrg_kna1"),
        sa.ForeignKeyConstraint(["VKORG"], ["TVKO.VKORG"], name="fk_vbrk_vkorg_tvko"),
        sa.PrimaryKeyConstraint("VBELN", name="pk_vbrk"),
    )
    op.create_index("ix_vbrk_fkart", "VBRK", ["FKART"], unique=False)
    op.create_index("ix_vbrk_fkdat", "VBRK", ["FKDAT"], unique=False)
    op.create_index("ix_vbrk_kunrg", "VBRK", ["KUNRG"], unique=False)
    op.create_index("ix_vbrk_waerk", "VBRK", ["WAERK"], unique=False)

    op.create_table(
        "VBRP",
        sa.Column("MANDT", sa.CHAR(length=3), nullable=False, server_default="100"),
        sa.Column("VBELN", sa.CHAR(length=10), nullable=False),
        sa.Column("POSNR", sa.CHAR(length=6), nullable=False),
        sa.Column("VGBEL", sa.CHAR(length=10), nullable=True),
        sa.Column("VGPOS", sa.CHAR(length=6), nullable=True),
        sa.Column("AUBEL", sa.CHAR(length=10), nullable=True),
        sa.Column("AUPOS", sa.CHAR(length=6), nullable=True),
        sa.Column("MATNR", sa.CHAR(length=18), nullable=True),
        sa.Column("WERKS", sa.CHAR(length=4), nullable=True),
        sa.Column("FKIMG", sa.Numeric(precision=15, scale=3), nullable=False, server_default="0"),
        sa.Column("VRKME", sa.CHAR(length=3), nullable=True),
        sa.Column("WAERK", sa.CHAR(length=5), nullable=False),
        sa.Column("NETWR", sa.Numeric(precision=15, scale=2), nullable=False, server_default="0"),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.ForeignKeyConstraint(["AUBEL", "AUPOS"], ["VBAP.VBELN", "VBAP.POSNR"], name="fk_vbrp_vbap"),
        sa.ForeignKeyConstraint(["MATNR"], ["MARA.MATNR"], name="fk_vbrp_matnr_mara"),
        sa.ForeignKeyConstraint(["VBELN"], ["VBRK.VBELN"], name="fk_vbrp_vbeln_vbrk"),
        sa.ForeignKeyConstraint(["VGBEL", "VGPOS"], ["LIPS.VBELN", "LIPS.POSNR"], name="fk_vbrp_lips"),
        sa.ForeignKeyConstraint(["WERKS"], ["T001W.WERKS"], name="fk_vbrp_werks_t001w"),
        sa.PrimaryKeyConstraint("VBELN", "POSNR", name="pk_vbrp"),
    )
    op.create_index("ix_vbrp_aubel_aupos", "VBRP", ["AUBEL", "AUPOS"], unique=False)
    op.create_index("ix_vbrp_matnr", "VBRP", ["MATNR"], unique=False)
    op.create_index("ix_vbrp_vgbel_vgpos", "VBRP", ["VGBEL", "VGPOS"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_vbrp_vgbel_vgpos", table_name="VBRP")
    op.drop_index("ix_vbrp_matnr", table_name="VBRP")
    op.drop_index("ix_vbrp_aubel_aupos", table_name="VBRP")
    op.drop_table("VBRP")

    op.drop_index("ix_vbrk_waerk", table_name="VBRK")
    op.drop_index("ix_vbrk_kunrg", table_name="VBRK")
    op.drop_index("ix_vbrk_fkdat", table_name="VBRK")
    op.drop_index("ix_vbrk_fkart", table_name="VBRK")
    op.drop_table("VBRK")

    op.drop_index("ix_lips_werks", table_name="LIPS")
    op.drop_index("ix_lips_vgbel_vgpos", table_name="LIPS")
    op.drop_index("ix_lips_matnr", table_name="LIPS")
    op.drop_table("LIPS")

    op.drop_index("ix_likp_vkorg", table_name="LIKP")
    op.drop_index("ix_likp_vgbel", table_name="LIKP")
    op.drop_index("ix_likp_lfdat", table_name="LIKP")
    op.drop_index("ix_likp_kunnr", table_name="LIKP")
    op.drop_table("LIKP")
