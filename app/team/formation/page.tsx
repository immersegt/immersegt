'use client';

import { useState } from 'react';
import { Button } from '@mantine/core';
import "@fontsource/open-sans";
import TeamCard from 'components/Card';
import 'styles/index.css'
import 'styles/formation.css';

const rowStyle = {
  display: "flex",
  flexWrap: "wrap" as "wrap",
  gap: "30px",
  margin: "30px",
  alignItems: "flex-start",
}

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
  ]);

  return <div>
    <div style={rowStyle}>
      {teams.map((val) => (
        <TeamCard name={val.name} description={val.description} members={val.members} joined={val.joined} disabled={false}/>
      ))}
    </div>
  </div>;
}

export default Formation;