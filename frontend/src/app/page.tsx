import Link from "next/link";

import { BusinessQuestionRotator } from "@/components/corporate/business-question-rotator";
import { CorporateShell } from "@/components/layout/corporate-shell";
import { Panel } from "@/components/ui/panel";
import { coreBusinessAreaSection, coreBusinessAreas, flagshipProductSummary, maturityNotes } from "@/lib/corporate-content";

function AreaVisual({ theme }: { theme: "ai" | "data" | "technology" | "labs" }) {
  if (theme === "ai") {
    return (
      <svg className="h-12 w-12" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="1.4" opacity="0.44" />
        <circle cx="20" cy="24" r="3.5" fill="currentColor" />
        <circle cx="42" cy="20" r="3.5" fill="currentColor" />
        <circle cx="46" cy="40" r="3.5" fill="currentColor" />
        <circle cx="24" cy="44" r="3.5" fill="currentColor" />
        <path d="M23 25L39 21M24 42L44 38M22 26L25 41M41 22L45 37" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.8" />
      </svg>
    );
  }

  if (theme === "data") {
    return (
      <svg className="h-12 w-12" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <rect x="10" y="11" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="36" y="11" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="23" y="40" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M28 17H36M19 24V31H32M45 24V31H32M32 31V40" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.88" />
      </svg>
    );
  }

  if (theme === "technology") {
    return (
      <svg className="h-12 w-12" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M20 11H44L54 21V43L44 53H20L10 43V21L20 11Z" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
        <path d="M20 21H44M20 32H44M20 43H44" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="25" cy="32" r="2.2" fill="currentColor" />
        <circle cx="39" cy="43" r="2.2" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg className="h-12 w-12" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M32 10L39 25L55 25L42 35L47 51L32 41L17 51L22 35L9 25L25 25L32 10Z" stroke="currentColor" strokeWidth="1.5" opacity="0.75" />
      <circle cx="32" cy="32" r="4" fill="currentColor" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <CorporateShell>
      <div className="space-y-8 lg:space-y-10">
        <section className="rn-card grid gap-6 p-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:p-10">
          <div>
          <p className="rn-eyebrow">Independent Technology Company</p>
          <h2 className="rn-heading mt-3 text-4xl font-semibold lg:text-5xl">RAD NEXUS</h2>
          <p className="mt-2 text-base text-slate-700">Technology · Data · Artificial Intelligence</p>
          <p className="mt-5 max-w-3xl text-2xl leading-tight text-slate-800">Your enterprise data has more to tell.</p>
          <p className="mt-2 max-w-3xl text-xl leading-tight text-slate-800">It&apos;s time to ask better questions.</p>
          <BusinessQuestionRotator />
          <p className="mt-4 max-w-3xl text-base rn-muted">
            Organisations have decades of business knowledge stored in their enterprise systems. RAD NEXUS is building the
            intelligence layer that makes that knowledge accessible - connecting enterprise data, structured business logic,
            and AI to turn complex questions into meaningful answers.
          </p>
          <p className="mt-4 text-base font-medium text-slate-800">Ask. Investigate. Understand.</p>
          <p className="mt-2 text-sm uppercase tracking-[0.08em] text-slate-600">RAD NEXUS - Engineering depth. Executive clarity.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rn-btn-primary rounded-md px-4 py-2 text-sm font-medium"
            >
              View Products
            </Link>
            <Link
              href="/overview"
              className="rn-btn-secondary rounded-md px-4 py-2 text-sm font-medium"
            >
              Open RAD NEXUS INTELLIGENCE
            </Link>
          </div>
          </div>
          <div className="rn-card-soft p-6">
            <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Connected Enterprise Intelligence</p>
            <div className="relative mt-4 h-48 overflow-hidden rounded-xl border border-[#ddd5c8] bg-[#fffdf9]">
              <div className="absolute left-6 top-8 h-3 w-3 rounded-full bg-[#0f6f8c]" />
              <div className="absolute left-20 top-16 h-2.5 w-2.5 rounded-full bg-[#2c6db0]" />
              <div className="absolute left-38 top-10 h-3 w-3 rounded-full bg-[#1f8a5a]" />
              <div className="absolute left-24 top-30 h-2.5 w-2.5 rounded-full bg-[#a1690b]" />
              <div className="absolute left-50 top-24 h-3 w-3 rounded-full bg-[#0f6f8c]" />
              <div className="absolute left-8 top-40 h-2.5 w-2.5 rounded-full bg-[#2c6db0]" />
              <div className="absolute left-44 top-40 h-2.5 w-2.5 rounded-full bg-[#1f8a5a]" />
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 260 190" fill="none" aria-hidden="true">
                <path d="M25 35C54 41 67 56 92 64C116 72 132 52 150 50C171 47 183 57 208 63" stroke="#b8ccd6" strokeWidth="2" />
                <path d="M44 80C67 82 85 107 108 114C126 120 146 103 164 106C186 109 205 129 232 133" stroke="#c7d9cc" strokeWidth="2" />
                <path d="M35 145C61 145 78 127 102 125C127 123 145 142 171 144C193 146 215 133 238 127" stroke="#d9cfbd" strokeWidth="2" />
              </svg>
            </div>
            <p className="mt-4 text-sm rn-muted">
              Enterprise systems, business intelligence, and artificial intelligence connected through structured business logic
              and natural-language questions.
            </p>
          </div>
        </section>

        <section className="rn-pillars-wrap rn-card p-6 lg:p-8">
          <div className="max-w-4xl">
            <p className="rn-eyebrow">Corporate Business Architecture</p>
            <h3 className="rn-heading mt-3 text-3xl font-semibold lg:text-4xl">{coreBusinessAreaSection.heading}</h3>
            <p className="mt-4 text-base rn-muted">{coreBusinessAreaSection.supportingText}</p>
          </div>

          <div className="rn-pillars-grid mt-7">
            {coreBusinessAreas.map((area) => (
              <article
                key={area.slug}
                className={`rn-pillar-card rn-pillar-${area.visualTheme} rn-reveal`}
              >
                <div className="rn-pillar-header">
                  <div className="rn-pillar-icon" aria-hidden="true">
                    <AreaVisual theme={area.visualTheme} />
                  </div>
                  <div>
                    <p className="rn-pillar-kicker">Core business area</p>
                    <h4 className="rn-pillar-title">{area.title}</h4>
                  </div>
                </div>

                <p className="rn-pillar-positioning">{area.positioning}</p>

                <p className="rn-pillar-value">{area.value}</p>

                <ul className="rn-pillar-list">
                  {area.capabilities.slice(0, 4).map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>

                <div className="rn-pillar-footer">
                  <p className="text-xs rn-muted">Strategic capability scope with phased implementation maturity.</p>
                  <Link href={area.href} className="rn-pillar-link">
                    Explore {area.shortTitle}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <Panel title="Flagship Product" subtitle="Rad Nexus Intelligence">
          <div className="grid gap-3 lg:grid-cols-3">
            <div className="rn-card-soft p-3">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Ambition</p>
              <p className="mt-1 text-sm text-slate-700">{flagshipProductSummary.ambition}</p>
            </div>
            <div className="rn-card-soft p-3">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Current demonstration scope</p>
              <p className="mt-1 text-sm text-slate-700">{flagshipProductSummary.currentState}</p>
            </div>
            <div className="rn-card-soft p-3">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Planned capability expansion</p>
              <p className="mt-1 text-sm text-slate-700">{flagshipProductSummary.plannedState}</p>
            </div>
          </div>
        </Panel>

        <Panel title="Strategic Clarity" subtitle="Company scope and product scope are intentionally separated">
          <ul className="space-y-2 text-sm text-slate-700">
            {maturityNotes.map((note) => (
              <li key={note} className="rn-card-soft p-3">
                {note}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </CorporateShell>
  );
}
