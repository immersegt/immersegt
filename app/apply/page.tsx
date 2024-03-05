'use client';

import 'styles/apply.css';

import { useState } from 'react';
import { Stepper, Button, Group, TextInput, Code, Radio, Checkbox, Fieldset, NumberInput, Select, MultiSelect } from '@mantine/core';
import { useForm } from '@mantine/form';

import classes from 'styles/searchbox.module.css';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { setRegistered } from 'features/userSlice';

import Link from "next/link";

import Registered from 'components/Registered';

import { notifications } from '@mantine/notifications';

import { register, setName } from 'utils/Utils';
import AuthenticationForm from 'components/AuthenticationForm';

const isBrowser = () => typeof window !== 'undefined';

function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const validLevels = ["Undergraduate", "Graduate", "PhD"];

const invalid = (val: string | null) => {
    return val == null || val == "";
}

const Register = () => {

    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const [active, setActive] = useState(0);

    const form = useForm({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            age: null,
            gender: '',
            ethnicity: '',
            race: '',
            shirt: '',
            study: '',
            work: '',
            school: '',
            major: '',
            graduation: '',
            gtxr: false,
            languages: [],
            xrexperience: '',
            hackathon: '',
            interests: [],
            teamwork: '',
            role: [],
            commitment: '',
            goals: [],
            resume: '',
            website: '',
            github: '',
            linkedin: '',
            answer1: '',
            answer2: '',
            mlh1: false,
            mlh2: false,
            mlh3: false,
            dietary: [],
            underrepresented: '',
            pronouns: '',
            otherPronoun: '',
            orientation: '',
            otherOrientation: '',
            level: '',
            otherLevel: '',
            field: '',
            otherField: '',
            country: ''
        },

        validate: (values) => {
            if (active === 0) {
                return {
                    firstname:
                        values.firstname.trim().length < 2
                            ? 'First name must include at least 2 characters'
                            : null,
                    lastname:
                        values.firstname.trim().length < 2
                            ? 'Last name must include at least 2 characters'
                            : null,
                    email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
                };
            }
            if (active === 1) {
                return {
                    age:
                        (invalid(values.age) || values.age == null || values.age <= 0 || values.age > 99) ? 'Invalid age' : null,
                    gender:
                        (invalid(values.gender) ? 'Must select a gender' : null),
                    ethnicity:
                        (invalid(values.ethnicity) ? 'Must select an ethnicity' : null),
                    race:
                        (invalid(values.race) ? 'Must select a race' : null),
                    country:
                        (invalid(values.country) ? 'Must select a country' : null),
                    shirt:
                        (invalid(values.shirt) ? 'Must select a shirt size' : null),
                };
            }
            if (active === 2) {
                if (invalid(values.study)) {
                    return {
                        study: 'Must select current level of study'
                    }
                } else if (values.study == "Not a Student") {
                    return {
                        work:
                            (invalid(values.work) ? 'Must select employment status' : null)
                    }
                } else if (values.study == "High School") {
                    return {
                        school:
                            (invalid(values.school) ? 'Must enter high school' :
                                values.school.trim().length < 2 ? 'High school must include at least two characters' : null),
                        graduation:
                            (invalid(values.graduation) ? 'Must enter expected graduation date' : null),
                    }
                } else {
                    return {
                        school:
                            (invalid(values.school) ? 'Must enter university' :
                                values.school.trim().length < 2 ? 'University must include at least two characters' : null),
                        major:
                            (invalid(values.major) ? 'Must enter major' :
                                values.major.trim().length < 2 ? 'Major must include at least two characters' : null),
                        graduation:
                            (invalid(values.graduation) ? 'Must enter expected graduation date' : null),
                    }
                }
            }
            if (active === 3) {
                return {
                    xrexperience:
                        (invalid(values.xrexperience) ? 'Must select XR experience level' : null),
                    hackathon:
                        (invalid(values.hackathon) ? 'Must select hackathon experience level' : null),
                    interests:
                        (values.interests == null || values.interests.length == 0 ? 'Must select interests' : null),
                    teamwork:
                        (invalid(values.teamwork) ? 'Must select teamwork style' : null),
                    role:
                        (values.role == null || values.role.length == 0 ? 'Must select role preferences' : null),
                    commitment:
                        (invalid(values.commitment) ? 'Must select commitment level' : null),
                    goals:
                        (values.goals == null || values.goals.length == 0 ? 'Must select goals' : null),
                };
            }
            if (active === 4) {
                return {
                    mlh1:
                        (values.mlh1 ? null : 'Must agree to MLH Code of Conduct'),
                    mlh2:
                        (values.mlh2 ? null : 'Must agree to MLH Contest Terms and Conditions and Privacy Policy'),
                    underrepresented:
                        (values.underrepresented == "" ? "Must select underrepresented group status" : null),
                    pronouns:
                        (values.pronouns == "" ? "Must select pronouns" : values.pronouns == "Other" && values.otherPronoun == "" ? "Must enter pronouns" : null),
                    orientation:
                        (values.orientation == "" ? "Must select orientation" : null),
                    level:
                        (values.level == "" ? "Must select level of education" : null),
                    field:
                        (values.field == "" ? "Must select field of study" : null),
                }
            }
            return {};
        },
    });

    const nextStep = () => {
        setActive((current) => {
            if (form.validate().hasErrors) {
                return current;
            }
            scrollToTop();
            return current < 7 ? current + 1 : current;
        });
    }

    const registerUser = () => {
        nextStep();
        register(user.id, form.values);
        console.log(form.values)
        setName(user.id, form.getInputProps('firstname').value + " " + form.getInputProps('lastname').value);
        dispatch(setRegistered(true));
        notifications.show({
            title: 'Successfully Registered',
            message: 'You have successfully applied for ImmerseGT 2024!',
            color: 'grape.5'
        });
    }


    const prevStep = () => {
        setActive((current) => (current > 0 ? current - 1 : current));
        scrollToTop();
    };

    const [checkedGTech, setCheckedGTech] = useState(false);
    const [verified, setVerified] = useState(false);

    const setGTech = (set: boolean) => {
        if (set) {
            setCheckedGTech(true);
            form.setValues({ school: "Georgia Tech" });
        } else {
            setCheckedGTech(false);
            form.setValues({ school: "" });
        }
    }

    return user.session == null ? (
        <main className="formContainer">
            <h2>ImmerseGT Application</h2>
            <p>Please sign up first to apply for ImmerseGT 2024.</p>
            <div className="formBox">
                <AuthenticationForm />
            </div>
        </main>
    ) : (
        <main className="formContainer">
            <h2>ImmerseGT Application</h2>
            {user.registered ? (
                <Registered />
            ) :
                (
                    <>
                        <p>Please fill out the following questions to apply for the hackathon.</p>
                        <div className="formBox">
                            <Stepper active={active} orientation="vertical" className="formStepper" color="grape.5">
                                <Stepper.Step label="Contact Information" />
                                <Stepper.Step label="Basic Information" />
                                <Stepper.Step label="Relevant Education" />
                                <Stepper.Step label="Profile Questions" />
                                <Stepper.Step label="MLH Questions" />
                                <Stepper.Step label="Additional Info" />
                                <Stepper.Step label="Final Check" />
                            </Stepper>

                            <div className="formQuestions">
                                {active === 0 ? (
                                    <div>
                                        <TextInput label="First Name" size="md" placeholder="First Name" {...form.getInputProps('firstname')} withAsterisk classNames={classes} />
                                        <TextInput mt="md" size="md" label="Last Name" placeholder="Last Name" {...form.getInputProps('lastname')} withAsterisk classNames={classes} />
                                        <TextInput mt="md" size="md" label="School Email" placeholder="name@gatech.edu" {...form.getInputProps('email')} withAsterisk classNames={classes} />
                                        <TextInput mt="md" size="md" label="Phone Number" placeholder="(123) 456-7890" {...form.getInputProps('phone')} classNames={classes} />
                                    </div>



                                ) : active === 1 ? (
                                    <div>
                                        <NumberInput
                                            label="Age"
                                            placeholder="Age"
                                            clampBehavior="strict"
                                            min={0}
                                            max={100}
                                            size="md"
                                            {...form.getInputProps('age')}
                                            withAsterisk
                                            classNames={classes}
                                        />
                                        <Select
                                            mt="md"
                                            label="Gender"
                                            placeholder="Select..."
                                            data={['Man', 'Woman', 'Non-binary', 'Other', 'Prefer not to say']}
                                            {...form.getInputProps('gender')}
                                            withAsterisk
                                            classNames={classes}
                                        />
                                        <Select
                                            mt="md"
                                            label="Ethnicity"
                                            placeholder="Select..."
                                            data={['Hispanic or Latino', 'Not Hispanic or Latino', 'Prefer not to say']}
                                            {...form.getInputProps('ethnicity')}
                                            withAsterisk
                                            classNames={classes}
                                        />
                                        <Select
                                            mt="md"
                                            label="Race"
                                            placeholder="Select..."
                                            data={['American Indian or Alaska Native', 'Asian', 'Black or African American', 'Native Hawaiian or Other Pacific Islander', 'White', 'Prefer not to say']}
                                            {...form.getInputProps('race')}
                                            withAsterisk
                                            classNames={classes}
                                        />
                                        <TextInput mt="md" label="Country of Residence" placeholder="Country" {...form.getInputProps('country')} withAsterisk classNames={classes} />

                                        <Select
                                            mt="md"
                                            label="T-Shirt Size"
                                            placeholder="Select..."
                                            data={['XS', 'S', 'M', 'L', 'XL', 'XXL']}
                                            {...form.getInputProps('shirt')}
                                            withAsterisk
                                            classNames={classes}
                                        />
                                    </div>



                                ) : active === 2 ? (
                                    <div>
                                        <Select
                                            label="Current Level of Study"
                                            placeholder="Select..."
                                            data={['Undergraduate', 'Graduate', 'PhD', 'Not a Student']}
                                            {...form.getInputProps('study')}
                                            withAsterisk
                                            classNames={classes}
                                        />
                                        {validLevels.includes(form.getInputProps('study').value) ? (
                                            <div>
                                                <Checkbox mt="md" color="grape.5" label="I am a Georgia Tech Student." checked={checkedGTech} onChange={(event) => setGTech(event.currentTarget.checked)} />
                                                <TextInput mt="md" label="University" placeholder="University" {...form.getInputProps('school')} withAsterisk disabled={checkedGTech} classNames={classes} />
                                                <TextInput mt="md" label="Major" placeholder="Major" {...form.getInputProps('major')} withAsterisk classNames={classes} />
                                                <Select
                                                    mt="md"
                                                    label="Graduation Year"
                                                    placeholder="Select..."
                                                    data={['2024', '2025', '2026', '2027', '2028', 'Other']}
                                                    {...form.getInputProps('graduation')}
                                                    withAsterisk
                                                    classNames={classes}
                                                />
                                            </div>
                                        ) : form.getInputProps('study').value == "High School" ? (
                                            <div>
                                                <TextInput mt="md" label="High School" placeholder="High School" {...form.getInputProps('school')} withAsterisk classNames={classes} />
                                                <Select
                                                    mt="md"
                                                    label="Graduation Year"
                                                    placeholder="Select..."
                                                    data={['2024', '2025', '2026', '2027', '2028', 'Other']}
                                                    {...form.getInputProps('graduation')}
                                                    withAsterisk
                                                    classNames={classes}
                                                />
                                            </div>
                                        ) : form.getInputProps('study').value == "Not a Student" ? (
                                            <div>
                                                <Select
                                                    mt="md"
                                                    label="Employment"
                                                    placeholder="Select..."
                                                    data={['Employed', 'Looking for Job', 'Unemployed', 'Not Looking For Job', 'Prefer Not To Say']}
                                                    {...form.getInputProps('work')}
                                                    withAsterisk
                                                    classNames={classes}
                                                />
                                            </div>
                                        ) :
                                            (<></>)}
                                    </div>

                                ) : active === 3 ? (
                                    <div>
                                        <Fieldset legend="Attendance" className="noBackground">
                                            <Checkbox mt="md" color="grape.5" label="I am a member of GTXR." {...form.getInputProps('gtxr')} />
                                        </Fieldset>
                                        <br />
                                        <Fieldset legend="Skills" className="noBackground">
                                            <MultiSelect
                                                mt="md"
                                                label="Languages"
                                                placeholder="Select..."
                                                data={['C#', 'C++', 'Javascript', 'Typescript', 'Java', 'Swift', 'Python', 'HTML/CSS', 'Kotlin', 'Objective-C', 'GLSL', 'HLSL', 'Lua', 'Ruby', 'Go', 'Rust', 'PHP', 'C']}
                                                {...form.getInputProps('languages')}
                                                withAsterisk
                                                classNames={classes}
                                            />
                                            <Select
                                                mt="md"
                                                label="XR Experience"
                                                placeholder="Select..."
                                                data={['None', 'Beginner', 'Advanced', 'Expert']}
                                                {...form.getInputProps('xrexperience')}
                                                withAsterisk
                                                classNames={classes}
                                            />
                                            <Select
                                                mt="md"
                                                label="Hackathon Experience"
                                                placeholder="Select..."
                                                data={['None', 'Beginner', 'Advanced', 'Expert']}
                                                {...form.getInputProps('hackathon')}
                                                withAsterisk
                                                classNames={classes}
                                            />
                                            <MultiSelect
                                                mt="md"
                                                label="Interest Areas"
                                                placeholder="Select..."
                                                data={['Augmented Reality', 'Virtual Reality', 'Mixed Reality', 'Not Sure']}
                                                {...form.getInputProps('interests')}
                                                withAsterisk
                                                classNames={classes}
                                            />
                                        </Fieldset>
                                        <br />
                                        <Fieldset legend="Team Preferences" className="noBackground">
                                            <Select
                                                label="Teamwork Style"
                                                placeholder="Select..."
                                                data={['Solo Hacker', 'Teaming with Friends', 'Looking for Team', 'Unsure']}
                                                {...form.getInputProps('teamwork')}
                                                withAsterisk
                                                classNames={classes}
                                            />
                                            <MultiSelect
                                                mt="md"
                                                label="Member Role Preferences"
                                                placeholder="Select..."
                                                data={['Project Manager', 'XR Developer', '3D Artist', 'Sound Designer', 'Project Tester', 'Frontend Developer', 'Backend Developer', 'UI/UX Designer', 'Business']}
                                                {...form.getInputProps('role')}
                                                withAsterisk
                                                classNames={classes}
                                            />
                                            <Select
                                                mt="md"
                                                label="Commitment Level"
                                                placeholder="Select..."
                                                data={['Low', 'Medium', 'High']}
                                                {...form.getInputProps('commitment')}
                                                withAsterisk
                                                classNames={classes}
                                            />
                                            <MultiSelect
                                                mt="md"
                                                label="Goals"
                                                placeholder="Select..."
                                                data={['Learn New Skills', 'Build My Portfolio', 'Network With Others', 'Win Awards/Prizes', 'Here For A Good Time']}
                                                {...form.getInputProps('goals')}
                                                withAsterisk
                                                classNames={classes}
                                            />
                                        </Fieldset>
                                    </div>
                                ) : active === 4 ? (
                                    <div>
                                        <p>We are currently in the process of partnering with MLH. The following questions are for this partnership. If we do not end up partnering with MLH, your information will not be shared.</p>
                                        <Checkbox mt="md" color="grape.5" label={
                                            <>
                                                I have read and agree to the{' '}
                                                <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" target="_blank" rel="noopener noreferrer">
                                                    MLH Code of Conduct.
                                                </a>
                                            </>
                                        } {...form.getInputProps('mlh1')} />
                                        <Checkbox mt="md" color="grape.5" label={
                                            <>
                                                I authorize you to share my application/registration information with Major League Hacking for event administration,
                                                ranking, and MLH administration in-line with the{' '}
                                                <a href="https://mlh.io/privacy" target="_blank" rel="noopener noreferrer">
                                                    MLH Privacy Policy.
                                                </a>
                                                {' '}I further agree to the terms of both the{' '}
                                                <a href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md" target="_blank" rel="noopener noreferrer">
                                                    MLH Contest Terms and Conditions
                                                </a>
                                                {' '}and the{' '}
                                                <a href="https://mlh.io/privacy" target="_blank" rel="noopener noreferrer">
                                                    MLH Privacy Policy
                                                </a>
                                            </>
                                        } {...form.getInputProps('mlh2')} />
                                        <Checkbox mt="md" color="grape.5"
                                            label="I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements."
                                            {...form.getInputProps('mlh3')} />

                                        <MultiSelect
                                            mt="md"
                                            label="Dietary Restrictions"
                                            placeholder="Select..."
                                            data={['Vegetarian', 'Vegan', 'Celiac Disease', 'Allergies', 'Kosher', 'Halal']}
                                            {...form.getInputProps('dietary')}
                                            classNames={classes}
                                        />
                                        <Select
                                            mt="md"
                                            label="Do you identify as part of an underrepresented group in the technology industry?"
                                            placeholder="Select..."
                                            data={['Yes', 'No', 'Unsure']}
                                            {...form.getInputProps('underrepresented')}
                                            classNames={classes}
                                            withAsterisk
                                        />
                                        <Select
                                            mt="md"
                                            label="Pronouns"
                                            placeholder="Select..."
                                            data={['She/Her', 'He/Him', 'They/Them', 'She/They', 'He/They', 'Prefer not to answer', 'Other']}
                                            {...form.getInputProps('pronouns')}
                                            classNames={classes}
                                            withAsterisk
                                        />
                                        <TextInput placeholder="Pronouns" {...form.getInputProps('otherPronoun')} classNames={classes} className={form.values.pronouns == "Other" ? "" : "hidden"} withAsterisk />
                                        <Select
                                            mt="md"
                                            label="Do you consider yourself to be any of the following?"
                                            placeholder="Select..."
                                            data={['Heterosexual or Straight', 'Gay or Lesbian', 'Bisexual', 'Prefer not to answer', 'Different identity']}
                                            {...form.getInputProps('orientation')}
                                            classNames={classes}
                                            withAsterisk
                                        />
                                        <TextInput placeholder="Orientation" {...form.getInputProps('otherOrientation')} classNames={classes} className={form.values.orientation == "Different identity" ? "" : "hidden"} withAsterisk />
                                        <Select
                                            mt="md"
                                            label="What is the highest level of formal education that you have completed?"
                                            placeholder="Select..."
                                            data={['Less than Secondary / High School', 'Secondary / High School', 'Undergraduate University (2 year - community college or similar)', 'Undergraduate University (3+ year)', 'Graduate University (Masters, Professional, Doctoral, etc) ', 'Code School / Bootcamp', 'Other Vocational / Trade Program or Apprenticeship', 'Other (please specify)', 'I’m not currently a student', 'Prefer not to answer']}
                                            {...form.getInputProps('level')}
                                            classNames={classes}
                                            withAsterisk
                                        />
                                        <TextInput placeholder="Level of education" {...form.getInputProps('otherLevel')} classNames={classes} className={form.values.level == "Other (please specify)" ? "" : "hidden"} withAsterisk />
                                        <Select
                                            mt="md"
                                            label="Major/Field of Study"
                                            placeholder="Select..."
                                            data={['Computer science, computer engineering, or software engineering',
                                                'Another engineering discipline (such as civil, electrical, mechanical, etc.)',
                                                'Information systems, information technology, or system administration',
                                                'A natural science (such as biology, chemistry, physics, etc.)',
                                                'Mathematics or statistics',
                                                'Web development or web design',
                                                'Business discipline (such as accounting, finance, marketing, etc.)',
                                                'Humanities discipline (such as literature, history, philosophy, etc.)',
                                                'Social science (such as anthropology, psychology, political science, etc.)',
                                                'Fine arts or performing arts (such as graphic design, music, studio art, etc.)',
                                                'Health science (such as nursing, pharmacy, radiology, etc.)',
                                                'Other (please specify)',
                                                'Undecided / No Declared Major',
                                                'My school does not offer majors / primary areas of study',
                                                'Prefer not to answer']}
                                            {...form.getInputProps('field')}
                                            classNames={classes}
                                            withAsterisk
                                        />
                                        <TextInput placeholder="Field of study" {...form.getInputProps('otherField')} classNames={classes} className={form.values.field == "Other (please specify)" ? "" : "hidden"} withAsterisk />

                                    </div>
                                ) : active === 5 ? (
                                    <div>
                                        <p>These additional questions are optional but could be used for application decisions depending on how many applications we receive.</p>
                                        <TextInput mt="md" label="Resume" placeholder="Resume" {...form.getInputProps('resume')} classNames={classes} />
                                        <TextInput mt="md" label="Website" placeholder="Website" {...form.getInputProps('website')} classNames={classes} />
                                        <TextInput mt="md" label="Github" placeholder="https://github.com/..." {...form.getInputProps('github')} classNames={classes} />
                                        <TextInput mt="md" label="Linkedin" placeholder="https://www.linkedin.com/in/..." {...form.getInputProps('linkedin')} classNames={classes} />
                                        <TextInput mt="md" label="Describe your experience with coding and/or XR." placeholder="Answer here..." {...form.getInputProps('answer1')} classNames={classes} />
                                        <TextInput mt="md" label="Why do you want to participate in ImmerseGT?" placeholder="Answer here..." {...form.getInputProps('answer2')} classNames={classes} />
                                    </div>
                                ) : active === 6 ? (
                                    <div>
                                        <p>Your data will not be provided to the ImmerseGT organizers until you click apply. Please double check your
                                            responses on the previous pages before you submit as you will not be able to change your answers.
                                        </p>
                                        <Checkbox mt="md" color="grape.5" label="I am ready to apply for ImmerseGT 2024." checked={verified} onChange={(event) => setVerified(event.currentTarget.checked)} />
                                    </div>
                                ) : (
                                    <div>
                                        <p>Thank you for applying for ImmerseGT 2024! We will be in touch with further updates as we get closer to the hackathon start date.
                                            In the meantime, feel free to <Link href="https://discord.gg/bwnbCMDzxK">join our Discord</Link> to network with other participants.</p>
                                        <br />
                                        Form Values:
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
                                    {active < 6 && <Button onClick={nextStep} color="grape.5">Next step</Button>}
                                    {active === 6 && <Button onClick={registerUser} color="grape.5" disabled={!verified}>Apply</Button>}
                                </Group>
                            </div>
                        </div>
                    </>
                )}
        </main>
    );
}

export default Register;