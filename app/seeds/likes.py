from app.models import db, Like
import random
#Generates Random Likes For Posts



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
        }
    ]

    for like in likes:
        new_like = Like(**like)
        db.session.add(new_like)


    # new_likes = [{
    #     'user_id': random.randint(1, 105),
    #     'post_id': random.randint(1, 33)
    # }
    # for i in range(200)]

    # for like in new_likes:
    #     new_like = Like(**like)
    #     db.session.add(new_like)

    db.session.commit()


def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
