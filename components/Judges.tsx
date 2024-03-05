import '../styles/judges.css';

import {Button, Container} from '@mantine/core';
import {useState} from 'react';
import JudgeCard from '../components/JudgeCard';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const EmptyData = [
    {
        id: 0,
        name: "",
        company: "",
        image: null
    },
    {
        id: 1,
        name: "",
        company: "",
        image: null
    },
    {
        id: 2,
        name: "",
        company: "",
        image: null
    },
    {
        id: 3,
        name: "",
        company: "",
        image: null
    },
    {
        id: 4,
        name: "",
        company: "",
        image: null
    },
    {
        id: 5,
        name: "",
        company: "",
        image: null
    },
]

const Judges = () => {
    useEffect(() => {
        AOS.init();
    }, []);
    const [minimize, setMinimize] = useState(true);

    const toggleMinimize = () => {
        setMinimize(!minimize);
    }

    return (
        <Container size="xl" className="judgesBanner">
            <h2>Meet Our Judges</h2>
            <p className="judgeOverview">Practice your idea pitch in front of a variety of industry experts and innovators in the ImmerseGT
            judging round.</p>
            <p className="judgeOverview">Attend multiple event workshops to further learn from and network with experts as you gain hands-on experience in building XR technologies 
            from scratch and listen to people from all throughout the 404.</p>
            <div data-aos="fade-up" data-aos-easing="ease-sine" data-aos-anchor-placement="center-bottom" data-aos-once="true">
            <div className={"judgesHolder " + (minimize ? "minimized" : "expanded")}>
                {EmptyData.map((val, ind) => (
                    <JudgeCard key={ind} name={val.name} company={val.company} image={val.image}/>
                ))}
            </div>
            </div>
            <Button color="#CC5DE8" size="md" radius="md" onClick={toggleMinimize}>
                {minimize ? "EXPAND LIST" : "COLLAPSE LIST"}
            </Button>
        </Container>
    )
}
export default Judges;