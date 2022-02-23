from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length

class NewPost(FlaskForm):
    image_url=StringField('Image URL', validators=[DataRequired()], message='Please provide an image URL for your post.')
    caption=StringField('Caption')
    category_id = IntegerField('Category ID', validators = [DataRequired()], message='Please provide a category name for your post.')
    submit = SubmitField('Post')
