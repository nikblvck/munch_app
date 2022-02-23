from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')




class SignUpForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired()], message='Please provide your first name.')
    last_name = StringField('Last Name', validators=[DataRequired()], message='Please provide your last name.')
    username = StringField(
        'username', validators=[DataRequired(), username_exists], message='Please provide a username.')
    email = StringField('email', validators=[DataRequired(), user_exists], message='Please provide an email address.')
    password = StringField('password', validators=[DataRequired()], message='Please provide a password.')
