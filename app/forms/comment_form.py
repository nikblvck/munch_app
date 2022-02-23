from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField
from wtforms.validators import DataRequired, Length

class NewComment(FlaskForm):
    content = StringField('content', validators=[DataRequired(), Length(max=10000)])
    post_id= IntegerField('post_id', validators=[DataRequired()])
    submit = SubmitField('Submit')
