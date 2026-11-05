"""phase2_core_org_customer_material

Revision ID: 20261105_0001
Revises: 
Create Date: 2026-11-05 00:00:00.000000

"""

from collections.abc import Sequence
from typing import Optional, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "20261105_0001"
down_revision: Optional[str] = None
branch_labels: Optional[Union[str, Sequence[str]]] = None
depends_on: Optional[Union[str, Sequence[str]]] = None


def upgrade() -> None:
    op.create_table(
        "T001",
        sa.Column("MANDT", sa.CHAR(length=3), nullable=False, server_default="100"),
        sa.Column("BUKRS", sa.CHAR(length=4), nullable=False),
        sa.Column("BUTXT", sa.String(length=100), nullable=False),
        sa.Column("LAND1", sa.CHAR(length=3), nullable=False),
        sa.Column("WAERS", sa.CHAR(length=5), nullable=False),
        sa.Column("KTOPL", sa.CHAR(length=4), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.PrimaryKeyConstraint("BUKRS", name="pk_t001"),
    )

    op.create_table(
        "T001W",
        sa.Column("MANDT", sa.CHAR(length=3), nullable=False, server_default="100"),
        sa.Column("WERKS", sa.CHAR(length=4), nullable=False),
        sa.Column("NAME1", sa.String(length=100), nullable=False),
        sa.Column("BUKRS", sa.CHAR(length=4), nullable=False),
        sa.Column("LAND1", sa.CHAR(length=3), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.ForeignKeyConstraint(["BUKRS"], ["T001.BUKRS"], name="fk_t001w_bukrs_t001"),
        sa.PrimaryKeyConstraint("WERKS", name="pk_t001w"),
    )
    op.create_index("ix_t001w_bukrs", "T001W", ["BUKRS"], unique=False)
    op.create_index("ix_t001w_land1", "T001W", ["LAND1"], unique=False)

    op.create_table(
        "TVKO",
        sa.Column("MANDT", sa.CHAR(length=3), nullable=False, server_default="100"),
        sa.Column("VKORG", sa.CHAR(length=4), nullable=False),
        sa.Column("BUKRS", sa.CHAR(length=4), nullable=False),
        sa.Column("WAERS", sa.CHAR(length=5), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.ForeignKeyConstraint(["BUKRS"], ["T001.BUKRS"], name="fk_tvko_bukrs_t001"),
        sa.PrimaryKeyConstraint("VKORG", name="pk_tvko"),
    )
    op.create_index("ix_tvko_bukrs", "TVKO", ["BUKRS"], unique=False)

    op.create_table(
        "KNA1",
        sa.Column("MANDT", sa.CHAR(length=3), nullable=False, server_default="100"),
        sa.Column("KUNNR", sa.CHAR(length=10), nullable=False),
        sa.Column("NAME1", sa.String(length=120), nullable=False),
        sa.Column("LAND1", sa.CHAR(length=3), nullable=False),
        sa.Column("REGIO", sa.CHAR(length=3), nullable=True),
        sa.Column("ORT01", sa.String(length=80), nullable=True),
        sa.Column("PSTLZ", sa.String(length=10), nullable=True),
        sa.Column("STRAS", sa.String(length=120), nullable=True),
        sa.Column("KTOKD", sa.CHAR(length=4), nullable=False),
        sa.Column("LOEVM", sa.CHAR(length=1), nullable=False, server_default=""),
        sa.Column("RN_PRIMARY_BUKRS", sa.CHAR(length=4), nullable=True),
        sa.Column("RN_PRIMARY_VKORG", sa.CHAR(length=4), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.ForeignKeyConstraint(["RN_PRIMARY_BUKRS"], ["T001.BUKRS"], name="fk_kna1_rn_bukrs_t001"),
        sa.ForeignKeyConstraint(["RN_PRIMARY_VKORG"], ["TVKO.VKORG"], name="fk_kna1_rn_vkorg_tvko"),
        sa.PrimaryKeyConstraint("KUNNR", name="pk_kna1"),
    )
    op.create_index("ix_kna1_land1", "KNA1", ["LAND1"], unique=False)
    op.create_index("ix_kna1_name1", "KNA1", ["NAME1"], unique=False)
    op.create_index("ix_kna1_rn_primary_bukrs", "KNA1", ["RN_PRIMARY_BUKRS"], unique=False)
    op.create_index("ix_kna1_rn_primary_vkorg", "KNA1", ["RN_PRIMARY_VKORG"], unique=False)

    op.create_table(
        "MARA",
        sa.Column("MANDT", sa.CHAR(length=3), nullable=False, server_default="100"),
        sa.Column("MATNR", sa.CHAR(length=18), nullable=False),
        sa.Column("MTART", sa.CHAR(length=4), nullable=False),
        sa.Column("MATKL", sa.CHAR(length=9), nullable=True),
        sa.Column("MEINS", sa.CHAR(length=3), nullable=False),
        sa.Column("BRGEW", sa.Numeric(precision=15, scale=3), nullable=True),
        sa.Column("GEWEI", sa.CHAR(length=3), nullable=True),
        sa.Column("LVORM", sa.CHAR(length=1), nullable=False, server_default=""),
        sa.Column("RN_PRIMARY_WERKS", sa.CHAR(length=4), nullable=True),
        sa.Column("RN_PRIMARY_VKORG", sa.CHAR(length=4), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.ForeignKeyConstraint(["RN_PRIMARY_VKORG"], ["TVKO.VKORG"], name="fk_mara_rn_vkorg_tvko"),
        sa.ForeignKeyConstraint(["RN_PRIMARY_WERKS"], ["T001W.WERKS"], name="fk_mara_rn_werks_t001w"),
        sa.PrimaryKeyConstraint("MATNR", name="pk_mara"),
    )
    op.create_index("ix_mara_matkl", "MARA", ["MATKL"], unique=False)
    op.create_index("ix_mara_mtart", "MARA", ["MTART"], unique=False)
    op.create_index("ix_mara_rn_primary_vkorg", "MARA", ["RN_PRIMARY_VKORG"], unique=False)
    op.create_index("ix_mara_rn_primary_werks", "MARA", ["RN_PRIMARY_WERKS"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_mara_rn_primary_werks", table_name="MARA")
    op.drop_index("ix_mara_rn_primary_vkorg", table_name="MARA")
    op.drop_index("ix_mara_mtart", table_name="MARA")
    op.drop_index("ix_mara_matkl", table_name="MARA")
    op.drop_table("MARA")

    op.drop_index("ix_kna1_rn_primary_vkorg", table_name="KNA1")
    op.drop_index("ix_kna1_rn_primary_bukrs", table_name="KNA1")
    op.drop_index("ix_kna1_name1", table_name="KNA1")
    op.drop_index("ix_kna1_land1", table_name="KNA1")
    op.drop_table("KNA1")

    op.drop_index("ix_tvko_bukrs", table_name="TVKO")
    op.drop_table("TVKO")

    op.drop_index("ix_t001w_land1", table_name="T001W")
    op.drop_index("ix_t001w_bukrs", table_name="T001W")
    op.drop_table("T001W")

    op.drop_table("T001")
