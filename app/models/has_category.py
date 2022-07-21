from .db import db

class Has_Category(db.Model):
    __tablename__ = 'has_categories'

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)

    category = db.relationship('Category', back_populates='has_categories')
    post = db.relationship('Post', back_populates='has_categories')

    def to_dict(self):
      return {
        'id': self.id,
        'post_id': self.post_id,
        'category_id': self.category_id,
        'name': self.category.name
      }
