from app.models import db, Image


def seed_images():

  images = [
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645954902/munch/vegetarian%20burger.jpg',
        'post_id': 1},
      {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1647814368/munch/Vegetarian_02.jpg',
        'post_id': 1
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645955547/munch/Mexican_HomemadeTacos2.jpg',
        'post_id': 2
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1644967654/munch/image_yupy3k.jpg',
        'post_id': 3
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645954699/munch/vegan_pineapple_pizza.png',
        'post_id': 4
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1644967582/munch/image_oeia0k.jpg',
        'post_id': 5
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1644967822/munch/image_m3t36j.jpg',
        'post_id': 6
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645955428/munch/CA_Seattle_Dog.jpg',
        'post_id': 7
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645954784/munch/vegan_air_fried_tofu.jpg',
        'post_id': 8
    },
    {
        'url':  'https://res.cloudinary.com/bigtechnik/image/upload/v1644967680/munch/image_coe8bg.jpg',
        'post_id': 9
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645954872/munch/vegetarian_breakfast_nachos.jpg',
        'post_id': 10
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1644970170/munch/image_uomerr.jpg',
        'post_id': 11
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1644969920/munch/image_qpwiag.jpg',
        'post_id': 12
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1644969857/munch/image_g6kfho.jpg',
        'post_id': 13
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645133391/munch/image_myycfd.png',
        'post_id': 14
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645480027/munch/yppdv83xj7j81_xrzsoq.jpg',
        'post_id': 15
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645480027/munch/yppdv83xj7j81_xrzsoq.jpg',
        'post_id': 16
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645133437/munch/image_r4xlle.png',
        'post_id': 17
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645952488/munch/soulfood06.jpg',
        'post_id': 18
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645952538/munch/soulfood07.jpg',
        'post_id': 19
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645952654/munch/soulfood08.jpg',
        'post_id': 20
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645952448/munch/soulfood03.jpg',
        'post_id': 21
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645954602/munch/vegan_mushroom_blt.jpg',
        'post_id': 22
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645954566/munch/vegan_lemon_bars.png',
        'post_id': 23
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645955644/munch/Mexican_Pozole%20de%20Pollo%20o%20Guajolote.jpg',
        'post_id': 24
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645955590/munch/Mexican_HomemadeMenudo.jpg',
        'post_id': 25
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645955739/munch/Italian_HomemadeRisotto.jpg',
        'post_id': 26
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1646015737/munch/Italian_Rigatoni.jpg',
        'post_id': 27
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1646015871/munch/Italian_Gnocchi.jpg',
        'post_id': 28
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1646015936/munch/Italian_Cavatelli.jpg',
        'post_id': 29
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1646016024/munch/Chinese_Kung%20Pao%20Chicken.jpg',
        'post_id': 30,
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1646016096/munch/Chinese_MaPaTofu.jpg',
        'post_id': 31
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1646015986/munch/Chinese_PekingDuck.jpg',
        'post_id': 32
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1646016058/munch/Chinese_HotPot.jpg',
        'post_id': 33
    },
    {
        'url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1646857732/munch/FromScratch_EggNoodles.jpg',
        'post_id': 34
    }
  ]

  for image in images:
    new_image=Image(**image)
    db.session.add(new_image)
  db.session.commit()


def undo_images():
  db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE')
  db.session.commit()
