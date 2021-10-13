const initialState = {
	posts: [],
};

const socialReducer = (state = initialState, action) => {
	switch (action.type) {
		case "UPDATE_POSTS": 
			return state;
		default:
			return state;
	}
};

export default socialReducer;
