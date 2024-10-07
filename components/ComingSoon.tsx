import '../styles/registered.css';
import '../styles/comingsoon.css';
import '../styles/index.css';

import Link from "next/link";

const ComingSoon = () => {
    return (
        <div className="container">
        <div className="registeredBox">
            <div className="registeredTitle">
                Coming Soon.
            </div>
            <p className="registeredLargeText">Thank you for your interest in ImmerseGT! Applications for ImmerseGT 2025 will be opening soon so stay tuned for the schedule, to be posted soon. You will be able to access this page
            if accepted. If you haven't applied yet, make sure to <Link href="/apply">apply here.</Link></p>
        </div>
         </div>
    )
}

export default ComingSoon;