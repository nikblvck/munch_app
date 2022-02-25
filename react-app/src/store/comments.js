//constants

const GET_COMMENTS = "GET_COMMENTS";
const GET_COMMENT = "GET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

//actions

export const loadComments = (comments) => ({
  type: GET_COMMENTS,
  comments,
});

export const loadComment = (comment) => ({
  type: GET_COMMENT,
  comment,
});

const edit = (comment) => ({
  type: EDIT_COMMENT,
  comment,
});

export const add = (comment) => ({
  type: ADD_COMMENT,
  comment,
});

export const remove = (id) => ({
  type: DELETE_COMMENT,
  id,
});

//thunk functions
export const getComments = (postId) => async (dispatch) => {
  const response = await fetch(`/api/comments/posts/${postId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const comments = await response.json();
    dispatch(loadComments(comments));
  }
};

export const getComment = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const comment = await response.json();
    dispatch(loadComment(comment));
  }
};

export const addComment = (comment) => async (dispatch) => {
  const response = await fetch("/api/comments/new/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  if (response.ok) {
    const newComment = await response.json();

    dispatch(add(newComment));
    return newComment;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const editComment = (comment) => async (dispatch) => {
  const response = await fetch(`/api/comments/${comment.id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  if (response.ok) {
    const editedComment = await response.json();

    dispatch(edit(editedComment));
    return editedComment;
  }
};

export const deleteComment = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    dispatch(remove(commentId));
  }
};

//reducer
const initialState = {};

export default function reducer(state = initialState, action) {
  let newState;

  switch (action.type) {
    case GET_COMMENTS:
      newState = { ...state };
      newState.comments = action.comments;
      return newState;
    case GET_COMMENT:
      newState = { ...state };
      newState.comments = action.comment;
      return newState;
    case ADD_COMMENT:
      newState = { ...state };
      newState.comments = action.comment;
      return newState;
    case EDIT_COMMENT:
      newState = { ...state };
      newState.comments = action.comment;
      return newState;
    case DELETE_COMMENT:
      newState = { ...state };
      delete newState.comments[action.id];
      return newState;
    default:
      return state;
  }
}
