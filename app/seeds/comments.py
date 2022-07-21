from app.models import db, User, Post, Comment

def seed_comments():
  comments = [
    {
      'text': 'This looks delicious! Where\'s my bowl?',
      'user_id': 2,
      'post_id': 1
    },
    {
      'text': '👌🏾🤤',
      'user_id': 3,
      'post_id': 1
    },
    {
      'text': 'Definitely need a piece of that! ASAP!',
      'user_id': 1,
      'post_id': 3
    },
    {
      'text': 'Can you share the recipe? Looks amazing!',
      'user_id': 2,
      'post_id': 3
    },
    {
      'text': 'Yes, those fingers look like they fingin! 🤣',
      'user_id': 1,
      'post_id': 3
    },
    {
      'text': 'I\'m trying to figure out how you got \'em so crispy!',
      'user_id': 2,
      'post_id': 3
    },
    {
      'text': 'SAME!!! I just need a lil honey mustard and it\'s GO TIME!',
      'user_id': 1,
      'post_id': 3
    }
  ]


  for comment in comments:
    new_comment = Comment(**comment)
    db.session.add(new_comment)

  db.session.commit()


def undo_comments():
  db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
  db.session.commit()
