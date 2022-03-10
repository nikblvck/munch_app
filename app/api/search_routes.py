from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post, Comment, Like, User, Category
from app.forms import SearchForm

search_routes = Blueprint('search', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages



@search_routes.route('/')
def search():
  term = request.args.get('x')
  if term == None:
    return jsonify({'error': 'No search term provided'})
  else:
    search_results = Post.query.filter(Post.title.ilike(f'%{term}%')).all()
    return jsonify({'search_results': [post.to_dict() for post in search_results]})
