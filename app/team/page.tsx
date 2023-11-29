'use client';

import 'styles/index.css';
import 'styles/team.css';

import { Button, Pagination } from '@mantine/core';

import TeamMember from 'components/TeamMember';
import BlankMember from 'components/BlankMember';
import SearchBox from 'components/SearchBox';

import { useState } from 'react';

const emptyNames = ["1st", "2nd", "3rd", "4th", "5th", "6th"];

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
                date: new Date(2023, 11, 22),
                time: "5:00PM"
            },
            {
                id: 3,
                name: "Member",
                date: new Date(2023, 11, 21),
                time: "6:00PM"
            },

        ]
    });

    const [activeRequestPage, setRequestPage] = useState(1);
    const [teamRequests, setTeamRequests] = useState([
        {
            id: 1,
            name: "Alex",
            name_id: 1,
            message: "I would like to join your team.",
            date: new Date(2023, 11, 22),
            time: "5:00PM",
            rejected: false
        },
        {
            id: 1,
            name: "Person",
            name_id: 1,
            message: "I would like to join your team.",
            date: new Date(2023, 11, 22),
            time: "5:00PM",
            rejected: false
        },
        {
            id: 1,
            name: "Requester",
            name_id: 1,
            message: "I would like to join your team.",
            date: new Date(2023, 11, 22),
            time: "5:00PM",
            rejected: false
        },
        {
            id: 1,
            name: "Requester 2",
            name_id: 1,
            message: "I would like to join your team.",
            date: new Date(2023, 11, 22),
            time: "5:00PM",
            rejected: false
        },
    ]);

    const invites = [
        {
            name: "Name Here that is really long and might overflow",
            available: true
        },
        {
            name: "Another name",
            available: false
        },
        {
            name: "Yet Another name",
            available: true
        },
    ]

    const [searchFilter, setSearchFilter] = useState(""); //Update later to use useForm

    const [joinFilter, setJoinFilter] = useState("all");

    function joinActive() {
        setJoinFilter("active");
    }
    function joinDenied() {
        setJoinFilter("denied");
    }
    function joinAll() {
        setJoinFilter("all");
    }

    return foundTeam ? (
        <div className="teamPage">
            <main className="teamMain">
                <section className="teamBox info">
                    <h3>Team Info</h3>
                </section>
                <section className="teamBox links">
                    <h3>Quick Links</h3>
                </section>
            </main>

            <div className="verticalRule3" />

            <aside className="teamAside">
                <section className="teamBox invite">
                    <h3>Invite Teammates</h3>
                    <SearchBox className="searchBox"/>
                    {invites.length === 0 ? searchFilter === "" ? (
                        <p><i>Starting typing to see participants</i></p>
                    ) : (
                        <p><i>No participants found</i></p>
                    )
                     : invites.map((val, ind) => (
                        <TeamMember key={ind} name={val.name} member={false} displayAvailable={true} available={val.available} />
                    ))}
                    
                </section>

                <section className="teamBox member">
                    <h3>Current Members</h3>
                    <br />
                    {teamData.members.map((val) => (
                        <TeamMember name={val.name} time={val.time} member={true} />
                    ))}
                    {emptyNames.slice(teamData.members.length).map((val) => (
                        <BlankMember name={val + " Member Slot"} />
                    ))}
                </section>
                
                <section className="teamBox request">
                    <h3>Join Requests</h3>
                    <div className="requestHolder">
                        <Button.Group className="buttonGroup">
                            <Button variant="default" className={joinFilter === "active" ? "joinButton selected" : "joinButton"} onClick={joinActive}>ACTIVE</Button>
                            <Button variant="default" className={joinFilter === "denied" ? "joinButton selected" : "joinButton"} onClick={joinDenied}>DENIED</Button>
                            <Button variant="default" className={joinFilter === "all" ? "joinButton selected" : "joinButton"} onClick={joinAll}>ALL</Button>
                        </Button.Group>
                        <div className="nameHolder">
                            {teamRequests.map((val) => (
                                <TeamMember name={val.name} time={val.time} description={val.message} member={false} />
                            ))}
                        </div>
                        <Pagination value={activeRequestPage} onChange={setRequestPage} total={4} color="grape.5" />
                    </div>
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