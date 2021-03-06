from app.models import db, Post




def seed_posts():
  posts = [
      {
          'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645954902/munch/vegetarian%20burger.jpg',
          'caption': 'Vegetarian Burger',
          'user_id': 1,
          'category_id': 3
      },
      {
          'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645955547/munch/Mexican_HomemadeTacos2.jpg',
          'caption': 'Tacos - and it\'s not Tuesday!',
          'user_id': 1,
          'category_id': 5
      },
      {
          'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1644967654/munch/image_yupy3k.jpg',
          'caption': 'This is shrimp & sausage gumbo served with a side of white rice. 👌🏾 Yummy! 🍜',
          'category_id': 19,
          'user_id': 1
      },
      {
          'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645954699/munch/vegan_pineapple_pizza.png',
          'caption': 'This is a vegan pizza with pineapple and cheese. 🍕',
          'user_id': 10,
          'category_id': 2

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
          'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645955428/munch/CA_Seattle_Dog.jpg',
          'caption': '206 Dog',
          'user_id': 8,
          'category_id': 4
      },
      {
          'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645954784/munch/vegan_air_fried_tofu.jpg',
          'caption': 'This is a vegan air fried tofu with a side of white rice. 🍜',
          'user_id': 2,
          'category_id': 2
      },
      {
          'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1644967680/munch/image_coe8bg.jpg',
          'caption': 'Grillin some steak',
          'user_id': 1,
          'category_id': 4
      },
      {
          'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645954872/munch/vegetarian_breakfast_nachos.jpg',
          'caption': 'Veg Brek Nachos',
          'user_id': 9,
          'category_id': 3
      },
      {
          'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1644970170/munch/image_uomerr.jpg',
          'caption': 'XXXL Bacon Cheeseburger, so yummy - I almost forgot I made fries 🥴🤣',
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
          'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645954954/munch/vegetarian_bbq.jpg',
          'caption': 'BBQ MY WAY!',
          'user_id': 7,
          'category_id': 3
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
      },
      {
          'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645952488/munch/soulfood06.jpg',
          'caption': 'Tried out my grandma\'s famous gumbo recipe! I think I will go a bit lighter on the roux next time!',
          'user_id': 1,
          'category_id': 1
      },
      {
          'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645952538/munch/soulfood07.jpg',
          'caption': 'Could not wait for the holidays to roll around again so I made my own Thanksgiving in February!',
          'user_id': 7,
          'category_id': 1
      },
      {
          'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645952654/munch/soulfood08.jpg',
          'caption': 'Chicken, macaroni and cheese with some black eyed peas. Delicious!',
          'user_id': 8,
          'category_id': 1
      },
      {
          'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645952448/munch/soulfood03.jpg',
          'user_id': 1,
          'category_id': 1
      },
      {
          'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645954602/munch/vegan_mushroom_blt.jpg',
          'caption': 'Mushroom "BLT"',
          'user_id': 9,
          'category_id': 2
      },
      {
          'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645954566/munch/vegan_lemon_bars.png',
          'user_id': 9,
          'category_id': 2
      },
      {
          'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645955644/munch/Mexican_Pozole%20de%20Pollo%20o%20Guajolote.jpg',
          'caption': 'Pozole de pollo o guajolote',
          'user_id': 7,
          'category_id': 5
      },
      {
          'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645955590/munch/Mexican_HomemadeMenudo.jpg',
          'caption': 'Homemade Menudo!',
          'user_id': 7,
          'category_id': 5
      },
      {
          'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645955739/munch/Italian_HomemadeRisotto.jpg',
          'caption': 'I was hungry and unmotivated to run to the grocery store so I decided to try my hand at Risotto! Little bit of 🥓🥓 went a LONG way!',
          'user_id': 11,
          'category_id': 6
      },
      {
          'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1646015737/munch/Italian_Rigatoni.jpg',
          'caption': 'Been practicing my plating - Rigatoni!',
          'user_id': 12,
          'category_id': 6
      },
      {
          'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1646015871/munch/Italian_Gnocchi.jpg',
          'caption': 'handmade gnocchi topped with sum bolognese and crustini on the side',
          'user_id': 13,
          'category_id': 6
      },
      {
          'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1646015936/munch/Italian_Cavatelli.jpg',
          'caption': 'My Auntie Nona came by and we made this Cavatelli! Yum! Munching away over here!',
          'user_id': 14,
          'category_id': 6
      },
      {
          'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1646016024/munch/Chinese_Kung%20Pao%20Chicken.jpg',
          'caption': 'Kung Pao Chicken',
            'user_id': 15,
            'category_id': 7
      },
      {
          'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1646016096/munch/Chinese_MaPaTofu.jpg',
          'user_id': 16,
          'category_id': 7
      },
      {
          'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1646015986/munch/Chinese_PekingDuck.jpg',
          'caption': 'Peking Duck w/ Garlic Chicken Fried Rice[NOT PICTURED] ',
          'user_id': 17,
          'category_id':7
      },
      {
          'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1646016058/munch/Chinese_HotPot.jpg',
          'caption': 'My friends came up from Texas so I made us a HOT POT! Great times with beautiful people. ',
          'user_id': 14,
          'category_id':7
          },
          {
              'image_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1646857732/munch/FromScratch_EggNoodles.jpg',
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
