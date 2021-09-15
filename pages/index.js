import {useEffect} from 'react'
import _ from "../styles/LandingPage.module.scss";
import { features } from "../utils/staticData";

import ScrollAnimation from 'react-animate-on-scroll';

import Link from 'next/link'

const LandingPage = () => {
    return (
        <div className={_.landingPage}>
            <section className={_.hero}>
                <div className={_.heroContent}>
                    <h1>Welcome To Internmania</h1>
                    <p>
                        Lorem, ipsum, dolor sit amet consectetur adipisicing
                        elit. Doloribus quaerat, exercitationem sunt consectetur
                        ad deleniti commodi possimus laboriosam minima omnis qui
                        ipsa assumenda, aspernatur earum dolorem aliquam. Ut
                        perferendis, sed.
                    </p>
                    <Link href='/auth/signup'>Get Started</Link>
                </div>
                <div className={_.heroImage}>
                    <img
                        className={_.illustration}
                        src="/illustrations/illustration2.png"
                    />
                </div>
            </section>
            <section className={_.features}>
                <ScrollAnimation animateIn='bounce' animateOnce={true}>
                    <h1>Key Features</h1>
                </ScrollAnimation>
                <hr />
                {features.map((feature, i) => {
                    return (
                        <ScrollAnimation 
                            key={feature.id} 
                            animateIn={i % 2 == 1 ? 'bounceInLeft' : 'bounceInRight'} 
                            className={_.feature}
                            animateOnce={true}
                        >
                            <img className={_.featureImage} src={feature.image} />
                            <div className={_.featureContent}>
                                <h2>{feature.title}</h2>
                                <p>{feature.text}</p>
                            </div>  
                        </ScrollAnimation>
                    );
                })}
            </section>
        </div>
    );
};

export default LandingPage;
