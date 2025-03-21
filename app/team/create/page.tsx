'use client';

import 'styles/index.css';
import 'styles/apply.css';

import { useState } from 'react';
import { Button, Group, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import Card from "components/Card";

import { createTeam } from 'utils/Utils';

import { notifications } from '@mantine/notifications';

import { useAppSelector, useAppDispatch } from 'app/hooks';

import { useRouter } from 'next/navigation';

import { getTeam, setUserTeam } from 'utils/Utils';
import { setTeamId, setTeamName, setTeamDescription, setMembers, setDeclared, clearTeam } from 'features/teamSlice';
import { setTeamId as setUserTeamId } from 'features/userSlice';

import classes from 'styles/searchbox.module.css';

const Create = () => {
    const router = useRouter();
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const form = useForm({
        initialValues: {
            name: '',
            description: '',
        },

        validate: (values) => {
            return {
                name:
                    values.name.trim().length < 6
                        ? 'Team name must include at least 6 characters'
                        : null,
                description:
                    values.description.trim().length < 6
                        ? 'Description must include at least 6 characters'
                        : null,
            };
        },
    });

    async function updateTeam() {
        const value = await getTeam(user.id)
        if (value != null) {
            setUserTeam(user.id, value.id);
            dispatch(setUserTeamId(value.id));
            dispatch(setTeamId(value.id));
            dispatch(setTeamName(value.name));
            dispatch(setTeamDescription(value.description));
            dispatch(setMembers(value.members));
            dispatch(setDeclared(value.declared));
        } else {
            dispatch(clearTeam());
        }
    }

    async function create() {
        await createTeam(user.id, form.getInputProps('name').value, form.getInputProps('description').value).then(async (val) => {
            if (val) {
                await updateTeam();
                notifications.show({
                    title: 'Team Created',
                    message: 'You have successfully created a team.',
                    color: 'grape.5'
                });
                form.reset();
                router.push("/team");
            } else {
                notifications.show({
                    title: 'Failed to Create Team',
                    message: 'Your team could not be created. Make sure you entered a valid name and description and that you are not currently on a team.',
                    color: 'red'
                });
            }
        }
        );
    };


    const [mockSave, setMockSave] = useState(false);

    return (
        <main className="formContainer">
            <h2>Create a New Team</h2>
            {(user.team_id == null || user.team_id == "") ? (
            <>
                <p>Please fill out the following questions to create a new team.</p>
                <div className="formBox">
                    <div className="formPreview">
                        <h3>Team Preview</h3>
                        <p>This is what other participants will see when they are searching for your team.</p>
                        <br />
                        <Card name={form.getInputProps("name").value || "Team Name"} description={form.getInputProps("description").value || "Team Description"} members={[user.name]} joined={false} saved={mockSave} disabled={true} toggleSave={() => { setMockSave(!mockSave) }} team_id={""}/>
                    </div>

                    <div className="formQuestions">
                        <h3>Questions</h3>
                        <p>Please be descriptive; the more information you provide, the more likely it is for your team will be found!</p>
                        <br />
                        <div>
                            <TextInput label="Team Name" placeholder="Team Name" classNames={classes} {...form.getInputProps('name')} />
                            <Textarea mt="md" label="Team Description" autosize minRows={4} maxRows={4} placeholder="Team Description" classNames={classes} {...form.getInputProps('description')} />
                        </div>
                        <Group justify="flex-end" mt="xl">
                            <Button onClick={create} color="grape.5">Create</Button>
                        </Group>
                    </div>
                </div>
            </>) : (
                <div>
                    <p>You are already on a team. Please leave your current team if you wish to create a new one.</p>
                </div>
            )}
        </main>
    );
}

export default Create;