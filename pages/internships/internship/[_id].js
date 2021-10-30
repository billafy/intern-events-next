import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "../../../styles/internships/Internship.module.scss";
import { reqPut, reqGet } from "../../../utils/customRequests";
import { useRouter } from "next/router";
import urls from "../../../utils/urls";
import Popup from "../../../components/Popup";
import { FaWallet, FaClock, FaMapMarkerAlt, FaCalendar } from "react-icons/fa";
import {AiOutlineNumber} from 'react-icons/ai';

const Internship = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const {
		auth: {isLoggedIn, account},
		internships: { internship },
	} = useSelector((state) => state);
	const [showApply, setShowApply] = useState(false);
	const [message, setMessage] = useState('');

	const getInternship = async () => {
		const data = await reqGet(urls.getInternship + router.query._id);
		if (data.success)
			dispatch({
				type: "SET_INTERNSHIP",
				payload: { internship: data.body.internship },
			});
	};

	const applyInternship = async (event) => {
		event.preventDefault()
		if(internship._id) {
			const data = await reqPut(`${urls.applyInternship}${internship._id}/${account._id}/`, {message});
			setShowApply(false);
			console.log(data.body.internship)
			if(data.success) 
				dispatch({type: 'SET_INTERNSHIP', payload: {internship: data.body.internship}});
		}
	};

	useEffect(() => {
		getInternship();
	}, []);

	return internship.companyId ? (
		<div className={_.internship}>
			<h1>
				{internship.title} - {internship.companyId.details.name}
			</h1>
			<div className={_.internshipInfo}>
				<div className={_.icons}>
					<p>
						<FaWallet />{" "}
						{internship.stipend > 0
							? `₹${internship.stipend} / month`
							: "Unpaid"}
					</p>
					<p>
						<FaClock /> {internship.duration} month(s)
					</p>
					<p>
						<FaMapMarkerAlt />{" "}
						{internship.companyId.details.address}
					</p>
					<p>
						<FaCalendar/> Apply by {internship.applicationEnd}
					</p>
					<p>
						<AiOutlineNumber/> {internship.numberOfPositions} position(s)
					</p>
				</div>
				<div className={_.description}>
					<h3>Description</h3>
					<p>{internship.description}</p>
					<p>{internship.applications.length} application(s) till now.</p>
				</div>
				{isLoggedIn && account.accountType === 'student' &&
					(
					!internship.applications.find(app => app.studentId === account._id)
					? 	
					<Popup
						button={"Apply Now"}
						showPopup={showApply}
						setShowPopup={setShowApply}
					>
						<form className={_.applicationForm}>
							<h3>
								Why you should be hired for this role?
							</h3>
							<textarea value={message} onChange={({target: {value}}) => setMessage(value)}/>
							<button onClick={applyInternship}>Apply</button>
						</form>
					</Popup>
					:
					<a>Applied</a>
					)
				}
			</div>
		</div>
	) : (
		<></>
	);
};

export default Internship;
