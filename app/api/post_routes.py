from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Post, Category

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def posts():
    posts = Post.query.all()
    return jsonify([post.to_dict() for post in posts])
