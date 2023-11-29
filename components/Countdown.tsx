import 'styles/index.css'
import 'styles/countdown.css';

interface CountdownProps {
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
    past: boolean
}

const Countdown = ({ days, hours, minutes, seconds, past }: CountdownProps) => {
    return (
        <div className="countdown">
            <h3>{past ? "Past Deadline" : "Submission Deadline"}</h3>
            <div className="countdownContainer">
                <div className="numGroup">
                    <p className="bigNum"><b>{days}</b></p>
                    <p className="smallDesc">days</p>
                </div>
                <div className="numGroup">
                    <p className="bigNum"><b>{hours}</b></p>
                    <p className="smallDesc">hours</p>
                </div>
                <div className="numGroup">
                    <p className="bigNum"><b>{minutes}</b></p>
                    <p className="smallDesc">minutes</p>
                </div>
                <div className="numGroup">
                    <p className="bigNum"><b>{seconds}</b></p>
                    <p className="smallDesc">seconds</p>
                </div>
            </div>
        </div>
    )
}

export default Countdown;