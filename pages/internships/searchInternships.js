import { useState, useEffect } from "react";
import _ from "../../styles/internships/SearchInternships.module.scss";
import { internshipCategories } from "../../utils/inputFields";
import { AiOutlineSearch, AiFillCaretRight } from "react-icons/ai";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import urls from "../../utils/urls";
import { reqGet } from "../../utils/customRequests";
import Popup from "../../components/Popup";

const SearchInternships = () => {
	const dispatch = useDispatch();
	const {
		auth: { width },
		internships: { internships, filters, stipendFilter, durationFilter },
	} = useSelector((state) => state);
	const [showFilters, setShowFilters] = useState(false);

	const getInternships = async (query = '') => {
		const data = await reqGet(urls.getInternships + query);
		if (data.success)
			dispatch({
				type: "SET_INTERNSHIPS",
				payload: { internships: data.body.internships },
			});
	};

	const resetFilters = (event) => {
		event.preventDefault()
		dispatch({type: 'RESET_FILTERS'});
		getInternships();
	} 

	const updateFilters = ({ target: { name, value } }) => {
		dispatch({ type: "UPDATE_FILTERS", payload: { name, value } });
	};

	const searchInternships = () => {
		getInternships(`?keyword=${filters.keyword}`);
	}

	const applyFilters = (event) => {
		event.preventDefault()
		const {stipend, category, duration} = filters
		let query = '?'
		if(stipend) 
			query += `stipend=${stipend}&`;
		if(category) 
			query += `category=${category}&`;
		if(duration) 
			query += `duration=${duration}`;
		getInternships(query);
	}

	useEffect(async () => {
		await getInternships();
		dispatch({type: 'SET_FILTERS'});
	}, []);

	const getFilters = () => {
		return (
			<div>
				<h2>Filters</h2>
				<section>
					<h4>Category</h4>
					<select
						className={_.dropdown}
						name="category"
						value={filters.category}
						onChange={updateFilters}
					>
						<option>All</option>
						{internshipCategories.map((category) => (
							<option key={category}>{category}</option>
						))}
					</select>
				</section>
				<section>
					<h4>Stipend (₹/month)</h4>
					<p>Minimum Stipend : ₹{filters.stipend}</p>
					<input
						type="range"
						min={stipendFilter.min}
						max={stipendFilter.max}
						value={filters.stipend}
						name="stipend"
						step="1000"
						onChange={updateFilters}
					/>
				</section>
				<section>
					<h4>Duration (months)</h4>
					<p>Minimum Duration : {filters.duration} month(s)</p>
					<input
						type="range"
						min={durationFilter.min}
						max={durationFilter.max}
						value={filters.duration}
						name="duration"
						step="1"
						onChange={updateFilters}
					/>
				</section>
				<button className={_.applyFilters} onClick={resetFilters}>Reset</button>
				<button className={_.applyFilters} onClick={applyFilters}>Apply</button>
			</div>
		);
	};

	return (
		<div className={_.searchInternships}>
			<h1>Search Internships</h1>
			<div className={_.internships}>
				<div className={_.filters}>
					{width > 1168 ? (
						getFilters()
					) : (
						<Popup
							button={"Filters"}
							showPopup={showFilters}
							setShowPopup={setShowFilters}
						>
							{getFilters()}
						</Popup>
					)}
				</div>
				<div className={_.internshipResults}>
					<div className={_.searchBar}>
						<input type="search" placeholder="Search" name='keyword' value={filters.keyword} onChange={updateFilters}/>
						<AiOutlineSearch onClick={searchInternships}/>
					</div>
					<ul className={_.internshipList}>
						{internships.length > 0
							?
							internships.map((internship) => {
							return (
								<li key={internship._id}>
									<div className={_.internshipInfo}>
										<h3>{internship.title}</h3>
										<p>
											{internship.companyId.details && `${internship.companyId.details.name} - ${internship.companyId.details.address}`}
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
						})
							:
							<p className={_.noResults}>No results</p>
						}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default SearchInternships;
