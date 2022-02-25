from flask_wtf import FlaskForm
from app.models import db, Comment
from wtforms import IntegerField, StringField, SubmitField
from wtforms.validators import DataRequired, Length, ValidationError



class EditComment(FlaskForm):
    content = StringField('content', validators=[DataRequired(), Length(min=1, max=10000)])
    post_id= IntegerField('post_id', validators=[DataRequired()])
    submit = SubmitField('Submit')
