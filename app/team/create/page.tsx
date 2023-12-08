'use client';

import 'styles/index.css';
import 'styles/register.css';

import { useState } from 'react';
import { Stepper, Button, Group, TextInput, PasswordInput, Code, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import Card from "components/Card";
import Link from "next/link";

const Create = () => {
    const [active, setActive] = useState(0);

    const form = useForm({
        initialValues: {
            name: '',
            description: '',
        },

        validate: (values) => {
            if (active === 0) {
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
            }

            return {};
        },
    });

    const nextStep = () =>
        setActive((current) => {
            if (form.validate().hasErrors) {
                return current;
            }
            return current < 3 ? current + 1 : current;
        });

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

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
                    <Card name={form.getInputProps("name").value || "Team Name"} description={form.getInputProps("description").value || "Team Description"} members={[name]} joined={false} saved={mockSave} disabled={true} toggleSave={() => { setMockSave(!mockSave) }} />
                </div>

                <div className="formQuestions">
                    <h3>Questions</h3>
                    <p>Please be descriptive; the more information you provide, the more likely it is for your team will be found!</p>
                    <br />
                    {active === 0 ? (
                        <div>
                            <TextInput label="Team Name" placeholder="Team Name" {...form.getInputProps('name')} />
                            <Textarea mt="md" label="Team Description" autosize minRows={4} maxRows={4} placeholder="Team Description" {...form.getInputProps('description')} />
                        </div>
                    ) : (
                        <div>
                            Completed! Form values:
                            <Code block mt="xl">
                                {JSON.stringify(form.values, null, 2)}
                            </Code>
                        </div>
                    )}
                    <Group justify="flex-end" mt="xl">
                        {active !== 0 && (
                            <div>
                                <Button variant="default" onClick={prevStep} mr={16}>
                                    Back
                                </Button>
                                <Link href="/team"><Button color="grape.5">Go to Team Page</Button></Link>
                            </div>
                        )}
                        {active === 0 && <Button onClick={nextStep} color="grape.5">Create</Button>}
                    </Group>
                </div>


            </div>
        </main>
    );
}

export default Create;