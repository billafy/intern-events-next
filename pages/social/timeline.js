import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getImage, getPost} from '../../utils/utils'
import {reqGet, reqPut} from '../../utils/customRequests'
import urls from '../../utils/urls'
import _ from '../../styles/Timeline.module.scss'
import {AiFillHeart, AiOutlineHeart, AiOutlineComment} from 'react-icons/ai'
import Link from 'next/link'

const Timeline = () => {
	const dispatch = useDispatch();
	const {
		auth: { account },
		social: { posts },
	} = useSelector((state) => state);

	const getPosts = async () => {
		const data = await reqGet(urls.getTimeline + account._id)
		if(data.success) 
			dispatch({type: 'UPDATE_POSTS', payload: {posts: data.body.posts}})
	}

	const likePost = async (_id) => {
		const data = await reqPut(`${urls.likePost}${_id}/${account._id}`)
		console.log(data)
	}

	useEffect(() => {
		getPosts()
	}, [])

	return (
		<div className={_.timeline}>
			<h1>Timeline</h1>
			<ul className={_.posts}>
				{posts.length > 0
					?
					posts.map((post) => {
						return <li key={post._id}>
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
							{post.media && <img className={_.postMedia} src={getPost(post.media)} alt='Post media'/>}
							<p className={_.postDateTime}>{post.creationDate}</p>
							<div className={_.postButtons}>
								<AiOutlineHeart onClick={() => likePost(post._id)}/>
								<AiOutlineComment/>
							</div>
						</li>;
					})
					:
					<div className={_.emptyTimeline}>
						<p>No posts in your timeline</p>
						<Link href='/social/searchAccounts'>Discover People</Link>
					</div>
				}
			</ul>
		</div>
	);
};

export default Timeline;
