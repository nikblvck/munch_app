from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Category, Post

category_routes = Blueprint('categories', __name__)

# CREATE

#READ ALL
@category_routes.route('/')
def categories():
    categories = Category.query.all()
    return jsonify([category.to_dict() for category in categories])


# READ ONE
@category_routes.route('/<category_name>/')
def category(category_name):
    category = Category.query.filter(Category.name == category_name).one()
    posts = Post.query.filter(Post.category_id == category.id).all()
    return jsonify({'category': category.to_dict(), 'posts': [post.to_dict() for post in posts]})
