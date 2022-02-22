from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length

class NewComment(FlaskForm):
    comment = StringField('Comment', validators=[DataRequired(), Length(max=10000)])
    submit = SubmitField('Submit')
