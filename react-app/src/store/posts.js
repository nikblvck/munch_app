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

// thunk functions

export const getPosts = () => async dispatch => {
  const response = await fetch('/api/posts', {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  
  if (response.ok) {
    const posts = await response.json();
    dispatch(loadPosts(posts));
  }
}

//reducer function
const initialState = {};

export default function reducer(state = initialState, action) {
  let newState;

  switch (action.type) {
    case GET_POSTS:
      newState = { ...state, posts: action.posts };
      return newState;
    default:
      return state;
  }
}
