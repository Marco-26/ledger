"""make FK not nullable

Revision ID: 1244743bde5d
Revises: 93d167ecfc0c
Create Date: 2026-04-13 20:26:48.393169

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "1244743bde5d"
down_revision: Union[str, Sequence[str], None] = "93d167ecfc0c"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Delete orphaned transactions (no parent statement) before enforcing NOT NULL
    op.execute('DELETE FROM "transaction" WHERE statement_id IS NULL')

    with op.batch_alter_table("transaction") as batch_op:
        batch_op.alter_column(
            "statement_id", existing_type=sa.INTEGER(), nullable=False
        )


def downgrade() -> None:
    """Downgrade schema."""
    with op.batch_alter_table("transaction") as batch_op:
        batch_op.alter_column("statement_id", existing_type=sa.INTEGER(), nullable=True)
