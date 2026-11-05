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


def test_phase2_core_tables_registered() -> None:
    Base = _load_base_with_models()
    expected = {
        "T001",
        "T001W",
        "T001L",
        "TVKO",
        "KNA1",
        "KNB1",
        "MARA",
        "MARC",
        "MARD",
        "LFA1",
        "LFB1",
    }
    registered = set(Base.metadata.tables.keys())
    assert expected.issubset(registered)


def test_phase2_foreign_key_targets() -> None:
    Base = _load_base_with_models()
    knb1 = Base.metadata.tables["KNB1"]
    marc = Base.metadata.tables["MARC"]
    mard = Base.metadata.tables["MARD"]
    lfb1 = Base.metadata.tables["LFB1"]
    t001l = Base.metadata.tables["T001L"]
    t001w = Base.metadata.tables["T001W"]
    tvko = Base.metadata.tables["TVKO"]

    knb1_targets = {fk.target_fullname for fk in knb1.foreign_keys}
    marc_targets = {fk.target_fullname for fk in marc.foreign_keys}
    mard_targets = {fk.target_fullname for fk in mard.foreign_keys}
    lfb1_targets = {fk.target_fullname for fk in lfb1.foreign_keys}
    t001l_targets = {fk.target_fullname for fk in t001l.foreign_keys}
    t001w_targets = {fk.target_fullname for fk in t001w.foreign_keys}
    tvko_targets = {fk.target_fullname for fk in tvko.foreign_keys}

    assert "T001.BUKRS" in t001w_targets
    assert "T001.BUKRS" in tvko_targets
    assert "T001W.WERKS" in t001l_targets
    assert {"KNA1.KUNNR", "T001.BUKRS"}.issubset(knb1_targets)
    assert {"MARA.MATNR", "T001W.WERKS"}.issubset(marc_targets)
    assert {"MARC.MATNR", "MARC.WERKS", "T001L.WERKS", "T001L.LGORT"}.issubset(mard_targets)
    assert {"LFA1.LIFNR", "T001.BUKRS"}.issubset(lfb1_targets)


def test_rn_extension_columns_removed_from_kna1_and_mara() -> None:
    Base = _load_base_with_models()
    kna1 = Base.metadata.tables["KNA1"]
    mara = Base.metadata.tables["MARA"]

    assert "RN_PRIMARY_BUKRS" not in kna1.c
    assert "RN_PRIMARY_VKORG" not in kna1.c
    assert "RN_PRIMARY_WERKS" not in mara.c
    assert "RN_PRIMARY_VKORG" not in mara.c


def test_rad_nexus_extension_columns_present() -> None:
    Base = _load_base_with_models()
    for table_name in [
        "T001",
        "T001W",
        "T001L",
        "TVKO",
        "KNA1",
        "KNB1",
        "MARA",
        "MARC",
        "MARD",
        "LFA1",
        "LFB1",
    ]:
        table = Base.metadata.tables[table_name]
        assert "created_at" in table.c
        assert "updated_at" in table.c
