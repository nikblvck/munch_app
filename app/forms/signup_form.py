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


def is_email(form, field):
    # Checking if email input is valid
    email = field.data
    if '@' not in email:
        raise ValidationError('Email address is invalid.')

def first_name_length(form, field):
    first_name = field.data
    if len(first_name) < 2:
        raise ValidationError('First name must be at least 2 characters long.')
    if len(first_name) > 20:
        raise ValidationError('First name must be less than 20 characters long.')
    if first_name.isdigit():
        raise ValidationError('First name must not be all digits.')
    if '1234567890' in first_name:
        raise ValidationError('First name must not contain numbers.')

def last_name_length(form, field):
    last_name = field.data
    if len(last_name) < 2:
        raise ValidationError('Last name must be at least 2 characters long.')
    if len(last_name) > 20:
        raise ValidationError('Last name must be less than 20 characters long.')
    if last_name.isdigit():
        raise ValidationError('Last name must not be all digits.')
    if '1234567890' in last_name:
        raise ValidationError('Last name must not contain numbers.')

def password_complexity(form, field):
    password = field.data
    if len(password) < 8:
        raise ValidationError('Password must be at least 8 characters long.')
    if len(password) > 20:
        raise ValidationError('Password must be less than 20 characters long.')

class SignUpForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired(), first_name_length])
    last_name = StringField('Last Name', validators=[DataRequired(), last_name_length])
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, is_email])
    password = StringField('password', validators=[DataRequired(), password_complexity])
