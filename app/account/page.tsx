'use client';

import 'styles/index.css';
import 'styles/account.css';

import AuthenticationForm from 'components/AuthenticationForm';
import Logo from 'public/logo.png';

import { Button } from '@mantine/core';

const listItems = [
    "Register to participate in ImmerseGT 2024",
    "Create a team and invite your teammates",
    "Look for an existing team to join",
    "Search for and connect with event participants",
    "Stay up-to-date with the hackathon schedule",
    "Sign up for workshops and other events",
    "And more!"
];

import supabase from 'components/Supabase';

import { notifications } from '@mantine/notifications';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { login, logout } from 'features/userSlice';

async function signOut() {
    const { error } = await supabase.auth.signOut();
}

const Account = () => {

    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    function logOut() {
        signOut();
        dispatch(logout());
        notifications.show({
            title: 'Account Signed Out',
            message: 'You have successfully signed out of your account.',
            color: 'grape.5'
        });
    }

    return (
        <main className="accountHolder">
            <section className="infoSection">
                <img className="accountImage" src={Logo.src} />
                <h2 className="accountHeader"><b>REGISTER FOR OUR <span className="bright-purple">EVENT PLATFORM</span></b></h2>
                <p className="accountSubheader"><i>everything you need to participate in ImmerseGT</i></p>
                <ul className="accountList">
                    {listItems.map((val, ind) => (
                        <li className="accountListItem" key={ind}>{val}</li>
                    ))}
                </ul>
            </section>
            <section className="accountSection">
                {user.session == null ? (
                    <AuthenticationForm />
                ) : (
                    <div>
                        <h2>You Are Logged In!</h2>
                        <Button radius="xl" color="grape.5" onClick={logOut}>
                            Sign Out
                        </Button>
                    </div>
                )}

            </section>
        </main>
    )
}

export default Account;