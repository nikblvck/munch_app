from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError

def search_term_length(form, field):
    if len(field.data) < 3:
        raise ValidationError('Search term must be at least 3 characters long.')

class SearchForm(FlaskForm):
    search_term = StringField('Search', validators=[DataRequired('Please enter a search term..'), search_term_length])
