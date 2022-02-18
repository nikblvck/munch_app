from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField,SubmitField
from wtforms.validators import DataRequired, Length

class EditPost(FlaskForm):
  image_url=StringField('image_url', validators=[DataRequired()], message ="Please provide an image URL for your post")
  caption=TextAreaField('caption')
  category_id = IntegerField('Category ID', validators=[DataRequired()], message ="Please select a category for your post")
  submit=SubmitField('Post')
