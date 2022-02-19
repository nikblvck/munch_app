//constants

const GET_COMMENTS = 'GET_COMMENTS';


//actions

export const loadComments = (postId) => ({
  type: GET_COMMENTS,
  payload: postId
});

//thunk functions
