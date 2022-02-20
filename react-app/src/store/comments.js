//constants

const GET_COMMENTS = 'GET_COMMENTS';


//actions

export const loadComments = (postId) => ({
  type: GET_COMMENTS,
  payload: postId
});

//thunk functions
export const getComments = (postId) => async dispatch => {
  const response = await fetch(`/api/comments/post/${postId}`, {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    const comments = await response.json();
    dispatch(loadComments(comments));
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
    default:
      return state;
  }
}
