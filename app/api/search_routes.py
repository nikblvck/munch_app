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



@search_routes.route('')
def search():
  form = SearchForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    search_term = form.data('Search')
    posts = Post.query.filter(Post.caption.ilike(f'%{search_term}%')).all()
    return {post.to_dict()['id']: post.to_dict() for post in posts}
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401
