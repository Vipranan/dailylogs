from fastapi import HTTPException, status

from app.storage.json_store import JSONStore
from app.schemas.regulatory_body import (
    RegulatoryBodyOut,
    SelectRegulatoryBodyRequest,
    UserRegulatoryOut,
)
from app.services.auth_service import AuthService


class RegulatoryService:
    def __init__(self) -> None:
        self._rb_store = JSONStore("regulatory_bodies")
        self._sel_store = JSONStore("user_regulatory")
        self._auth_svc = AuthService()

    def list_all(self) -> list[RegulatoryBodyOut]:
        bodies = self._rb_store.all()
        return [RegulatoryBodyOut(**b) for b in bodies]

    def search(self, query: str) -> list[RegulatoryBodyOut]:
        q = query.lower()
        results = [
            b for b in self._rb_store.all()
            if q in b["name"].lower()
            or q in b["country"].lower()
            or q in b.get("acronym", "").lower()
        ]
        return [RegulatoryBodyOut(**b) for b in results]

    def select_for_user(
        self, user_id: str, payload: SelectRegulatoryBodyRequest
    ) -> UserRegulatoryOut:
        # Validate the reg body exists
        rb = self._rb_store.find_by(id=payload.regulatory_body_id)
        if not rb:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Regulatory body '{payload.regulatory_body_id}' not found",
            )

        record = self._sel_store.upsert(
            match={"user_id": user_id},
            data={
                "user_id": user_id,
                "regulatory_body_id": payload.regulatory_body_id,
            },
        )

        # Advance onboarding step 0 → 1
        self._auth_svc.advance_step(user_id, to_step=1)

        return UserRegulatoryOut(
            **record,
            regulatory_body=RegulatoryBodyOut(**rb),
        )

    def get_for_user(self, user_id: str) -> UserRegulatoryOut | None:
        record = self._sel_store.find_by(user_id=user_id)
        if not record:
            return None
        rb = self._rb_store.find_by(id=record["regulatory_body_id"])
        if not rb:
            return None
        return UserRegulatoryOut(**record, regulatory_body=RegulatoryBodyOut(**rb))
