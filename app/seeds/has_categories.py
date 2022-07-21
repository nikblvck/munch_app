from app.models import db, Has_Category


def seed_has_categories():
    has_categories = [
        {
            'category_id': 1,
            'post_id': 1
        },
        {
            'category_id': 2,
            'post_id': 1
        },
        {
            'category_id': 3,
            'post_id': 1
        },
        {
            'category_id': 4,
            'post_id': 1
        },
        {
            'category_id': 15,
            'post_id': 1
        },
        {
            'category_id': 16,
            'post_id': 2
        },
        {
            'category_id': 17,
            'post_id': 2
        },
        {
            'category_id': 18,
            'post_id': 3
        },
        {
            'category_id': 19,
            'post_id': 3
        }
    ]

    for has_category in has_categories:
        new_has_category = Has_Category(**has_category)
        db.session.add(new_has_category)

    db.session.commit()


def undo_has_categories():
    db.session.execute('TRUNCATE has_categories RESTART IDENTITY CASCADE;')
    db.session.commit()
