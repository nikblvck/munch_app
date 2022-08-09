from .db import db
from flask_login import current_user


class Like(db.Model):
  __tablename__ = 'likes'
  # If post_id and user_id are unique, then this is a unique like
  # If post_id and user_id are not unique, then this is a duplicate like

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
  unique_like = db.UniqueConstraint('user_id', 'post_id', name='unique_like')
  user = db.relationship('User', back_populates='likes', lazy=True)
  post = db.relationship('Post', back_populates='likes', lazy=True)

  def to_dict(self):
    return {
        'id': self.id,
        'user_id': current_user.id,
        'post_id': self.post_id
    }
