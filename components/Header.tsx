import '../styles/home.css';
import GogglesImg from '../public/goggles.png';
import {Button} from '@mantine/core';
import { FaLongArrowAltRight } from "react-icons/fa";

const Header = () => {
    return (
        <div className="homeHeader">
            <div className="homeInfo">
                <div className="homeSubtitle">World's Largest XR Hackathon</div>
                <div className="homeTitle"><b>Hack with us at <div className="homeTitleEmphasis">ImmerseGT</div></b></div>
                <div className="homeText">Participate in ImmerseGT, an innovative XR hackathon hosted by the Startup Exchange and GTXR, on Georgia Tech's campus. Compete for your share of over $20,000 in prizes as you build XR applications using state-of-the-art headsets.</div>
                <div className="buttonGroup">
                <Button variant="gradient" gradient={{ from: 'violet', to: 'grape', deg: 95 }} size="xl">Get Started&nbsp;<FaLongArrowAltRight /></Button>
                <Button variant="outline" color="grape.6" size="xl">Learn More</Button>
                </div>
            </div>
            <img src={GogglesImg.src} width="600px" className="homeImage" />
        </div>
    )
}

export default Header;