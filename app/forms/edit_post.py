from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField,SubmitField
from wtforms.validators import DataRequired, Length, ValidationError



def changed_content(form, field):
    if field.data['image_url'] == form.original_content.data['image_url'] or field.data['category_id'] == form.original_content.data['category_id']:
        raise ValidationError('Content unchanged. Please edit your post')

class EditPost(FlaskForm):
  image_url=StringField('image_url', validators=[DataRequired(), changed_content])
  caption=TextAreaField('caption')
  category_id = IntegerField('category_id', validators=[DataRequired(), changed_content], message ="Please select a category for your post")
  submit=SubmitField('post')
