from typing import Literal
from pydantic import BaseModel, ConfigDict, model_validator


RoleType = Literal["PILOT", "INSTRUCTOR"]

LICENSE_LEVELS = [
    "Student Pilot License (SPL)",
    "Private Pilot License (PPL)",
    "Commercial Pilot License (CPL)",
    "Airline Transport Pilot License (ATPL)",
    "Multi-Crew Pilot License (MPL)",
    "Sport Pilot License (SPL)",
]

AIRCRAFT_TYPES = [
    "Single Engine Piston (SEP)",
    "Multi Engine Piston (MEP)",
    "Single Engine Turboprop",
    "Multi Engine Turboprop",
    "Jet — Narrow Body",
    "Jet — Wide Body",
    "Helicopter (Single Engine)",
    "Helicopter (Multi Engine)",
    "Glider",
    "Ultralight / Microlight",
]

MEDICAL_CERTIFICATES = [
    "Class 1 — Commercial Operations",
    "Class 2 — Private Operations",
    "Class 3 — Air Traffic Control",
    "BasicMed",
    "LAPL Medical",
    "None / Student",
]

INSTRUCTOR_RATINGS = [
    "CFI — Certified Flight Instructor",
    "CFII — Instrument Flight Instructor",
    "MEI — Multi-Engine Instructor",
    "AGI — Advanced Ground Instructor",
    "BGI — Basic Ground Instructor",
    "FIR — Flight Instructor Rating (EASA)",
]


class FlightExperienceRequest(BaseModel):
    role: RoleType

    # Pilot fields
    license_level: str | None = None
    total_hours: float | None = None
    aircraft_type: str | None = None
    medical_certificate: str | None = None
    pilot_number: str | None = None

    # Instructor-only fields
    instructor_rating: str | None = None
    approved_aircraft: str | None = None
    years_of_experience: int | None = None
    instructor_type: str | None = None

    @model_validator(mode="after")
    def validate_role_fields(self) -> "FlightExperienceRequest":
        if self.role == "INSTRUCTOR":
            if not self.instructor_rating:
                raise ValueError(
                    "instructor_rating is required when role is INSTRUCTOR"
                )
            if self.years_of_experience is None:
                raise ValueError(
                    "years_of_experience is required when role is INSTRUCTOR"
                )
        return self


class FlightExperienceOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    user_id: str
    role: str
    license_level: str | None
    total_hours: float | None
    aircraft_type: str | None
    medical_certificate: str | None
    pilot_number: str | None
    instructor_rating: str | None
    approved_aircraft: str | None
    years_of_experience: int | None
    instructor_type: str | None
    created_at: str
