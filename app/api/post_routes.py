from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post, Comment, Like
from app.forms import NewPost

post_routes = Blueprint('posts', __name__)


# CREATE
@post_routes.route('/new/', methods=['POST'])
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
    posts = Post.query.order_by(Post.updated_at.desc())
    return jsonify([post.to_dict() for post in posts])

#READ ALL FROM USER
@post_routes.route('/user/<int:user_id>')
def posts_by_user(user_id):
    posts = Post.query.filter_by(user_id=user_id).order_by(Post.updated_at.desc())
    return jsonify([post.to_dict() for post in posts])

#READ ALL FROM CATEGORY
@post_routes.route('/category/<int:category_id>')
def posts_by_category(category_id):
    posts = Post.query.filter_by(category_id=category_id).order_by(Post.updated_at.desc())
    return jsonify([post.to_dict() for post in posts])

# READ ONE
@post_routes.route('/<int:id>/')
def post(id):
    post = Post.query.get(id)
    return jsonify(post.to_dict())

# UPDATE
@post_routes.route('/<int:id>/', methods=['PUT'])
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
@post_routes.route('/delete/<int:id>/', methods=['DELETE'])
@login_required
def delete_post(id):
    post = Post.query.get(id)
    likes = Like.query.filter_by(post_id=id).all()
    comments = Comment.query.filter_by(post_id=id).all()
    if post.user_id == current_user.id:
        for like in likes:
            db.session.delete(like)
        for comment in comments:
            db.session.delete(comment)
        db.session.delete(post)
        db.session.commit()
        return jsonify('Success! Post deleted.')
