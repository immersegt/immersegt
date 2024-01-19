import '../styles/registered.css';
import '../styles/index.css';

import Link from "next/link";

const ComingSoon = () => {
    return (
        <div className="registeredBox">
            <div className="registeredTitle">
                Coming Soon.
            </div>
            <p className="registeredLargeText">Thank you for your interest in ImmerseGT! We are currently accepting applications for our 2024 hackathon. You will be able to access this page
            if accepted. If you haven't applied yet, make sure to <Link href="/apply">apply here.</Link></p>
        </div>
    )
}

export default ComingSoon;