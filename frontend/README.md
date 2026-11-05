# RAD NEXUS INTELLIGENCE Frontend

Next.js frontend for the Rad Nexus Intelligence platform.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts

## Local setup

1. Install dependencies:
	- `npm install`
2. Configure environment:
	- `cp .env.example .env.local`
3. Start frontend:
	- `npm run dev`
4. Open:
	- `http://localhost:3000`

## Backend integration

Frontend probes backend status via internal API routes:
- `/api/backend/health` -> FastAPI `/health`
- `/api/backend/health-db` -> FastAPI `/health/db`

Set backend URL with:
- `NEXT_PUBLIC_API_BASE_URL`

No credentials are required in frontend environment for current functionality.

## Screen status

Real backend connectivity where available:
- Top bar API and DB status probes.
- Overview platform status panel.

Demonstration data:
- KPI cards.
- Revenue and margin charts.
- Data preview rows in Data Explorer.
- Business Intelligence metric cards.
- AI Intelligence interaction surface.
- System architecture implementation/planned labels.

## Product UX model

- Enterprise design system with reusable panels, badges and status semantics.
- Environment label behavior:
	- `LOCAL DEVELOPMENT` when running locally.
	- `DEMO ENVIRONMENT` when served publicly.
- Data-state labeling across screens:
	- Real database value
	- Synthetic company data
	- Demonstration metric
	- Planned functionality

## Website structure

Corporate website routes:
- `/`
- `/company`
- `/capabilities`
- `/ai-and-intelligence`
- `/data-and-platforms`
- `/technology-and-transformation`
- `/products`
- `/labs-and-innovation`
- `/insights`
- `/contact`

Product application routes:
- `/overview`
- `/data-explorer`
- `/business-intelligence`
- `/ai-intelligence`
- `/data-sources`
- `/system-architecture`
- `/settings`

Strategic positioning:
- `RAD NEXUS` is the company.
- `Rad Nexus Intelligence` is the first product under active development.
- `NEXORA Industries` is a fictional demonstration company used in product UX.

## Data Explorer semantics

- `Implemented` means backend schema and field metadata exist.
- `Planned` means schema implementation is pending.
- `Available` / `Not Connected` indicate runtime connection state for table access and sample data.

## Platform health semantics

The platform health section distinguishes:
- Frontend availability
- Backend API availability
- Database connectivity
- Database migrations status integration
- Data generation status
- External source connectivity
- AI provider connectivity

## Deployment

- Vercel deployment instructions: see `VERCEL_DEPLOYMENT.md`.
