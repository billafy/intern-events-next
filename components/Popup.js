import {useState} from 'react';
import _ from '../styles/Popup.module.scss'
import {AiOutlineClose} from 'react-icons/ai'

const Popup = ({children, button}) => {
	const [showPopup, setShowPopup] = useState(false)

	return (
		<div className={_.popupContainer}>
			<button onClick={() => setShowPopup(true)} className={_.showPopup}>
				{button}
			</button>
			{showPopup && 
				<div className={_.popup}>
					<button onClick={() => setShowPopup(false)}>
						<AiOutlineClose/>
					</button>
					{children}
				</div>
			}
		</div>
	);	
};

export default Popup;