import pickle

import sqlalchemy as sa
from cryptography.fernet import Fernet

from constants import DB_ENCRYPTION_KEY


class Encrypted(sa.TypeDecorator):
    """Stores any picklable value as Fernet-encrypted text."""

    impl = sa.Text
    cache_ok = True

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fernet = Fernet(DB_ENCRYPTION_KEY.encode()) if DB_ENCRYPTION_KEY else None

    def _get_fernet(self) -> Fernet:
        if self.fernet is None:
            raise RuntimeError("ENCRYPTION_KEY is not set; cannot read or write encrypted columns")
        return self.fernet

    def process_bind_param(self, value, dialect):
        if value is not None:
            value = self._get_fernet().encrypt(pickle.dumps(value)).decode()
        return value

    def process_result_value(self, value, dialect):
        if value is not None:
            value = pickle.loads(self._get_fernet().decrypt(value.encode()))
        return value
