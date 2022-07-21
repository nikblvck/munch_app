from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    users = [
        {
            'first_name': 'Demo',
            'last_name': 'User',
            'username': 'demo',
            'is_admin': False,
            'profile_img': 'https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top',
            'email': 'demo@munch.io',
            'password': 'munch2022',
        },
        {
            'first_name': 'Admin',
            'last_name': 'User',
            'username': 'admin',
            'is_admin': True,
            'profile_img': 'https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top',
            'email': 'admin@munch.io',
            'password': 'runit2022munchies',
        },
        {
            'first_name': 'Nik',
            'last_name': 'Tyler',
            'username': 'bigtechnik',
            'is_admin': True,
            'email': 'bignik@munch.io',
            'password': 'disney2022'
        },
        {
            'first_name': 'Munchie',
            'last_name': 'Munch',
            'username': 'munchie24',
            'is_admin': True,
            'email': 'munchie@munch.io',
            'password': 'thxgiving09'
        }
    ]

    for user in users:
        new_user = User(**user)
        db.session.add(new_user)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
