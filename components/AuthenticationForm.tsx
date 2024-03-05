import '../styles/index.css';
import '../styles/account.css';

import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { setEmail } from 'features/userSlice';

import { notifications } from '@mantine/notifications';

import supabase from '../utils/Supabase';

import { signUp, signIn, signInWithGoogle, signInWithDiscord } from '../utils/Utils';
import { GoogleButton } from './GoogleButton';
import { isAuthError } from '@supabase/supabase-js';
import { DiscordButton } from './DiscordButton';

const AuthenticationForm = (props: PaperProps) => {

  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  async function signInWithEmail(email: string, password: string) {
    let worked = await signIn(email, password).then((value) => {
      if (value != null) {
        dispatch(setEmail(value));
        return true;
      }
      return false;
    });
    return worked;
  }

  const [type, toggle] = useToggle(['register', 'login']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  async function submitForm(values: { email: string, password: string }) {
    if (type === 'register') {
      let worked = await signUp(values.email, values.password);
      if (worked) {
        notifications.show({
          title: 'Account Created',
          message: 'Please finish registering your account; email sent to: ' + values.email,
          color: 'grape.5'
        });
      } else {
        notifications.show({
          title: 'Signup failed',
          message: 'Please try again later',
          color: 'red'
        });
      }
    } else if (type === 'login') {
      let worked = await signInWithEmail(values.email, values.password);
      if (worked) {
        notifications.show({
          title: 'Account Logged In',
          message: 'You have successfully logged in to the email: ' + values.email,
          color: 'grape.5'
        });
      } else {
        notifications.show({
          title: 'Login failed',
          message: 'Please check your email and password',
          color: 'red'
        });
      }

    }
  }

  const handleGoogleSignIn = async () => {
    const data = await signInWithGoogle();
    if (isAuthError(data)) {
      notifications.show({
        title: 'Error',
        message: data.message,
        color: 'red',
      });
    }
    if (user) {
      dispatch(setEmail(user.email));
    }
  }

  const handleDiscordSignIn = async () => {
    const data = await signInWithDiscord();
    if (isAuthError(data)) {
      notifications.show({
        title: 'Error',
        message: data.message,
        color: 'red'
      })
    }
    if (user) {
      dispatch(setEmail(user.email));
    }
  }

  // Get "sign in" or "sign up" text depending on selected type 
  const googleButtonText = type === 'login' ? 'Sign in with Google' : 'Sign up with Google'
  const discordButtonText = type === 'login' ? 'Sign in with Discord' : 'Sign up with Discord'

  return (
    <Paper radius="md" p="xl" withBorder {...props} className="form">
      <Text size="lg" fw={500}>
        Welcome to ImmerseGT!
      </Text>

      <Group grow mb="md" mt="md" className="signInButtonsGroup" >
        {/* <GoogleButton onClick={handleGoogleSignIn} radius="xl" classNames={{
          root: "signInButton"
        }}>{googleButtonText}</GoogleButton> */}
        <DiscordButton onClick={handleDiscordSignIn} radius="xl" classNames={{
          root: "signInButton"
        }}>{discordButtonText}</DiscordButton>
      </Group>

      <Divider label={`or ${type} with email`} labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit((values) => { submitForm(values) })}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              size="md"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            size="md"
            placeholder="name@gatech.edu"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            size="md"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
              color="grape.5"
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl" color="grape.5">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}

export default AuthenticationForm;
