from .db import db

class Post (db.Model):
  __tablename__ = 'posts'

  id = db.Column(db.Integer, primary_key=True)
  image_url = db.Column(db.String(255), nullable=False)
  caption = db.Column(db.Text(), nullable=True)
  category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
  updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), onupdate=db.func.now())


  def to_dict(self):
    return {
      'id': self.id,
      'image_url': self.image_url,
      'caption': self.caption,
      'category_id': self.category_id,
      'user_id': self.user_id,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
