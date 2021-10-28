import { useState, useEffect } from "react";
import _ from "../../styles/social/Chats.module.scss";
import urls from "../../utils/urls";
import { reqGet } from "../../utils/customRequests";
import { useDispatch, useSelector } from "react-redux";
import { getName, getImage } from "../../utils/utils";
import {io} from 'socket.io-client';

const Chats = () => {
	const dispatch = useDispatch();
	const {
		auth: { isLoggedIn, account },
		social: { chats, selectedChat },
	} = useSelector((state) => state);
	const [socket, setSocket] = useState(null);
	const [text, setText] = useState('');

	const getChats = async () => {
		const data = await reqGet(urls.getChats + account._id);
		if (data.success)
			dispatch({
				type: "SET_CHATS",
				payload: { chats: data.body.chats },
			});
	};

	const selectChat = (chatId) => {
		dispatch({ type: "SELECT_CHAT", payload: { chatId } });
	};

	const sendMessage = (event) => {
		event.preventDefault()
		if(!socket || !text) 
			return;
		socket.emit('message', {text, from: account._id, to: selectedChat.account._id})
	}

	useEffect(() => {
		if(isLoggedIn) 
			setSocket(io(urls.socket, {withCredentials: true}))

		return () => {
			if(socket) 
				socket.disconnect()
		}
	}, [])

	useEffect(() => {
		getChats();
	}, [account]);

	return (
		<div className={_.chatBox}>
			<div className={_.chatList}>
				<input
					type="search"
					className={_.search}
					placeholder="Search"
				/>
				<ul>
					{chats.length > 0 ? (
						chats.map((chat) => {
							return (
								<li
									key={chat.account._id}
									onClick={() => selectChat(chat.account._id)}
								>
									<img
										src={getImage(
											chat.account.profilePicture
										)}
									/>
									<div className={_.chatName}>
										<p>{getName(chat.account)}</p>
										{chat.chat.length > 0 && (
											<p className={_.lastText}>
												{
													chat.chat[
														chat.chat.length - 1
													].text
												}
											</p>
										)}
									</div>
								</li>
							);
						})
					) : (
						<p>No chats yet.</p>
					)}
				</ul>
			</div>
			<div className={_.chat}>
				{selectedChat.account ? (
					<>
						<div className={_.chatProfile}>
							<img
								src={getImage(
									selectedChat.account.profilePicture
								)}
							/>
							<p>{getName(selectedChat.account)}</p>
						</div>
						<div className={_.conversation}>
							{selectedChat.chat.map((message) => {
								return (
									<div
										key={message._id}
										className={`${_.message} ${
											message.from === account._id
												? _.sentMessage
												: _.receivedMessage
										}`}
									>
										{message.text}
									</div>
								);
							})}
						</div>
						<form className={_.sendMessage}>
							<input type="text" onChange={({target: {value}}) => setText(value)}/>
							<button onClick={sendMessage}>SEND</button>
						</form>
					</>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Chats;
