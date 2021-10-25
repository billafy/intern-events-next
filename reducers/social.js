const initialState = {
	posts: [],
};

const socialReducer = (state = initialState, action) => {
	let newPosts, newPost, postId;
	switch (action.type) {
		case 'SET_POSTS' : 
			return {...state, posts: action.payload.posts}
		case 'UPDATE_POST' : 
			newPost = action.payload.post
			newPosts = state.posts.map(post => {
				if(post._id === newPost._id) 
					return newPost;
				return post
			})
			return {...state, posts: newPosts}
		case 'DELETE_POST' : 
			postId = action.payload.postId
			newPosts = state.posts.filter(post => post._id !== postId)
			return {...state, posts: newPosts}
		default:
			return state;
	}
};

export default socialReducer;
