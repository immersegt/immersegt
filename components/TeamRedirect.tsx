import '../styles/index.css';
import '../styles/redirect.css';

import RedirectBox from '../components/RedirectBox';

const redirectBoxData = [
    {
        id: 0,
        title: "Create Team",
        description: "Choose a team name, write a description, and list your team in our team formation tool for others to find! You can invite your friends manually or wait for people to request to join your team.",
        buttonText: "Create Team",
        href: "/team/create",
    },
    {
        id: 1,
        title: "Find Team",
        description: "Find teams who are currently looking for members using our team formation tool. You can search for a specific team or even filter teams by a variety of parameters to find the right fit for you.",
        buttonText: "Find Team",
        href: "/team/formation",
    },
];

const TeamRedirect = () => {
    return (
        <div className="redirectContainer">
            <h2 className="redirectMessage"><b>You aren't currently on a team.</b></h2>
            <p>Don't worry, we can fix that! Either create your own team and invite your friends or use our team formation tool to join up with others.</p>
            <div className="redirectBoxHolder">
                {redirectBoxData.map((val) =>
                    <RedirectBox key={val.id} title={val.title} description={val.description} buttonText={val.buttonText} href={val.href} selected={false} position={val.id} option={true}/>
                )}
            </div>
        </div>
    )
}

export default TeamRedirect;