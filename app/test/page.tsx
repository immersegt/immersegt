'use client';

import 'styles/index.css';

import { Button } from '@mantine/core';

import supabase from 'components/Supabase';

import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';

import { getUser, getTeam, searchUsers, getMembers } from 'utils/Utils';

async function updateFalse(id: string) {
    const { error } = await supabase
        .from('users')
        .update({ registered: false })
        .eq('id', id);
}

async function updateTrue(id: string) {
    const { error } = await supabase
        .from('users')
        .update({ registered: true })
        .eq('id', id);
}

async function newTeam() {
    const { data, error } = await supabase
        .from('teams')
        .insert({ name: "This is the Team Name.", description: "Looking for dedicated team members who are experienced in front end and back end development for our hackathon team." });
}

async function updateTeamUpdated() {
    const { error } = await supabase
        .from('teams')
        .update({ name: "updated" })
        .eq('name', 'name');
    console.log(error);
}
async function updateTeamName() {
    const { error } = await supabase
        .from('teams')
        .update({ name: "name" })
        .eq('name', 'updated');
    console.log(error);
}

async function clearData(id: string) {
    const { error } = await supabase
        .from('users')
        .update({ info: null })
        .eq('id', id);
    if (error == null) {
        await supabase
            .from('users')
            .update({ registered: false, name: "" })
            .eq('id', id);
    } else {
        console.log(error);
    }
}


const Test = () => {
    const user = useAppSelector((state) => state.user);
    const team = useAppSelector((state) => state.team);

    function checkRegistered() {
        console.log(user.registered);
    }

    return (
        <div className="flexBoxButtons">
            <Button onClick={() => { updateFalse(user.id) }}>Registered=False</Button>
            <Button onClick={() => { updateTrue(user.id) }}>Registered=True</Button>
            <Button onClick={newTeam}>New Team</Button>
            <Button onClick={updateTeamUpdated}>Update Team (New)</Button>
            <Button onClick={updateTeamName}>Update Team (Old)</Button>
            <Button onClick={checkRegistered}>Check Registered</Button>
            <Button onClick={() => { clearData(user.id) }}>Clear Registration</Button>
            <Button onClick={()=>{console.log(getUser(user.id))}}>Get User Data</Button>
            <Button onClick={()=>{console.log(getTeam(user.id))}}>Get Team Data</Button>
            <Button onClick={()=>{searchUsers("Alex")}}>Search Users: Alex</Button>
            <Button onClick={()=>{getMembers(team.members)}}>Get Team Members</Button>
        </div>
    )
}

export default Test;