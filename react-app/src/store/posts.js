//constants

const GET_POSTS = "posts/GET_POSTS";
const GET_POST = "posts/GET_POST";
const GET_USER_POSTS = "posts/GET_USER_POSTS";
const ADD_POST = "posts/ADD_POST";
const EDIT_POST = "posts/EDIT_POST";
const DELETE_POST = "posts/DELETE_POST";

// action creators
const loadPosts = (posts) => ({
  type: GET_POSTS,
  posts,
});

const loadPost = (post) => ({
  type: GET_POST,
  post,
});

const loadUserPosts = (posts) => ({
  type: GET_USER_POSTS,
  posts,
});

const edit = (post) => ({
  type: EDIT_POST,
  post,
});

const remove = (id) => ({
  type: DELETE_POST,
  id,
});

const add = (post) => ({
  type: ADD_POST,
  post,
});

// thunk functions
//CREATE
export const addPost = (post) => async (dispatch) => {
  const response = await fetch("/api/posts/new/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  if (response.ok) {
    const newPost = await response.json();
    dispatch(add(newPost));
 } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

//READ
export const getPosts = () => async (dispatch) => {
  const response = await fetch("/api/posts/", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const posts = await response.json();
    dispatch(loadPosts(posts));
  }
};

export const getUserPosts = (userId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const posts = await res.json();
    dispatch(loadUserPosts(posts));
  }
};

export const getOnePost = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}/`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const post = await res.json();
    dispatch(loadPost(post));
  }
};

//UPDATE
export const editPost = (post) => async (dispatch) => {
  const response = await fetch(`/api/posts/${post.id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  if (response.ok) {
    const editedPost = await response.json();
    dispatch(edit(editedPost));
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

//DELETE
export const deletePost = (id) => async (dispatch) => {
  const response = await fetch(`/api/posts/delete/${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    dispatch(remove(id));
  } else if (response.status < 500) {
    const error = await response.json();
    throw new Error(error.message);
  } else {
    throw new Error("Server error");
  }
};

//reducer function
const initialState = {posts: [], post: {}, user_posts: []};

export default function reducer(state = initialState, action) {
  let newState;

  switch (action.type) {
    case GET_POSTS:
      newState = { ...state };
      newState.posts = action.posts;
      return newState;
    case GET_POST:
      newState = { ...state };
      newState.post = action.post;
      return newState;
    case GET_USER_POSTS:
      newState = {...state};
      newState.user_posts = action.posts;
      return newState;
    case ADD_POST:
      newState = { ...state };
      newState.posts[action.post.id] = action.posts;
      return newState;
    case EDIT_POST:
      newState = { ...state };
      newState.posts = action.post;
      return newState;
    case DELETE_POST:
      newState = { ...state };
      delete newState.posts[action.id];
      return newState;
    default:
      return state;
  }
}
