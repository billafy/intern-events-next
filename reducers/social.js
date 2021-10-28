const initialState = {
	posts: [],
	chats: [],
	selectedChat: {},
};

const socialReducer = (state = initialState, action) => {
	let newPosts, newPost, postId, newChats, newChat;
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
		case 'SET_CHATS' : 
			newChats = action.payload.chats
			return {...state, chats: newChats, selectedChat: newChats.length > 0 ? newChats[0] : {}}
		case 'SELECT_CHAT' : 
			newChat = state.chats.find(chat => chat.account._id === action.payload.chatId)
			console.log(state.chats)
			return {...state, selectedChat: newChat || {}}
		default:
			return state;
	}
};

export default socialReducer;
