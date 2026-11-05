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


def test_phase3_delivery_billing_migration_upgrade_and_downgrade() -> None:
    module_0001 = _load_module(
        "20261105_0001_phase2_core_org_customer_material.py", "phase3_bridge_migration_0001"
    )
    module_0002 = _load_module(
        "20261105_0002_phase2_master_data_expansion.py", "phase3_bridge_migration_0002"
    )
    module_0003 = _load_module("20261105_0003_phase3_sales_orders.py", "phase3_bridge_migration_0003")
    module_0004 = _load_module(
        "20261105_0004_phase3_delivery_billing_chain.py", "phase3_bridge_migration_0004"
    )

    engine = create_engine("sqlite+pysqlite:///:memory:")

    with engine.begin() as connection:
        _execute_migration_step(module_0001, "upgrade", connection)
        _execute_migration_step(module_0002, "upgrade", connection)
        _execute_migration_step(module_0003, "upgrade", connection)
        _execute_migration_step(module_0004, "upgrade", connection)

        inspector = inspect(connection)
        assert {"LIKP", "LIPS", "VBRK", "VBRP"}.issubset(set(inspector.get_table_names()))

        lips_fks = inspector.get_foreign_keys("LIPS")
        assert any(fk["referred_table"] == "LIKP" for fk in lips_fks)
        assert any(fk["referred_table"] == "VBAP" for fk in lips_fks)

        vbrp_fks = inspector.get_foreign_keys("VBRP")
        assert any(fk["referred_table"] == "VBRK" for fk in vbrp_fks)
        assert any(fk["referred_table"] == "LIPS" for fk in vbrp_fks)
        assert any(fk["referred_table"] == "VBAP" for fk in vbrp_fks)

        assert inspector.get_pk_constraint("LIPS")["constrained_columns"] == ["VBELN", "POSNR"]
        assert inspector.get_pk_constraint("VBRP")["constrained_columns"] == ["VBELN", "POSNR"]

        vbrp_indexes = {idx["name"] for idx in inspector.get_indexes("VBRP")}
        assert "ix_vbrp_vgbel_vgpos" in vbrp_indexes
        assert "ix_vbrp_aubel_aupos" in vbrp_indexes

        _execute_migration_step(module_0004, "downgrade", connection)

        inspector_after = inspect(connection)
        assert "LIKP" not in inspector_after.get_table_names()
        assert "LIPS" not in inspector_after.get_table_names()
        assert "VBRK" not in inspector_after.get_table_names()
        assert "VBRP" not in inspector_after.get_table_names()
