from radnexus_intelligence.core.config import settings


def test_database_url_resolution() -> None:
    url = settings.resolved_database_url()
    assert url.startswith("postgresql+psycopg://")
    assert "radnexus_intelligence" in url
