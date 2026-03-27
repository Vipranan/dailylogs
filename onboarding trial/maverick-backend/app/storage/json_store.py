"""
Thread-safe, file-based JSON storage engine.

Each logical table is a single .json file containing a list of record dicts.
All mutations acquire a per-table lock so concurrent requests don't corrupt data.
"""

import json
import threading
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

DATA_DIR = Path(__file__).parent / "data"

# One lock per table, lazily created
_locks: dict[str, threading.Lock] = {}
_locks_meta = threading.Lock()


# ── Internal helpers ──────────────────────────────────────────────────────────

def _get_lock(table: str) -> threading.Lock:
    with _locks_meta:
        if table not in _locks:
            _locks[table] = threading.Lock()
        return _locks[table]


def _path(table: str) -> Path:
    return DATA_DIR / f"{table}.json"


def _read_raw(table: str) -> list[dict]:
    """Read table from disk — caller must hold the lock."""
    p = _path(table)
    if not p.exists():
        return []
    with open(p, "r", encoding="utf-8") as fh:
        return json.load(fh)


def _write_raw(table: str, records: list[dict]) -> None:
    """Write table to disk — caller must hold the lock."""
    p = _path(table)
    p.parent.mkdir(parents=True, exist_ok=True)
    with open(p, "w", encoding="utf-8") as fh:
        json.dump(records, fh, indent=2, default=str, ensure_ascii=False)


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


# ── Public store class ────────────────────────────────────────────────────────

class JSONStore:
    """Simple document-store backed by a JSON file.

    Usage::

        store = JSONStore("users")
        user  = store.find_by(email="alice@example.com")
    """

    def __init__(self, table: str) -> None:
        self.table = table
        self._lock = _get_lock(table)

    # ── Read helpers (no lock needed — Python list reads are safe) ────────────

    def all(self) -> list[dict]:
        """Return every record in the table."""
        with self._lock:
            return list(_read_raw(self.table))

    def find_by(self, **kwargs: Any) -> dict | None:
        """Return the first record matching all keyword filters, or ``None``."""
        for record in self.all():
            if all(record.get(k) == v for k, v in kwargs.items()):
                return record
        return None

    def filter_by(self, **kwargs: Any) -> list[dict]:
        """Return all records matching all keyword filters."""
        return [
            r for r in self.all()
            if all(r.get(k) == v for k, v in kwargs.items())
        ]

    def exists(self, **kwargs: Any) -> bool:
        return self.find_by(**kwargs) is not None

    def count(self) -> int:
        return len(self.all())

    # ── Write helpers ─────────────────────────────────────────────────────────

    def insert(self, data: dict) -> dict:
        """Insert a new record; auto-assigns ``id`` and ``created_at``."""
        with self._lock:
            records = _read_raw(self.table)
            record = {
                "id": str(uuid.uuid4()),
                "created_at": _now(),
                **data,
            }
            records.append(record)
            _write_raw(self.table, records)
            return record

    def update_by_id(self, record_id: str, updates: dict) -> dict | None:
        """Patch a record in-place. Returns updated record or ``None``."""
        with self._lock:
            records = _read_raw(self.table)
            for i, r in enumerate(records):
                if r.get("id") == record_id:
                    records[i] = {**r, **updates, "updated_at": _now()}
                    _write_raw(self.table, records)
                    return records[i]
        return None

    def upsert(self, match: dict, data: dict) -> dict:
        """Insert if no match; update in-place if found."""
        with self._lock:
            records = _read_raw(self.table)
            for i, r in enumerate(records):
                if all(r.get(k) == v for k, v in match.items()):
                    records[i] = {**r, **data, "updated_at": _now()}
                    _write_raw(self.table, records)
                    return records[i]
            # Not found — insert
            record = {"id": str(uuid.uuid4()), "created_at": _now(), **data}
            records.append(record)
            _write_raw(self.table, records)
            return record

    def delete_by_id(self, record_id: str) -> bool:
        """Delete by id. Returns ``True`` if a record was removed."""
        with self._lock:
            records = _read_raw(self.table)
            filtered = [r for r in records if r.get("id") != record_id]
            if len(filtered) == len(records):
                return False
            _write_raw(self.table, filtered)
            return True
