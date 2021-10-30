import { useState, useEffect } from "react";
import Link from "next/link";
import { navLinks } from "../utils/staticData";
import { GiHamburgerMenu } from "react-icons/gi";
import _ from "../styles/Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import { reqDelete } from "../utils/customRequests";
import { getName, getImage } from "../utils/utils";
import urls from "../utils/urls";
import { useRouter } from "next/router";

const Header = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { isLoggedIn, width, account } = useSelector((state) => state.auth);
    const [showDropDown, setShowDropDown] = useState(false);

    const logout = async () => {
        const data = await reqDelete(urls.logout + account._id);
        if (data.success) {
            router.replace('/');
            setShowDropDown(false);
            dispatch({ type: "LOGOUT" });
        }
    };

    useEffect(() => {
        setShowDropDown(false);
    }, [router.pathname]);

    return (
        <nav className={_.header}>
            <div className={_.logo}>
                <Link href="/">
                    <img
                        src="/logo.png"
                        alt="Logo"
                    />
                </Link>
            </div>
            {(width > 767 || showDropDown) && <Navbar />}
            {(width > 567 || showDropDown) &&
                (isLoggedIn && account ? (
                    <div className={_.profileHeader}>
                        <Link href="/myProfile">
                            {getName(account)}
                        </Link>
                        <img
                            className={_.profilePicture}
                            src={getImage(account.profilePicture)}
                            alt="Profile"
                        />
                        <button onClick={logout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className={_.loginSignupButtons}>
                        <Link href="/auth/login">
                            <button>Login</button>
                        </Link>
                        <Link href="/auth/signup">
                            <button>Sign Up</button>
                        </Link>
                    </div>
                ))}
            <div
                className={`${_.hamburger} ${
                    showDropDown ? _.clickedHamburger : ""
                }`}
            >
                <button onClick={() => setShowDropDown(!showDropDown)}>
                    <GiHamburgerMenu />
                </button>
            </div>
        </nav>
    );
};

export default Header;
