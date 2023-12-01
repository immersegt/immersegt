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
  const [saved, setSaved] = useState([]);
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "Obnoxiously long team name goes right here that will take up multiple lines",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team. Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member", "Super long member"],
      joined: false,
    },
    {
      id: 2,
      name: "Team Name 2",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member", "Member 4", "Member 5", "Member 6"],
      joined: false,
    },
    {
      id: 3,
      name: "Team Name 3",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member"],
      joined: true,
    },
    {
      id: 4,
      name: "Team Name 1",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member"],
      joined: false,
    },
    {
      id: 5,
      name: "Team Name 1",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member"],
      joined: false,
    },
    {
      id: 6,
      name: "Team Name 1",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member"],
      joined: false,
    },
    {
      id: 7,
      name: "Team Name 1",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member"],
      joined: false,
    },
    {
      id: 8,
      name: "Team Name 1",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member"],
      joined: false,
    },
    {
      id: 9,
      name: "Team Name 1",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member"],
      joined: false,
    },
    {
      id: 10,
      name: "Team Name 1",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member"],
      joined: false,
    },
    {
      id: 11,
      name: "Team Name 1",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member"],
      joined: false,
    },
    {
      id: 12,
      name: "Team Name 1",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member"],
      joined: false,
    },
    {
      id: 13,
      name: "Team Name 1",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member"],
      joined: false,
    },
    {
      id: 14,
      name: "Team Name 1",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member"],
      joined: false,
    },
    {
      id: 15,
      name: "Team Name 1",
      description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team.",
      members: ["Member 1", "Team Member 2", "Another Member"],
      joined: false,
    },
  ]);

  const toggleSave = (id: number) => {
    if (saved.includes(id)){
      const updated = saved.filter(val => val != id);
      setSaved(updated);
    }else{
      const updated = [...saved, id];
      setSaved(updated);
    }
  }

  return (
    <div className="formationContainer">
      <aside className="formationTools">
        <ToolButton 
        title="Create a New Team"
        description="This could be the beginning of something great. Invite your friends or search for other participants."
        image={Plus.src}
        href="/team/create"
        />
        <ToolButton 
        title="Recommend a Team"
        description="Search for teams that match your applicant profile and are currently looking for members."
        image={Idea.src}/>
        <Filter/>
      </aside>

      <main className="formationDisplay">
        <span className="formationDisplayTitle"><i>367 Team(s) Found</i></span>
        <div className="formationHolder">
        {teams.map((val) => (
          <TeamCard key={val.id} name={val.name} description={val.description} members={val.members} joined={val.joined} saved={saved.includes(val.id)} toggleSave={()=>{toggleSave(val.id)}} disabled={false} />
        ))}
        </div>
        <Toolbar/>
      </main>
    </div>
  )
}

export default Formation;