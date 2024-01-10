'use client';

import 'styles/index.css';

import { Button } from '@mantine/core';

import supabase from 'components/Supabase';

import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';

async function updateFalse(id:string) {
    const { error } = await supabase
    .from('users')
    .update({ registered:false })
    .eq('id', id);
}

async function updateTrue(id:string) {
    const { error } = await supabase
    .from('users')
    .update({ registered:true })
    .eq('id', id);
}

async function newTeam(){
    const { error } = await supabase
    .from('teams')
    .insert({name: "name"});
}

async function updateTeamUpdated(){
    const { error } = await supabase
    .from('teams')
    .update({name: "updated"})
    .eq('name', 'name');
    console.log(error);
}
async function updateTeamName(){
    const { error } = await supabase
    .from('teams')
    .update({name: "name"})
    .eq('name', 'updated');
    console.log(error);
}

const Test = () => {

    const user = useAppSelector((state) => state.user);

    return (
        <div className="flexBoxButtons">
            <Button onClick={()=>{updateFalse(user.id)}}>Registered=False</Button>
            <Button onClick={()=>{updateTrue(user.id)}}>Registered=True</Button>
            <Button onClick={newTeam}>New Team</Button>
            <Button onClick={updateTeamUpdated}>Update Team (New)</Button>
            <Button onClick={updateTeamName}>Update Team (Old)</Button>
        </div>
    )
}

export default Test;