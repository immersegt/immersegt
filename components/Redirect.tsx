import '../styles/index.css';
import '../styles/redirect.css';

import RedirectBox from '../components/RedirectBox';

const redirectBoxData = [
    {
        id: 1,
        title: "Apply for ImmerseGT",
        description: "You first need to apply to participate in ImmerseGT 2025. You will answer several questions about yourself that will let us collect information about hackathon participants.",
        buttonText: "Apply Now",
        href: "/",
    },
    {
        id: 2,
        title: "Form Your Hackathon Team",
        description: "Once you have been accepted to ImmerseGT, you can begin the process of creating or joining a team. Teams can consist of up to 6 members; you can invite your friends or team up with other event participants.",
        buttonText: "Find Team",
        href: "/",
    },
    {
        id: 3,
        title: "Submit Your Project",
        description: "After forming your team, you can begin working on your project. You will have 48 hours to complete your project and submit it for judging. Make sure to submit your project before the deadline!",
        buttonText: "Submit Project",
        href: "/",
    }
];

const Redirect = () => {


    return (
        <div className="redirectContainer">
            <h2 className="redirectMessage"><b>You can't access this page yet.</b></h2>
            <p>We appreciate your enthusiasm, but there are still a few steps you have to complete before you can get started.</p>
            <div className="redirectBoxHolder">
                {redirectBoxData.map((val) =>
                    <RedirectBox key={val.id} title={val.title} description={val.description} buttonText={val.buttonText} href={val.href} position={val.id}/>
                )}
            </div>
        </div>
    )
}

export default Redirect;