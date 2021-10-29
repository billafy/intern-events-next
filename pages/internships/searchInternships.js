import { useState, useEffect } from "react";
import _ from "../../styles/internships/SearchInternships.module.scss";
import { internshipCategories } from "../../utils/inputFields";
import { AiOutlineSearch, AiFillCaretRight } from "react-icons/ai";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import urls from "../../utils/urls";
import { reqGet } from "../../utils/customRequests";
import Popup from '../../components/Popup';

const SearchInternships = () => {
	const dispatch = useDispatch();
	const {
		auth: {width},
		internships: { internships },
	} = useSelector((state) => state);
	const [showFilters, setShowFilters] = useState(false); 

	const getInternships = async () => {
		const data = await reqGet(urls.getInternships);
		if (data.success)
			dispatch({
				type: "SET_INTERNSHIPS",
				payload: { internships: data.body.internships },
			});
	};

	const getFilters = () => {
		return (
			<div>
				<h2>Filters</h2>
				<section>
					<h4>Category</h4>
					<select className={_.dropdown}>
						<option>All</option>
						{internshipCategories.map((category) => (
							<option key={category}>{category}</option>
						))}
					</select>
				</section>
				<section>
					<h4>Stipend</h4>
					<input type="range" min="1" max="100" />
				</section>
				<section>
					<h4>Duration (in months)</h4>
					<input type="range" min="1" max="100" />
				</section>
				<button className={_.applyFilters}>Apply</button>
			</div>
		);
	};

	useEffect(() => {
		getInternships();
	}, []);

	return (
		<div className={_.searchInternships}>
			<h1>Search Internships</h1>
			<div className={_.internships}>
				<div className={_.filters}>
					{width > 1168 ? getFilters() : 
						<Popup
							button={'Filters'}
							showPopup={showFilters}
							setShowPopup={setShowFilters}
						>
						{getFilters()}	
						</Popup>
					}
				</div>
				<div className={_.internshipResults}>
					<div className={_.searchBar}>
						<input type="search" placeholder="Search" />
						<AiOutlineSearch />
					</div>
					<ul className={_.internshipList}>
						{internships.map((internship) => {
							return (
								<li key={internship._id}>
									<div className={_.internshipInfo}>
										<h3>{internship.title}</h3>
										<p>
											{internship.companyId.details.name}{" "}
											-{" "}
											{
												internship.companyId.details
													.address
											}
										</p>
										<p>
											{internship.stipend > 0
												? `₹${internship.stipend} / month`
												: "Unpaid"}
										</p>
										<p>{internship.duration} month(s)</p>
									</div>
									<Link
										href={`/internships/internship/${internship._id}`}
									>
										See More
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default SearchInternships;
