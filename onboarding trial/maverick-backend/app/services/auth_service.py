from fastapi import HTTPException, status

from app.core.security import hash_password, verify_password, create_access_token
from app.storage.json_store import JSONStore
from app.schemas.auth import RegisterRequest, LoginRequest, TokenResponse

_ONBOARDING_STEPS = {
    0: "Select Regulatory Body",
    1: "Build Your Profile",
    2: "Flight Experience",
    3: "Connect with Others",
    4: "Complete",
}


class AuthService:
    def __init__(self) -> None:
        self._store = JSONStore("users")

    def register(self, payload: RegisterRequest) -> TokenResponse:
        # Duplicate email check
        if self._store.exists(email=payload.email):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="An account with this email already exists",
            )

        user = self._store.insert(
            {
                "email": payload.email,
                "password_hash": hash_password(payload.password),
                "is_active": True,
                "onboarding_step": 0,  # 0 = reg body pending
            }
        )

        token = create_access_token(subject=user["id"])
        return TokenResponse(
            access_token=token,
            user_id=user["id"],
            email=user["email"],
            onboarding_step=user["onboarding_step"],
        )

    def login(self, payload: LoginRequest) -> TokenResponse:
        user = self._store.find_by(email=payload.email)

        if not user or not verify_password(payload.password, user["password_hash"]):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
            )

        if not user.get("is_active", True):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account is deactivated",
            )

        token = create_access_token(subject=user["id"])
        return TokenResponse(
            access_token=token,
            user_id=user["id"],
            email=user["email"],
            onboarding_step=user.get("onboarding_step", 0),
        )

    def advance_step(self, user_id: str, to_step: int) -> None:
        """Advance onboarding_step only if the new step is higher."""
        user = self._store.find_by(id=user_id)
        if user and user.get("onboarding_step", 0) < to_step:
            self._store.update_by_id(user_id, {"onboarding_step": to_step})

    @staticmethod
    def next_step_label(step: int) -> str | None:
        return _ONBOARDING_STEPS.get(step)
