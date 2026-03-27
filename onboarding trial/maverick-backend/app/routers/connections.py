from fastapi import APIRouter, Depends, Query

from app.core.dependencies import get_current_user
from app.schemas.connections import ConnectionOut
from app.services.connection_service import ConnectionService

router = APIRouter(prefix="/connections", tags=["Connections"])


@router.get(
    "/suggestions",
    response_model=list[ConnectionOut],
    summary="Get suggested connections (onboarding step 4)",
)
def get_suggestions(
    role: str | None = Query(None, description="Filter by role: pilot, instructor, student"),
    limit: int = Query(10, ge=1, le=50, description="Max results to return"),
    current_user: dict = Depends(get_current_user),
) -> list[ConnectionOut]:
    """
    Returns a curated list of aviation community members to follow.

    Calling this endpoint automatically marks the Connect step as complete,
    advancing the user's `onboarding_step` to 4 (fully onboarded).
    """
    return ConnectionService().get_suggestions(
        user_id=current_user["id"],
        role=role,
        limit=limit,
    )
