import 'styles/index.css'
import 'styles/countdown.css';

import { useState, useEffect } from 'react';
import { LoadingOverlay, Box } from '@mantine/core';

interface CountdownProps {
    target1: string,
    target2: string
}

interface validTimeProps {
    days: number,
    hours: number,
    minutes: number,
    seconds: number
}

const validTime = (time:validTimeProps) => {
    return time.days !== 0 || time.hours !== 0 || time.minutes !== 0 || time.seconds !== 0;
}

const Countdown = ({ target1, target2 }: CountdownProps) => {

    const [untilEnd, setUntilEnd] = useState(false);

    const [time, setTime] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [past, setPast] = useState(false);

    const calculateTime = (target: string) => {

        const trueDifference = new Date(target).getTime() - Date.now();
        const difference = Math.abs(trueDifference);

        const newTime = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
        }

        setTime(newTime);
        if (trueDifference !== difference) {
            setPast(true);
        }

        if (!untilEnd && trueDifference < 0) {
            setUntilEnd(true);
            setPast(false);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            calculateTime(untilEnd ? target2 : target1);
        }, 1000);
        return () => clearInterval(timer);
    }, [untilEnd]);

    return (
        <Box pos="relative" className="countdown">
            <LoadingOverlay 
            visible={!validTime(time)} 
            zIndex={1000} 
            overlayProps={{ radius: "sm", blur: 2 }} 
            loaderProps={{ color: 'grape.5', type: 'oval' }}/>
            <h3>
                {untilEnd ? (past ? "Since Deadline" : "Submission Deadline") : (past ? "Since Start" : "Hackathon Start")}
            </h3>
            <div className="countdownContainer">
                <div className="numGroup">
                    <p className="bigNum"><b>{time.days}</b></p>
                    <p className="smallDesc">days</p>
                </div>
                <div className="numGroup">
                    <p className="bigNum"><b>{time.hours}</b></p>
                    <p className="smallDesc">hours</p>
                </div>
                <div className="numGroup">
                    <p className="bigNum"><b>{time.minutes}</b></p>
                    <p className="smallDesc">minutes</p>
                </div>
                <div className="numGroup">
                    <p className="bigNum"><b>{time.seconds}</b></p>
                    <p className="smallDesc">seconds</p>
                </div>
            </div>
        </Box>
    )
}

export default Countdown;