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


def test_phase2_second_migration_upgrade_and_downgrade() -> None:
    module_0001 = _load_module(
        "20261105_0001_phase2_core_org_customer_material.py", "phase2_migration_0001"
    )
    module_0002 = _load_module(
        "20261105_0002_phase2_master_data_expansion.py", "phase2_migration_0002"
    )

    engine = create_engine("sqlite+pysqlite:///:memory:")

    with engine.begin() as connection:
        _execute_migration_step(module_0001, "upgrade", connection)
        _execute_migration_step(module_0002, "upgrade", connection)

        inspector = inspect(connection)
        expected_new = {"T001L", "KNB1", "MARC", "MARD", "LFA1", "LFB1"}
        assert expected_new.issubset(set(inspector.get_table_names()))

        # KNB1 references KNA1 and T001.
        knb1_fks = inspector.get_foreign_keys("KNB1")
        assert any(fk["referred_table"] == "KNA1" for fk in knb1_fks)
        assert any(fk["referred_table"] == "T001" for fk in knb1_fks)

        # MARC references MARA and T001W.
        marc_fks = inspector.get_foreign_keys("MARC")
        assert any(fk["referred_table"] == "MARA" for fk in marc_fks)
        assert any(fk["referred_table"] == "T001W" for fk in marc_fks)

        # MARD references MARC and T001L.
        mard_fks = inspector.get_foreign_keys("MARD")
        assert any(fk["referred_table"] == "MARC" for fk in mard_fks)
        assert any(fk["referred_table"] == "T001L" for fk in mard_fks)

        # LFB1 references LFA1 and T001.
        lfb1_fks = inspector.get_foreign_keys("LFB1")
        assert any(fk["referred_table"] == "LFA1" for fk in lfb1_fks)
        assert any(fk["referred_table"] == "T001" for fk in lfb1_fks)

        # Composite primary keys where required.
        assert inspector.get_pk_constraint("KNB1")["constrained_columns"] == ["KUNNR", "BUKRS"]
        assert inspector.get_pk_constraint("MARC")["constrained_columns"] == ["MATNR", "WERKS"]
        assert inspector.get_pk_constraint("MARD")["constrained_columns"] == ["MATNR", "WERKS", "LGORT"]
        assert inspector.get_pk_constraint("LFB1")["constrained_columns"] == ["LIFNR", "BUKRS"]

        # Temporary RN relationships are removed in upgraded schema.
        kna1_columns = {col["name"] for col in inspector.get_columns("KNA1")}
        mara_columns = {col["name"] for col in inspector.get_columns("MARA")}
        assert "RN_PRIMARY_BUKRS" not in kna1_columns
        assert "RN_PRIMARY_VKORG" not in kna1_columns
        assert "RN_PRIMARY_WERKS" not in mara_columns
        assert "RN_PRIMARY_VKORG" not in mara_columns

        _execute_migration_step(module_0002, "downgrade", connection)

        inspector_after_0002_down = inspect(connection)
        for table_name in expected_new:
            assert table_name not in inspector_after_0002_down.get_table_names()

        kna1_columns_down = {col["name"] for col in inspector_after_0002_down.get_columns("KNA1")}
        mara_columns_down = {col["name"] for col in inspector_after_0002_down.get_columns("MARA")}
        assert "RN_PRIMARY_BUKRS" in kna1_columns_down
        assert "RN_PRIMARY_VKORG" in kna1_columns_down
        assert "RN_PRIMARY_WERKS" in mara_columns_down
        assert "RN_PRIMARY_VKORG" in mara_columns_down

        _execute_migration_step(module_0001, "downgrade", connection)

        inspector_final = inspect(connection)
        assert set(inspector_final.get_table_names()) == set()
