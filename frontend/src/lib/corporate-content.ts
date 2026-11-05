export const businessPillars = [
  {
    title: "AI & Intelligence",
    problem: "Leadership teams need faster answers without losing control over data quality or governance.",
    capability:
      "Design and integration of controlled enterprise AI workflows, natural-language questions, and investigation tooling.",
    outcome: "Faster decision cycles with evidence-based answers and clear traceability of assumptions and limitations.",
    state: "Strategic business area",
  },
  {
    title: "Data & Platforms",
    problem: "Critical business data is fragmented across ERP, operational systems, and reporting layers.",
    capability:
      "Enterprise data architecture, SAP-inspired data modeling, integration pipelines, and modern analytics platform foundations.",
    outcome: "Reliable, decision-ready data that supports performance management and cross-functional alignment.",
    state: "Strategic business area",
  },
  {
    title: "Technology & Transformation",
    problem: "Legacy technology slows strategic execution and increases transformation risk.",
    capability:
      "Enterprise architecture guidance, ERP and integration modernization, and technical transformation program delivery.",
    outcome: "Lower transformation risk, stronger platform resilience, and clearer technology roadmaps.",
    state: "Strategic business area",
  },
  {
    title: "Labs & Innovation",
    problem: "Organizations struggle to convert emerging technology ideas into practical business value.",
    capability: "Rapid prototyping, controlled experimentation, and product incubation for proprietary software concepts.",
    outcome: "A practical innovation pipeline that links experimentation to measurable business priorities.",
    state: "Strategic business area",
  },
] as const;

export const maturityNotes = [
  "Strategic business areas describe RAD NEXUS direction and capability focus.",
  "Not every area is currently a commercialized service line.",
  "RAD NEXUS INTELLIGENCE is currently the flagship product under active development.",
];

export const flagshipProductSummary = {
  ambition:
    "Transforming enterprise data into actionable business intelligence through modern data platforms, structured business logic, controlled AI, and natural-language interaction.",
  currentState:
    "Current build demonstrates executive dashboarding, architecture transparency, and investigation workflow scaffolding for natural-language questions.",
  plannedState:
    "Planned capabilities include deeper SQL-backed analytics, semantic business logic, and evidence-based AI investigation outputs.",
} as const;
