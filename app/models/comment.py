from .db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    replyto_id = db.Column(db.Integer, db.ForeignKey(
        'comments.id'), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=db.func.now(), onupdate=db.func.now())

    user = db.relationship('User', back_populates='comments')
    post = db.relationship('Post', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'text': self.text,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'replyto_id': self.replyto_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
