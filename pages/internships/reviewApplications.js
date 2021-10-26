import { useEffect } from "react";
import urls from "../../utils/urls";
import { useDispatch, useSelector } from "react-redux";
import { reqGet } from "../../utils/customRequests";
import { useRouter } from "next/router";
import _ from '../../styles/internships/ReviewApplications.module.scss';

const ReviewApplications = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const {
		auth: { isLoggedIn, account },
		internships: { internships, internship },
	} = useSelector((state) => state);

	const getCompanyInternships = async () => {
		const data = await reqGet(urls.getCompanyInternships + account._id);
		if (data.success) {
			dispatch({
				type: "SET_INTERNSHIPS",
				payload: { internships: data.body.internships },
			});
			dispatch({
				type: "SET_INTERNSHIP",
				payload: { internship: data.body.internships[0] || {} },
			});
		}
	};

	const selectInternship = ({target: {value}}) => {
		const newInternship = internships.filter(int => int.title === value)[0]
		dispatch({type: 'SET_INTERNSHIP', payload: {internship: newInternship}})
	}

	useEffect(() => {
		if (!isLoggedIn || account.accountType !== "company")
			return router.replace("/");
		getCompanyInternships();
	}, []);

	return (
		<div className={_.reviewApplications}>
			<h1>Review Internship Applications</h1>
			{internships.length > 0 ? (
				<>
					<form>
						<label>Select an Internship</label>
						<select value={internship.title} onChange={selectInternship}>
							{internships.map((internship) => (
								<option key={internship._id}>
									{internship.title}
								</option>
							))}
						</select>
					</form>
					<div className={_.internshipDetails}>
						<h3>{internship.title}</h3>
						<p>{internship.description}</p>
						<p>
							{internship.stipend > 0
								? `₹${internship.stipend} / month`
								: "Unpaid"}
						</p>
						<p>{internship.duration} month(s)</p>
						<p>Vacancy : {internship.numberOfPositions}</p>
						<p>Application ends on {internship.applicationEnd}</p>
					</div>
					<div className={_.applications}>
						<h3>Applications ({internship.applications ? internship.applications.length : 0})</h3>
						{internship.applications &&
						internship.applications.length > 0 ? (
							<ul>
								{internship.applications.map((application) => {
									return <li key={application._id}></li>;
								})}
							</ul>
						) : (
							<p>No applications yet.</p>
						)}
					</div>
				</>
			) : (
				<p>No active internships found.</p>
			)}
		</div>
	);
};

export default ReviewApplications;
