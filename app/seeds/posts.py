from app.models import db, Post

def seed_posts():
  posts = [
    {
     'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1644967654/munch/image_yupy3k.jpg',
     'caption': 'This is shrimp & sausage gumbo served with a side of white rice. 👌🏾 Yummy! 🍜',
     'category_id': 19,
     'user_id': 1
    },
    {
      'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1644967582/munch/image_oeia0k.jpg',
      'caption': 'Buttermilk fried chicken',
      'category_id': 1,
      'user_id': 1
    },
    {
      'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1644967822/munch/image_m3t36j.jpg',
      'caption': 'Cookie Butter Cheesecake',
      'user_id': 3,
      'category_id': 16
    },
    {
      'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1644967680/munch/image_coe8bg.jpg',
      'caption': 'Grillin some steak',
      'user_id': 1,
      'category_id': 4
    }
  ]

  for post in posts:
    new_post = Post(**post)
    db.session.add(new_post)
  db.session.commit()

def undo_posts():
  db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
  db.session.commit()
