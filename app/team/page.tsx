'use client';

import 'styles/index.css';
import 'styles/team.css';

import { useState } from 'react';

const Team = () => {
    const [foundTeam, setFoundTeam] = useState(true);
    const [teamData, setTeamData] = useState({
        id: 1,
        name: "Your Team Name Would Go Here",
        description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
        members: [
            {
                id: 2,
                name: "Alex",
                date: new Date(2023, 11, 22)
            },
            {
                id: 3,
                name: "Member",
                date: new Date(2023, 11, 21)
            },

        ]
    });
    const [teamRequests, setTeamRequests] = useState([
        {
            id: 1,
            name: "Alex",
            name_id: 1,
            message: "I would like to join your team.",
            date: new Date(2023, 11, 22),
            rejected: false
        }
    ]);

    return foundTeam ? (
        <div className="teamPage">
            <main className="teamMain">
                <section className="teamBox info">
                    <h3>Team Info</h3>
                </section>
                <section className="teamBox member">
                    <h3>Current Members</h3>
                </section>
                <section className="teamBox links">
                    <h3>Quick Links</h3>
                </section>
            </main>

            <div className="verticalRule3"/>
            
            <aside className="teamAside">
                <section className="teamBox invite">
                    <h3>Invite Teammates</h3>
                </section>
                <section className="teamBox request">
                    <h3>Join Requests</h3>
                </section>
            </aside>
        </div>
    ) : (
        <main>
            You Are Not Currently on a Team
        </main>
    )
}

export default Team;