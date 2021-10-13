import { useEffect } from "react";
import _ from "../styles/LandingPage.module.scss";
import { features } from "../utils/staticData";

import ScrollAnimation from "react-animate-on-scroll";

import Link from "next/link";

const LandingPage = () => {
    return (
        <div className={_.landingPage}>
            <section className={_.hero}>
                <div className={_.heroContent}>
                    <h1>Welcome To Intern.ly</h1>
                    <p>
                        Searching for a platform that would update you about all
                        events occurring in your choice of top institutions?
                        then you are at the right place. Intern.ly will update
                        you about internships, workshops, fests, competitions
                        and more such events. So, what are you waiting for,
                        let's begin.
                    </p>
                    <Link href="/auth/signup">Let's Begin</Link>
                </div>
                <div className={_.heroImage}>
                    <img
                        className={_.illustration}
                        src="/illustrations/illustration2.png"
                    />
                </div>
            </section>
            <section className={_.features}>
                <ScrollAnimation animateIn="bounce" animateOnce={true}>
                    <h1>Key Features</h1>
                </ScrollAnimation>
                <hr />
                {features.map((feature, i) => {
                    return (
                        <ScrollAnimation
                            key={feature.id}
                            animateIn={
                                i % 2 == 1 ? "bounceInLeft" : "bounceInRight"
                            }
                            className={_.feature}
                            animateOnce={true}
                        >
                            <img
                                className={_.featureImage}
                                src={feature.image}
                            />
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
