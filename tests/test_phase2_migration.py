from importlib.machinery import SourceFileLoader
from pathlib import Path
from types import ModuleType

from alembic.migration import MigrationContext
from alembic.operations import Operations
from sqlalchemy import create_engine, inspect


def _load_phase2_migration_module() -> ModuleType:
    migration_file = Path(__file__).resolve().parents[1] / "alembic" / "versions" / "20261105_0001_phase2_core_org_customer_material.py"
    loader = SourceFileLoader("phase2_migration", str(migration_file))
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


def test_phase2_migration_upgrade_and_downgrade() -> None:
    module = _load_phase2_migration_module()
    engine = create_engine("sqlite+pysqlite:///:memory:")

    with engine.begin() as connection:
        _execute_migration_step(module, "upgrade", connection)

        inspector = inspect(connection)
        created_tables = set(inspector.get_table_names())
        expected = {"T001", "T001W", "TVKO", "KNA1", "MARA"}
        assert expected.issubset(created_tables)

        t001w_fks = inspector.get_foreign_keys("T001W")
        tvko_fks = inspector.get_foreign_keys("TVKO")
        kna1_fks = inspector.get_foreign_keys("KNA1")
        mara_fks = inspector.get_foreign_keys("MARA")

        assert any(fk["referred_table"] == "T001" for fk in t001w_fks)
        assert any(fk["referred_table"] == "T001" for fk in tvko_fks)
        assert any(fk["referred_table"] == "T001" for fk in kna1_fks)
        assert any(fk["referred_table"] == "TVKO" for fk in kna1_fks)
        assert any(fk["referred_table"] == "T001W" for fk in mara_fks)
        assert any(fk["referred_table"] == "TVKO" for fk in mara_fks)

        kna1_indexes = {idx["name"] for idx in inspector.get_indexes("KNA1")}
        mara_indexes = {idx["name"] for idx in inspector.get_indexes("MARA")}
        assert "ix_kna1_name1" in kna1_indexes
        assert "ix_mara_mtart" in mara_indexes

        _execute_migration_step(module, "downgrade", connection)

        inspector_after = inspect(connection)
        dropped_tables = set(inspector_after.get_table_names())
        assert expected.isdisjoint(dropped_tables)
