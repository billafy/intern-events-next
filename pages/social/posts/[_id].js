import { useState, useEffect } from "react";
import urls from "../../../utils/urls";
import { getImage } from "../../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import Post from "../../../components/Social/Post";
import _ from "../../../styles/social/Timeline.module.scss";
import {useRouter} from 'next/router';
import {reqGet} from '../../../utils/customRequests';
import Loading from '../../../components/Loading';

const Posts = () => {
	const router = useRouter()
	const {
		social: {posts}
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const [profile, setProfile] = useState(null);

	const getPosts = async () => {
		const data = await reqGet(urls.getPosts + router.query._id);
		if(data.success) 
			dispatch({type: 'SET_POSTS', payload: {posts: data.body.posts}});
	}

	const getPostsAccount = async () => {
		const data = await reqGet(urls.getAccount + router.query._id);
		if(data.success) 
			setProfile(data.body.account);
	}

	useEffect(() => {
		getPosts();
		getPostsAccount();
	}, [])

	if(!profile) 
		return <Loading/>
	return (
		<div className={_.timeline}>
			<h1>
				{profile &&
					(profile.details.name ||
						`${profile.details.firstName} ${profile.details.lastName}'s`)}{" "}
				Posts
			</h1>
			<ul className={_.posts}>
				{posts.length > 0 ? (
					posts.map((post) => <Post key={post._id} post={post} />)
				) : (
					<div className={_.emptyTimeline}>
						<p>No posts yet.</p>
					</div>
				)}
			</ul>
		</div>
	);
};

export default Posts;