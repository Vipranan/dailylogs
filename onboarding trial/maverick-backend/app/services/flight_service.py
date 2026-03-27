from fastapi import HTTPException, status

from app.storage.json_store import JSONStore
from app.schemas.flight_experience import FlightExperienceRequest, FlightExperienceOut
from app.services.auth_service import AuthService


class FlightService:
    def __init__(self) -> None:
        self._store = JSONStore("flight_experience")
        self._auth_svc = AuthService()

    def save(self, user_id: str, payload: FlightExperienceRequest) -> FlightExperienceOut:
        data = {
            "user_id": user_id,
            "role": payload.role,
            "license_level": payload.license_level,
            "total_hours": payload.total_hours,
            "aircraft_type": payload.aircraft_type,
            "medical_certificate": payload.medical_certificate,
            "pilot_number": payload.pilot_number,
            # Instructor-only — will be None for pilots
            "instructor_rating": payload.instructor_rating,
            "approved_aircraft": payload.approved_aircraft,
            "years_of_experience": payload.years_of_experience,
            "instructor_type": payload.instructor_type,
        }

        record = self._store.upsert(match={"user_id": user_id}, data=data)

        # Advance onboarding step 2 → 3
        self._auth_svc.advance_step(user_id, to_step=3)

        return FlightExperienceOut(**record)

    def get(self, user_id: str) -> FlightExperienceOut:
        record = self._store.find_by(user_id=user_id)
        if not record:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Flight experience not found. Complete the experience step first.",
            )
        return FlightExperienceOut(**record)
