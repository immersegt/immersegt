import '../styles/sponsors.css';

import GTXR from '../public/gtxr.png'
import StartupExchange from '../public/sx.png'
import { Container } from '@mantine/core';

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