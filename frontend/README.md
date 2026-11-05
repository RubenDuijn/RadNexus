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

## Deployment

- Vercel deployment instructions: see `VERCEL_DEPLOYMENT.md`.
