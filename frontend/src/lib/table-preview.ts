const previewRows: Record<string, Record<string, string | number>[]> = {
  T001: [
    { BUKRS: "1000", BUTXT: "NEXORA Germany GmbH", LAND1: "DEU", WAERS: "EUR" },
    { BUKRS: "2000", BUTXT: "NEXORA Iberia S.A.", LAND1: "ESP", WAERS: "EUR" },
  ],
  T001W: [
    { WERKS: "D001", BUKRS: "1000", NAME1: "Munich Plant", LAND1: "DEU" },
    { WERKS: "S001", BUKRS: "2000", NAME1: "Valencia Plant", LAND1: "ESP" },
  ],
  T001L: [
    { WERKS: "D001", LGORT: "1000", LGOBE: "Main Warehouse" },
    { WERKS: "D001", LGORT: "2000", LGOBE: "Spare Parts" },
  ],
  KNA1: [
    { KUNNR: "0001200456", NAME1: "Helios Industriehandel", LAND1: "DEU", KTOKD: "Z001" },
    { KUNNR: "0001200457", NAME1: "Nova Equipos SL", LAND1: "ESP", KTOKD: "Z001" },
  ],
  KNB1: [
    { KUNNR: "0001200456", BUKRS: "1000", AKONT: "140000" },
    { KUNNR: "0001200457", BUKRS: "2000", AKONT: "140000" },
  ],
  MARA: [
    { MATNR: "000000000000300101", MTART: "FERT", MATKL: "AUTO-01", MEINS: "EA" },
    { MATNR: "000000000000300202", MTART: "HALB", MATKL: "COMP-01", MEINS: "EA" },
  ],
  MARC: [
    { MATNR: "000000000000300101", WERKS: "D001", DISMM: "PD" },
    { MATNR: "000000000000300202", WERKS: "S001", DISMM: "VB" },
  ],
};

export function getPreviewRows(tableName: string): Record<string, string | number>[] {
  return previewRows[tableName] || [];
}
