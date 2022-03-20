from app.models import db, Post




def seed_posts():
  posts = [
      {
          'caption': 'Vegetarian Burger',
          'user_id': 1,
          'category_id': 3
      },
      {
          'caption': 'Tacos - and it\'s not Tuesday!',
          'user_id': 1,
          'category_id': 5
      },
      {
          'caption': 'This is shrimp & sausage gumbo served with a side of white rice. 👌🏾 Yummy! 🍜',
          'category_id': 19,
          'user_id': 1
      },
      {
          'caption': 'This is a vegan pizza with pineapple and cheese. 🍕',
          'user_id': 10,
          'category_id': 2

      },
      {
          'caption': 'Buttermilk fried chicken',
          'category_id': 1,
          'user_id': 1
      },
      {

          'caption': 'Cookie Butter Cheesecake',
          'user_id': 3,
          'category_id': 16
      },
      {

          'caption': '206 Dog',
          'user_id': 8,
          'category_id': 4
      },
      {
          'caption': 'This is a vegan air fried tofu with a side of white rice. 🍜',
          'user_id': 2,
          'category_id': 2
      },
      {

          'caption': 'Grillin some steak',
          'user_id': 1,
          'category_id': 4
      },
      {

          'caption': 'Veg Brek Nachos',
          'user_id': 9,
          'category_id': 3
      },
      {

          'caption': 'XXXL Bacon Cheeseburger, so yummy - I almost forgot I made fries 🥴🤣',
          'user_id': 1,
          'category_id': 4
      },
      {
 
          'user_id': 1,
          'category_id': 12
      },
      {

          'caption': 'Chicken fings & things....',
          'user_id': 2,
          'category_id': 4
      },
      {

          'caption': 'BBQ MY WAY!',
          'user_id': 7,
          'category_id': 3
      },
      {

          'caption': 'Lobster tails anyone? First time making them and it definitely will not be my last! Not pictured: garlic mashed potatoes, roasted asparagus and cheddar bay biscuits.',
          'user_id': 1,
          'category_id': 19
      },
      {

          'caption': 'Beef curry over rice, definitely will go a little heavier on the garlic next time! Any curry pros out there? All tips are welcome!',
          'user_id': 1,
          'category_id': 19
      },
      {

          'caption': 'Tried something new - made queso on the grill, BOMB.COM okay?! ',
          'user_id': 1,
          'category_id': 5
      },
      {

          'caption': 'Tried out my grandma\'s famous gumbo recipe! I think I will go a bit lighter on the roux next time!',
          'user_id': 1,
          'category_id': 1
      },
      {

          'caption': 'Could not wait for the holidays to roll around again so I made my own Thanksgiving in February!',
          'user_id': 7,
          'category_id': 1
      },
      {

          'caption': 'Chicken, macaroni and cheese with some black eyed peas. Delicious!',
          'user_id': 8,
          'category_id': 1
      },
      {

          'user_id': 1,
          'category_id': 1
      },
      {

          'caption': 'Mushroom "BLT"',
          'user_id': 9,
          'category_id': 2
      },
      {

          'user_id': 9,
          'category_id': 2
      },
      {

          'caption': 'Pozole de pollo o guajolote',
          'user_id': 7,
          'category_id': 5
      },
      {

          'caption': 'Homemade Menudo!',
          'user_id': 7,
          'category_id': 5
      },
      {

          'caption': 'I was hungry and unmotivated to run to the grocery store so I decided to try my hand at Risotto! Little bit of 🥓🥓 went a LONG way!',
          'user_id': 11,
          'category_id': 6
      },
      {

          'caption': 'Been practicing my plating - Rigatoni!',
          'user_id': 12,
          'category_id': 6
      },
      {

          'caption': 'handmade gnocchi topped with sum bolognese and crustini on the side',
          'user_id': 13,
          'category_id': 6
      },
      {

          'caption': 'My Auntie Nona came by and we made this Cavatelli! Yum! Munching away over here!',
          'user_id': 14,
          'category_id': 6
      },
      {

          'caption': 'Kung Pao Chicken',
            'user_id': 15,
            'category_id': 7
      },
      {

          'user_id': 16,
          'category_id': 7
      },
      {

          'caption': 'Peking Duck w/ Garlic Chicken Fried Rice[NOT PICTURED] ',
          'user_id': 17,
          'category_id':7
      },
      {

          'caption': 'My friends came up from Texas so I made us a HOT POT! Great times with beautiful people. ',
          'user_id': 14,
          'category_id':7
          },
          {

              'caption': 'I made these egg noodles and felt super accomplished! Munchin for the win!',
              'user_id': 18,
              'category_id': 23,
              'created_at': '2022-1-12T00:00:00.000Z',
          }


  ]

  for post in posts:
    new_post = Post(**post)
    db.session.add(new_post)
  db.session.commit()


def undo_posts():
  db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
  db.session.commit()
