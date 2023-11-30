'use client';

import 'styles/index.css';
import 'styles/account.css';

import AuthenticationForm from 'components/AuthenticationForm';
import Logo from 'public/logo.png';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { setUsername } from 'features/userSlice';

const listItems = [
    "Register to participate in ImmerseGT 2024",
    "Create a team and invite your teammates",
    "Look for an existing team to join",
    "Search for and connect with event participants",
    "Stay up-to-date with the hackathon schedule",
    "Sign up for workshops and other events",
    "And more!"
];

const Account = () => {

    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    console.log(user);
    dispatch(setUsername("updated"));
    console.log(user);

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
            <div className="verticalRule2" />
            <section className="accountSection">
                <AuthenticationForm />
            </section>
        </main>
    )
}

export default Account;