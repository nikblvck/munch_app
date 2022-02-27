from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(64), nullable=False)
    last_name = db.Column(db.String(64), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    is_admin=db.Column(db.Boolean, default=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_img_url = db.Column(db.String(255), nullable=False, default='https://res.cloudinary.com/bigtechnik/image/upload/v1645603921/munch/image_luhr2p.jpg')
    bio=db.Column(db.Text, nullable=False, default='I am a new muncher!')
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), onupdate=db.func.now())

    post = db.relationship('Post', back_populates='user', lazy=True)
    comments = db.relationship('Comment', back_populates='user', lazy=True)
    likes = db.relationship('Like', back_populates='user', lazy=True)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def member_since(self):
        membership_date = self.created_at.strftime("%B %d, %Y")
        return membership_date

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'is_admin': self.is_admin,
            'created_at': self.created_at,
            'post_count': len(self.post),
            'post_list': [post.to_dict() for post in self.post],
            'profile_img_url': self.profile_img_url,
            'bio': self.bio,
            'member_since': self.member_since()
        }
