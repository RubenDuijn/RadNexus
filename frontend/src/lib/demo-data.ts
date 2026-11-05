export type DataStateLabel =
  | "Real database value"
  | "Synthetic company data"
  | "Demonstration metric"
  | "Planned functionality";

export const kpiCards = [
  {
    title: "Reporting Period",
    value: "FY 2026 - Q4",
    note: "Current period context in demonstration workspace",
    dataState: "Demonstration metric",
  },
  {
    title: "Company",
    value: "NEXORA Industries",
    note: "Active legal entity group in this environment",
    dataState: "Synthetic company data",
  },
  {
    title: "Countries",
    value: "18",
    note: "Target operating footprint",
    dataState: "Synthetic company data",
  },
  {
    title: "Production Plants",
    value: "12",
    note: "Target manufacturing sites",
    dataState: "Synthetic company data",
  },
  {
    title: "Customers",
    value: "35,000",
    note: "Planned synthetic customer base",
    dataState: "Planned functionality",
  },
  {
    title: "Products",
    value: "8,000",
    note: "Planned synthetic product catalog",
    dataState: "Planned functionality",
  },
  {
    title: "Total Revenue",
    value: "EUR 428.6M",
    note: "Illustrative dashboard metric",
    dataState: "Demonstration metric",
  },
  {
    title: "Gross Margin",
    value: "31.4%",
    note: "Illustrative profitability metric",
    dataState: "Demonstration metric",
  },
] as const;

export const revenueByMonth = [
  { month: "Jan", revenue: 31.2 },
  { month: "Feb", revenue: 33.8 },
  { month: "Mar", revenue: 35.6 },
  { month: "Apr", revenue: 34.9 },
  { month: "May", revenue: 37.2 },
  { month: "Jun", revenue: 39.4 },
  { month: "Jul", revenue: 36.7 },
  { month: "Aug", revenue: 35.1 },
  { month: "Sep", revenue: 34.2 },
  { month: "Oct", revenue: 38.8 },
  { month: "Nov", revenue: 40.3 },
  { month: "Dec", revenue: 41.4 },
];

export const revenueByCountry = [
  { country: "Germany", revenue: 102.4 },
  { country: "France", revenue: 66.1 },
  { country: "Switzerland", revenue: 58.3 },
  { country: "Netherlands", revenue: 49.6 },
  { country: "Spain", revenue: 43.7 },
  { country: "Other", revenue: 108.5 },
];

export const revenueByProductGroup = [
  { group: "Industrial Components", revenue: 145.2 },
  { group: "Automation Modules", revenue: 118.8 },
  { group: "Maintenance Parts", revenue: 76.4 },
  { group: "Energy Systems", revenue: 88.2 },
];

export const recentActivity = [
  {
    title: "Schema migration 0002 executed",
    detail: "Master-data tables KNB1, MARC, MARD, LFA1, LFB1 and T001L added.",
    source: "Backend migration log",
  },
  {
    title: "Frontend foundation initialized",
    detail: "Overview, Data Explorer, BI, AI, and architecture screens created.",
    source: "Frontend project",
  },
  {
    title: "Connectivity probe configured",
    detail: "Top bar uses backend health endpoints where available.",
    source: "Frontend API route",
  },
];

export const customerConcentrationDemo = [
  { customer: "Helios Industriehandel", share: 9.8 },
  { customer: "Apex Manufacturing", share: 8.2 },
  { customer: "Nordic Process AB", share: 6.6 },
  { customer: "Delta Motion Group", share: 5.9 },
  { customer: "Others", share: 69.5 },
];

export const inventoryPositionDemo = [
  { category: "Raw materials", amount: 24.3 },
  { category: "Work in progress", amount: 18.1 },
  { category: "Finished goods", amount: 54.4 },
];

export const keyChangesAndExceptions = [
  {
    title: "Germany sales deceleration in industrial components",
    detail: "Illustrative signal to validate with SQL-backed variance analysis.",
    state: "Demonstration metric",
  },
  {
    title: "Margin pressure from energy system input costs",
    detail: "Planned to be linked with supplier and purchasing tables when available.",
    state: "Planned functionality",
  },
  {
    title: "Inventory increase in finished goods",
    detail: "Synthetic scenario used to demonstrate inventory drill-down views.",
    state: "Synthetic company data",
  },
] as const;

export const dataGenerationStatus = [
  {
    label: "Master data schema",
    status: "Implemented",
    type: "Real database value",
  },
  {
    label: "Synthetic master data records",
    status: "Planned",
    type: "Planned functionality",
  },
  {
    label: "Synthetic transactional records",
    status: "Not started",
    type: "Planned functionality",
  },
] as const satisfies ReadonlyArray<{ label: string; status: string; type: DataStateLabel }>;
