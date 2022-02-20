"""column update

Revision ID: d55dadef6a7e
Revises: 30780a598d35
Create Date: 2022-02-18 11:52:48.873891

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd55dadef6a7e'
down_revision = '30780a598d35'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('users', 'is_admin',
               existing_type=sa.BOOLEAN(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('users', 'is_admin',
               existing_type=sa.BOOLEAN(),
               nullable=False)
    # ### end Alembic commands ###