"""encrypt certain fields

Revision ID: d76f749e4edf
Revises: 3b7e1c9d2a4f
Create Date: 2026-10-15 19:02:48.434200

"""
from decimal import Decimal
from typing import Sequence, Union

import sqlalchemy as sa

from alembic import op
from db.encrypted import Encrypted

# revision identifiers, used by Alembic.
revision: str = 'd76f749e4edf'
down_revision: Union[str, Sequence[str], None] = '3b7e1c9d2a4f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

# Plain TEXT view of the table: values are encrypted/decrypted by hand below.
transactions = sa.table(
    'transactions',
    sa.column('id', sa.Integer),
    sa.column('description', sa.Text),
    sa.column('amount', sa.Text),
)


def upgrade() -> None:
    """Upgrade schema."""
    op.alter_column('transactions', 'description',
               existing_type=sa.VARCHAR(),
               type_=sa.Text(),
               existing_nullable=False)
    op.alter_column('transactions', 'amount',
               existing_type=sa.NUMERIC(precision=12, scale=2),
               type_=sa.Text(),
               existing_nullable=False)

    # Encrypt existing rows the same way the Encrypted column type does.
    encrypted = Encrypted()
    conn = op.get_bind()
    rows = conn.execute(
        sa.select(transactions.c.id, transactions.c.description, transactions.c.amount)
    ).all()
    for row in rows:
        conn.execute(
            transactions.update()
            .where(transactions.c.id == row.id)
            .values(
                description=encrypted.process_bind_param(row.description, conn.dialect),
                amount=encrypted.process_bind_param(Decimal(row.amount), conn.dialect),
            )
        )


def downgrade() -> None:
    """Downgrade schema."""
    # Decrypt rows back to plaintext so the type casts below succeed.
    encrypted = Encrypted()
    conn = op.get_bind()
    rows = conn.execute(
        sa.select(transactions.c.id, transactions.c.description, transactions.c.amount)
    ).all()
    for row in rows:
        conn.execute(
            transactions.update()
            .where(transactions.c.id == row.id)
            .values(
                description=encrypted.process_result_value(row.description, conn.dialect),
                amount=str(encrypted.process_result_value(row.amount, conn.dialect)),
            )
        )

    op.alter_column('transactions', 'amount',
               existing_type=sa.Text(),
               type_=sa.NUMERIC(precision=12, scale=2),
               existing_nullable=False,
               postgresql_using='amount::numeric(12, 2)')
    op.alter_column('transactions', 'description',
               existing_type=sa.Text(),
               type_=sa.VARCHAR(),
               existing_nullable=False)
