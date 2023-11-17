'use client';
import '../styles/tracks.css';
import TrackCard from '../components/TrackCard';
import { Carousel } from '@mantine/carousel';
import "@mantine/carousel/styles.css";
import { useState } from 'react';
import classes from '../styles/carousel.module.css';
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const trackList = [
    {
        id: 1,
        title: "Merging Realities",
        description: "Build at the intersection of physical reality and the virtual universe, while expanding the social utilities of XR technology."
    },
    {
        id: 2,
        title: "On-the-Go Augmentation",
        description: "Develop novel XR (Extended Reality) applications to elevate the experience of everyday users on the web or on mobile."
    },
    {
        id: 3,
        title: "Virtual Adventures",
        description: "Develop novel XR (Extended Reality) applications, assets, and use cases for gaming, sports, fitness, and health both within and outside the Metaverse."
    },
    {
        id: 4,
        title: "Intelligent Immersion",
        description: "Sponsored by Fusen World. Merge the worlds of XR and AI to curate an application that reimagines intelligent VR, AR, or MR applications, assets, and use cases."
    },
    {
        id: 5,
        title: "Next-Gen XR Apps",
        description: "Sponsored by Georgia Tech CREATE-X. Develop an XR (Extended Reality) application that solves an industry or consumer problem."
    },
    {
        id: 6,
        title: "Omniverse Odyssey",
        description: "Sponsored by NVIDIA. Develop novel XR (Extended Reality) applications, assets, and use cases at the intersection of physical reality and the virtual universe."
    },
    {
        id: 7,
        title: "Innovative Assistive Technology",
        description: "Curated by Georgia Tech's Sonification Lab. Develop assistive XR (Extended Reality) applications, assets, and use cases to enhance the livelihood of individuals with disabilities."
    },
    {
        id: 8,
        title: "Mindful Immersion in XR",
        description: "Sponsored by ZenVR. Develop novel XR (Extended Reality) applications, assets, and use cases that promote well-being, quality mental health, and a healthy lifestyle."
    },
];



const Tracks = () => {
    const [active, setActive] = useState(0);
    const autoplay = useRef(Autoplay({ delay: 4000 }));
    return (
        <div className="tracksHeader">
            <div className="tracksTitle">Choose Your Track</div>
            <div className="tracksDescription">From Web3 to Sports and Fitness, Our eight categories span a variety of industries. Choose your top three tracks upon registration, letting you play to your strengths or try something new as you compete for track-specific prizes.</div>
            <Carousel
                classNames={classes}
                slideSize="100%"
                height={260}
                slideGap="md"
                controlsOffset="lg"
                loop
                withIndicators
                onSlideChange={(slide) => {
                    setActive(slide);
                    console.log(slide);
                }} 
                plugins={[autoplay.current as any]}
                onMouseEnter={autoplay.current.stop}
                onMouseLeave={autoplay.current.reset}
                align="center">
                {trackList.map((val) => (
                    <TrackCard title={val.title} description={val.description} key={val.id} active={val.id === active + 1} />
                ))}
            </Carousel>
        </div>
    )
}
export default Tracks;