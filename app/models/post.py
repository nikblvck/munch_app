from .db import db

class Post (db.Model):
  __tablename__ = 'posts'

  id = db.Column(db.Integer, primary_key=True)
  image_url = db.Column(db.String(255), nullable=False)
  caption = db.Column(db.Text(), nullable=True)
  category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
  updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), onupdate=db.func.now())

  user = db.relationship('User', back_populates='post', lazy=True)
  category = db.relationship('Category', back_populates='post', lazy=True)
  comments = db.relationship('Comment', back_populates='post', lazy=True)
  likes = db.relationship('Like', back_populates='post', lazy=True)


  def to_dict(self):
    return {
      'id': self.id,
      'image_url': self.image_url,
      'caption': self.caption,
      'category_id': self.category_id,
      'user_id': self.user_id,
      'username': self.user.username,
      'likes': len(self.likes),
      'comments': len(self.comments),
      'comment_list': [comment.to_dict() for comment in self.comments],
      'created_at': self.created_at,
      'updated_at': self.updated_at,
      # 'category_name': self.category.name
    }
