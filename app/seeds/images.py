from app.models import db, Image


def seed_images():
    images = [
        {
            'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645133409/munch/image_xtrwbx.png',
            'post_id': 1
        },
        {
            'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1658342238/munch/image_b6kw0k.jpg',
            'post_id': 1
        },
        {
            'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1658342309/munch/image_kbxuh3.jpg',
            'post_id': 1
        },
        {
            'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645955149/munch/CA_burger_n_fries.jpg',
            'post_id': 2
        },
        {
            'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645955114/munch/CA_burger_wit_fries.jpg',
            'post_id': 2
        },
        {
            'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1658342429/munch/image_imcsns.jpg',
            'post_id': 2
        }
    ]

    for image in images:
        new_image = Image(**image)
        db.session.add(new_image)

    db.session.commit()


def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
