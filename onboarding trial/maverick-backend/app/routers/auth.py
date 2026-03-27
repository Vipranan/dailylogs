from fastapi import APIRouter, Depends, status

from app.core.dependencies import get_current_user
from app.schemas.auth import RegisterRequest, LoginRequest, TokenResponse, UserPublic
from app.schemas.common import OnboardingProgressResponse
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post(
    "/register",
    response_model=TokenResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user",
)
def register(payload: RegisterRequest) -> TokenResponse:
    """
    Create a new account.

    - **email**: must be unique
    - **password**: minimum 8 characters

    Returns a JWT token valid for 24 hours.
    """
    return AuthService().register(payload)


@router.post(
    "/login",
    response_model=TokenResponse,
    summary="Log in and receive a JWT",
)
def login(payload: LoginRequest) -> TokenResponse:
    """
    Authenticate and obtain a bearer token.
    """
    return AuthService().login(payload)


@router.get(
    "/me",
    response_model=UserPublic,
    summary="Get current authenticated user",
)
def me(current_user: dict = Depends(get_current_user)) -> UserPublic:
    return UserPublic(**current_user)


@router.get(
    "/me/onboarding-progress",
    response_model=OnboardingProgressResponse,
    summary="Get onboarding completion status",
)
def onboarding_progress(
    current_user: dict = Depends(get_current_user),
) -> OnboardingProgressResponse:
    step = current_user.get("onboarding_step", 0)
    return OnboardingProgressResponse(
        onboarding_step=step,
        is_complete=step >= 4,
        next_step=AuthService.next_step_label(step) if step < 4 else None,
    )
