from pydantic import BaseModel


class MessageResponse(BaseModel):
    message: str


class ErrorResponse(BaseModel):
    detail: str


class OnboardingProgressResponse(BaseModel):
    onboarding_step: int
    is_complete: bool
    next_step: str | None
