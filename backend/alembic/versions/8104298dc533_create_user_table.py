"""Create user table

Revision ID: 8104298dc533
Revises: 8237fa78e402
Create Date: 2026-10-06 23:13:57.087182

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "8104298dc533"
down_revision: Union[str, Sequence[str], None] = "8237fa78e402"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""

    # Create users table
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )

    # Add user_id to existing statements
    op.add_column(
        "statements",
        sa.Column("user_id", sa.Integer(), nullable=True),
    )

    # Create foreign key from statements.user_id -> users.id
    op.create_foreign_key(
        None,
        "statements",
        "users",
        ["user_id"],
        ["id"],
        ondelete="CASCADE",
    )

    # Create PostgreSQL enum type BEFORE using it
    transaction_type = sa.Enum(
        "INCOME",
        "EXPENSE",
        name="transactiontype",
    )

    transaction_type.create(op.get_bind(), checkfirst=True)

    # Change transactions.type from VARCHAR -> transactiontype
    op.alter_column(
        "transactions",
        "type",
        existing_type=sa.VARCHAR(),
        type_=transaction_type,
        existing_nullable=False,
        postgresql_using="type::transactiontype",
    )

    # Change amount from FLOAT -> NUMERIC(12, 2)
    op.alter_column(
        "transactions",
        "amount",
        existing_type=sa.DOUBLE_PRECISION(precision=53),
        type_=sa.Numeric(precision=12, scale=2),
        existing_nullable=False,
    )


def downgrade() -> None:
    """Downgrade schema."""

    # Change amount back to FLOAT
    op.alter_column(
        "transactions",
        "amount",
        existing_type=sa.Numeric(precision=12, scale=2),
        type_=sa.DOUBLE_PRECISION(precision=53),
        existing_nullable=False,
    )

    # Change type back to VARCHAR
    op.alter_column(
        "transactions",
        "type",
        existing_type=sa.Enum(
            "DEBIT",
            "CREDIT",
            name="transactiontype",
        ),
        type_=sa.VARCHAR(),
        existing_nullable=False,
    )

    # Drop the PostgreSQL enum type
    sa.Enum(
        "DEBIT",
        "CREDIT",
        name="transactiontype",
    ).drop(op.get_bind(), checkfirst=True)

    # Remove foreign key
    op.drop_constraint(
        None,
        "statements",
        type_="foreignkey",
    )

    # Remove user_id
    op.drop_column(
        "statements",
        "user_id",
    )

    # Remove users table
    op.drop_table("users")
