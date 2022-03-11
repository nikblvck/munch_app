//constants
const SEARCH_POSTS = 'SEARCH_POSTS';

//action creators
const findPosts = (x) => ({
  type: SEARCH_POSTS,
  x
});

//thunk
export const searchPosts = (x) => async(dispatch) => {
  const response = await fetch(`/api/search?x=${x}`);

  if (response.ok) {
    const search_results = await response.json();
    console.log(search_results);
    dispatch(findPosts(search_results));
    return search_results
  }
}
//reducer
const initialState = {}

export default function searchReducer(state = initialState, action) {
  let newState;
  switch(action.type) {
    case SEARCH_POSTS:
      newState = action.posts
      return newState;
    default:
      return state;
}
}
