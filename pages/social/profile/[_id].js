import {useState} from 'react';
import urls from "../../../utils/urls";
import { getResume, getImage } from "../../../utils/utils";
import _ from "../../../styles/social/Profile.module.scss";
import { GiMale, GiFemale } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import {reqPut} from '../../../utils/customRequests'
import Link from 'next/link'

const Profile = ({ propProfile }) => {
	const [profile, setProfile] = useState(propProfile)
	const {
		auth: { isLoggedIn, account },
	} = useSelector((state) => state);
	const dispatch = useDispatch()

	const followToggle = async () => {
		const data = await reqPut(urls.followAccount + profile._id)
		if(data.success) {
			setProfile(data.body.followingAccount)
			dispatch({type: 'UPDATE_ACCOUNT', payload: {account: data.body.account}})
		}
	}

	return (
		<div className={_.profile}>
			<h1>Profile</h1>
			<div className={_.profileDetails}>
				<img src={getImage(profile.profilePicture)} />
				{profile.accountType === "student" ? (
					<>
						<h1>
							{profile.details.firstName}{" "}
							{profile.details.lastName}
							{profile.details.gender === "Male" ? (
								<GiMale style={{ color: "#6CA0DC" }} />
							) : (
								<GiFemale style={{ color: "#DC6A6A" }} />
							)}
						</h1>
						<p>
							{profile.details.course} - Year{" "}
							{profile.details.yearOfStudying}
						</p>
						<p>{profile.details.college}</p>
					</>
				) : (
					<>
						<h1>{profile.details.name}</h1>
						{profile.details.university && (
							<h2>{profile.details.university}</h2>
						)}
						<h2>{profile.details.address}</h2>
					</>
				)}
				{isLoggedIn && account._id !== profile._id && (
					<button onClick={followToggle} className={_.followButton}>
						{account.following.includes(profile._id) ? 'Unfollow' : 'Follow'}
					</button>
				)}
				<div className={_.followCount}>
					<div>
						<p>{profile.followers.length}</p>
						<p>Followers</p>
					</div>
					<div>
						<p>{profile.following.length}</p>
						<p>Following</p>
					</div>
				</div>
				<div className={_.description}>
					<span>DESCRIPTION</span>
					<p>{profile.description}</p>
				</div>
				<Link href={`/social/posts/${profile._id}`}>See Posts</Link>
			</div>
			<div className={_.profileInfo}>
				<div className={_.reputationPoints}>
					<h3>Reputation Points</h3>
					<h1>{profile.details.reputationPoints}</h1>
				</div>
				<div className={_.projects}>
					<h3>Projects</h3>
					<ul>
						{profile.details.projects.map((project) => {
							return (
								<li key={project._id}>
									<h4>{project.title}</h4>
									<p>{project.description}</p>
									<a href={project.link} target="_blank">
										View Project
									</a>
								</li>
							);
						})}
					</ul>
				</div>
				<div className={_.skills}>
					<h3>Skills</h3>
					<ul>
						{profile.details.skills.map((skill) => {
							return (
								<li key={skill._id}>
									<h4>{skill.title}</h4>
								</li>
							);
						})}
					</ul>
				</div>
				<div className={_.resume}>
					<h3>Resume</h3>
					{profile.details.resume ? (
						<a
							target="_blank"
							href={getResume(profile.details.resume)}
						>
							View Resume
						</a>
					) : (
						<p>No resume uploaded.</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Profile;

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
	const response = await fetch(urls.getAccount + params._id);
	const data = await response.json();
	return {
		props: {
			propProfile: data.body.account,
		},
	};
};