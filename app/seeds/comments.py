from app.models import db, User, Post, Comment

def seed_comments():
  comments = [
    {
      'content': 'This looks delicious! Where\'s my bowl?',
      'user_id': 2,
      'post_id': 1
    },
    {
      'content': '👌🏾🤤',
      'user_id': 3,
      'post_id': 1
    },
    {
      'content': 'Definitely need a piece of that! ASAP!',
      'user_id': 1,
      'post_id': 3
    },
    {
      'content': 'Can you share the recipe? Looks amazing!',
      'user_id': 2,
      'post_id': 3
    },
    {
      'content': 'Yes, those fingers look like they fingin! 🤣',
      'user_id': 1,
      'post_id': 7
    },
  ]

  for comment in comments:
    new_comment = Comment(**comment)
    db.session.add(new_comment)

  db.session.commit()


def undo_comments():
  db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
  db.session.commit()
