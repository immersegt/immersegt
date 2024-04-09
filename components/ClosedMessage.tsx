import '../styles/registered.css';
import '../styles/comingsoon.css';
import '../styles/index.css';

import Link from "next/link";

const ComingSoon = () => {
    return (
        <div className="container">
            <div className="registeredBox">
                <div className="registeredTitle">
                    Applications Closed.
                </div>
                <p className="registeredLargeText">Thank you for your interest in ImmerseGT! We are no unfortunately no longer accepting applications. We anticipate the event will return next year.</p>
            </div>
        </div>
    )
}

export default ComingSoon;