import React from "react";
import _ from "../../styles/Post.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getPost, getImage } from "../../utils/utils";
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import urls from "../../utils/urls";
import { reqPut } from "../../utils/customRequests";

const Post = ({ post }) => {
	const dispatch = useDispatch();
	const {
		social: { posts },
		auth: { account },
	} = useSelector((state) => state);

	const likePost = async (_id) => {
		const data = await reqPut(`${urls.likePost}${_id}/${account._id}`);
		if (data.success) {
			const newPosts = posts.map((post) => {
				if (post._id === _id) return data.body.post;
				return post;
			});
			dispatch({ type: "UPDATE_POSTS", payload: { posts: newPosts } });
		}
	};

	return (
		<li key={post._id} className={_.post}>
			<div className={_.postProfile}>
				<img
					src={getImage(post.postedBy.profilePicture)}
					alt="Post Profile"
				/>
				<p>
					{post.postedBy.accountType === "student"
						? `${post.postedBy.details.firstName} ${post.postedBy.details.lastName}`
						: post.postedBy.details.name}
				</p>
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
						<AiFillHeart onClick={() => likePost(post._id)} style={{color: '#DC143C'}}/>
					) : (
						<AiOutlineHeart onClick={() => likePost(post._id)} />
					)}
					<p>{post.likes.length}</p>
				</div>
				<div>
					<AiOutlineComment />
					<p>{post.comments.length}</p>
				</div>
			</div>
		</li>
	);
};

export default Post;
