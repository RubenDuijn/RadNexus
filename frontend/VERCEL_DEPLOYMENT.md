# Vercel Deployment Guide

This frontend can be deployed independently from the Python backend.

## 1. Vercel project setup

1. In Vercel, create a new project from the `RubenDuijn/RadNexus` repository.
2. Set **Root Directory** to:
   - `frontend`
3. Framework preset should auto-detect as:
   - `Next.js`
4. Build settings (default):
   - Build command: `npm run build`
   - Install command: `npm install`
   - Output: Next.js default

## 2. Required environment variables

Set in Vercel Project Settings -> Environment Variables:

- `NEXT_PUBLIC_API_BASE_URL`

Example values:
- For local development only: `http://localhost:8000`
- For Vercel deployment: use a publicly reachable backend URL (do not use localhost)

## 3. Backend independence behavior

The frontend is deployable even if the backend is unavailable.

- If backend health endpoints are unreachable, UI still renders.
- Connectivity badges and status panels show unavailable state.
- Demonstration data continues to render in dashboard and explorer visuals.

## 4. Security and secret handling

- Do not add database credentials to frontend environment variables.
- Do not add server secrets with `NEXT_PUBLIC_` prefix.
- Keep backend credentials only in backend runtime environments.

## 5. Post-deploy verification checklist

1. Confirm app loads at Vercel URL.
2. Open pages:
   - `/overview`
   - `/data-explorer`
   - `/business-intelligence`
   - `/ai-intelligence`
   - `/system-architecture`
3. Verify API status indicators reflect backend reachability.
4. Confirm no runtime crash if backend is unavailable.

## 6. Current readiness status

- Frontend build passes locally.
- Frontend can run and render independently of Python backend.
- Real backend connectivity in deployed environment requires a public FastAPI base URL for `NEXT_PUBLIC_API_BASE_URL`.
