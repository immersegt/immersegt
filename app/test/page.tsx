'use client';

import 'styles/index.css';

import { Button } from '@mantine/core';

import supabase from 'components/Supabase';

import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';

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
    const { error } = await supabase
        .from('teams')
        .insert({ name: "name" });
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
        </div>
    )
}

export default Test;