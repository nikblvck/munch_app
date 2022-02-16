from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db,  Post
from app.forms import AddPostForm

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def posts():
    posts = Post.query.all()
    return jsonify([post.to_dict() for post in posts])

@post_routes.route('/new')
@login_required
def new_post():
    form = AddPostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_post = Post(
            image_url=form.image_url.data,
            caption=form.caption.data,
            user_id=current_user.id,
            category_id = int(form.data['category_id'])
        )
        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict()
    return {'errors': form.errors}



