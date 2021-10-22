import {useState} from 'react';
import urls from "../../../utils/urls";
import {getImage } from "../../../utils/utils";
import { useDispatch, useSelector } from "react-redux";

const Posts = ({ propPosts }) => {
	const [posts, setPosts] = useState(propPosts)
	const {
		auth: { isLoggedIn, account },
	} = useSelector((state) => state);
	const dispatch = useDispatch()

	console.log(propPosts)

	return (
		<>
		</>
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
	const response = await fetch(urls.getPosts + params._id);
	const data = await response.json();
	return {
		props: {
			propPosts: data.body.posts,
		},
	};
};
