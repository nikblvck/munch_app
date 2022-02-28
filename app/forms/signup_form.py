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
    # Checking if username length is valid
    username = field.data
    if len(username)  < 3:
        raise ValidationError('Username must be at least 3 characters long.')
    if len(username) > 20:
        raise ValidationError('Username must be less than 20 characters long.')

def is_email(form, field):
    # Checking if email input is valid
    email = field.data
    if '@' not in email:
        raise ValidationError('Email address is invalid.')
    if '.' not in email:
        raise ValidationError('Email address is invalid.')

def first_name_length(form, field):
    # Checking if first name length is valid
    first_name = field.data
    if len(first_name) < 2:
        raise ValidationError('First name must be at least 2 characters long.')
    if len(first_name) > 20:
        raise ValidationError('First name must be less than 20 characters long.')
    for char in first_name:
        if char in numbers:
            raise ValidationError('First name cannot contain numbers.')

def first_name_capital(form, field):
    # Checks if first letter in first name is a capital letter
    first_name = field.data
    if first_name[0].islower():
        raise ValidationError('First name must start with a capital letter.')



def last_name_length(form, field):
    #Checking if last name length is valid
    last_name  = field.data
    if len(last_name) < 2:
        raise ValidationError('Last name must be at least 2 characters long.')
    if len(last_name) > 20:
        raise ValidationError('Last name must be less than 20 characters long.')
    for char in last_name:
        if char in numbers:
            raise ValidationError('Last name cannot contain numbers.')

def last_name_capital(form, field):
    # Checks if first letter in last name is a capital letter
    last_name = field.data
    if last_name[0].islower():
        raise ValidationError('Last name must start with a capital letter.')

def password_complexity(form, field):
    # Checking if password is complex enough
    password = field.data
    if len(password) < 8:
        raise ValidationError('Password must be at least 8 characters long.')
    if len(password) > 20:
        raise ValidationError('Password must be less than 20 characters long.')


class SignUpForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired(), first_name_length, first_name_capital])
    last_name = StringField('Last Name', validators=[DataRequired(), last_name_length, last_name_capital])
    username = StringField(
        'Username', validators=[DataRequired(), username_exists])
    email = StringField('Email', validators=[DataRequired(), user_exists, is_email])
    password = StringField('Password', validators=[DataRequired(), password_complexity])
