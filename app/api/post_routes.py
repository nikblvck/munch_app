from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post, Comment, Like, User, Image
from app.forms import NewPost

post_routes = Blueprint('posts', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages



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
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# READ ALL
@post_routes.route('/')
def posts():
    posts = Post.query.order_by(Post.updated_at.desc())
    return jsonify([post.to_dict() for post in posts])

# READ NEW
@post_routes.route('/newposts')
def new_posts():
    posts = Post.query.order_by(Post.updated_at.desc()).limit(10)
    return jsonify([post.to_dict() for post in posts])



#READ ALL FROM USER
@post_routes.route('/user/<int:user_id>')
def posts_by_user(user_id):
    user = User.query.get(user_id)
    posts = Post.query.filter_by(user_id=user_id).order_by(Post.updated_at.desc())
    return user.to_dict()

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
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# DELETE
@post_routes.route('/delete/<int:id>/', methods=['DELETE'])
@login_required
def delete_post(id):
    post = Post.query.get(id)
    likes = Like.query.filter_by(post_id=id).all()
    comments = Comment.query.filter_by(post_id=id).all()
    images = Image.query.filter_by(post_id=id).all()
    if post.user_id == current_user.id:
        for like in likes:
            db.session.delete(like)
        for comment in comments:
            db.session.delete(comment)
        for image in images:
            db.session.delete(image)
        db.session.delete(post)
        db.session.commit()
        return jsonify('Success! Post deleted.')

#LIKE ROUTES
@post_routes.route('/like/<int:id>/', methods=['POST'])
@login_required
def like_post(id):
    like = Like.query.filter_by(user_id=current_user.id, post_id=id).first()
    if like:
        db.session.delete(like)
        db.session.commit()
        return jsonify({'message': 'Like removed.'})
    else:
        new_like = Like(
            user_id=current_user.id,
            post_id=id
        )
        db.session.add(new_like)
        db.session.commit()
        return jsonify({'message': 'Liked!'})
