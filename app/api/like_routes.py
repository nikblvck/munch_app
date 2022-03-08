from flask import Blueprint, jsonify, request
from app.models import Like, db
from flask_login import login_required, current_user
from app.forms import NewLike

like_routes = Blueprint('likes', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


 # CREATE OR DELETE 
like_routes.route('/new/', methods=['POST'])
@login_required
def like_or_unlike():
    like = Like.query.filter_by(user_id=current_user.id, post_id=request.form['post_id']).first()
    if like:
        db.session.delete(like)
        db.session.commit()
        return jsonify({"message": "unliked"})
    else:
        form = NewLike()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            new_like = Like(
                user_id=current_user.id,
                post_id=request.form['post_id']
            )
            db.session.add(new_like)
            db.session.commit()
            return jsonify({"message": "liked"})
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
