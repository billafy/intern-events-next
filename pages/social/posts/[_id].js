import { useState, useEffect } from "react";
import urls from "../../../utils/urls";
import { getImage } from "../../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import Post from "../../../components/Social/Post";
import _ from "../../../styles/social/Timeline.module.scss";

const Posts = ({ propPosts, propAccount }) => {
	const {
		auth: { isLoggedIn, account }, social: {posts}
	} = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({type: 'UPDATE_POSTS', payload: {posts: propPosts}})
	}, [])

	return (
		<div className={_.timeline}>
			<h1>
				{propAccount &&
					(propAccount.details.name ||
						`${propAccount.details.firstName} ${propAccount.details.lastName}'s`)}{" "}
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

export async function getStaticPaths() {
	const response = await fetch(urls.getAccountIds);
	const data = await response.json();
	const _ids = data.body._ids.map((_id) => {
		return {
			params: {
				_id: _id._id,
			},
		};
	});
	return {
		paths: _ids,
		fallback: false,
	};
}

export const getStaticProps = async ({ params }) => {
	let response = await fetch(urls.getPosts + params._id);
	const postsData = await response.json();
	response = await fetch(urls.getAccount + params._id);
	const accountData = await response.json();
	console.log(accountData);
	return {
		props: {
			propPosts: postsData.body.posts,
			propAccount: accountData.body.account,
		},
	};
};
