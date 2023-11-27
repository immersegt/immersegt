import '../styles/index.css';
import '../styles/judges.css';

import {Button} from '@mantine/core';
import {useState} from 'react';
import JudgeCard from '../components/JudgeCard';

import Robert from '../public/robert.png';
import Matt from '../public/matt.png';
import JP from '../public/jp.png';
import Thomas from '../public/thomas.png';
import AdiV from '../public/adiV.png';
import Dot from '../public/dot.png';
import Bruce from '../public/bruce.png';
import Elizabeth from '../public/elizabeth.png';
import Cole from '../public/cole.png';
import Karthik from '../public/karthik.png';
import RajD from '../public/rajD.png';
import Zach from '../public/zach.png';
import Jeasy from '../public/jeasy.png';
import Markus from '../public/markus.png';
import Chloe from '../public/chloe.png';
import Will from '../public/will.png';

import {useEffect} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const JudgeData = [
    {
        id: 1,
        name: "Robert Rios",
        company: "NVIDIA",
        image: Robert.src
    },
    {
        id: 2,
        name: "Matt Golino",
        company: "ZENVR",
        image: Matt.src
    },
    {
        id: 3,
        name: "JP Minetos",
        company: "HARTMANN CAPITAL",
        image: JP.src
    },
    {
        id: 4,
        name: "Thomas Suarez",
        company: "TELEPORTAL",
        image: Thomas.src
    },
    {
        id: 5,
        name: "Adi Vivek",
        company: "CAMBRIDGE BLOCKCHAIN SOCIETY",
        image: AdiV.src
    },
    {
        id: 6,
        name: "Dot Bustelo",
        company: "LOUPE",
        image: Dot.src
    },
    {
        id: 7,
        name: "Bruce Walker",
        company: "HCI @ GEORGIA TECH",
        image: Bruce.src
    },
    {
        id: 8,
        name: "Elizebeth Strickler",
        company: "MEDIA INNOVATION, GEORGIA STATE UNIVERSITY",
        image: Elizabeth.src
    },
    {
        id: 9,
        name: "Cole Schendl",
        company: "404DAO",
        image: Cole.src
    },
    {
        id: 10,
        name: "Karthik Ramachandran",
        company: "SUSTAINABLE-X, GEORGIA TECH",
        image: Karthik.src
    },
    {
        id: 11,
        name: "Raj Deshpande",
        company: "PULSEWORKS",
        image: RajD.src
    },
    {
        id: 12,
        name: "Zach Farley",
        company: "KITTLABS",
        image: Zach.src
    },
    {
        id: 13,
        name: "Jeasy Sehgal",
        company: "VIRTUAL PRODUCTION, GEORGIA STATE UNIVERSITY",
        image: Jeasy.src
    },
    {
        id: 14,
        name: "Markus Klusemann",
        company: "OVERTIME",
        image: Markus.src
    },
    {
        id: 15,
        name: "Chloe Wade",
        company: "DELOITTE",
        image: Chloe.src
    },
    {
        id: 16,
        name: "Will Chick",
        company: "DELOITTE",
        image: Will.src
    },

];

const Judges = () => {
    useEffect(() => {
        AOS.init();
      }, []);

    const [minimize, setMinimize] = useState(true);

    const toggleMinimize = () => {
        setMinimize(!minimize);
    }

    return (
        <section className="judgesBanner" data-aos="fade-up" data-aos-easing="ease-sine" data-aos-anchor-placement="center-bottom" data-aos-once="true" data-aos-offset="0px">
            <h2>Meet Our Judges</h2>
            <p className="judgeOverview">Practice your idea pitch in front of a variety of industry experts and innovators in the ImmerseGT
            judging round. Attend multiple event workshops to further learn from and network with experts as you gain hands-on experience in building XR technologies 
            from scratch and listen to people from all throughout the 404.</p>
            <div className={"judgesHolder " + (minimize ? "minimized" : "expanded")}>
                {JudgeData.map((val) => (
                    <JudgeCard name={val.name} company={val.company} image={val.image}/>
                ))}
            </div>
            <Button color="#CC5DE8" size="md" radius="md" onClick={toggleMinimize}>
                {minimize ? "EXPAND LIST" : "COLLAPSE LIST"}
              </Button>
        </section>
    )
}
export default Judges;