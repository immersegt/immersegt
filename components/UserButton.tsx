import '../styles/index.css';
import '../styles/userbutton.css';

import { FaUser } from "react-icons/fa";
import Link from 'next/link';

const UserButton = () => {
    return (
        <Link href="/account">
            <div className="user">
                <FaUser className="userImage" />
            </div>
        </Link>
    )
}

export default UserButton;