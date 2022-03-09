//constants
const SEARCH_REQUEST = 'SEARCH_REQUEST';

//action creators
const searchRequest = (x) => ({
  type: SEARCH_REQUEST,
  x
});

//thunk
export const searchPosts = (x) => async(dispatch) => {
  const response = await fetch(`/api/search?x=${x}`);
  if(response.ok) {
    const searchResults = await response.json();
    console.log(searchResults)
    dispatch(searchRequest(searchResults));
    return searchResults;
  }
}


//reducer
const initialState = {}

export default function searchReducer(state = initialState, action) {
  let newState;
  switch(action.type) {
    case SEARCH_REQUEST:
      newState = {...state, ...action.searchResults};
      return newState;
    default:
      return state;
}
}
