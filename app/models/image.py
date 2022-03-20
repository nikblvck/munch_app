from .db import db

class Image(db.Model):
  __tablename__ = 'images'

  id = db.Column(db.Integer, primary_key=True)
  url = db.Column(db.String, nullable=False)
  post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
  updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), onupdate=db.func.now())


  post = db.relationship('Post', back_populates='images', lazy=True)



  def to_dict(self):
    return {
      'id': self.id,
      'url': self.url,
      'post_id': self.post_id
    }
