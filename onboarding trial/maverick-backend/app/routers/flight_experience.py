from fastapi import APIRouter, Depends, status

from app.core.dependencies import get_current_user
from app.schemas.flight_experience import FlightExperienceRequest, FlightExperienceOut
from app.services.flight_service import FlightService

router = APIRouter(prefix="/user", tags=["Flight Experience"])


@router.post(
    "/flight-experience",
    response_model=FlightExperienceOut,
    status_code=status.HTTP_200_OK,
    summary="Save flight experience (onboarding step 3)",
)
def save_flight_experience(
    payload: FlightExperienceRequest,
    current_user: dict = Depends(get_current_user),
) -> FlightExperienceOut:
    """
    Saves pilot or instructor flight data.

    **Role-based validation:**
    - `INSTRUCTOR` → `instructor_rating` and `years_of_experience` are **required**
    - `PILOT` → instructor fields are **optional / ignored**
    """
    return FlightService().save(current_user["id"], payload)


@router.get(
    "/flight-experience",
    response_model=FlightExperienceOut,
    summary="Get current user's flight experience",
)
def get_flight_experience(
    current_user: dict = Depends(get_current_user),
) -> FlightExperienceOut:
    return FlightService().get(current_user["id"])
