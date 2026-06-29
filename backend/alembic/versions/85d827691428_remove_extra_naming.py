"""remove extra naming

Revision ID: 85d827691428
Revises: b121bb8da7bf
Create Date: 2026-06-24 23:53:40.050525

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "85d827691428"
down_revision: Union[str, Sequence[str], None] = "b121bb8da7bf"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    with op.batch_alter_table("transactions") as batch_op:
        batch_op.alter_column("transaction_date", new_column_name="date")
        batch_op.alter_column("transaction_description", new_column_name="description")
        batch_op.alter_column("transaction_debit", new_column_name="debit")
        batch_op.alter_column("transaction_credit", new_column_name="credit")
        batch_op.alter_column("transaction_balance", new_column_name="balance")
        batch_op.alter_column("transaction_category", new_column_name="category")


def downgrade() -> None:
    with op.batch_alter_table("transactions") as batch_op:
        batch_op.alter_column("date", new_column_name="transaction_date")
        batch_op.alter_column("description", new_column_name="transaction_description")
        batch_op.alter_column("debit", new_column_name="transaction_debit")
        batch_op.alter_column("credit", new_column_name="transaction_credit")
        batch_op.alter_column("balance", new_column_name="transaction_balance")
        batch_op.alter_column("category", new_column_name="transaction_category")
