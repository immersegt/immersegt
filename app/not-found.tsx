'use client';

import 'styles/index.css';
import 'styles/forbidden.css';

const NotFound = () => {
    return (
        <div className="forbiddenPage">
                <h2><b>404.</b></h2>
                <p>This page could not be found.</p>
                <a className="return" href="/">Return Home</a>
        </div>
    )
}

export default NotFound;