from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError

class NewLike(FlaskForm):
    post_id = StringField('post_id', validators=[DataRequired()])
    submit = SubmitField('Like')
    
