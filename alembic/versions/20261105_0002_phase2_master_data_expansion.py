"""phase2_master_data_expansion

Revision ID: 20261105_0002
Revises: 20261105_0001
Create Date: 2026-11-05 00:30:00.000000

"""

from collections.abc import Sequence
from typing import Optional, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "20261105_0002"
down_revision: Optional[str] = "20261105_0001"
branch_labels: Optional[Union[str, Sequence[str]]] = None
depends_on: Optional[Union[str, Sequence[str]]] = None


def upgrade() -> None:
    op.create_table(
        "T001L",
        sa.Column("MANDT", sa.CHAR(length=3), nullable=False, server_default="100"),
        sa.Column("WERKS", sa.CHAR(length=4), nullable=False),
        sa.Column("LGORT", sa.CHAR(length=4), nullable=False),
        sa.Column("LGOBE", sa.String(length=100), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.ForeignKeyConstraint(["WERKS"], ["T001W.WERKS"], name="fk_t001l_werks_t001w"),
        sa.PrimaryKeyConstraint("WERKS", "LGORT", name="pk_t001l"),
    )
    op.create_index("ix_t001l_lgobe", "T001L", ["LGOBE"], unique=False)
    op.create_index("ix_t001l_werks", "T001L", ["WERKS"], unique=False)

    op.create_table(
        "KNB1",
        sa.Column("MANDT", sa.CHAR(length=3), nullable=False, server_default="100"),
        sa.Column("KUNNR", sa.CHAR(length=10), nullable=False),
        sa.Column("BUKRS", sa.CHAR(length=4), nullable=False),
        sa.Column("AKONT", sa.CHAR(length=10), nullable=False),
        sa.Column("ZTERM", sa.CHAR(length=4), nullable=True),
        sa.Column("ZWELS", sa.CHAR(length=10), nullable=True),
        sa.Column("KLIMK", sa.Numeric(precision=15, scale=2), nullable=True),
        sa.Column("SPERR", sa.CHAR(length=1), nullable=False, server_default=""),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.ForeignKeyConstraint(["BUKRS"], ["T001.BUKRS"], name="fk_knb1_bukrs_t001"),
        sa.ForeignKeyConstraint(["KUNNR"], ["KNA1.KUNNR"], name="fk_knb1_kunnr_kna1"),
        sa.PrimaryKeyConstraint("KUNNR", "BUKRS", name="pk_knb1"),
    )
    op.create_index("ix_knb1_akont", "KNB1", ["AKONT"], unique=False)
    op.create_index("ix_knb1_bukrs", "KNB1", ["BUKRS"], unique=False)

    op.create_table(
        "LFA1",
        sa.Column("MANDT", sa.CHAR(length=3), nullable=False, server_default="100"),
        sa.Column("LIFNR", sa.CHAR(length=10), nullable=False),
        sa.Column("NAME1", sa.String(length=120), nullable=False),
        sa.Column("LAND1", sa.CHAR(length=3), nullable=False),
        sa.Column("ORT01", sa.String(length=80), nullable=True),
        sa.Column("STRAS", sa.String(length=120), nullable=True),
        sa.Column("KTOKK", sa.CHAR(length=4), nullable=False),
        sa.Column("LOEVM", sa.CHAR(length=1), nullable=False, server_default=""),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.PrimaryKeyConstraint("LIFNR", name="pk_lfa1"),
    )
    op.create_index("ix_lfa1_land1", "LFA1", ["LAND1"], unique=False)
    op.create_index("ix_lfa1_name1", "LFA1", ["NAME1"], unique=False)

    op.create_table(
        "LFB1",
        sa.Column("MANDT", sa.CHAR(length=3), nullable=False, server_default="100"),
        sa.Column("LIFNR", sa.CHAR(length=10), nullable=False),
        sa.Column("BUKRS", sa.CHAR(length=4), nullable=False),
        sa.Column("AKONT", sa.CHAR(length=10), nullable=False),
        sa.Column("ZTERM", sa.CHAR(length=4), nullable=True),
        sa.Column("SPERR", sa.CHAR(length=1), nullable=False, server_default=""),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.ForeignKeyConstraint(["BUKRS"], ["T001.BUKRS"], name="fk_lfb1_bukrs_t001"),
        sa.ForeignKeyConstraint(["LIFNR"], ["LFA1.LIFNR"], name="fk_lfb1_lifnr_lfa1"),
        sa.PrimaryKeyConstraint("LIFNR", "BUKRS", name="pk_lfb1"),
    )
    op.create_index("ix_lfb1_akont", "LFB1", ["AKONT"], unique=False)
    op.create_index("ix_lfb1_bukrs", "LFB1", ["BUKRS"], unique=False)

    op.create_table(
        "MARC",
        sa.Column("MANDT", sa.CHAR(length=3), nullable=False, server_default="100"),
        sa.Column("MATNR", sa.CHAR(length=18), nullable=False),
        sa.Column("WERKS", sa.CHAR(length=4), nullable=False),
        sa.Column("DISMM", sa.CHAR(length=2), nullable=True),
        sa.Column("BESKZ", sa.CHAR(length=1), nullable=True),
        sa.Column("EKGRP", sa.CHAR(length=3), nullable=True),
        sa.Column("LVORM", sa.CHAR(length=1), nullable=False, server_default=""),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.ForeignKeyConstraint(["MATNR"], ["MARA.MATNR"], name="fk_marc_matnr_mara"),
        sa.ForeignKeyConstraint(["WERKS"], ["T001W.WERKS"], name="fk_marc_werks_t001w"),
        sa.PrimaryKeyConstraint("MATNR", "WERKS", name="pk_marc"),
    )
    op.create_index("ix_marc_dismm", "MARC", ["DISMM"], unique=False)
    op.create_index("ix_marc_werks", "MARC", ["WERKS"], unique=False)

    op.create_table(
        "MARD",
        sa.Column("MANDT", sa.CHAR(length=3), nullable=False, server_default="100"),
        sa.Column("MATNR", sa.CHAR(length=18), nullable=False),
        sa.Column("WERKS", sa.CHAR(length=4), nullable=False),
        sa.Column("LGORT", sa.CHAR(length=4), nullable=False),
        sa.Column("LABST", sa.Numeric(precision=15, scale=3), nullable=False, server_default="0"),
        sa.Column("INSME", sa.Numeric(precision=15, scale=3), nullable=False, server_default="0"),
        sa.Column("SPEME", sa.Numeric(precision=15, scale=3), nullable=False, server_default="0"),
        sa.Column("LGPBE", sa.CHAR(length=10), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.ForeignKeyConstraint(["MATNR", "WERKS"], ["MARC.MATNR", "MARC.WERKS"], name="fk_mard_marc"),
        sa.ForeignKeyConstraint(["WERKS", "LGORT"], ["T001L.WERKS", "T001L.LGORT"], name="fk_mard_t001l"),
        sa.PrimaryKeyConstraint("MATNR", "WERKS", "LGORT", name="pk_mard"),
    )
    op.create_index("ix_mard_lgort", "MARD", ["LGORT"], unique=False)
    op.create_index("ix_mard_werks", "MARD", ["WERKS"], unique=False)

    with op.batch_alter_table("KNA1", schema=None) as batch_op:
        batch_op.drop_index("ix_kna1_rn_primary_bukrs")
        batch_op.drop_index("ix_kna1_rn_primary_vkorg")
        batch_op.drop_constraint("fk_kna1_rn_bukrs_t001", type_="foreignkey")
        batch_op.drop_constraint("fk_kna1_rn_vkorg_tvko", type_="foreignkey")
        batch_op.drop_column("RN_PRIMARY_BUKRS")
        batch_op.drop_column("RN_PRIMARY_VKORG")

    with op.batch_alter_table("MARA", schema=None) as batch_op:
        batch_op.drop_index("ix_mara_rn_primary_werks")
        batch_op.drop_index("ix_mara_rn_primary_vkorg")
        batch_op.drop_constraint("fk_mara_rn_werks_t001w", type_="foreignkey")
        batch_op.drop_constraint("fk_mara_rn_vkorg_tvko", type_="foreignkey")
        batch_op.drop_column("RN_PRIMARY_WERKS")
        batch_op.drop_column("RN_PRIMARY_VKORG")


def downgrade() -> None:
    with op.batch_alter_table("MARA", schema=None) as batch_op:
        batch_op.add_column(sa.Column("RN_PRIMARY_VKORG", sa.CHAR(length=4), nullable=True))
        batch_op.add_column(sa.Column("RN_PRIMARY_WERKS", sa.CHAR(length=4), nullable=True))
        batch_op.create_foreign_key("fk_mara_rn_werks_t001w", "T001W", ["RN_PRIMARY_WERKS"], ["WERKS"])
        batch_op.create_foreign_key("fk_mara_rn_vkorg_tvko", "TVKO", ["RN_PRIMARY_VKORG"], ["VKORG"])
        batch_op.create_index("ix_mara_rn_primary_werks", ["RN_PRIMARY_WERKS"], unique=False)
        batch_op.create_index("ix_mara_rn_primary_vkorg", ["RN_PRIMARY_VKORG"], unique=False)

    with op.batch_alter_table("KNA1", schema=None) as batch_op:
        batch_op.add_column(sa.Column("RN_PRIMARY_VKORG", sa.CHAR(length=4), nullable=True))
        batch_op.add_column(sa.Column("RN_PRIMARY_BUKRS", sa.CHAR(length=4), nullable=True))
        batch_op.create_foreign_key("fk_kna1_rn_bukrs_t001", "T001", ["RN_PRIMARY_BUKRS"], ["BUKRS"])
        batch_op.create_foreign_key("fk_kna1_rn_vkorg_tvko", "TVKO", ["RN_PRIMARY_VKORG"], ["VKORG"])
        batch_op.create_index("ix_kna1_rn_primary_bukrs", ["RN_PRIMARY_BUKRS"], unique=False)
        batch_op.create_index("ix_kna1_rn_primary_vkorg", ["RN_PRIMARY_VKORG"], unique=False)

    op.drop_index("ix_mard_werks", table_name="MARD")
    op.drop_index("ix_mard_lgort", table_name="MARD")
    op.drop_table("MARD")

    op.drop_index("ix_marc_werks", table_name="MARC")
    op.drop_index("ix_marc_dismm", table_name="MARC")
    op.drop_table("MARC")

    op.drop_index("ix_lfb1_bukrs", table_name="LFB1")
    op.drop_index("ix_lfb1_akont", table_name="LFB1")
    op.drop_table("LFB1")

    op.drop_index("ix_lfa1_name1", table_name="LFA1")
    op.drop_index("ix_lfa1_land1", table_name="LFA1")
    op.drop_table("LFA1")

    op.drop_index("ix_knb1_bukrs", table_name="KNB1")
    op.drop_index("ix_knb1_akont", table_name="KNB1")
    op.drop_table("KNB1")

    op.drop_index("ix_t001l_werks", table_name="T001L")
    op.drop_index("ix_t001l_lgobe", table_name="T001L")
    op.drop_table("T001L")
