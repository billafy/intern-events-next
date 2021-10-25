import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reqGet } from "../../utils/customRequests";
import urls from "../../utils/urls";
import _ from "../../styles/social/Timeline.module.scss";
import Link from "next/link";
import Post from "../../components/Social/Post";
import {useRouter} from 'next/router'

const Timeline = () => {
	const router = useRouter()
	const dispatch = useDispatch();
	const {
		auth: { isLoggedIn, account },
		social: { posts },
	} = useSelector((state) => state);

	const getTimeline = async () => {
		const data = await reqGet(urls.getTimeline + account._id);
		if (data.success)
			dispatch({
				type: "SET_POSTS",
				payload: { posts: data.body.posts },
			});
	};

	useEffect(() => {
		if(!isLoggedIn) 
			return router.replace('/')
		getTimeline();
	}, []);

	return (
		<div className={_.timeline}>
			<h1>Timeline</h1>
			<ul className={_.posts}>
				{posts.length > 0 ? (
					posts.map((post) => <Post key={post._id} post={post} />)
				) : (
					<div className={_.emptyTimeline}>
						<p>No posts in your timeline</p>
						<Link href="/social/searchAccounts">
							Discover People
						</Link>
					</div>
				)}
			</ul>
		</div>
	);
};

export default Timeline;
