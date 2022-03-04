//constants
const GET_USERS = "users/GET_USERS";

//action creators
const loadUsers = (users) => ({
  type: GET_USERS,
  users
})

//thunk functions
export const getUsers = () => async dispatch => {
  const response = await fetch("/api/users/", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const users = await response.json();
    dispatch(loadUsers(users));
  } else if (response.status < 500) {
    const error = await response.json();
    throw new Error(error.message);
  } else {
    throw new Error("Server error");
  }
}

const initialState = {}

function usersReducer(state =initialState, action) {
  let newState
  switch (action.type) {
    case GET_USERS:
      newState = {...state, users: action.users}
      return newState
    default:
      return state;
  }
}

export default usersReducer;
