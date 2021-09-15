import Link from "next/link";

import { navLinks } from "../utils/staticData";

import { GiHamburgerMenu } from "react-icons/gi";

import _ from "../styles/Header.module.scss";

import templates from "../styles/templates/Templates.module.scss";

import {useSelector} from 'react-redux'

import Navbar from './Navbar'

const Header = () => {
    const {isLoggedIn} = useSelector(state => state.auth)

    console.log(isLoggedIn)

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
            <Navbar/>
            {isLoggedIn
                ?
                <div className='profileButton'>
                    Profile    
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
                </div>
            }
            <div className={_.hamburger}>
                <button>
                    <GiHamburgerMenu />
                </button>
            </div>
        </nav>
    );
};

export default Header;
