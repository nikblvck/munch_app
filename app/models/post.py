from .db import db

class Post (db.Model):
  __tablename__ = 'posts'

  id = db.Column(db.Integer, primary_key=True)
  caption = db.Column(db.Text(), nullable=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
  updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), onupdate=db.func.now())

  user = db.relationship('User', back_populates='posts', lazy=True)
  comments = db.relationship('Comment', back_populates='post', lazy=True)
  likes = db.relationship('Like', back_populates='post', lazy=True)
  has_categories = db.relationship('Has_Category', back_populates='post', lazy=True)
  images = db.relationship('Image', back_populates='post', lazy=True)


  def most_liked(self):
    return Post.query.order_by(Post.likes.desc()).limit(2)

  def to_dict(self):
      return {
          'id': self.id,
          'caption': self.caption,
          'user_id': self.user_id,
          'created_at': self.created_at,
          'updated_at': self.updated_at,
          'images': [image.to_dict() for image in self.images],
          'comments': [comment.to_dict() for comment in self.comments],
          'comments_count': len(self.comments),
          'likes_count': len(self.likes),
          'categories': [category.to_dict() for category in self.has_categories],
          'profile_img': self.user.profile_img,
          'username': self.user.username,
      }
