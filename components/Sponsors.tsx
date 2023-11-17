import '../styles/sponsors.css';
import Google from '../public/google.png';
import Meta from '../public/meta.png';
import Accenture from '../public/accenture.png';
import Essenvia from '../public/essenvia.png';
import Nvidia from '../public/nvidia.png';
import Immersed from '../public/immersed.svg';
import Teleportal from '../public/teleportal.png';
import Mark3 from '../public/mark3.svg';
import Inspirit from '../public/inspirit.png';
import Futurus from '../public/futurus.png';
import Dimension from '../public/3dimension.png';
import Zenvr from '../public/zenvr.png';

const list = [Google, Meta, Accenture, Essenvia, Nvidia, Immersed, Teleportal, Mark3, Inspirit, Futurus, Dimension, Zenvr]
const dwidth = 140;
const widths = [1, 1, 1, 1, 0.85, 1, 0.7, 1, 1, 1, 1, 1]

const Sponsors = () => {
    return (
        <div className="sponsorsHeader">
        <div className="sponsorsTitle">Meet Our Sponsors</div>
        <div className="sponsorsList">
            {list.map((val, index) => (
                <img src={val.src} width={(dwidth * widths[index])+"px"} key={index}/>
            ))}
        </div>
        </div>
    )
}
export default Sponsors;