"""Unique statement per user and month

Revision ID: 3b7e1c9d2a4f
Revises: 66cd1f229ffe
Create Date: 2026-10-10 17:00:00.000000

"""
from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = '3b7e1c9d2a4f'
down_revision: Union[str, Sequence[str], None] = '66cd1f229ffe'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_unique_constraint(
        'uq_statements_user_month', 'statements', ['user_id', 'date_uploaded']
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_constraint('uq_statements_user_month', 'statements', type_='unique')
