from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length, ValidationError

def category_selected(form, field):
    category_id = form.data['category_id']
    if category_id  == '':
        raise ValidationError('Please select a category.')

def image_url_provided(form, field):
    image_url = form.data['image_url']
    if image_url == '':
        raise ValidationError('Please provide an image URL.')

class NewPost(FlaskForm):
    caption=StringField('Caption')
    category_id = IntegerField('category_id', validators = [DataRequired(), category_selected])
    image = StringField('image', validators = [DataRequired()])
