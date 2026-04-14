"""add ondelete event

Revision ID: f757e920ea95
Revises: 1244743bde5d
Create Date: 2026-04-14 20:02:55.493814

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f757e920ea95'
down_revision: Union[str, Sequence[str], None] = '1244743bde5d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    naming_convention = {
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
    with op.batch_alter_table('transaction', schema=None, naming_convention=naming_convention) as batch_op:
        batch_op.drop_constraint('fk_transaction_statement_id_statements', type_='foreignkey')
        batch_op.create_foreign_key('fk_transaction_statement_id', 'statements', ['statement_id'], ['id'], ondelete='CASCADE')


def downgrade() -> None:
    """Downgrade schema."""
    with op.batch_alter_table('transaction', schema=None) as batch_op:
        batch_op.drop_constraint('fk_transaction_statement_id', type_='foreignkey')
        batch_op.create_foreign_key(None, 'statements', ['statement_id'], ['id'])
