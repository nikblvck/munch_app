from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

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

def username_length(form, field):
    username = field.data
    if len(username) < 2:
        raise ValidationError('Username must be at least 2 characters long.')
    if len(username) > 20:
        raise ValidationError('Username must be less than 20 characters long.')

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
    for char in first_name:
        if char in numbers:
            raise ValidationError('First name cannot contain numbers.')


def last_name_length(form, field):
    last_name  = field.data
    if len(last_name) < 2:
        raise ValidationError('Last name must be at least 2 characters long.')
    if len(last_name) > 20:
        raise ValidationError('Last name must be less than 20 characters long.')
    for char in last_name:
        if char in numbers:
            raise ValidationError('Last name cannot contain numbers.')

def password_complexity(form, field):
    password = field.data
    if len(password) < 8:
        raise ValidationError('Password must be at least 8 characters long.')
    if len(password) > 20:
        raise ValidationError('Password must be less than 20 characters long.')

class SignUpForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired(), first_name_length])
    last_name = StringField('last_name', validators=[DataRequired(), last_name_length])
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, is_email])
    password = StringField('password', validators=[DataRequired(), password_complexity])
