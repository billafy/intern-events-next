import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "../../styles/MyProfile.module.scss";
import Popup from "../Popup";
import { MdAdd } from "react-icons/md";
import { reqPut } from "../../utils/customRequests";
import urls from "../../utils/urls";

const Projects = ({}) => {
	const dispatch = useDispatch();
	const {
		auth: { account },
	} = useSelector((state) => state);
	const [project, setProject] = useState({
		title: "",
		link: "",
		description: "",
	});
	const [showProjects, setShowProjects] = useState(false);
	const [seeMore, setSeeMore] = useState(false);
	const limit = 3;

	const addProject = async (event) => {
		event.preventDefault();
		console.log(account);
		const data = await reqPut(urls.updateAccount + account._id, {
			account: {
				...account,
				details: {
					...account.details,
					projects: [...account.details.projects, project],
				},
			},
		});
		if (data.success) {
			setShowProjects(false);
			dispatch({
				type: "UPDATE_ACCOUNT",
				payload: { account: data.body.account },
			});
		}
	};

	return (
		<div className={_.projects}>
			<h3>Projects</h3>
			<div>
				<ul>
					{account.details.projects.map((proj, index) => {
						if(!seeMore && index >= limit) 
							return <></>
						return (
							<li key={index}>
								<h4>{proj.title}</h4>
								<p>{proj.description}</p>
								<a href={proj.link} target="_blank">
									View Project
								</a>
							</li>
						);
					})}
				</ul>
				{account.details.projects.length >= limit && 
					<p onClick={() => setSeeMore(!seeMore)} className={_.seeMore}>
						{seeMore ? 'See Less' : 'See More'}
					</p>
				}
			</div>
			<Popup
				button={<MdAdd />}
				showPopup={showProjects}
				setShowPopup={setShowProjects}
			>
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
					<input type="submit" value="Save" onClick={addProject} />
				</form>
			</Popup>
		</div>
	);
};

export default Projects;
