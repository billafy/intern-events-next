import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "../../styles/MyProfile.module.scss";
import Popup from "../Popup";
import { MdAdd } from "react-icons/md";
import { reqPut } from "../../utils/customRequests";
import urls from '../../utils/urls';

const Skills = () => {
	const {
		auth: { account },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const [skill, setSkill] = useState("");
	const [showSkills, setShowSkills] = useState(false);
	const [seeMore, setSeeMore] = useState(false);
	const limit = 5;

	const addSkill = async (event) => {
		event.preventDefault();
		const data = await reqPut(urls.updateAccount + account._id, {
			account: {
				...account,
				details: {
					...account.details,
					skills: [...account.details.skills, skill],
				},
			},
		});
		if (data.success) {
			setShowSkills(false);
			dispatch({
				type: "UPDATE_ACCOUNT",
				payload: { account: data.body.account },
			});
		}
	};

	return (
		<div className={_.skills}>
			<h3>Skills</h3>
			<div>
				<ul>
					{account.details.skills.map((skl, index) => {
						if(!seeMore && index >= limit) 
							return <></>
						return <li key={index}>{skl}</li>
					})}
				</ul>
				{account.details.skills.length >= limit && 
					<p onClick={() => setSeeMore(!seeMore)} className={_.seeMore}>
						{seeMore ? 'See Less' : 'See More'}
					</p>
				}
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
