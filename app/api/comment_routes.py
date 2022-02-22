from flask import Blueprint, jsonify, request
from app.models import Comment, Post, User

comment_routes = Blueprint('comments', __name__)


#CREATE

# READ ALL
@comment_routes.route('/', methods=['GET'])
def get_comments():
    comments = Comment.query.all()
    return jsonify([comment.to_dict() for comment in comments])

#READ ONE
@comment_routes.route('/<int:id>', methods=['GET'])
def get_comment(id):
    comment = Comment.query.get(id)
    return jsonify(comment.to_dict())

# READ BY POST
@comment_routes.route('/posts/<int:id>', methods=['GET'])
def get_comments_by_post(id):
    comments = Comment.query.filter_by(post_id=id).all()
    return jsonify([comment.to_dict() for comment in comments])
# UPDATE


# DELETE
@comment_routes.route('/<int:id>', methods=['DELETE'])
def delete_comment(id):
    comment = Comment.query.get(id)
    comment.delete()
    return jsonify('Success, your comment has been deleted!')
