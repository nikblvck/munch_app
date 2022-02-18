from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length

class NewPost(FlaskForm):
    image_url=StringField('Image URL', validators=[DataRequired()])
    caption=StringField('Caption')
    category_id = IntegerField('Category ID', validators = [DataRequired()])
    submit = SubmitField('Post')
