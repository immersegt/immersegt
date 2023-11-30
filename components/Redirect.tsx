import '../styles/index.css';
import '../styles/redirect.css';

import RedirectBox from '../components/RedirectBox';

const redirectBoxData = [
    {
        id: 0,
        title: "Create an Account",
        description: "Before you can officially register for the hackathon, you must create an account on the ImmerseGT Event Platform. Your information will be kept private and is only collected for the purposes of the hackathon.",
        buttonText: "Sign Up",
        href: "/account",
        hidden: false
    },
    {
        id: 1,
        title: "Register for ImmerseGT",
        description: "Once you have an account, you can register to participate in ImmerseGT 2024. You will answer several questions about yourself that will let us collect information about hackathon participants and even match you with a team.",
        buttonText: "Register",
        href: "/register",
        hidden: false
    },
    {
        id: 2,
        title: "Form Your Hackathon Team",
        description: "Once you have been accepted to ImmerseGT, you can begin the process of creating or joining a team. Teams can consist of up to 6 members; you can invite your friends or team up with other event participants.",
        buttonText: "Find Team",
        href: "/team/formation",
        hidden: false
    }
];

const Redirect = () => {
    return (
        <div className="redirectContainer">
            <h2 className="redirectMessage"><b>You can't access this page yet.</b></h2>
            <p>We appreciate your enthusiasm, but there are still a few steps you have to complete before you can get started.</p>
            <div className="redirectBoxHolder">
                {redirectBoxData.map((val) => 
                    <RedirectBox key={val.id} title={val.title} description={val.description} buttonText={val.buttonText} href={val.href} selected={false} hidden={val.hidden} position={val.id}/>
                )}
            </div>
        </div>
    )
}

export default Redirect;