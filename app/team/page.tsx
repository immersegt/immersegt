'use client';

import 'styles/index.css';
import 'styles/team.css';

import { Button, Pagination, Modal, Group, Checkbox, TextInput, Select, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications'

import TeamMember from 'components/TeamMember';
import BlankMember from 'components/BlankMember';
import SearchBox from 'components/SearchBox';
import TeamRedirect from 'components/TeamRedirect';
import classes from 'styles/searchbox.module.css';

import { useState, useEffect } from 'react';
import { searchUsers } from 'utils/Utils';

import { useAppSelector, useAppDispatch } from 'app/hooks';

const emptyNames = ["1st", "2nd", "3rd", "4th", "5th", "6th"];

const Team = () => {
    const team = useAppSelector((state) => state.team);
    const [opened, { open, close }] = useDisclosure(false);
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

    interface inviteProps {
        id: string,
        name: string,
        available: boolean
    }

    const [invites, setInvites] = useState<Array<inviteProps>>([]);

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

    const [confirmLeave, { open: openLeave, close: closeLeave }] = useDisclosure(false);

    function saveInfo() {
        console.log("saved info");
        notifications.show({
            title: 'Saved Info',
            message: 'You have successfully edited your team info',
            color: 'grape.5'
        });
        close();
    }

    function confirmTeam() {
        setDeclared(true);
        console.log("saved info");
        notifications.show({
            title: 'Team Declared',
            message: 'You have successfully declared your team.',
            color: 'grape.5'
        });
        close();
    }

    function leaveTeam() {
        console.log("left team");
        notifications.show({
            title: 'Left Team',
            message: 'You are no longer a member of ' + teamData.name,
            color: 'red'
        });
        setFoundTeam(false);
        closeLeave();
    }

    function submitProject() {
        setSubmitted(true);
        console.log("submitted project");
        notifications.show({
            title: 'Project Submitted',
            message: 'You have successfully submitted your team\'s project.',
            color: 'grape.5'
        });
        close();
    }

    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [checked4, setChecked4] = useState(false);
    const [declared, setDeclared] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [searchVal, setSearchVal] = useState("");

    useEffect(() => {
        if (searchVal != null && searchVal.trim() != "") {
            searchUsers(searchVal).then((value) => {
                if (value != null) {
                    setInvites(value?.map((val) => {
                        return {
                            id: val.id,
                            name: val.name,
                            available: (val.team_id == null || val.team_id == "")
                        };
                    }));
                }
            });
        } else {
            setInvites([]);
        }
    }, [searchVal])

    return team.teamId != null && team.teamId != "" ? (
        <>
            <div className="teamPage">
                <main className="teamMain">
                    <section className="teamBox info">
                        <div className="infoHeader">
                            <h3>Team Overview</h3>
                            <div className="infoButtonGroup">
                                <Button variant="light" color="grape" radius="md" onClick={open}>
                                    EDIT INFO
                                </Button>
                                <Button variant="light" color="red" radius="md" onClick={openLeave}>
                                    LEAVE TEAM
                                </Button>
                            </div>
                        </div>
                        <div className="infoContainer">
                            <div>
                                <p><i>Name</i></p>
                                <p className="importantText">{team.teamName}</p>
                            </div>
                            <div>
                                <p><i>Description</i></p>
                                <p className="importantText">{team.teamDescription}</p>
                            </div>
                        </div>
                    </section>
                    <section className="teamBox declaration">
                        <h3>Team Declaration</h3>
                        {declared ? (
                            <div className="infoContainer">
                                <p className="confirmation">You have successfully declared your team.</p>
                                <p>Thank you for confirming your participation in ImmerseGT. Please contact the event organizers if you have any further questions regarding teams, team formation, or your eligibility for prizes.</p>
                            </div>
                        ) : (
                            <div className="infoContainer">
                                <p>You must officially declare your team before midnight on the first day of the hackathon.</p>
                                <div className="checkboxLine">
                                    <Checkbox color="grape.5" checked={checked1} onChange={(event) => setChecked1(event.currentTarget.checked)} />
                                    <p>I am ready to finalize my team.</p>
                                </div>
                                <div className="checkboxLine">
                                    <Checkbox color="grape.5" checked={checked2} onChange={(event) => setChecked2(event.currentTarget.checked)} />
                                    <p>I acknowledge that my team cannot be changed once submitted.</p>
                                </div>
                                <Button variant="light" color="grape" radius="md" className="confirmButtonStyle" onClick={confirmTeam} disabled={!checked1 || !checked2}>
                                    DECLARE TEAM
                                </Button>
                            </div>
                        )}
                    </section>
                    <section className="teamBox submit">
                        <h3>Project Submission</h3>
                        {submitted ? (
                            <div className="infoContainer">
                                <p className="confirmation">You have successfully submitted your team's project.</p>
                                <p>Thank you for participating in ImmerseGT! Your project can no longer be edited. Stay tuned for more information about judging and prizes.</p>
                            </div>
                        ) : (
                            <div className="infoContainer">
                                <p>You must officially submit your project both on Devpost and through this project submission portal before the end of the hackathon.</p>
                                <TextInput
                                    label="Project Title"
                                    placeholder="Title goes here..."
                                    classNames={classes}
                                    withAsterisk
                                />
                                <TextInput
                                    label="Project Description"
                                    placeholder="Description goes here..."
                                    classNames={classes}
                                    withAsterisk
                                />
                                <TextInput
                                    label="Devpost Link"
                                    placeholder="https://devpost.com/software/..."
                                    classNames={classes}
                                    withAsterisk
                                />
                                <div className="nativeRow">
                                    <Select
                                        label="Level"
                                        data={['Beginner', 'Advanced']}
                                        className="nativeSelectItem"
                                        classNames={classes}
                                        withAsterisk
                                    />
                                    <Select
                                        label="Category"
                                        data={['Merging Realities', 'On-the-Go Augmentation', 'Virtual Adventures', 'Intelligent Immersion', 'Next-Gen XR Apps', 'Omniverse Odyssey', 'Innovative Assistive Technology', 'Mindful Immersion in XR']}
                                        className="nativeSelectItem"
                                        classNames={classes}
                                        withAsterisk
                                    />
                                </div>
                                <div className="checkboxLine">
                                    <Checkbox color="grape.5" checked={checked3} onChange={(event) => setChecked3(event.currentTarget.checked)} />
                                    <p>I am ready to submit our team's project.</p>
                                </div>
                                <div className="checkboxLine">
                                    <Checkbox color="grape.5" checked={checked4} onChange={(event) => setChecked4(event.currentTarget.checked)} />
                                    <p>I acknowledge that our project cannot be changed once submitted.</p>
                                </div>
                                <Button variant="light" color="grape" radius="md" className="confirmButtonStyle" onClick={submitProject} disabled={!checked1 || !checked2 || !checked3 || !checked4}>
                                    SUBMIT PROJECT
                                </Button>
                            </div>
                        )}
                    </section>
                </main>

                <aside className="teamAside">
                    <section className="teamBox invite">
                        <h3>Invite Teammates</h3>
                        <SearchBox className="searchBox" val={searchVal} setVal={setSearchVal} />
                        {searchVal === "" ? (
                            <p><i>Starting typing to see participants</i></p>
                        ) : invites.length === 0 ? (
                            <p><i>No participants found</i></p>
                        )
                            : invites.map((val, ind) => (
                                <TeamMember key={ind} name={val.name} member={false} displayAvailable={true} available={val.available} userId={val.id}/>
                            ))}

                    </section>

                    <section className="teamBox member">
                        <h3>Current Members</h3>
                        <br />
                        {teamData.members.map((val, ind) => (
                            <TeamMember key={ind} name={val.name} time={val.time} member={true} />
                        ))}
                        {emptyNames.slice(teamData.members.length).map((val, ind) => (
                            <BlankMember key={ind} name={val + " Member Slot"} />
                        ))}
                    </section>

                    <section className="teamBox request">
                        <h3>Join Requests</h3>
                        <div className="requestHolder">
                            <Button.Group className="joinedButtonGroup">
                                <Button variant="default" className={joinFilter === "active" ? "joinButton selected" : "joinButton"} onClick={joinActive}>ACTIVE</Button>
                                <Button variant="default" className={joinFilter === "denied" ? "joinButton selected" : "joinButton"} onClick={joinDenied}>DENIED</Button>
                                <Button variant="default" className={joinFilter === "all" ? "joinButton selected" : "joinButton"} onClick={joinAll}>ALL</Button>
                            </Button.Group>
                            <div className="nameHolder">
                                {teamRequests.map((val, ind) => (
                                    <TeamMember key={ind} name={val.name} time={val.time} description={val.message} member={false} />
                                ))}
                            </div>
                            <Pagination value={activeRequestPage} onChange={setRequestPage} total={4} color="grape.5" />
                        </div>
                    </section>
                </aside>
            </div>
            <Modal opened={opened} onClose={close} title="Edit Team">
                <div className="modalGap">
                    <TextInput
                        label="Name"
                        placeholder={teamData.name}
                        classNames={classes}
                    />
                    <Textarea
                        label="Description"
                        placeholder={teamData.description}
                        autosize
                        minRows={4}
                        maxRows={4}
                        classNames={classes}
                    />
                </div>
                <Group justify="space-between" className="buttonRowStyle">
                    <Button variant="light" color="grape" mt="md" radius="md" className="confirmButtonStyle" onClick={saveInfo}>
                        SAVE INFO
                    </Button>
                    <Button variant="light" color="red" mt="md" radius="md" className="confirmButtonStyle" onClick={close}>
                        CANCEL
                    </Button>
                </Group>
            </Modal>
            <Modal opened={confirmLeave} onClose={closeLeave} title="Leave Team">
                <h3>Are you sure you want to leave {teamData.name}?</h3>
                <p>This cannot be undone.</p>
                <Group justify="space-between" className="buttonRowStyle">
                    <Button variant="light" color="red" mt="md" radius="md" className="confirmButtonStyle" onClick={leaveTeam}>
                        LEAVE TEAM
                    </Button>
                    <Button variant="light" color="gray" mt="md" radius="md" className="confirmButtonStyle" onClick={closeLeave}>
                        CANCEL
                    </Button>
                </Group>
            </Modal>
        </>
    ) : (
        <main>
            <TeamRedirect />
        </main>
    )
}

export default Team;