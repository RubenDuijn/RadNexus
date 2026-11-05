import importlib
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SRC_PATH = PROJECT_ROOT / "src"


def _load_base_with_models():
    import sys

    if str(SRC_PATH) not in sys.path:
        sys.path.insert(0, str(SRC_PATH))

    Base = importlib.import_module("radnexus_intelligence.db.base").Base
    importlib.import_module("radnexus_intelligence.db.models")
    return Base


def test_phase3_sales_tables_registered() -> None:
    Base = _load_base_with_models()
    registered = set(Base.metadata.tables.keys())
    assert {"VBAK", "VBAP"}.issubset(registered)


def test_phase3_sales_foreign_keys() -> None:
    Base = _load_base_with_models()
    vbak = Base.metadata.tables["VBAK"]
    vbap = Base.metadata.tables["VBAP"]

    vbak_targets = {fk.target_fullname for fk in vbak.foreign_keys}
    vbap_targets = {fk.target_fullname for fk in vbap.foreign_keys}

    assert {"TVKO.VKORG", "KNA1.KUNNR", "T001.BUKRS"}.issubset(vbak_targets)
    assert {"VBAK.VBELN", "MARA.MATNR", "T001W.WERKS"}.issubset(vbap_targets)


def test_phase3_sales_primary_keys() -> None:
    Base = _load_base_with_models()
    vbak = Base.metadata.tables["VBAK"]
    vbap = Base.metadata.tables["VBAP"]

    assert [column.name for column in vbak.primary_key.columns] == ["VBELN"]
    assert [column.name for column in vbap.primary_key.columns] == ["VBELN", "POSNR"]
