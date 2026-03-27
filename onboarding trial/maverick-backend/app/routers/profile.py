from fastapi import APIRouter, Depends, status

from app.core.dependencies import get_current_user
from app.schemas.profile import ProfileCreateRequest, ProfileUpdateRequest, ProfileOut
from app.services.profile_service import ProfileService

router = APIRouter(prefix="/user", tags=["User Profile"])


@router.post(
    "/profile",
    response_model=ProfileOut,
    status_code=status.HTTP_200_OK,
    summary="Create or update user profile (onboarding step 2)",
)
def create_or_update_profile(
    payload: ProfileCreateRequest,
    current_user: dict = Depends(get_current_user),
) -> ProfileOut:
    """
    Saves personal info. Can be called multiple times — subsequent calls
    update the existing profile in-place.
    """
    return ProfileService().create_or_update(current_user["id"], payload)


@router.get(
    "/profile",
    response_model=ProfileOut,
    summary="Get current user's profile",
)
def get_profile(
    current_user: dict = Depends(get_current_user),
) -> ProfileOut:
    return ProfileService().get(current_user["id"])


@router.patch(
    "/profile",
    response_model=ProfileOut,
    summary="Partially update user profile",
)
def patch_profile(
    payload: ProfileUpdateRequest,
    current_user: dict = Depends(get_current_user),
) -> ProfileOut:
    return ProfileService().partial_update(current_user["id"], payload)
