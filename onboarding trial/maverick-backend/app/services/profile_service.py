from fastapi import HTTPException, status

from app.storage.json_store import JSONStore
from app.schemas.profile import ProfileCreateRequest, ProfileUpdateRequest, ProfileOut
from app.services.auth_service import AuthService


class ProfileService:
    def __init__(self) -> None:
        self._store = JSONStore("profiles")
        self._auth_svc = AuthService()

    def create_or_update(
        self, user_id: str, payload: ProfileCreateRequest
    ) -> ProfileOut:
        data = {
            "user_id": user_id,
            "first_name": payload.first_name,
            "last_name": payload.last_name,
            "phone_number": payload.phone_number,
            "date_of_birth": str(payload.date_of_birth),
            "gender": payload.gender,
            "bio": payload.bio,
        }

        record = self._store.upsert(match={"user_id": user_id}, data=data)

        # Advance onboarding step 1 → 2
        self._auth_svc.advance_step(user_id, to_step=2)

        return ProfileOut(**record)

    def get(self, user_id: str) -> ProfileOut:
        record = self._store.find_by(user_id=user_id)
        if not record:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Profile not found. Complete the profile step first.",
            )
        return ProfileOut(**record)

    def partial_update(
        self, user_id: str, payload: ProfileUpdateRequest
    ) -> ProfileOut:
        record = self._store.find_by(user_id=user_id)
        if not record:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Profile not found",
            )

        updates = {
            k: str(v) if hasattr(v, "isoformat") else v  # serialize date
            for k, v in payload.model_dump(exclude_none=True).items()
        }
        updated = self._store.update_by_id(record["id"], updates)
        return ProfileOut(**updated)
