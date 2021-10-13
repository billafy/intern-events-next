import { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "../../styles/MyProfile.module.scss";
import Popup from "../Popup";
import { MdAdd } from "react-icons/md";
import { reqPut } from "../../utils/customRequests";
import urls from "../../utils/urls";
import { AiOutlineClose } from "react-icons/ai";

const Skills = () => {
	const {
		auth: { account },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const [skill, setSkill] = useState("");
	const [showSkills, setShowSkills] = useState(false);
	const [seeMore, setSeeMore] = useState(false);
	const limit = 5;

	const updateAccountBySkills = (newSkills) => {
		return {
			...account,
			details: { ...account.details, skills: newSkills },
		};
	};

	const addSkill = async (event) => {
		event.preventDefault();
		const data = await reqPut(urls.updateAccount + account._id, {
			account: updateAccountBySkills([
				...account.details.skills,
				{ title: skill },
			]),
		});
		if (data.success) {
			setSkill("");
			setShowSkills(false);
			dispatch({
				type: "UPDATE_ACCOUNT",
				payload: { account: data.body.account },
			});
		}
	};

	const deleteSkill = async (_id) => {
		const newSkills = account.details.skills.filter(
			(skl) => skl._id !== _id
		);
		const data = await reqPut(urls.updateAccount + account._id, {
			account: updateAccountBySkills(newSkills),
		});
		if (data.success)
			dispatch({
				type: "UPDATE_ACCOUNT",
				payload: { account: data.body.account },
			});
	};

	return (
		<div className={_.skills}>
			<h3>Skills</h3>
			<div>
				<ul>
					{account.details.skills.map((skl, index) => {
						if (!seeMore && index >= limit) return <Fragment key={skl._id}></Fragment>;
						return (
							<li key={skl._id}>
								<h4>{skl.title} <AiOutlineClose onClick={() => deleteSkill(skl._id)}/></h4>
							</li>
						);
					})}
				</ul>
				{account.details.skills.length > limit && (
					<p
						onClick={() => setSeeMore(!seeMore)}
						className={_.seeMore}
					>
						{seeMore ? "See Less" : "See More"}
					</p>
				)}
			</div>
			<Popup
				button={<MdAdd />}
				showPopup={showSkills}
				setShowPopup={setShowSkills}
			>
				<form className={_.skillsForm}>
					<h1>Add a skill</h1>
					<input
						type="text"
						placeholder="Skill"
						value={skill}
						onChange={({ target: { value } }) => setSkill(value)}
					/>
					<input type="submit" value="Save" onClick={addSkill} />
				</form>
			</Popup>
		</div>
	);
};

export default Skills;
