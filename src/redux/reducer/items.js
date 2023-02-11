const initialState = {
	data: [],
	isLoading: true,
	isError: true,
};

export default function itemsReducer(state = initialState, action) {
	switch (action.type) {
		case "GET_ALL_ITEMS_PENDING":
		case "GET_SEARCH_ITEMS_PENDING":
			return { ...state, isLoading: true, isError: false };
		case "GET_ALL_ITEMS_FULFILLED":
		case "GET_SEARCH_ITEMS_FULFILLED":
			return { ...state, data: action.payload.data, isLoading: false };
		case "GET_ALL_ITEMS_REJECTED":
		case "GET_SEARCH_ITEMS_REJECTED":
			return { ...state, isLoading: false, isError: true };
		default:
			return state;
	}
}
