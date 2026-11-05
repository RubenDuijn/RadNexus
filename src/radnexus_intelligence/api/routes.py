from fastapi import APIRouter

from radnexus_intelligence.core.config import settings
from radnexus_intelligence.db.session import check_database_connection

router = APIRouter()


@router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": settings.app_name}


@router.get("/health/db")
def health_db() -> dict[str, str]:
    check_database_connection()
    return {"status": "ok", "database": "reachable"}
