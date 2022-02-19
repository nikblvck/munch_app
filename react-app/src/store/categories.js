//constants

const GET_CATEGORIES = 'categories/GET_CATEGORIES';
const GET_CATEGORY = 'categories/GET_CATEGORY';

//action creators

const loadCategories = categories => ({
  type: GET_CATEGORIES,
  categories,
});

const loadCategory = category => ({
  type: GET_CATEGORY,
  category,
});

//thunk functions

export const getCategories = () => async dispatch => {
  const response = await fetch('/api/categories/', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    const categories = await response.json();
    dispatch(loadCategories(categories));
  } else if (response.status < 500) {
    const error = await response.json();
    throw new Error(error.message);
  } else {
    throw new Error('Server error');
  }
}

export const getCategory = id => async dispatch => {
  const response = await fetch(`/api/categories/${id}/`, {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    const category = await response.json();
    dispatch(loadCategory(category));
  } else if (response.status < 500) {
    const error = await response.json();
    throw new Error(error.message);
  } else {
    throw new Error('Server error');
  }
}

//reducer
const  initialState = {};
export default function categoriesReducer(state = initialState, action)  {
  let newState;
  switch (action.type) {
    case GET_CATEGORIES:
      newState = {...state}
      newState.categories = action.categories;
      return newState;
    case GET_CATEGORY:
      newState = {...state}
      newState.category = action.category;
      return newState;
    default:
      return state;
  }
}
