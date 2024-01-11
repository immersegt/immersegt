import '../styles/registered.css';
import '../styles/index.css';

import Link from "next/link";

const Registered = () => {
    return (
        <div className="registeredBox">
            <div className="registeredTitle">
                Registered.
            </div>
            <p className="registeredLargeText">Thank you for registering for ImmerseGT 2024! We will be in touch with further updates as we get closer to the hackathon start date.
                In the meantime, feel free to <Link href="https://discord.com">join our Discord</Link> to network with other participants.</p>
        </div>
    )
}

export default Registered;