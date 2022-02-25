from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length, ValidationError

def category_selected(form, field):
    if field.data['cattegory_id'] == '0':
        raise ValidationError('Please select a category.')

class NewPost(FlaskForm):
    image_url=StringField('Image URL', validators=[DataRequired()])
    caption=StringField('Caption')
    category_id = IntegerField('category_id', validators = [DataRequired()])
    submit = SubmitField('Post')
