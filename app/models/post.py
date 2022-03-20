from .db import db

class Post (db.Model):
  __tablename__ = 'posts'

  id = db.Column(db.Integer, primary_key=True)
  caption = db.Column(db.Text(), nullable=True)
  category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
  updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), onupdate=db.func.now())

  user = db.relationship('User', back_populates='post', lazy=True)
  category = db.relationship('Category', back_populates='post', lazy=True)
  comments = db.relationship('Comment', back_populates='post', lazy=True)
  likes = db.relationship('Like', back_populates='post', lazy=True)
  images = db.relationship('Image', back_populates='post', lazy=True)


  def to_dict_with_images(self):
    return{
      'id': self.id,
      'images': [image.to_dict() for image in self.images],
      'caption': self.caption,
      'category_id': self.category_id,
      'user_id': self.user_id,
      'username': self.user.username,
      'likes': len(self.likes),
      'comments': len(self.comments),
      'comment_list': [comment.to_dict() for comment in self.comments],
      'created_at': self.created_at,
      'updated_at': self.updated_at,
      'category_name': self.category.name,
    }


  def to_dict(self):
    return {
      'id': self.id,
      'caption': self.caption,
      'category_id': self.category_id,
      'user_id': self.user_id,
      'username': self.user.username,
      'likes': len(self.likes),
      'comments': len(self.comments),
      'comment_list': [comment.to_dict() for comment in self.comments],
      'created_at': self.created_at,
      'updated_at': self.updated_at,
      'category_name': self.category.name,
      'user_profile_image': self.user.profile_img_url,
      'images': [image.to_dict() for image in self.images]
    }
