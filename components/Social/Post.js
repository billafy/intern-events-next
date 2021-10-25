import { useState, useEffect, useRef } from "react";
import _ from "../../styles/social/Post.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getPost, getImage } from "../../utils/utils";
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import urls from "../../utils/urls";
import { reqDelete, reqPut } from "../../utils/customRequests";
import Link from "next/link";
import Popup from "../Popup";
import {FaTrash} from 'react-icons/fa'

const Post = ({ post }) => {
	const dispatch = useDispatch();
	const {
		social: { posts },
		auth: { isLoggedIn, account },
	} = useSelector((state) => state);
	const [showComments, setShowComments] = useState(false);
	const [comment, setComment] = useState("");
	const commentsRef = useRef(null);

	const likePost = async (_id) => {
		if (!isLoggedIn) return;
		const data = await reqPut(urls.likePost + _id);
		if (data.success) 
			dispatch({type: 'UPDATE_POST', payload: {post: data.body.post}})
	};

	const commentPost = async (_id) => {
		if (!isLoggedIn || !comment) return;
		const data = await reqPut(urls.commentPost + _id, { text: comment });
		if (data.success) {
			dispatch({type: 'UPDATE_POST', payload: {post: data.body.post}})
			setComment('')
			commentsRef.current.scrollTop = -commentsRef.current.scrollHeight;
		};
	};

	const deleteComment = async (postId, commentId) => {
		const data = await reqDelete(`${urls.deleteComment}${postId}/${commentId}`)
		if(data.success) {
			dispatch({type: 'UPDATE_POST', payload: {post: data.body.post}})
			commentsRef.current.scrollTop = -commentsRef.current.scrollHeight;
		}
	}

	const deletePost = async (postId) => {
		const data = await reqDelete(urls.deletePost + postId)
		if(data.success) 
			dispatch({type: 'DELETE_POST', payload: {postId}})
	}

	return (
		<li key={post._id} className={_.post}>
			<div className={_.postProfile}>
				<img
					src={getImage(post.postedBy.profilePicture)}
					alt="Post Profile"
				/>
				<Link href={`/social/profile/${post.postedBy._id}`}>
					{post.postedBy.accountType === "student"
						? `${post.postedBy.details.firstName} ${post.postedBy.details.lastName}`
						: post.postedBy.details.name}
				</Link>
				{isLoggedIn && account._id === post.postedBy._id &&
					<FaTrash onClick={() => deletePost(post._id)}/>}
			</div>
			<p className={_.postContent}>{post.content}</p>
			{post.media && (
				<img
					className={_.postMedia}
					src={getPost(post.media)}
					alt="Post media"
				/>
			)}
			<p className={_.postDateTime}>{post.creationDate}</p>
			<div className={_.postButtons}>
				<div>
					{post.likes.includes(account._id) ? (
						<AiFillHeart
							onClick={() => likePost(post._id)}
							style={{ color: "#DC143C" }}
						/>
					) : (
						<AiOutlineHeart onClick={() => likePost(post._id)} />
					)}
					<p>{post.likes.length}</p>
				</div>
				<div>
					<AiOutlineComment
						onClick={() => setShowComments(!showComments)}
					/>
					<p>{post.comments.length}</p>
				</div>
			</div>
			{showComments && (
				<div className={_.comments}>
					<form>
						<textarea
							placeholder="Add a comment"
							value={comment}
							onChange={({ target: { value } }) =>
								setComment(value)
							}
						/>
						<input
							type="button"
							value="Add"
							onClick={() => commentPost(post._id)}
						/>
					</form>
					<h5>Comments</h5>
					<ul ref={commentsRef}>
						{post.comments.map((cmnt) => {
							return (
								<li className={_.comment} key={cmnt._id}>
									<p>
										<strong>
											<Link
												href={`/social/profile/${cmnt.commentedBy._id}`}
											>
												{cmnt.commentedBy.details.name ||
													`${cmnt.commentedBy.details.firstName} ${cmnt.commentedBy.details.lastName}`}
											</Link>
										</strong>
										{cmnt.text}
									</p>
									{isLoggedIn && account._id === cmnt.commentedBy._id && 
										<FaTrash onClick={() => deleteComment(post._id, cmnt._id)}/>}
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</li>
	);
};

export default Post;
