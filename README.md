# Rad Nexus Intelligence

From enterprise data to business intelligence.

Rad Nexus Intelligence is an AI-native enterprise intelligence platform foundation. The SAP system remains the system of record; this platform provides a controlled analytical layer with synthetic demonstration data for NEXORA Industries.

## Scope of this implementation cycle

This repository currently implements:
- Project scaffolding and modular Python package layout.
- FastAPI service bootstrap with health endpoints.
- PostgreSQL connection and SQLAlchemy session handling.
- Alembic migration framework wiring.
- Docker and Docker Compose setup.
- Environment variable configuration pattern.
- Basic automated tests.
- First SAP-inspired core schema migration for T001, T001W, TVKO, KNA1 and MARA.
- Second master-data migration for KNB1, MARC, MARD, LFA1, LFB1 and T001L.

Not yet implemented in this cycle:
- Synthetic master and transactional data generation.
- SAP-style reporting SQL implementations.
- AI question answering and controlled SQL orchestration.

## Workspace inspection summary

Before initialization, the workspace contained multiple independent projects and no existing Rad Nexus project folder. A new isolated directory was created:
- radnexus-intelligence

No existing project files were overwritten.

## Proposed project structure

```text
radnexus-intelligence/
  alembic/
    versions/
    env.py
    script.py.mako
  docs/
    architecture.md
  src/
    radnexus_intelligence/
      api/
      core/
      db/
        models/
      main.py
  tests/
  .env.example
  .gitignore
  alembic.ini
  Dockerfile
  docker-compose.yml
  pyproject.toml
  README.md
```

## Quick start

1. Create and activate a virtual environment.
2. Install dependencies:
   - `pip install -e .[dev]`
3. Create local env file:
   - `cp .env.example .env`
4. Start PostgreSQL:
   - `docker compose up -d db`
5. Apply migrations:
   - `alembic upgrade head`
6. Run tests:
   - `pytest`
7. Run API locally:
   - `uvicorn radnexus_intelligence.main:app --reload --host 0.0.0.0 --port 8000`

## Frontend quick start

The frontend is isolated in `frontend/` and does not modify backend responsibilities.

1. Open a second terminal and move into frontend:
   - `cd frontend`
2. Install frontend dependencies:
   - `npm install`
3. Configure frontend environment:
   - `cp .env.example .env.local`
4. Start frontend dev server:
   - `npm run dev`
5. Open:
   - `http://localhost:3000`

Backend URL is configured with:
- `NEXT_PUBLIC_API_BASE_URL` (default expected local value: `http://localhost:8000`)

Current data states in frontend:
- Real backend connectivity: top-bar status and Overview status panel via `/health` and `/health/db`.
- Demonstration data: KPI cards, chart series, table previews, BI metrics, and AI interface placeholders.

## Phase 2 schema currently implemented

Tables introduced:
- T001 (company codes)
- T001W (plants)
- T001L (storage locations)
- TVKO (sales organizations)
- KNA1 (customers)
- KNB1 (customer company-code data)
- MARA (materials)
- MARC (material plant data)
- MARD (material storage-location stock)
- LFA1 (suppliers)
- LFB1 (supplier company-code data)

Relationship highlights:
- `T001W.BUKRS -> T001.BUKRS`
- `T001L.WERKS -> T001W.WERKS`
- `TVKO.BUKRS -> T001.BUKRS`
- `KNB1.KUNNR -> KNA1.KUNNR`
- `KNB1.BUKRS -> T001.BUKRS`
- `MARC.MATNR -> MARA.MATNR`
- `MARC.WERKS -> T001W.WERKS`
- `MARD.(MATNR, WERKS) -> MARC.(MATNR, WERKS)`
- `MARD.(WERKS, LGORT) -> T001L.(WERKS, LGORT)`
- `LFB1.LIFNR -> LFA1.LIFNR`
- `LFB1.BUKRS -> T001.BUKRS`

Every table includes Rad Nexus extension fields:
- `created_at`
- `updated_at`

These are not original SAP fields and are explicitly added for platform metadata.

## SAP simplifications in Phase 2

- Client handling is simplified to a single `MANDT` field with default `100` per table.
- A focused subset of each table's fields is implemented, not full ECC catalogs.
- `KNVV`, `MVKE`, and broader MM/FI detail are deferred to future migrations.
- Temporary `RN_` relationship columns were removed from `KNA1` and `MARA` after introducing SAP-closer relations via `KNB1`, `MARC`, `MARD`, and `LFB1`.
- `MARD` is modeled against `MARC` and `T001L`; additional ECC-level stock detail fields remain deferred.
- Only a focused subset of each table's columns is implemented for analytical groundwork.
- Business-process behavior and transactional consistency are deferred to Phase 3 and later.

## Development milestones

1. Phase 1: Foundation (completed in this cycle)
   - Runtime, DB connectivity, migrations, test baseline, and docs.
2. Phase 2: SAP-inspired enterprise schema
   - Implemented core master-data tables (T001, T001W, T001L, TVKO, KNA1, KNB1, MARA, MARC, MARD, LFA1, LFB1) with relationships.
3. Phase 3: Synthetic enterprise transactions
   - Generate coherent synthetic data with integrity rules and validation tests.
4. Phase 4: SAP-style reporting layer
   - Deterministic SQL reports with documented logic and reproducible tests.
5. Phase 5: Controlled AI intelligence layer
   - Natural-language workflow, governed SQL execution, audit logging, explainability.

## Data governance principles

- All demonstration data is synthetic.
- No proprietary SAP code is replicated.
- No real customer data is permitted.
- Business calculations must remain deterministic and testable.
