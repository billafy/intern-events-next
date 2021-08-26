import Link from "next/link";

import { navLinks } from "../utils/links";

import { GiHamburgerMenu } from "react-icons/gi";

import _ from "../styles/Navbar.module.scss";

const Navbar = () => {
    return (
        <nav className={_.navbar}>
            <div className={_.logo}>
                <Link href="">
                    <img
                        src="https://www.freepnglogos.com/uploads/w-letter-logo-png/w-letter-vector-ribbon-alphabet-logo-download-alphabet-logos-33.png"
                        alt="logo_here"
                    />
                </Link>
            </div>
            <ul className={_.links}>
                {navLinks.map((link) => {
                    return (
                        <li>
                            <Link href={link.href}>{link.text}</Link>
                        </li>
                    );
                })}
            </ul>
            <div className={_.hamburger}>
                <button>
                    <GiHamburgerMenu />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
