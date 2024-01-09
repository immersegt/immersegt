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
import { GoogleButton } from '../components/GoogleButton';
import { TwitterButton } from '../components/TwitterButton';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { setUsername } from 'features/userSlice';

import { createClient } from '@supabase/supabase-js';
import { notifications } from '@mantine/notifications';

const url: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key: string = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!;

const supabase = createClient(url, key);

async function signUpNewUser(email: string, password: string) {
  console.log(email, password);
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: 'https//example.com/welcome'
    }
  })
  console.log(data);
  console.log(error);
}

const AuthenticationForm = (props: PaperProps) => {

  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  async function signInWithEmail(email: string, password: string) {
    console.log(email, password);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })
    console.log(data);
    if (console.error !== null){
      dispatch(setUsername(email));
    }
    console.log(error);
  }

  const [type, toggle] = useToggle(['login', 'register']);
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

  const submitForm = (values: { email: string, password: string }) => {
    if (type === 'register') {
      signUpNewUser(values.email, values.password);
      notifications.show({
        title: 'Account Registered',
        message: 'You have successfully created an ImmerseGT account under the email: ' + values.email,
        color: 'grape.5'
      });
    }else if (type === 'login'){
      signInWithEmail(values.email, values.password);
      notifications.show({
        title: 'Account Logged In',
        message: 'You have successfully logged in to the email: ' + values.email,
        color: 'grape.5'
      });
    }
  }

  return (
    <Paper radius="md" p="xl" withBorder {...props} className="form">
      <Text size="lg" fw={500}>
        Welcome to ImmerseGT, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit((values) => { submitForm(values) })}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
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