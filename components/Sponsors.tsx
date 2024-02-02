import '../styles/index.css';
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
import GTXR from '../public/gtxr.png'
import StartupExchange from '../public/sx.png'
import { Container, Text } from '@mantine/core';

import ComingSoon from '../public/ComingSoon.png';

const showEmpty = false;

const list = [GTXR, StartupExchange]
const dwidth = 140;
const widths = [1.2, 1.5]

const Sponsors = () => {
    return (
        <section className="sponsorsContainer"  >
            <Container size="xl" className="sponsorsHeader">
                <h2>Meet Our Team</h2>
                <div className="sponsorsList">
                    {showEmpty ? (
                        <img src={ComingSoon.src} width={(dwidth * 1.5) + "px"} key={1} />
                    ) : (
                        list.map((val, index) => (
                            <img src={val.src} width={(dwidth * widths[index]) + "px"} key={index} />
                        ))
                    )}

                </div>
            </Container>
        </section>
    )
}
export default Sponsors;