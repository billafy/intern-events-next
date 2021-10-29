import _ from "../styles/Footer.module.scss";

import { socialLinks, footerLinks } from "../utils/staticData";

const Footer = () => {
    return (
        <footer className={_.footer}>
            <div className={_.footerInfo}>
                {footerLinks.map((footerLink) => {
                    return (
                        <div key={footerLink.id} className={_.footerColumn}>
                            <h4>{footerLink.heading}</h4>
                            <ul>
                                {footerLink.links.map((link) => {
                                    return (
                                        <li key={link.id}>
                                            <a href={link.href}>{link.text}</a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })}
                <div className={`${_.footerColumn} ${_.social}`}>
                    <h4>Join Us</h4>
                    <ul className={_.socialLinks}>
                        {socialLinks.map((link) => {
                            return (
                                <li key={link.id}>
                                    <a
                                        href={link.href}
                                        style={{ color: link.color }}
                                    >
                                        {link.icon}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className={_.signature}>
                <p>
                    Handcrafted with{" "}
                    <span style={{ color: "red", fontSize: "1.2em" }}>❤</span>{" "}
                    by LamiFY(Yash), Vishal and Vishranth
                </p>
            </div>
        </footer>
    );
};

export default Footer;