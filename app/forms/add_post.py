from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User, Post

class AddPostForm(FlaskForm):
    image_url = StringField('image_url', validators=[DataRequired()])
    caption = TextAreaField('caption')
    submit = SubmitField('Post')
