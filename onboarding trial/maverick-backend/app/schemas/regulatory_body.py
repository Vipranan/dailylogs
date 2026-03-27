from pydantic import BaseModel, ConfigDict


class RegulatoryBodyOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    acronym: str
    country: str
    country_code: str
    flag: str
    description: str
    website: str


class SelectRegulatoryBodyRequest(BaseModel):
    regulatory_body_id: str


class UserRegulatoryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    user_id: str
    regulatory_body_id: str
    regulatory_body: RegulatoryBodyOut
