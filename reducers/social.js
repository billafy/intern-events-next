const initialState = {
	posts: [],
	chats: [],
	selectedChat: {},
	text: '',
	socket: null,
};

const socialReducer = (state = initialState, action) => {
	if(action.type === 'SET_POSTS') 
		return {...state, posts: action.payload.posts}
	else if(action.type === 'UPDATE_POST') {
		const newPost = action.payload.post
		const newPosts = state.posts.map(post => {
			if(post._id === newPost._id) 
				return newPost;
			return post
		})
		return {...state, posts: newPosts}
	}
	else if(action.type === 'DELETE_POST') {
		const postId = action.payload.postId
		const newPosts = state.posts.filter(post => post._id !== postId)
		return {...state, posts: newPosts}
	}
	else if(action.type === 'SET_CHATS') {
		const newChats = action.payload.chats
		let newChat;
		if(state.chats.length > 0)
			newChat = newChats.find(chat => chat.account._id === state.chats[0].account._id) 
		if(newChat) 
			return {...state, chats: newChats, selectedChat: newChats.length > 0 ? newChats[0] : {}};
		return {...state, chats: [...state.chats, ...newChats], selectedChat: state.selectedChat === {} ? newChats[0] : state.selectedChat}
	}
	else if(action.type === 'SELECT_CHAT') {
		const newChat = state.chats.find(chat => chat.account._id === action.payload.chatId)
		return {...state, selectedChat: newChat || {}, text: ''}
	}
	else if(action.type === 'UPDATE_CHATS') {
		console.log(1);
		const newMessage = action.payload.message
		let newChat = state.chats.find(chat => (chat.account._id === newMessage.from || chat.account._id === newMessage.to))
		newChat = {...newChat, chat: [...newChat.chat, newMessage]};
		const newChats = state.chats.filter(chat => (chat.account._id !== newMessage.from && chat.account._id !== newMessage.to))
		return {...state, chats: [newChat, ...newChats], selectedChat: newChat};
	}
	else if(action.type === 'START_NEW_CHAT') {
		let newChat = state.chats.find(chat => chat.account._id === action.payload.profile._id)
		if(newChat) 
			return {...state, selectedChat: newChat}
		newChat = {account: action.payload.profile, chat: []};
		return {...state, chats: [newChat, ...state.chats], selectedChat: newChat}
	}
	else if(action.type === 'SET_TEXT') 
		return {...state, text: action.payload.text};
	else if(action.type === 'SET_SOCKET') 
		return {...state, socket: action.payload.socket};
	return state;
};

export default socialReducer;
