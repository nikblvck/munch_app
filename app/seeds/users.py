from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    users = [
        {
            'first_name': 'Demo',
            'last_name': 'User',
            'is_admin':False,
            'username':'demo',
            'email':'demo@munch.io',
            'password':'password',
            'profile_img_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645603921/munch/image_luhr2p.jpg',
            'bio':'Hey, I\'m the demo user! I\'m here to help you get started with Munch. Take a look around and feel free to sign up!'
        },
        {
            'first_name':'Admin',
            'last_name':'User',
            'is_admin':True,
            'username':'munchadmin',
            'email':'admin@munch.io',
            'password':'munch2022capstone',
            'profile_img_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645949878/munch/munch_admin_tt8zy7.jpg',
            'bio': 'Hey, I\'m the admin user! I\'m here to manage things in the background and occasionally share some good eats!'
        },
        {
            'first_name':'Sweetz',
            'last_name':'Goode',
            'is_admin':False,
            'username':'sweetzbgoode',
            'email':'sweetzb@munch.io',
            'password':'sweetz2022',
            'profile_img_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645949968/munch/image_msxfgj.jpg',
            'bio': 'Here for the sweets! I\'d like to think of myself as a pretty sweet treat - so it\'s only right I check out my counterparts!'
        },
        {
            'first_name':'Nik',
            'last_name':'Black',
            'is_admin':True,
            'username':'nikblack',
            'email':'nikblack@munch.io',
            'password':'bignik',
            'profile_img_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645950298/munch/image_fnaebg.jpg',
            'bio': 'Hey - I\'m Nik! I created the munch app! Please feel free to browse the app as a demo muncher OR sign up - it\'s up to you! Also, to get in touch - check out my about links in the Navigation Bar. Good vibes! ',
        },
        {
            'first_name': 'Isea',
            'last_name':'Munch',
            'is_admin':False,
            'username':'iseamunch',
            'email':'iseamunch@munch.io',
            'password':'password',
            'profile_img_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645948497/munch/image_x8xemz.jpg',
            'bio': 'I think I\'m pretty cool. Here for the ICE CREEEEAM! ' ,
        },
        {
            'first_name':'Munchie',
            'last_name':'Munch',
            'is_admin':False,
            'username':'munchiemunch',
            'email':'munchie@munch.io',
            'password':'munchie2022',
            'profile_img_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645953421/munch/munchie_profile_pic_hosdvo.jpg',
            'bio': 'Munchie here! For all the munchies! I\'m the inspiration for this app. Look around and enjoy!'
        },
        {
            'first_name':'Test',
            'last_name':'Muncherton',
            'is_admin':False,
            'username':'testmuncherton',
            'email':'testmuncher@munch.io',
            'password':'password',
            'profile_img_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645948571/munch/image_mqobw6.jpg',
            'bio': 'Just another muncher trying to find my next bite! 🤤😋' ,
        },
        {
            'first_name':'Doggo',
            'last_name':'Doughnuts',
            'is_admin':False,
            'username':'doggodoughnuts',
            'email':'doggo@munch.io',
            'password':'password',
            'profile_img_url': 'https://res.cloudinary.com/bigtechnik/image/upload/v1645948460/munch/image_vhpxmt.jpg',
            'bio': 'Donut lover, also a big fan of all things deep fried' ,
        },
        {
            'first_name':'Greeny',
            'last_name':'Munches',
            'is_admin':False,
            'username':'greenymunches',
            'email':'greeny@munch.io',
            'password':'password',
            'bio': 'I\'m a lover of all things green! Salads and raw food are totally my jam! 🥗🥗🥗 Also a big dessert lover - ice cream and cakes and pies, oh my!'
        },
        {
            'first_name':'Jeff',
            'last_name':'Blue',
            'is_admin':False,
            'username':'bluejeffs',
            'email':'bluej@munch.io',
            'password':'password',
            'bio': 'Super adventurous eater! I am always up for trying new things. I try to introduce at least one new recipe to my family every week! Big lover of all things carnivorous! 🍖🥩🍗',
        }
    ]

    for user in users:
        new_user = User(**user)
        db.session.add(new_user)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
