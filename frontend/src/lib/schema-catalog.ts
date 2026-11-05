export type FieldMeta = {
  name: string;
  dataType: string;
  key?: "PK" | "FK";
  nullable: boolean;
  description: string;
};

export type TableMeta = {
  name: string;
  area:
    | "Organisation"
    | "Sales"
    | "Customers"
    | "Products"
    | "Purchasing"
    | "Suppliers"
    | "Finance"
    | "Inventory"
    | "Controlling";
  status: "Implemented" | "Planned";
  description: string;
  fields: FieldMeta[];
  relationships: string[];
  previewState: "demonstration" | "pending-backend-endpoint";
};

export const tableCatalog: TableMeta[] = [
  {
    name: "T001",
    area: "Organisation",
    status: "Implemented",
    description: "Company codes",
    fields: [
      { name: "BUKRS", dataType: "CHAR(4)", key: "PK", nullable: false, description: "Company code" },
      { name: "BUTXT", dataType: "VARCHAR(100)", nullable: false, description: "Company name" },
      { name: "LAND1", dataType: "CHAR(3)", nullable: false, description: "Country" },
      { name: "WAERS", dataType: "CHAR(5)", nullable: false, description: "Currency" },
    ],
    relationships: ["Referenced by T001W, TVKO, KNB1, LFB1"],
    previewState: "pending-backend-endpoint",
  },
  {
    name: "T001W",
    area: "Organisation",
    status: "Implemented",
    description: "Plants",
    fields: [
      { name: "WERKS", dataType: "CHAR(4)", key: "PK", nullable: false, description: "Plant" },
      { name: "BUKRS", dataType: "CHAR(4)", key: "FK", nullable: false, description: "Company code" },
      { name: "NAME1", dataType: "VARCHAR(100)", nullable: false, description: "Plant name" },
      { name: "LAND1", dataType: "CHAR(3)", nullable: false, description: "Country" },
    ],
    relationships: ["T001W.BUKRS -> T001.BUKRS", "Referenced by T001L and MARC"],
    previewState: "pending-backend-endpoint",
  },
  {
    name: "T001L",
    area: "Organisation",
    status: "Implemented",
    description: "Storage locations",
    fields: [
      { name: "WERKS", dataType: "CHAR(4)", key: "PK", nullable: false, description: "Plant" },
      { name: "LGORT", dataType: "CHAR(4)", key: "PK", nullable: false, description: "Storage location" },
      { name: "LGOBE", dataType: "VARCHAR(100)", nullable: false, description: "Storage location text" },
    ],
    relationships: ["T001L.WERKS -> T001W.WERKS", "Referenced by MARD"],
    previewState: "pending-backend-endpoint",
  },
  {
    name: "TVKO",
    area: "Sales",
    status: "Implemented",
    description: "Sales organizations",
    fields: [
      { name: "VKORG", dataType: "CHAR(4)", key: "PK", nullable: false, description: "Sales organization" },
      { name: "BUKRS", dataType: "CHAR(4)", key: "FK", nullable: false, description: "Company code" },
      { name: "WAERS", dataType: "CHAR(5)", nullable: false, description: "Currency" },
    ],
    relationships: ["TVKO.BUKRS -> T001.BUKRS"],
    previewState: "pending-backend-endpoint",
  },
  {
    name: "KNA1",
    area: "Customers",
    status: "Implemented",
    description: "Customer general data",
    fields: [
      { name: "KUNNR", dataType: "CHAR(10)", key: "PK", nullable: false, description: "Customer number" },
      { name: "NAME1", dataType: "VARCHAR(120)", nullable: false, description: "Customer name" },
      { name: "LAND1", dataType: "CHAR(3)", nullable: false, description: "Country" },
      { name: "KTOKD", dataType: "CHAR(4)", nullable: false, description: "Account group" },
    ],
    relationships: ["Referenced by KNB1"],
    previewState: "pending-backend-endpoint",
  },
  {
    name: "KNB1",
    area: "Customers",
    status: "Implemented",
    description: "Customer company code data",
    fields: [
      { name: "KUNNR", dataType: "CHAR(10)", key: "PK", nullable: false, description: "Customer number" },
      { name: "BUKRS", dataType: "CHAR(4)", key: "PK", nullable: false, description: "Company code" },
      { name: "AKONT", dataType: "CHAR(10)", nullable: false, description: "Reconciliation account" },
    ],
    relationships: ["KNB1.KUNNR -> KNA1.KUNNR", "KNB1.BUKRS -> T001.BUKRS"],
    previewState: "pending-backend-endpoint",
  },
  {
    name: "MARA",
    area: "Products",
    status: "Implemented",
    description: "Material general data",
    fields: [
      { name: "MATNR", dataType: "CHAR(18)", key: "PK", nullable: false, description: "Material number" },
      { name: "MTART", dataType: "CHAR(4)", nullable: false, description: "Material type" },
      { name: "MATKL", dataType: "CHAR(9)", nullable: true, description: "Material group" },
      { name: "MEINS", dataType: "CHAR(3)", nullable: false, description: "Base unit of measure" },
    ],
    relationships: ["Referenced by MARC"],
    previewState: "pending-backend-endpoint",
  },
  {
    name: "MARC",
    area: "Products",
    status: "Implemented",
    description: "Material plant data",
    fields: [
      { name: "MATNR", dataType: "CHAR(18)", key: "PK", nullable: false, description: "Material number" },
      { name: "WERKS", dataType: "CHAR(4)", key: "PK", nullable: false, description: "Plant" },
      { name: "DISMM", dataType: "CHAR(2)", nullable: true, description: "MRP type" },
    ],
    relationships: ["MARC.MATNR -> MARA.MATNR", "MARC.WERKS -> T001W.WERKS"],
    previewState: "pending-backend-endpoint",
  },
  {
    name: "MARD",
    area: "Inventory",
    status: "Implemented",
    description: "Material stock by storage location",
    fields: [
      { name: "MATNR", dataType: "CHAR(18)", key: "PK", nullable: false, description: "Material number" },
      { name: "WERKS", dataType: "CHAR(4)", key: "PK", nullable: false, description: "Plant" },
      { name: "LGORT", dataType: "CHAR(4)", key: "PK", nullable: false, description: "Storage location" },
      { name: "LABST", dataType: "NUMERIC(15,3)", nullable: false, description: "Unrestricted stock" },
    ],
    relationships: [
      "MARD.(MATNR,WERKS) -> MARC.(MATNR,WERKS)",
      "MARD.(WERKS,LGORT) -> T001L.(WERKS,LGORT)",
    ],
    previewState: "pending-backend-endpoint",
  },
  {
    name: "LFA1",
    area: "Suppliers",
    status: "Implemented",
    description: "Supplier general data",
    fields: [
      { name: "LIFNR", dataType: "CHAR(10)", key: "PK", nullable: false, description: "Vendor number" },
      { name: "NAME1", dataType: "VARCHAR(120)", nullable: false, description: "Supplier name" },
      { name: "LAND1", dataType: "CHAR(3)", nullable: false, description: "Country" },
    ],
    relationships: ["Referenced by LFB1"],
    previewState: "pending-backend-endpoint",
  },
  {
    name: "LFB1",
    area: "Suppliers",
    status: "Implemented",
    description: "Supplier company code data",
    fields: [
      { name: "LIFNR", dataType: "CHAR(10)", key: "PK", nullable: false, description: "Vendor number" },
      { name: "BUKRS", dataType: "CHAR(4)", key: "PK", nullable: false, description: "Company code" },
      { name: "AKONT", dataType: "CHAR(10)", nullable: false, description: "Reconciliation account" },
    ],
    relationships: ["LFB1.LIFNR -> LFA1.LIFNR", "LFB1.BUKRS -> T001.BUKRS"],
    previewState: "pending-backend-endpoint",
  },
  {
    name: "VBAK",
    area: "Sales",
    status: "Planned",
    description: "Sales document header",
    fields: [],
    relationships: ["Planned in next schema tranches"],
    previewState: "demonstration",
  },
  {
    name: "VBAP",
    area: "Sales",
    status: "Planned",
    description: "Sales document item",
    fields: [],
    relationships: ["Planned in next schema tranches"],
    previewState: "demonstration",
  },
  {
    name: "BKPF",
    area: "Finance",
    status: "Planned",
    description: "Accounting document header",
    fields: [],
    relationships: ["Planned in next schema tranches"],
    previewState: "demonstration",
  },
  {
    name: "BSEG",
    area: "Finance",
    status: "Planned",
    description: "Accounting document segment",
    fields: [],
    relationships: ["Planned in next schema tranches"],
    previewState: "demonstration",
  },
  {
    name: "COEP",
    area: "Controlling",
    status: "Planned",
    description: "Controlling line items",
    fields: [],
    relationships: ["Planned in next schema tranches"],
    previewState: "demonstration",
  },
  {
    name: "EKKO",
    area: "Purchasing",
    status: "Planned",
    description: "Purchasing document header",
    fields: [],
    relationships: ["Planned in next schema tranches"],
    previewState: "demonstration",
  },
  {
    name: "EKPO",
    area: "Purchasing",
    status: "Planned",
    description: "Purchasing document item",
    fields: [],
    relationships: ["Planned in next schema tranches"],
    previewState: "demonstration",
  },
];

export const areas = [
  "Organisation",
  "Sales",
  "Customers",
  "Products",
  "Purchasing",
  "Suppliers",
  "Finance",
  "Inventory",
  "Controlling",
] as const;
