import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getImage, getResume } from "../utils/utils";
import urls from "../utils/urls";
import { GiMale, GiFemale } from "react-icons/gi";
import { reqPut } from "../utils/customRequests";
import { BiImageAdd } from "react-icons/bi";
import _ from "../styles/MyProfile.module.scss";
import Projects from "../components/Profile/Projects";
import Skills from "../components/Profile/Skills";
import { MdEdit } from "react-icons/md";
import Popup from "../components/Popup";
import Link from 'next/link'

const MyProfile = () => {
	const router = useRouter();
	const {
		auth: { isLoggedIn, account },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const newProfilePicture = useState("");
	const [showDescription, setShowDescription] = useState(false);
	const [description, setDescription] = useState(account.description);

	const updateAccount = async (url, formData) => {
		const response = await fetch(url + account._id, {
			method: "PUT",
			body: formData,
			credentials: "include",
		});
		const data = await response.json();
		if (data.success)
			dispatch({
				type: "UPDATE_ACCOUNT",
				payload: { account: data.body.account },
			});
	};

	const uploadProfilePicture = (event) => {
		const profilePicture = event.target.files[0];
		if (profilePicture && profilePicture.type.startsWith("image/")) {
			const formData = new FormData();
			formData.append("profilePicture", profilePicture);
			updateAccount(urls.uploadProfilePicture, formData);
		}
	};

	const uploadResume = (event) => {
		const resume = event.target.files[0];
		if (resume && resume.type === "application/pdf") {
			const formData = new FormData();
			formData.append("resume", resume);
			updateAccount(urls.uploadResume, formData);
		}
	};

	const updateDescription = async () => {
		const data = await reqPut(urls.updateAccount + account._id, {
			account: {...account, description: description}
		})
		if(data.success) 
			dispatch({type: 'UPDATE_ACCOUNT', payload: {account: data.body.account}})
		setShowDescription(false)

	}

	useEffect(() => {
		if (!isLoggedIn) router.replace("/");
	}, [router.pathname]);

	return (
		isLoggedIn && (
			<div className={_.myProfile}>
				<h1>My Profile</h1>
				<section className={_.profileDetails}>
					<div className={_.profilePicture}>
						<img
							src={getImage(account.profilePicture)}
							alt="Profile"
						/>
						<input
							type="file"
							onChange={uploadProfilePicture}
							accept="image/*"
						/>
						<div className={_.uploadProfilePicture}>
							<BiImageAdd />
						</div>
					</div>
					<div className={_.profileMain}>
						{account.accountType === "student" ? (
							<>
								<h1>
									{account.details.firstName}{" "}
									{account.details.lastName}
									{account.details.gender === "Male" ? (
										<GiMale style={{ color: "#6CA0DC" }} />
									) : (
										<GiFemale
											style={{ color: "#DC6A6A" }}
										/>
									)}
								</h1>
								<p>
									{account.details.course} - Year{" "}
									{account.details.yearOfStudying}
								</p>
								<p>{account.details.college}</p>
							</>
						) : (
							<>
								<h1>{account.details.name}</h1>
								{account.details.university && (
									<h2>{account.details.university}</h2>
								)}
								<h2>{account.details.address}</h2>
							</>
						)}
					</div>
					<div className={_.followCount}>
						<div>
							<p>{account.followers.length}</p>
							<p>Followers</p>
						</div>
						<div>
							<p>{account.following.length}</p>
							<p>Following</p>
						</div>
					</div>
					<div className={_.description}>
						<span>
							DESCRIPTION
							<Popup
								button={<MdEdit />}
								showPopup={showDescription}
								setShowPopup={setShowDescription}
							>
								<form>
									<h3>Update Description</h3>
									<textarea placeholder="Enter about yourself" value={description} onChange={({target: {value}}) => setDescription(value)}/>
									<input type="button" value="Save" onClick={updateDescription}/>
								</form>
							</Popup>
						</span>
						<p>{account.description}</p>
					</div>
					<Link href={`/social/posts/${account._id}`}>See Posts</Link>
				</section>
				<section className={_.profileInfo}>
					{account.accountType === "student" ? (
						<>
							<div className={_.reputationPoints}>
								<h3>Reputation Points</h3>
								<h1>{account.details.reputationPoints}</h1>
							</div>
							<Projects />
							<Skills />
							<div className={_.resume}>
								<h3>Resume</h3>
								{account.details.resume && (
									<a
										href={getResume(account.details.resume)}
										target="_blank"
									>
										View Uploaded Resume
									</a>
								)}
								<input
									type="file"
									accept="application/pdf"
									onChange={uploadResume}
								/>
							</div>
						</>
					) : (
						<></>
					)}
				</section>
			</div>
		)
	);
};

export default MyProfile;
