import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getImage, getPost} from '../../utils/utils'
import {reqGet} from '../../utils/customRequests'
import urls from '../../utils/urls'
import _ from '../../styles/Timeline.module.scss'
import {AiFillHeart, AiOutlineHeart, AiOutlineComment} from 'react-icons/ai'

const Timeline = () => {
	const dispatch = useDispatch();
	const {
		auth: { account },
		social: { posts },
	} = useSelector((state) => state);

	const getPosts = async () => {
		const data = await reqGet(urls.getPosts + account._id)
		if(data.success) 
			dispatch({type: 'UPDATE_POSTS', payload: {posts: data.body.posts}})
	}

	useEffect(() => {
		getPosts()
	}, [])

	return (
		<div className={_.timeline}>
			<h1>Timeline</h1>
			<ul className={_.posts}>
				{posts.map((post) => {
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
						<div className={_.postButtons}>
							<AiOutlineHeart/>
							<AiOutlineComment/>
						</div>
					</li>;
				})}
			</ul>
		</div>
	);
};

export default Timeline;
