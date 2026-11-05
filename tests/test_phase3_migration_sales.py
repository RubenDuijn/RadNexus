from importlib.machinery import SourceFileLoader
from pathlib import Path
from types import ModuleType

from alembic.migration import MigrationContext
from alembic.operations import Operations
from sqlalchemy import create_engine, inspect


ROOT = Path(__file__).resolve().parents[1]


def _load_module(filename: str, module_name: str) -> ModuleType:
    migration_file = ROOT / "alembic" / "versions" / filename
    loader = SourceFileLoader(module_name, str(migration_file))
    module = ModuleType(loader.name)
    loader.exec_module(module)
    return module


def _execute_migration_step(module: ModuleType, step: str, connection) -> None:
    context = MigrationContext.configure(connection)
    operations = Operations(context)
    original_op = module.op
    module.op = operations
    try:
        getattr(module, step)()
    finally:
        module.op = original_op


def test_phase3_sales_migration_upgrade_and_downgrade() -> None:
    module_0001 = _load_module(
        "20261105_0001_phase2_core_org_customer_material.py", "phase3_sales_migration_0001"
    )
    module_0002 = _load_module(
        "20261105_0002_phase2_master_data_expansion.py", "phase3_sales_migration_0002"
    )
    module_0003 = _load_module(
        "20261105_0003_phase3_sales_orders.py", "phase3_sales_migration_0003"
    )

    engine = create_engine("sqlite+pysqlite:///:memory:")

    with engine.begin() as connection:
        _execute_migration_step(module_0001, "upgrade", connection)
        _execute_migration_step(module_0002, "upgrade", connection)
        _execute_migration_step(module_0003, "upgrade", connection)

        inspector = inspect(connection)
        assert {"VBAK", "VBAP"}.issubset(set(inspector.get_table_names()))

        vbak_fks = inspector.get_foreign_keys("VBAK")
        assert any(fk["referred_table"] == "TVKO" for fk in vbak_fks)
        assert any(fk["referred_table"] == "KNA1" for fk in vbak_fks)
        assert any(fk["referred_table"] == "T001" for fk in vbak_fks)

        vbap_fks = inspector.get_foreign_keys("VBAP")
        assert any(fk["referred_table"] == "VBAK" for fk in vbap_fks)
        assert any(fk["referred_table"] == "MARA" for fk in vbap_fks)
        assert any(fk["referred_table"] == "T001W" for fk in vbap_fks)

        assert inspector.get_pk_constraint("VBAK")["constrained_columns"] == ["VBELN"]
        assert inspector.get_pk_constraint("VBAP")["constrained_columns"] == ["VBELN", "POSNR"]

        vbap_indexes = {idx["name"] for idx in inspector.get_indexes("VBAP")}
        assert "ix_vbap_matnr" in vbap_indexes
        assert "ix_vbap_werks" in vbap_indexes

        _execute_migration_step(module_0003, "downgrade", connection)

        inspector_after = inspect(connection)
        assert "VBAK" not in inspector_after.get_table_names()
        assert "VBAP" not in inspector_after.get_table_names()
