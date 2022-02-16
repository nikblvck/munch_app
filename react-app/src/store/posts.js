//constants

const GET_POSTS = 'posts/GET_POSTS';
const ADD_POST = 'posts/ADD_POST';
const EDIT_POST = 'posts/EDIT_POST';
const DELETE_POST = 'posts/DELETE_POST';


// action creators
const loadPosts = posts => ({
  type: GET_POSTS,
  posts,
});

const addPost= post => ({
  type: ADD_POST,
  post,
});

const edit = post => ({
  type: EDIT_POST,
  post,
});

const remove = post => ({
  type: DELETE_POST,
  post
});


// thunk functions

export const getPosts = () => async dispatch => {
  const response = await fetch('/api/posts/', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    const posts = await response.json();
    dispatch(loadPosts(posts));
  }
}

 export const addOnePost = (post) => async dispatch => {
   const response = await fetch('/api/posts/new', {
     method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post)
    });
    if (response.ok) {
      const newPost = await response.json();
      dispatch(addPost(newPost));
      return newPost
    } else if (response.status < 500) {
      const error = await response.json();
      throw new Error(error.message);
    } else {
      throw new Error("Server Error");
    }
  }

  export const editOnePost = (post) => async dispatch => {
    const res = await fetch (`/api/posts/${post.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    });

    if (res.ok) {
      const editedPost = await res.json();
      dispatch(edit(editedPost));
      return editedPost;
    } else if (res.status < 500) {
      const error = await res.json();
      throw new Error(error.message);
    } else {
      throw new Error("Server Error");
    }
  }

  export const deleteOnePost = (post) => async dispatch => {
    const res = await fetch (`/api/posts/delete/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    });
    if (res.ok) {
      await dispatch(deletePost(+postId))
    }





//reducer function
const initialState = {};

export default function reducer(state = initialState, action) {
  let newState;

  switch (action.type) {
    case GET_POSTS:
      newState = { ...state}
      newState.posts = action.posts;
      return newState;
    default:
      return state;
  }
}
