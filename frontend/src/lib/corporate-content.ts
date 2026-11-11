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

export type CoreBusinessArea = {
  slug: "ai-and-intelligence" | "data-and-platforms" | "technology-and-transformation" | "labs-and-innovation";
  title: string;
  shortTitle: string;
  href: string;
  positioning: string;
  value: string;
  capabilities: readonly string[];
  visualTheme: "ai" | "data" | "technology" | "labs";
  detailIntro: string;
  detailDelivery: string;
};

export const coreBusinessAreas: readonly CoreBusinessArea[] = [
  {
    slug: "ai-and-intelligence",
    title: "AI & Intelligence",
    shortTitle: "AI & Intelligence",
    href: "/ai-and-intelligence",
    positioning: "Applying artificial intelligence to real business problems.",
    value:
      "Help organisations make better use of their information, reduce manual analytical work, and apply AI where it delivers measurable business value.",
    capabilities: [
      "Enterprise AI solutions and integration",
      "Natural-language business intelligence",
      "AI-assisted business analysis and decision support",
      "Intelligent process automation",
      "AI agents and workflow orchestration",
      "Practical AI adoption and implementation",
    ],
    visualTheme: "ai",
    detailIntro:
      "This pillar focuses on embedding controlled AI into enterprise decision workflows, while keeping traceability, data quality, and governance in scope.",
    detailDelivery:
      "RAD NEXUS INTELLIGENCE is the flagship product in this pillar. Some capabilities are already demonstrated in product workflows, while broader enterprise rollouts are part of ongoing development.",
  },
  {
    slug: "data-and-platforms",
    title: "Data & Platforms",
    shortTitle: "Data & Platforms",
    href: "/data-and-platforms",
    positioning: "Unlocking the value of enterprise data and modernising data platforms.",
    value:
      "Help organisations transform fragmented, complex, or legacy enterprise data into reliable, accessible, and valuable information.",
    capabilities: [
      "SAP enterprise data and analytics",
      "Data migration and modernisation",
      "Data architecture and integration",
      "Enterprise data platforms",
      "Data quality, governance, and consistency",
      "Reporting and analytical foundations",
    ],
    visualTheme: "data",
    detailIntro:
      "This pillar develops the data architecture and platform foundations needed for trusted reporting, reproducible analysis, and long-term enterprise scale.",
    detailDelivery:
      "Established business logic is preserved as a control baseline. New analytical environments are validated against trusted enterprise reporting before wider adoption.",
  },
  {
    slug: "technology-and-transformation",
    title: "Technology & Transformation",
    shortTitle: "Technology & Transformation",
    href: "/technology-and-transformation",
    positioning: "Engineering and delivering practical technology transformation.",
    value:
      "Help organisations modernise their technology landscape, improve processes, and bridge business requirements with technical implementation.",
    capabilities: [
      "SAP and ERP transformation",
      "Legacy technology modernisation",
      "Business process optimisation",
      "Enterprise system integration",
      "Technical architecture and engineering",
      "Technology strategy and implementation",
    ],
    visualTheme: "technology",
    detailIntro:
      "This pillar focuses on practical engineering delivery across complex enterprise environments where transformation risk, integration dependencies, and operational continuity must be managed together.",
    detailDelivery:
      "Delivery approach emphasises engineering depth, implementation realism, and phased execution in partnership with business and technical stakeholders.",
  },
  {
    slug: "labs-and-innovation",
    title: "Labs & Innovation",
    shortTitle: "Labs & Innovation",
    href: "/labs-and-innovation",
    positioning: "Exploring, developing, and validating the next generation of enterprise technology.",
    value:
      "Explore promising technologies, test practical applications, and turn successful experiments into reusable solutions for real organisations.",
    capabilities: [
      "Research and development",
      "AI experimentation and applied research",
      "Technology prototypes and proof of concepts",
      "New product development",
      "Emerging technology evaluation",
      "Reusable intellectual property and innovative solutions",
    ],
    visualTheme: "labs",
    detailIntro:
      "RAD NEXUS LABS is the R&D and experimentation environment where concepts are tested rapidly and translated into practical, enterprise-relevant outcomes.",
    detailDelivery:
      "RAD NEXUS INTELLIGENCE is an example of product direction emerging from this innovation stream, progressing from experimentation to production-grade capability.",
  },
];

export const coreBusinessAreaSection = {
  heading: "Four areas of expertise. One connected technology vision.",
  supportingText:
    "RAD NEXUS combines expertise in artificial intelligence, enterprise data, technology transformation and applied innovation to help organisations solve complex business challenges and unlock new opportunities.",
} as const;

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
