from datetime import date
from typing import Literal
from pydantic import BaseModel, ConfigDict, field_validator


GENDER_VALUES = Literal["male", "female", "non_binary", "prefer_not_to_say"]


class ProfileCreateRequest(BaseModel):
    first_name: str
    last_name: str
    phone_number: str
    date_of_birth: date
    gender: GENDER_VALUES | None = None
    bio: str | None = None

    @field_validator("first_name", "last_name")
    @classmethod
    def name_not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Name fields cannot be blank")
        return v

    @field_validator("phone_number")
    @classmethod
    def phone_format(cls, v: str) -> str:
        cleaned = v.strip()
        if len(cleaned) < 7:
            raise ValueError("Enter a valid phone number")
        return cleaned


class ProfileUpdateRequest(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    phone_number: str | None = None
    date_of_birth: date | None = None
    gender: GENDER_VALUES | None = None
    bio: str | None = None


class ProfileOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    user_id: str
    first_name: str
    last_name: str
    phone_number: str
    date_of_birth: str
    gender: str | None
    bio: str | None
    created_at: str
