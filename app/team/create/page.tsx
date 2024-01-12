'use client';

import 'styles/index.css';
import 'styles/register.css';

import { useState } from 'react';
import { Button, Group, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import Card from "components/Card";

import { createTeam } from 'utils/Utils';

import { notifications } from '@mantine/notifications';

import { useAppSelector, useAppDispatch } from 'app/hooks';

import { useRouter } from 'next/navigation';

import { getTeam, setUserTeam } from 'utils/Utils';
import { setTeamId, setTeamName, setTeamDescription, setMembers, clearTeam } from 'features/teamSlice';
import { setTeamId as setUserTeamId } from 'features/userSlice';

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

    const create = () => {
        createTeam(form.getInputProps('name').value, form.getInputProps('description').value).then(() => {
            getTeam(user.id).then((value) => {
                if (value != null) {
                    setUserTeam(user.id, value.id);
                    dispatch(setUserTeamId(value.id));
                    dispatch(setTeamId(value.id));
                    dispatch(setTeamName(value.name));
                    dispatch(setTeamDescription(value.description));
                    dispatch(setMembers(value.members));
                } else {
                    dispatch(clearTeam());
                }
            });
        }
        );
        form.reset();
        notifications.show({
            title: 'Team Created',
            message: 'You have successfully created a team.',
            color: 'grape.5'
        });
        router.push("/team");

    };


    const name = "Name"
    const [mockSave, setMockSave] = useState(false);

    return (
        <main className="formContainer">
            <h2>Create a New Team</h2>
            <p>Please fill out the following questions to create a new team.</p>
            <div className="formBox">
                <div className="formPreview">
                    <h3>Team Preview</h3>
                    <p>This is what other participants will see when they are searching for your team.</p>
                    <br />
                    <Card name={form.getInputProps("name").value || "Team Name"} description={form.getInputProps("description").value || "Team Description"} members={[user.name]} joined={false} saved={mockSave} disabled={true} toggleSave={() => { setMockSave(!mockSave) }} />
                </div>

                <div className="formQuestions">
                    <h3>Questions</h3>
                    <p>Please be descriptive; the more information you provide, the more likely it is for your team will be found!</p>
                    <br />
                    <div>
                        <TextInput label="Team Name" placeholder="Team Name" {...form.getInputProps('name')} />
                        <Textarea mt="md" label="Team Description" autosize minRows={4} maxRows={4} placeholder="Team Description" {...form.getInputProps('description')} />
                    </div>
                    <Group justify="flex-end" mt="xl">
                        <Button onClick={create} color="grape.5">Create</Button>
                    </Group>
                </div>


            </div>
        </main>
    );
}

export default Create;