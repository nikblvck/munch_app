//constants

const GET_COMMENTS = 'GET_COMMENTS';
const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';


//actions

export const loadComments = (comments) => ({
  type: GET_COMMENTS,
   comments
});

export const add = (comment) => ({
  type: ADD_COMMENT,
  comment
});

export const remove = (id) => ({
  type: DELETE_COMMENT,
  id
});


//thunk functions
export const getComments = (postId) => async dispatch => {
  const res = await fetch(`/api/comments/posts/${postId}`, {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (res.ok) {
    const comments = await res.json();
    dispatch(loadComments(comments));
  }
}

export const addComment = (comment) => async dispatch => {
  const res = await fetch('/api/comments/new/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment)
  });
  if(res.ok) {
    const newComment = await res.json();
    dispatch(add(newComment));
  }
}

export const editComment = (commentId) => async dispatch => {
  const res = await fetch(`/api/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentId)
  });
  if(res.ok) {
    const editedComment = await res.json();
    dispatch(add(editedComment));
  }
}


export const deleteComment = (commentId) => async dispatch => {
  const res = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  if(res.ok) {
    dispatch(remove(commentId));
  }
}


//reducer
const initialState = {}

export default function reducer(state = initialState, action) {
  let newState;

  switch (action.type) {
    case GET_COMMENTS:
      newState = { ...state}
      newState.comments = action.comments;
      return newState;
    case ADD_COMMENT:
      newState = { ...state}
      newState.comments = action.comment;
      return newState;
    case DELETE_COMMENT:
      newState = {...state}
      delete newState.comments[action.id];
      return newState;
    default:
      return state;
  }
}
