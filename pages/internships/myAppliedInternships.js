import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { reqGet } from "../../utils/customRequests";
import urls from "../../utils/urls";
import Link from "next/link";
import _ from '../../styles/internships/MyAppliedInternships.module.scss';

const MyAppliedInternships = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const {
		auth: { isLoggedIn, account },
		internships: { internships },
	} = useSelector((state) => state);

	const getMyInternships = async () => {
		const data = await reqGet(urls.myAppliedInternships + account._id);
		dispatch({
			type: "SET_INTERNSHIPS",
			payload: { internships: data.body.internships },
		});
	};

	useEffect(() => {
		if (!isLoggedIn || account.accountType !== "student")
			return router.replace("/");
		getMyInternships();
	}, []);

	return (
		<div className={_.myInternships}>
			<h1>My Applied Internships</h1>
			{internships && internships.length > 0 ? (
				<ul>
					{internships.map((internship) => {
						return (
							<li key={internship._id}>
								<Link
									href={`/internships/internship/${internship._id}`}
								>
									{internship.title}
								</Link>
								<p>{internship.companyId.details.name}</p>
								{internship.application && (
									<p>
										Status : {internship.application.status}
									</p>
								)}
							</li>
						);
					})}
				</ul>
			) : (
				<div className={_.noInternships}>
					<p>You haven't applied to any internships</p>
					<Link href={`/internships/searchInternships`}>
						Search Internships
					</Link>
				</div>
			)}
		</div>
	);
};

export default MyAppliedInternships;
