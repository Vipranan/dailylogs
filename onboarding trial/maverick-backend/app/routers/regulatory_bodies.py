from fastapi import APIRouter, Depends, Query, status

from app.core.dependencies import get_current_user
from app.schemas.regulatory_body import (
    RegulatoryBodyOut,
    SelectRegulatoryBodyRequest,
    UserRegulatoryOut,
)
from app.schemas.common import MessageResponse
from app.services.regulatory_service import RegulatoryService

router = APIRouter(tags=["Regulatory Bodies"])


@router.get(
    "/regulatory-bodies",
    response_model=list[RegulatoryBodyOut],
    summary="List all supported regulatory bodies",
)
def list_regulatory_bodies(
    q: str | None = Query(None, description="Search by name, country or acronym"),
) -> list[RegulatoryBodyOut]:
    svc = RegulatoryService()
    if q:
        return svc.search(q)
    return svc.list_all()


@router.post(
    "/user/regulatory-body",
    response_model=UserRegulatoryOut,
    status_code=status.HTTP_200_OK,
    summary="Select or update the user's regulatory body (onboarding step 1)",
)
def select_regulatory_body(
    payload: SelectRegulatoryBodyRequest,
    current_user: dict = Depends(get_current_user),
) -> UserRegulatoryOut:
    return RegulatoryService().select_for_user(current_user["id"], payload)


@router.get(
    "/user/regulatory-body",
    response_model=UserRegulatoryOut | None,
    summary="Get the user's selected regulatory body",
)
def get_user_regulatory_body(
    current_user: dict = Depends(get_current_user),
) -> UserRegulatoryOut | None:
    return RegulatoryService().get_for_user(current_user["id"])
