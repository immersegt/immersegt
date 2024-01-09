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

import { createClient } from '@supabase/supabase-js';

const url: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key: string = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!;

const supabase = createClient(url, key);

import { useEffect, useState } from 'react';

import { Session } from "@supabase/gotrue-js/src/lib/types"

import { notifications } from '@mantine/notifications';

async function signOut() {
    const { error } = await supabase.auth.signOut();
    console.log(supabase.auth.getSession());
}

const Account = () => {

    function logOut() {
        signOut();
        notifications.show({
            title: 'Account Signed Out',
            message: 'You have successfully signed out of your account.',
            color: 'grape.5'
          });

    }

    const [session, setSession] = useState<Session | null>(null);
    useEffect(() => {
        console.log("please");
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, []);
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
                {session == null ? (
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