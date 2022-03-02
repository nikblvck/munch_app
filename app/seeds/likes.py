from app.models import db, Like


def seed_likes():
    likes = [
        {
            'user_id': 2,
            'post_id': 1,
        },
        {
            'user_id': 3,
            'post_id': 1,
        },
        {
            'user_id': 1,
            'post_id': 3
        },
        {
            'user_id': 1,
            'post_id': 7
        },
        {
          'user_id': 2,
            'post_id': 4
            },
        {
          'user_id': 3,
            'post_id': 4
        },
        {
          'user_id': 1,
            'post_id': 5
        },
        {
          'user_id': 2,
            'post_id': 5
        },
        {
          'user_id': 3,
            'post_id': 15
        },
        {
          'user_id': 1,
            'post_id': 19
        },
        {
          'user_id': 2,
            'post_id': 19
        },
        {
          'user_id': 3,
            'post_id': 19
        },
    ]

    for like in likes:
        new_like = Like(**like)
        db.session.add(new_like)
    db.session.commit()


def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
