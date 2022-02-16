from app.models import db, Category

def seed_categories():
  categories = [
    {'name': 'Soul Food'},
    {'name': 'Vegan' },
    {'name': 'Vegetarian'},
    {'name': 'Classic American'},
    { 'name': 'Mexican' },
    { 'name': 'Italian' },
    { 'name': 'Chinese' },
    { 'name': 'Thai' },
    { 'name': 'Japanese' },
    { 'name': 'Indian' },
    { 'name': 'Mediterranean' },
    { 'name': 'French' },
    { 'name': 'Spanish' },
    { 'name': 'German' },
    {'name': 'Pastry'},
    {'name': 'Dessert'},
    {'name': 'Breakfast'},
    {'name': 'Brunch'},
    {'name': 'Seafood'}
  ]
  for category in categories:
    new_category = Category(**category)
    db.session.add(new_category)
    db.session.commit()

def undo_categories():
  db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
  db.session.commit()
