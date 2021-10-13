import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import _ from '../../styles/Timeline.module.scss';
import {getPost} from '../../utils/utils'
import {reqGet} from '../../utils/customRequests'
import urls from '../../utils/urls'

const Timeline = () => {
	const dispatch = useDispatch();
	const {
		auth: { account },
		social: { posts },
	} = useSelector((state) => state);

	const getPosts = async () => {
		const data = await reqGet(urls.getPosts + account._id)
		if(data.success) 
			console.log(data)
	}

	useEffect(() => {
		getPosts()
	}, [])

	return (
		<div className='timeline'>
			<h1>Timeline</h1>
			{posts.map((post) => {
				<div key={post._id}>
					<div>
						<img
							src={post.account.profilePicture}
							alt="Post Profile"
						/>
						<p>
							{post.account.accountType === "student"
								? post.account.details.firstName +
								  post.account.details.lastName
								: post.account.details.name}
						</p>
					</div>
					<p>{post.content}</p>
					<img src={getPost(post.media)} alt='Post media'/>
					<div>
						<button>Like</button>
						<button>Comment</button>
					</div>
				</div>;
			})}
		</div>
	);
};

export default Timeline;
