import '../styles/workshops.css';
import Buzz from '../public/buzz.png';
import Goggles2 from '../public/goggles2.png';

const Workshops = () => {
    return (
        <div className="workshopsHeader">
            <div className="workshopsHolder">
                <img src={Buzz.src} width="250px" className="homeImage" />
                <div className="workshopsBox">
                    <div className="workshopsTitle"><b>Event Workshops</b></div>
                    <div className="workshopsDescription">
                        Gain hands-on experience in building XR technologies from scratch
                        by learning from industry experts and innovators. Learn topics from Meta's software ecosystem to the hidden
                        optics behind Google glass! In the week leading up to the hackathon, we will also offer 2 daily sessions on
                        the basics of XR development, courtesy of GTXR.</div>
                </div>
            </div>
        </div>
    )
}
export default Workshops;