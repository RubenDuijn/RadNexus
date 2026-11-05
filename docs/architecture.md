# Rad Nexus Intelligence Architecture (Phases 1-2)

## 1. Objective

Build a controlled enterprise intelligence platform foundation that can evolve from SAP-style reporting to explainable AI-assisted analysis while preserving deterministic business logic.

## 2. Initial architecture boundaries

Implemented in Phases 1-2:
- API bootstrap and service boundaries.
- Configuration and environment management.
- Database connectivity and migration framework.
- Containerized local development runtime.
- Test baseline.
- First SAP-inspired schema migration for organization, customer, and material master data.

Deferred to later phases:
- Remaining SAP-inspired schema domains beyond the current master-data tranche.
- Synthetic transaction generation engine.
- Report semantic layer.
- AI orchestration and controlled SQL policy engine.
- External data ingestion pipelines.

## 3. Application layers

- API layer (`api/`)
  - FastAPI routes and request handling.
- Core layer (`core/`)
  - Shared settings, environment resolution, and application-level configuration.
- Data layer (`db/`)
  - SQLAlchemy engine/session creation and model base.
  - `models/` package reserved for SAP-inspired entities.
- Migration layer (`alembic/`)
  - Schema evolution, deterministic migration history.
- Test layer (`tests/`)
  - Foundational contract tests for service and config behavior.

## 4. Initial database architecture

Database target: PostgreSQL.

Key choices:
- SQLAlchemy 2.x ORM and engine management.
- One canonical database URL resolved from environment variables.
- Alembic configured to source runtime connection settings.
- Migration-first schema evolution approach.

Planned schema domains (Phase 2+):
- Sales: VBAK, VBAP
- Deliveries: LIKP, LIPS
- Billing: VBRK, VBRP
- Customers: KNA1, KNB1
- Products: MARA, MARC, MARD
- Purchasing: EKKO, EKPO
- Suppliers: LFA1, LFB1
- Finance: BKPF, BSEG
- Controlling: CSKS, CSKT, COEP
- Inventory: MKPF, MSEG
- Organisation: T001, T001W, TVKO
  - Storage location: T001L

Implemented now (Phase 2 current set):
- T001 (company codes)
- T001W (plants)
- T001L (storage locations)
- TVKO (sales organizations)
- KNA1 (customer general data)
- KNB1 (customer company-code data)
- MARA (material general data)
- MARC (material plant data)
- MARD (material storage-location stock)
- LFA1 (supplier general data)
- LFB1 (supplier company-code data)

Current key relationships:
- `T001W.BUKRS -> T001.BUKRS`
- `T001L.WERKS -> T001W.WERKS`
- `TVKO.BUKRS -> T001.BUKRS`
- `KNB1.KUNNR -> KNA1.KUNNR`
- `KNB1.BUKRS -> T001.BUKRS`
- `MARC.MATNR -> MARA.MATNR`
- `MARC.WERKS -> T001W.WERKS`
- `MARD.(MATNR,WERKS) -> MARC.(MATNR,WERKS)`
- `MARD.(WERKS,LGORT) -> T001L.(WERKS,LGORT)`
- `LFB1.LIFNR -> LFA1.LIFNR`
- `LFB1.BUKRS -> T001.BUKRS`

### SAP-compatibility strategy

- Preserve recognizable SAP table and field naming where practical.
- Keep primary/foreign key semantics explicit.
- Document simplifications per table as introduced.
- Avoid overfitting to full ECC complexity in early phases.

### Simplifications introduced in Phase 2

- This schema does not attempt to replicate complete ECC field catalogs for all currently implemented tables.
- `MANDT` is retained but modeled with a default value (`100`) for the demonstration environment.
- SAP detail dependencies such as `KNVV`, `MVKE`, and broader purchasing/finance dimensions are deferred to later migrations.
- Temporary `RN_` cross-domain fields in `KNA1` and `MARA` were removed once `KNB1` and `MARC`/`MARD` became available.
- `MARD` currently contains a focused stock subset (`LABST`, `INSME`, `SPEME`) and does not yet include the full ECC storage-location inventory attribute set.
- Rad Nexus operational metadata fields (`created_at`, `updated_at`) are present on all current tables and are explicitly non-SAP extensions.

## 5. Controlled AI-readiness design

Phase 1 prepares guardrails for future AI features:
- AI components will not query the DB directly.
- SQL execution will be mediated through a controlled service layer.
- Query templates, validation, permissions, and audit logs are planned as mandatory controls.
- Financial/business computations remain deterministic and reproducible outside LLM inference.

## 6. Explainability, auditability and reproducibility architecture

Formal product principle:
- Every answer should be explainable, traceable and reproducible.

Target analytical response structure (roadmap):
1. Business explanation.
2. Data lineage (systems, tables, fields, relevant records).
3. Business definitions (metrics, filters, dimensions, calculation rules).
4. SQL execution details (executed statement and parameters).
5. Python execution details (executed transformation/calculation logic, where applicable).
6. Execution metadata (timestamp, user/context, query identifier, data snapshot/version, execution environment).
7. Validation output (comparison against established reports/KPIs and expected results).
8. Reproducibility package (inputs and execution details required to rerun against the same snapshot).

Controlled execution model (roadmap):
- Business question
- AI interpretation
- Validated query plan
- Controlled SQL/Python execution
- Deterministic result
- Validation
- AI explanation
- Traceable analytical response

Mandatory architectural constraints:
- No unrestricted LLM-generated database execution.
- Authoritative business figures must come from deterministic SQL/Python business logic.
- The platform must record executed SQL/Python artifacts, not generated approximations.
- Query parameters, business definitions, and source references must be retained for audit.
- Sensitive data and credentials must be excluded from user-visible evidence and protected in audit storage.
- Permissions, retention, and audit-access controls are required controls.

Current support already present:
- Deterministic analytics service and endpoint for revenue-by-country-month.
- Deterministic business-rule handling (for example billing reversals/credit treatment and currency-safe aggregation).
- Backend test coverage for deterministic analytics behavior.

Missing components for full capability:
- Query-plan validation service for NLQ orchestration.
- Structured evidence/audit record schema and persistence layer.
- Data snapshot/version identifiers tied to analytical executions.
- Reproducibility rerun interface and trace verification workflows.
- UI-level technical evidence actions (View SQL/View Python/View lineage/Compare with report/Export audit record).

Dependencies and sequencing guidance:
1. Complete deterministic SAP-style report layer and metric definitions.
2. Introduce canonical metric-definition registry with versioning.
3. Add controlled execution log schema for SQL/Python metadata and lineage references.
4. Add validation engine to compare analytical outputs with established reports/KPIs.
5. Add reproducibility package export and rerun contract.
6. Integrate NLQ interpretation only behind validated query-plan and controlled execution boundaries.

## 7. Synthetic data and integrity principles

Planned for Phase 3:
- Master data generated first (org, product, customer, supplier).
- Transactions generated from existing references only.
- Reconciliation checks for inventory and finance.
- Balanced accounting postings and currency conversion consistency.
- Dedicated validation test suite for referential and business integrity.

## 8. Development milestones

1. Foundation bootstrap (Phase 1).
2. Initial SAP-inspired master-data schema and migrations (Phase 2, active).
3. Synthetic data generation and validation (Phase 3).
4. Deterministic reporting layer (Phase 4).
5. AI investigation orchestration and explainable outputs (Phase 5).
6. External economic dataset integration (Phase 6).
