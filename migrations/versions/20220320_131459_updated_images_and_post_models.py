"""updated images and post models

Revision ID: bff52bd098d2
Revises: 1de3ef76ed51
Create Date: 2022-03-20 13:14:59.092757

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bff52bd098d2'
down_revision = '1de3ef76ed51'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('images', sa.Column('url', sa.String(), nullable=False))
    op.add_column('images', sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False))
    op.add_column('images', sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False))
    op.drop_column('images', 'image_url')
    op.drop_column('posts', 'image_url')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('posts', sa.Column('image_url', sa.VARCHAR(length=255), autoincrement=False, nullable=False))
    op.add_column('images', sa.Column('image_url', sa.VARCHAR(length=255), autoincrement=False, nullable=False))
    op.drop_column('images', 'updated_at')
    op.drop_column('images', 'created_at')
    op.drop_column('images', 'url')
    # ### end Alembic commands ###