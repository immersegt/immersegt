import '../styles/sponsors.css';

import GTXR from '../public/gtxr.png'
import SX from '../public/sx.png'
import { Container } from '@mantine/core';

const list = [GTXR, SX]
const dwidth = 140;
const widths = [1.2, 1.5]

const Sponsors = () => {
    return (
        <section className="sponsorsContainer"  >
            <Container size="xl" className="sponsorsHeader">
                <h2>Co-Hosted By</h2>
                <div className="sponsorsList">
                    {list.map((val, index) => (
                        <img src={val.src} width={(dwidth * widths[index]) + "px"} key={index} />
                    ))}
                </div>
            </Container>
        </section>
    )
}
export default Sponsors;