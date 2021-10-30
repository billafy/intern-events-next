import { useEffect } from "react";
import urls from "../../utils/urls";
import { useDispatch, useSelector } from "react-redux";
import { reqDelete, reqGet } from "../../utils/customRequests";
import { useRouter } from "next/router";
import _ from "../../styles/internships/ReviewApplications.module.scss";
import { getName, getImage } from "../../utils/utils";
import Link from "next/link";

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

	const selectInternship = ({ target: { value } }) => {
		const newInternship = internships.find((int) => int.title === value);
		dispatch({
			type: "SET_INTERNSHIP",
			payload: { internship: newInternship },
		});
	};

	const startChat = (studentAccount) => {
		dispatch({
			type: "START_NEW_CHAT",
			payload: { account: studentAccount },
		});
		router.push("/social/chats");
	};

	const rejectApplication = async (applicationId) => {
		const data = await reqDelete(
			`${urls.rejectApplication}${account._id}/${internship._id}/${applicationId}`
		);
		if (data.success)
			dispatch({ type: "UPDATE_INTERNSHIPS", payload: { internship: data.body.internship } });
	};

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
						<select
							value={internship.title}
							onChange={selectInternship}
						>
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
						<h3>
							Applications (
							{internship.applications
								? internship.applications.length
								: 0}
							)
						</h3>
						{internship.applications &&
						internship.applications.length > 0 ? (
							<ul>
								{internship.applications.map((application) => {
									return (
										<li key={application._id}>
											<div className={_.studentInfo}>
												<img
													src={getImage(
														application.studentId
															.profilePicture
													)}
												/>
												<Link
													href={`/social/profile/${application.studentId._id}`}
												>
													{getName(
														application.studentId
													)}
												</Link>
											</div>
											<div
												className={_.applicationMessage}
											>
												<h4>Why have I applied?</h4>
												<p>{application.message}</p>
											</div>
											<div
												className={_.applicationButtons}
											>
												<button
													onClick={() =>
														rejectApplication(
															application._id
														)
													}
												>
													Reject
												</button>
												<button
													onClick={() =>
														startChat(
															application.studentId
														)
													}
												>
													Message
												</button>
											</div>
										</li>
									);
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
