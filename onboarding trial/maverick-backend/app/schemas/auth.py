from pydantic import BaseModel, EmailStr, field_validator, ConfigDict


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str

    @field_validator("password")
    @classmethod
    def password_strength(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters long")
        return v


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    access_token: str
    token_type: str = "bearer"
    user_id: str
    email: str
    onboarding_step: int


class UserPublic(BaseModel):
    """Safe user representation returned from protected endpoints."""
    model_config = ConfigDict(from_attributes=True)

    id: str
    email: str
    is_active: bool
    onboarding_step: int
    created_at: str
