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
    },
    {
      'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1644970170/munch/image_uomerr.jpg',
      'caption': 'XXXL Bacon Cheeseburger, so yummy - I almost forgot I made fries 🥴🤣' ,
      'user_id': 1,
      'category_id': 4
    },
    {
      'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1644969920/munch/image_qpwiag.jpg',
      'user_id': 1,
      'category_id': 12
    },
    {
      'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1644969857/munch/image_g6kfho.jpg',
      'caption': 'Chicken fings & things....',
      'user_id': 2,
      'category_id': 4
    },
    {
      'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645480014/munch/image_xj5zs0.jpg',
      'caption': 'Lobster tails anyone? First time making them and it definitely will not be my last! Not pictured: garlic mashed potatoes, roasted asparagus and cheddar bay biscuits.',
      'user_id': 1,
      'category_id': 19
    },
    {
      'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645480027/munch/yppdv83xj7j81_xrzsoq.jpg',
      'caption': 'Beef curry over rice, definitely will go a little heavier on the garlic next time! Any curry pros out there? All tips are welcome!',
      'user_id': 1,
      'category_id': 19
    },
    {
      'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645133437/munch/image_r4xlle.png',
      'caption': 'Tried something new - made queso on the grill, BOMB.COM okay?! ',
      'user_id': 1,
      'category_id': 5
    }
  ]

  for post in posts:
    new_post = Post(**post)
    db.session.add(new_post)
  db.session.commit()

def undo_posts():
  db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
  db.session.commit()
