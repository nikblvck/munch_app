//Constants
const GET_CATEGORIES = "GET_CATEGORIES";
const GET_CATEGORY = "GET_CATEGORY";
//Action Creators

const loadCategories = (categories) => ({
	type: GET_CATEGORIES,
	categories,
});

const loadCategory = (category) => ({
  type: GET_CATEGORY,
  category,
});
//Thunks

export const getCategories = () => async (dispatch) => {
	const response = await fetch("/api/categories");
	if (response.ok) {
		const categories = await response.json();
		dispatch(loadCategories(categories));
	}
};

export const getCategory = (category) => async (dispatch) => {
  const response = await fetch(`/api/categories/${category}`);
  if (response.ok) {
    const category = await response.json();
    dispatch(loadCategory(category));
  }
}


// Reducer
let initialState = {};

export default function categoriesReducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case GET_CATEGORIES:
			newState = { ...state };
			newState.categories = action.categories;
			return newState;
		case GET_CATEGORY:
			newState = { ...state };
			newState.category = action.category;
			return newState;
		default:
			return state;
	}
}
