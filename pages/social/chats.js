import { useState, useEffect, useRef } from "react";
import _ from "../../styles/social/Chats.module.scss";
import urls from "../../utils/urls";
import { reqGet } from "../../utils/customRequests";
import { useDispatch, useSelector } from "react-redux";
import { getName, getImage } from "../../utils/utils";
import { io } from "socket.io-client";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import {MdSend} from 'react-icons/md';

const Chats = () => {
	const dispatch = useDispatch();
	const {
		auth: { isLoggedIn, account, width },
		social: { chats, selectedChat, text, socket },
	} = useSelector((state) => state);
	const [showChatList, setShowChatList] = useState(true);
	const scrollRef = useRef(null);

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
		if (width <= 768) setShowChatList(false);
	};

	const sendMessage = (event) => {
		event.preventDefault();
		if (!socket || !text) return;
		const from = account._id,
			to = selectedChat.account._id;
		socket.emit("message", { text, from, to });
		dispatch({
			type: "UPDATE_CHATS",
			payload: {
				message: { _id: new Date().toString(), from, to, text },
			},
		});
		dispatch({ type: "SET_TEXT", payload: { text: "" } });
	};

	useEffect(() => {
		getChats();
	}, [account]);

	useEffect(() => {
		if (socket) {
			socket.on("message", ({ success, body }) => {
				if (success)
					dispatch({
						type: "UPDATE_CHATS",
						payload: { message: body.message },
					});
			});
		}
	}, [socket]);

	useEffect(() => {
		if (scrollRef.current)
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
	}, [selectedChat]);

	useEffect(() => {
		if (isLoggedIn) 
			dispatch({type: 'SET_SOCKET', payload: {socket: io(urls.socket, {withCredentials: true})}});

		return () => {
			if (socket) socket.disconnect();
		};
	}, []);

	return (
		<div className={_.chatScreen}>
			<h1>Chats</h1>
			<div className={_.chatBox}>
				<div
					className={
						width > 768 || showChatList
							? _.chatList
							: _.hideChatList
					}
				>
					<div className={_.search}>
						<input type="search" placeholder="Search" />
						<AiOutlineClose
							onClick={() => setShowChatList(false)}
						/>
					</div>
					<ul>
						{chats.length > 0 ? (
							chats.map((chat) => {
								return (
									<li
										key={chat.account._id}
										onClick={() =>
											selectChat(chat.account._id)
										}
										className={selectedChat.account && chat.account && chat.account._id === selectedChat.account._id ? _.selectedChat : ''}
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
													{`${chat.chat.at(-1).from === account._id ? 'You : ' : ''}${chat.chat.at(-1).text}`}
												</p>
											)}
										</div>
									</li>
								);
							})
						) : (
							<div className={_.noChats}>
								<p>No chats to show</p>
								<Link href='/social/findPeople'>Discover People</Link>
							</div>
						)}
					</ul>
				</div>
				<div className={_.chat}>
					{selectedChat.account ? (
						<>
							<div className={_.chatProfile}>
								<GiHamburgerMenu
									onClick={() => setShowChatList(true)}
								/>
								<img
									src={getImage(
										selectedChat.account.profilePicture
									)}
								/>
								<Link
									href={`/social/profile/${selectedChat.account._id}`}
								>
									{getName(selectedChat.account)}
								</Link>
							</div>
							<div className={_.conversation} ref={scrollRef}>
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
								<input
									type="text"
									value={text}
									onChange={({ target: { value } }) =>
										dispatch({
											type: "SET_TEXT",
											payload: { text: value },
										})
									}
								/>
								<button onClick={sendMessage}><MdSend/></button>
							</form>
						</>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
};

export default Chats;
