import '../styles/index.css';
import '../styles/header.css';

import GogglesImg from '../public/goggles.png';
import {Button} from '@mantine/core';
import { FaLongArrowAltRight } from "react-icons/fa";

const Header = () => {
    return (
        <section className="homeHeader">
            <div className="homeInfo">
                <span className="homeSubtitle">World's Largest XR Hackathon</span>
                <h1 className="homeTitle">Hack with us at <br/><span className="homeTitleEmphasis">ImmerseGT</span></h1>
                <p className="homeDescription">Participate in ImmerseGT, an innovative XR hackathon hosted by the Startup Exchange and GTXR, on Georgia Tech's campus. Compete for your share of over $20,000 in prizes as you build XR applications using state-of-the-art headsets.</p>
                <div className="buttonGroup">
                <Button className="homeButton" variant="gradient" gradient={{ from: 'violet', to: 'grape', deg: 95 }} size="xl" component="a" href="/account">Get Started&nbsp;<FaLongArrowAltRight /></Button>
                <Button className="homeButton" variant="outline" color="grape.6" size="xl" component="a" href="#tracks">Learn More</Button>
                </div>
            </div>
            <img src={GogglesImg.src} width="600px" className="homeImage" />
        </section>
    )
}

export default Header;