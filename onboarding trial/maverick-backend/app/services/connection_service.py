from app.storage.json_store import JSONStore
from app.schemas.connections import ConnectionOut
from app.services.auth_service import AuthService


class ConnectionService:
    def __init__(self) -> None:
        self._store = JSONStore("connections")
        self._auth_svc = AuthService()

    def get_suggestions(
        self,
        user_id: str,
        role: str | None = None,
        limit: int = 10,
    ) -> list[ConnectionOut]:
        """Return suggested connections, optionally filtered by role.

        Also marks the onboarding connect step as complete (step 3 → 4).
        """
        all_users = self._store.all()

        if role:
            all_users = [
                u for u in all_users
                if role.lower() in u.get("role", "").lower()
            ]

        results = all_users[:limit]

        # Viewing suggestions counts as completing the connect step
        self._auth_svc.advance_step(user_id, to_step=4)

        return [ConnectionOut(**u) for u in results]
