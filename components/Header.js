import {useState} from 'react'

import Link from "next/link";

import { navLinks } from "../utils/staticData";

import { GiHamburgerMenu } from "react-icons/gi";

import _ from "../styles/Header.module.scss";

import templates from "../styles/templates/Templates.module.scss";

import {useDispatch, useSelector} from 'react-redux'

import Navbar from './Navbar'

import {reqDelete} from '../utils/customRequests'

import {getImage} from '../utils/utils'

import urls from '../utils/urls'

const Header = () => {
    const dispatch = useDispatch()
    const {isLoggedIn, width, account} = useSelector(state => state.auth)
    const [showDropDown, setShowDropDown] = useState(false);

    const logout = async () => {
        const data = await reqDelete(urls.logout + account._id);
        console.log(data)
        if(data.success) 
            dispatch({type: 'LOGOUT'})
    }

    return (
        <nav className={_.header}>
            <div className={_.logo}>
                <Link href="/">
                    <img
                        src="https://www.freepnglogos.com/uploads/w-letter-logo-png/w-letter-vector-ribbon-alphabet-logo-download-alphabet-logos-33.png"
                        alt="logo_here"
                    />
                </Link>
            </div>
            {((width > 767) || showDropDown)
                &&
                <Navbar/>
            }
            {((width > 567) || showDropDown)
                &&
                (isLoggedIn
                ?
                <div className={_.profileHeader}>
                    <a>
                        {account.accountType === 'student' ? `${account.details.firstName} ${account.details.lastName}` : account.details.name}
                    </a>
                    <img className={_.profilePicture} src={getImage(account.profilePicture)} alt='Profile'/>
                    <button onClick={logout} className={templates.btn}>Logout</button>
                </div>
                :
                <div className={_.loginSignupButtons}>
                    <Link href='/auth/login'>
                        <button className={templates.btn}>
                            Login
                        </button>
                    </Link>
                    <Link href='/auth/signup'>
                        <button className={templates.btn}>
                            Sign Up
                        </button>
                    </Link>
                </div>)
            }
            <div className={`${_.hamburger} ${showDropDown ? _.clickedHamburger : ''}`}>
                <button onClick={() => setShowDropDown(!showDropDown)}>
                    <GiHamburgerMenu />
                </button>
            </div>
        </nav>
    );
};

export default Header;
