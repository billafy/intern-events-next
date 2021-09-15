import React from 'react';
import {navLinks} from '../utils/staticData'
import Link from 'next/link'

const Navbar = ({}) => {
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