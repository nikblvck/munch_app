from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Post, Category
from app.forms import NewPost

post_routes = Blueprint('posts', __name__)


# CREATE
@post_routes.route('/new', methods=['POST'])
@login_required
def new_post():
    form = NewPost()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_post = Post(
            image_url=form.image_url.data,
            caption=form.caption.data,
            user_id=current_user.id,
            category_id=form.category_id.data
        )
        db.session.add(new_post)
        db.session.commit()
        return jsonify(new_post.to_dict())
    return jsonify(form.errors)

# READ ALL
@post_routes.route('/')
def posts():
    posts = Post.query.order_by(Post.created_at.desc())
    return jsonify([post.to_dict() for post in posts])

# READ ONE
@post_routes.route('/<int:id>')
def post(id):
    post = Post.query.get(id)
    return jsonify(post.to_dict())

# UPDATE
@post_routes.route('/<int:id>', methods=['PUT'])
def edit_post(id):
    form = NewPost()
    form['csrf_token'].data = request.cookies['csrf_token']
    post = Post.query.get(id)
    if post.user_id == current_user.id:
        if form.validate_on_submit():
            post.image_url = form.image_url.data
            post.caption = form.caption.data
            post.category_id = form.category_id.data
            db.session.commit()
            return jsonify(post.to_dict())
        return jsonify(form.errors)

# DELETE
@post_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_post(id):
    post = Post.query.get(id)
    if post.user_id == current_user.id:
        db.session.delete(post)
        db.session.commit()
        return jsonify('Success! Post deleted.')
