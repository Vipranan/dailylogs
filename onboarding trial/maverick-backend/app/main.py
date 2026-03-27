"""
Maverick — Aviation Training Ecosystem
FastAPI application entry point.
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core.config import get_settings
from app.routers import auth, regulatory_bodies, profile, flight_experience, connections

settings = get_settings()


# ── Startup / shutdown ─────────────────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Ensure all data files exist on first boot
    from app.storage.json_store import _path, _write_raw
    for table in ["users", "profiles", "flight_experience", "user_regulatory"]:
        if not _path(table).exists():
            _write_raw(table, [])
    yield


# ── App factory ────────────────────────────────────────────────────────────────

app = FastAPI(
    title=settings.app_name,
    description=(
        "Production-ready backend for the Maverick aviation training ecosystem. "
        "Handles multi-step pilot onboarding, JWT authentication, "
        "regulatory body selection, flight experience tracking, and social connections."
    ),
    version=settings.app_version,
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# ── CORS ───────────────────────────────────────────────────────────────────────

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Global exception handler ───────────────────────────────────────────────────

@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    if settings.debug:
        raise exc
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An unexpected error occurred. Please try again."},
    )


# ── Routers ────────────────────────────────────────────────────────────────────

app.include_router(auth.router)
app.include_router(regulatory_bodies.router)
app.include_router(profile.router)
app.include_router(flight_experience.router)
app.include_router(connections.router)


# ── Health check ───────────────────────────────────────────────────────────────

@app.get("/health", tags=["System"], summary="Health check")
def health_check():
    return {
        "status": "ok",
        "app": settings.app_name,
        "version": settings.app_version,
        "environment": settings.app_env,
    }
