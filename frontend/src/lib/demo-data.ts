export const kpiCards = [
  {
    title: "Countries",
    value: "18",
    note: "Target operating footprint",
    dataState: "Demonstration target",
  },
  {
    title: "Production Plants",
    value: "12",
    note: "Target manufacturing sites",
    dataState: "Demonstration target",
  },
  {
    title: "Customers",
    value: "35,000",
    note: "Planned synthetic customer base",
    dataState: "Demonstration target",
  },
  {
    title: "Products",
    value: "8,000",
    note: "Planned synthetic product catalog",
    dataState: "Demonstration target",
  },
  {
    title: "Total Revenue",
    value: "EUR 428.6M",
    note: "Illustrative dashboard metric",
    dataState: "Demonstration data",
  },
  {
    title: "Gross Margin",
    value: "31.4%",
    note: "Illustrative profitability metric",
    dataState: "Demonstration data",
  },
];

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

export const dataGenerationStatus = [
  {
    label: "Master data schema",
    status: "Implemented",
    type: "real",
  },
  {
    label: "Synthetic master data records",
    status: "Planned",
    type: "planned",
  },
  {
    label: "Synthetic transactional records",
    status: "Not started",
    type: "planned",
  },
];
