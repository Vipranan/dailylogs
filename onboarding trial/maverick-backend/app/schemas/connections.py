from pydantic import BaseModel, ConfigDict


class ConnectionOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    role: str
    sub_role: str
    location: str
    total_hours: int
    license: str
    avatar_initials: str
    avatar_color: str
    bio: str
    regulatory_body: str
    followers: int
