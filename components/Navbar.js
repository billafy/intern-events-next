import {Fragment} from 'react';
import {navLinks} from '../utils/staticData'
import Link from 'next/link'

import {useSelector} from 'react-redux'

const Navbar = () => {
    const {auth: {isLoggedIn, account}} = useSelector(state => state);

	return (
		<ul>
            {navLinks.map((link) => {
                return (
                    <li key={link.text}>
                        <Link href={link.href}>
                            {link.text}
                        </Link>
                        <span>
                            <ul>
                                {link.subLinks.map(subLink => {
                                    if(subLink.accountType && (!isLoggedIn || !subLink.accountType.includes(account.accountType))) 
                                        return <Fragment key={subLink.text}></Fragment>
                                    return (
                                        <li key={subLink.text}>
                                            <Link href={subLink.href}>{subLink.text}</Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </span>
                    </li>
                );
            })}
        </ul>
	);	
};

export default Navbar;