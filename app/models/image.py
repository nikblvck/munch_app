from .db import db

class Image(db.Model):
  __tablename__ = 'images'

  id = db.Column(db.Integer, primary_key=True)
  image_url = db.Column(db.String(255), nullable=False)
  post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)

  def to_dict(self):
    return {
      'id': self.id,
      'image_url': self.image_url,
      'post_id': self.post_id
    }
