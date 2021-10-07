import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getImage, getResume } from "../utils/utils";
import urls from "../utils/urls";
import { GiMale, GiFemale } from "react-icons/gi";
import { reqPost, reqPut } from "../utils/customRequests";
import { BiImageAdd } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
import _ from "../styles/MyProfile.module.scss";
import Popup from "../components/Popup";
import templates from "../styles/templates/Templates.module.scss";

const MyProfile = () => {
	const router = useRouter();
	const {
		auth: { isLoggedIn, account },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const newProfilePicture = useState("");
	const [project, setProject] = useState({
		title: "",
		link: "",
		description: "",
	});

	const uploadProfilePicture = async (event) => {
		const profilePicture = event.target.files[0];
		if (profilePicture && profilePicture.type.startsWith("image/")) {
			const formData = new FormData();
			formData.append("profilePicture", profilePicture);
			const response = await fetch(
				urls.uploadProfilePicture + account._id,
				{
					method: "POST",
					body: formData,
					credentials: "include",
				}
			);
			const data = await response.json();
			if (data.success)
				dispatch({
					type: "PROFILE_PICTURE",
					payload: { profilePicture: data.body.profilePicture },
				});
		}
	};

	const uploadResume = async (event) => {
		const resume = event.target.files[0];
		if (resume && resume.type === "application/pdf") {
			const formData = new FormData();
			formData.append("resume", resume);
			const response = await fetch(urls.uploadResume + account._id, {
				method: "POST",
				body: formData,
				credentials: "include",
			});
			const data = await response.json();
			if (data.success)
				dispatch({
					type: "RESUME",
					payload: { resume: data.body.resume },
				});
		}
	};

	const addProject = async (event) => {
		event.preventDefault();
		console.log(account)
		const response = await reqPut(urls.updateAccount + account._id, {
			account: {
				...account,
				details: {
					...account.details,
					projects: [...account.details.projects, project],
				},
			},
		});
		if(response.success) 
			dispatch({type: 'UPDATE_ACCOUNT', payload: {account: response.body.account}})
	};

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
						<span>DESCRIPTION</span>
						<p>{account.description}</p>
					</div>
				</section>
				<section className={_.profileInfo}>
					{account.accountType === "student" ? (
						<>
							<div className={_.reputationPoints}>
								<h3>Reputation Points</h3>
								<h1>{account.details.reputationPoints}</h1>
							</div>
							<div className={_.projects}>
								<h3>Projects</h3>
								<ul>
									{account.details.projects.map((proj, index) => {
										return (
											<li key={index}> 
												<h4>{proj.title}</h4>
												<p>{proj.description}</p>
												<a href={proj.link} target='_blank'>View Project</a>
											</li>
										)
									})}
								</ul>
								<Popup button={<MdAdd />}>
									<form action="" className={_.projectForm}>
										<h1>Add a project</h1>
										<input
											type="text"
											placeholder="Project Title"
											value={project.title}
											onChange={({ target: { value } }) =>
												setProject({
													...project,
													title: value,
												})
											}
										/>
										<input
											type="text"
											placeholder="Project Link"
											value={project.link}
											onChange={({ target: { value } }) =>
												setProject({
													...project,
													link: value,
												})
											}
										/>
										<textarea
											placeholder="Project Description (Optional)"
											value={project.description}
											onChange={({ target: { value } }) =>
												setProject({
													...project,
													description: value,
												})
											}
										/>
										<input
											type="submit"
											value="Save"
											className={templates.btn}
											onClick={addProject}
										/>
									</form>
								</Popup>
							</div>
							<div className={_.skills}>
								<h3>Skills</h3>
								<ul>
									<li>Python</li>
								</ul>
								<Popup button={<MdAdd />}>
									<h1>Add A Skill</h1>
								</Popup>
							</div>
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
