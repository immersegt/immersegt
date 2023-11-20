'use client';
import 'styles/index.css'

const Team = () => {
    const foundTeam = false;
    return (
        <div>
            {foundTeam ? (
                <div>
                    Team Page
                </div>
            ) : (
                <div>
                    You Are Not Currently on a Team
                </div>
            )}
        </div>
    )
}

export default Team;