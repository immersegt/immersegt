'use client';

import 'styles/index.css';
import 'styles/account.css';

import AuthenticationForm from 'components/AuthenticationForm';
import Logo from 'public/logo.png';

const Account = () => {
    return (
        <main className="accountHolder">
                <section className="infoSection">
                    <img className="accountImage" src={Logo.src}/>
                    <h2 className="accountHeader"><b>REGISTER FOR OUR <span className="bright-purple">EVENT PLATFORM</span></b></h2>
                    <p className="accountSubheader"><i>everything you need to participate in ImmerseGT</i></p>
                    <ul className="accountList">
                        <li className="accountListItem">Register to participate in ImmerseGT 2024</li>
                        <li className="accountListItem">Create a team and invite your teammates</li>
                        <li className="accountListItem">Look for an existing team to join</li>
                        <li className="accountListItem">Search for and connect with event participants</li>
                        <li className="accountListItem">Stay up-to-date with the hackathon schedule</li>
                        <li className="accountListItem">Sign up for workshops and other events</li>
                        <li className="accountListItem">And more!</li>
                    </ul>
                </section>
                <div className="verticalRule2"/>
                <section className="accountSection">
                    <AuthenticationForm/>
                </section>
        </main>
    )
}

export default Account;