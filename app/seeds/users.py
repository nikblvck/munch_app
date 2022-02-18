from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo',last_name="User",username='demo',email='demo@munch.io', is_admin=True, password='password')

    nik = User (
        first_name='Nik', last_name='B', username='justnik', email='nik@munch.io', is_admin=True, password='password')

    munchie = User (
        first_name='Munchie', last_name='Munch', username='munchie', email='munchie@munch.io', is_admin=False, password='password')

    jack= User (
        first_name='Jack', last_name='Munch', username='hungryjack', email='hungry@munch.io',password='password')
        

    db.session.add_all([demo, nik, munchie, jack])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
