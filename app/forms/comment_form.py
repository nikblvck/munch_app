from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField
from wtforms.validators import DataRequired, Length, ValidationError

def content_provided(form, field):
    content = field.data
    if content == '':
        raise ValidationError('Content is required.')
    if len(content) > 10000:
        raise ValidationError('Content must be less than 10000 characters.')
    if len(content) < 1:
        raise ValidationError('Content must be at least 1 character.')


class NewComment(FlaskForm):
    content = StringField('content', validators=[DataRequired(), Length(min=1, max=10000), content_provided])
    post_id= IntegerField('post_id', validators=[DataRequired()])
    submit = SubmitField('Submit')
