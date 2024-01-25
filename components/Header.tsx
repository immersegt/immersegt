import '../styles/index.css';
import '../styles/header.css';

import GogglesImg from '../public/Dalle.png';
import { Container, UnstyledButton } from '@mantine/core';
import { FaLongArrowAltRight } from "react-icons/fa";

const Header = () => {
    return (
        <section className="homeHeaderContainer">
            <Container size="xl" className="homeHeader">
                <div className="homeInfo">
                    <span className="homeSubtitle">Immerse yourself in the world of XR</span>
                    <h1 className="homeTitle">Hack with us at <br /><span className="homeTitleEmphasis">ImmerseGT</span></h1>
                    <p className="homeDescription">Participate in ImmerseGT, an innovative XR hackathon hosted by the Startup Exchange and GTXR, on Georgia Tech's campus from April 5th-7th. Compete for your share of prizes as you build and test XR applications using state-of-the-art headsets.</p>
                    <div className="buttonGroup">
                        <UnstyledButton className="redirectButton main" component="a" href="/apply">Get Started&nbsp;<FaLongArrowAltRight /></UnstyledButton>
                        <UnstyledButton className="redirectButton" component="a" href="#tracks">Learn More</UnstyledButton>
                    </div>
                </div>
                <img src={GogglesImg.src} width="640px" className="homeImage" />
            </Container>
        </section>
    )
}

export default Header;