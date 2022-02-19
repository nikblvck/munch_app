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
@category_routes.route('/<int:id>/')
def category(id):
    category = Category.query.get(id)
    posts = Post.query.filter_by(category_id=id).all()
    return jsonify([posts.to_dict() for posts in posts])
