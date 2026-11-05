from fastapi import FastAPI

from radnexus_intelligence.api.routes import router
from radnexus_intelligence.core.config import settings

app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
    description=(
        "AI-native enterprise intelligence foundation. "
        "All company data is synthetic unless explicitly documented otherwise."
    ),
)

app.include_router(router)
