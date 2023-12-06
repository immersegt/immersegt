'use client';

import 'styles/index.css';
import 'styles/forbidden.css';

const Forbidden = () => {
    return (
        <div className="forbiddenPage">
                <h2><b>Forbidden.</b></h2>
                <p>You do not have permission to access this page.</p><p> Please make sure you are logged in.</p>
        </div>
    )
}

export default Forbidden;