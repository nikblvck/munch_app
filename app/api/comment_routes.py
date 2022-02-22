from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Comment
from app.forms import NewComment

comment_routes = Blueprint('comments', __name__)


#CREATE
@comment_routes.route('/new/', methods=['POST'])
@login_required
def add_comment():
    form = NewComment()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comment(
            user_id=current_user.id,
            post_id=form.post_id.data,
            content=form.content.data
        )
        db.session.add(new_comment)
        db.session.commit()
        return jsonify(new_comment.to_dict())
    return jsonify(form.errors)
    

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
