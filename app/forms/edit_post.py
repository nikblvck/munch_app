from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField,SubmitField
from wtforms.validators import DataRequired, Length, ValidationError





class EditPost(FlaskForm):
  image_url=StringField('image_url', validators=[DataRequired()])
  caption=TextAreaField('caption')
  category_id = IntegerField('category_id', validators=[DataRequired()], message ="Please select a category for your post")
  submit=SubmitField('post')
