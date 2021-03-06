from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Comment
from app.forms import NewComment, EditComment

comment_routes = Blueprint('comments', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages




#CREATE
@comment_routes.route('/new/', methods=['POST'])
@login_required
def add_comment():
    form = NewComment()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comment(
            user_id= current_user.id,
            post_id= form.post_id.data,
            content= form.content.data
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


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
@comment_routes.route('/<int:id>/', methods=['PUT'])
def edit_comment(id):
    form = EditComment()
    form['csrf_token'].data = request.cookies['csrf_token']
    comment = Comment.query.get(id)
    if comment.user_id == current_user.id:
        if form.validate_on_submit():
            comment.content = form.content.data
            comment.post_id = form.post_id.data
            db.session.commit()
            return jsonify(comment.to_dict())
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# DELETE
@comment_routes.route('/<int:id>', methods=['DELETE'])
def delete_comment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return jsonify('Success, your comment has been deleted!')
