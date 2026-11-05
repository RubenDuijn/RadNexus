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


def test_phase3_delivery_billing_tables_registered() -> None:
    Base = _load_base_with_models()
    registered = set(Base.metadata.tables.keys())
    assert {"LIKP", "LIPS", "VBRK", "VBRP"}.issubset(registered)


def test_phase3_delivery_billing_foreign_keys() -> None:
    Base = _load_base_with_models()
    likp = Base.metadata.tables["LIKP"]
    lips = Base.metadata.tables["LIPS"]
    vbrk = Base.metadata.tables["VBRK"]
    vbrp = Base.metadata.tables["VBRP"]

    likp_targets = {fk.target_fullname for fk in likp.foreign_keys}
    lips_targets = {fk.target_fullname for fk in lips.foreign_keys}
    vbrk_targets = {fk.target_fullname for fk in vbrk.foreign_keys}
    vbrp_targets = {fk.target_fullname for fk in vbrp.foreign_keys}

    assert {"TVKO.VKORG", "T001.BUKRS", "KNA1.KUNNR", "VBAK.VBELN"}.issubset(likp_targets)
    assert {"LIKP.VBELN", "VBAP.VBELN", "VBAP.POSNR", "MARA.MATNR", "T001W.WERKS"}.issubset(lips_targets)
    assert {"TVKO.VKORG", "T001.BUKRS", "KNA1.KUNNR"}.issubset(vbrk_targets)
    assert {
        "VBRK.VBELN",
        "LIPS.VBELN",
        "LIPS.POSNR",
        "VBAP.VBELN",
        "VBAP.POSNR",
        "MARA.MATNR",
        "T001W.WERKS",
    }.issubset(vbrp_targets)


def test_phase3_delivery_billing_primary_keys() -> None:
    Base = _load_base_with_models()
    likp = Base.metadata.tables["LIKP"]
    lips = Base.metadata.tables["LIPS"]
    vbrk = Base.metadata.tables["VBRK"]
    vbrp = Base.metadata.tables["VBRP"]

    assert [column.name for column in likp.primary_key.columns] == ["VBELN"]
    assert [column.name for column in lips.primary_key.columns] == ["VBELN", "POSNR"]
    assert [column.name for column in vbrk.primary_key.columns] == ["VBELN"]
    assert [column.name for column in vbrp.primary_key.columns] == ["VBELN", "POSNR"]
