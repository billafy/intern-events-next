import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import _ from '../../../styles/internships/Internship.module.scss';
import {reqGet} from '../../../utils/customRequests';
import {useRouter} from 'next/router';
import urls from '../../../utils/urls'

const Internship = () => {
	const router = useRouter()
	const dispatch = useDispatch()
	const {internships: {internship}} = useSelector(state => state);

	const getInternship = async () => {
		const data = await reqGet(urls.getInternship + router.query._id);
		console.log(data)
		if(data.success) 
			dispatch({type: 'SET_INTERNSHIP', payload: {internship: data.body.internship}});
	}

	useEffect(() => {
		getInternship();
	}, [])

	return (
		<div className={_.container}>
			{internship && internship._id}
			<div className={_.card}>
				<div className={_.card_cover}>
					<div className={_.headings}>
						<h1>Full Stack Developer</h1>
						<a href="">Apply Now</a>
						<h3>Google</h3>
					</div>
					<div className={_.labels}>
						<i className='home'>
							<label >Work From Home</label>
						</i>
						<i className='wallet'>
							<label >15k - 20k</label>
						</i>
						<i className='clock'>
							<label >6 months</label>
						</i>
						<i className='map'>
							<label >Location</label>
						</i>
					</div>
				</div>
				<div className={_.card_content}>
					<h3>Details</h3>
					<p>Lorem ipsum dolor</p>
				</div>
			</div>
		</div>
	);
};

export default Internship;
