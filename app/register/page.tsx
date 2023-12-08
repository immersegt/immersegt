'use client';

import 'styles/index.css';
import 'styles/register.css';

import { useState } from 'react';
import { Stepper, Button, Group, TextInput, PasswordInput, Code } from '@mantine/core';
import { useForm } from '@mantine/form';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { setName } from 'features/userSlice';

const Register = () => {

    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    console.log(user);

    const [active, setActive] = useState(0);

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
            name: '',
            email: '',
            website: '',
            github: '',
        },

        validate: (values) => {
            if (active === 0) {
                return {
                    username:
                        values.username.trim().length < 6
                            ? 'Username must include at least 6 characters'
                            : null,
                    password:
                        values.password.length < 6 ? 'Password must include at least 6 characters' : null,
                };
            }

            if (active === 1) {
                return {
                    name: values.name.trim().length < 2 ? 'Name must include at least 2 characters' : null,
                    email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
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

    return (
        <main className="formContainer">
            <h2>Welcome to ImmerseGT!</h2>
            <p>Please fill out the following questions to register for the hackathon.</p>
            <div className="formBox">
                <Stepper active={active} orientation="vertical" className="formStepper" color="grape.5">
                    <Stepper.Step label="First step" description="Profile settings" />
                    <Stepper.Step label="Second step" description="Personal information" />
                    <Stepper.Step label="Final step" description="Social media" />
                </Stepper>

                <div className="formQuestions">
                    {active === 0 ? (
                        <div>
                            <TextInput label="Username" placeholder="Username" {...form.getInputProps('username')} />
                            <PasswordInput
                                mt="md"
                                label="Password"
                                placeholder="Password"
                                {...form.getInputProps('password')}
                            />
                        </div>
                    ) : active === 1 ? (
                        <div>
                            <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
                            <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')} />
                        </div>
                    ) : active === 2 ? (
                        <div>
                            <TextInput label="Website" placeholder="Website" {...form.getInputProps('website')} />
                            <TextInput
                                mt="md"
                                label="GitHub"
                                placeholder="GitHub"
                                {...form.getInputProps('github')}
                            />
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
                            <Button variant="default" onClick={prevStep}>
                                Back
                            </Button>
                        )}
                        {active < 2 && <Button onClick={nextStep} color="grape.5">Next step</Button>}
                        {active === 2 && <Button onClick={nextStep} color="grape.5">Register</Button>}
                    </Group>
                </div>


            </div>
        </main>
    );
}

export default Register;