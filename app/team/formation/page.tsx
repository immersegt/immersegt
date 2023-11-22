'use client';

import { useState } from 'react';
import { Button, UnstyledButton } from '@mantine/core';
import "@fontsource/open-sans";
import TeamCard from 'components/Card';
import 'styles/index.css'
import 'styles/formation.css';
import Plus from 'public/plus.png';
import Idea from 'public/idea.png';
import ToolButton from 'components/ToolButton';
import Filter from 'components/Filter';
import Toolbar from 'components/Toolbar';

const Formation = () => {
  const [teams, setTeams] = useState([
    {
      name: "Team Name 1",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member"],
      joined: false
    },
    {
      name: "Team Name 2",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member", "Member 4", "Member 5", "Member 6"],
      joined: false
    },
    {
      name: "Team Name 3",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member"],
      joined: true
    },
    {
      name: "Team Name 1",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member"],
      joined: false
    },
    {
      name: "Team Name 1",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member"],
      joined: false
    },
    {
      name: "Team Name 1",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member"],
      joined: false
    },
    {
      name: "Team Name 1",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member"],
      joined: false
    },
    {
      name: "Team Name 1",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member"],
      joined: false
    },
    {
      name: "Team Name 1",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member"],
      joined: false
    },
    {
      name: "Team Name 1",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member"],
      joined: false
    },
    {
      name: "Team Name 1",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member"],
      joined: false
    },
    {
      name: "Team Name 1",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member"],
      joined: false
    },
    {
      name: "Team Name 1",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member"],
      joined: false
    },
    {
      name: "Team Name 1",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member"],
      joined: false
    },
    {
      name: "Team Name 1",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member"],
      joined: false
    },
  ]);

  return (
    <div className="formationContainer">
      <aside className="formationTools">
        <ToolButton 
        title="Create a New Team"
        description="This could be the beginning of something great. Invite your friends or search for other participants."
        image={Plus.src}/>
        <ToolButton 
        title="Recommend a Team"
        description="Search for teams that match your applicant profile and are currently looking for members."
        image={Idea.src}/>
        <Filter/>
      </aside>

      <div className="verticalRule"></div>

      <main className="formationDisplay">
        <span className="formationDisplayTitle"><i>367 Team(s) Found</i></span>
        <div className="formationHolder">
        {teams.map((val) => (
          <TeamCard name={val.name} description={val.description} members={val.members} joined={val.joined} disabled={false} />
        ))}
        </div>
        <Toolbar/>
      </main>
    </div>
  )
}

export default Formation;