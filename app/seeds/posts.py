from app.models import db, Post


def seed_posts():
    posts = [
        {
            'caption': 'This is some pizza I made the other day. I honestly did not think it would come out so yumy! So glad I took the time to make it!',
            'user_id': 1,
        },
        {
            'caption': 'Made burgers and fries tonight, super slappin!',
            'user_id': 1,
        },
        {
            'caption': 'I made this gumbo for my friend\'s birthday. I hope she likes it!',
            'user_id': 1,
        }

    ]

    for post in posts:
        new_post = Post(**post)
        db.session.add(new_post)

    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
