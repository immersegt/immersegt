import '../styles/index.css';
import '../styles/teammember.css';

import { UnstyledButton, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import Info from '../public/info.png';
import Check from '../public/check.png';

interface MemberItemProps {
    name: string,
    time: string,
    description: string,
    member: boolean
}

const TeamMember = ({ name, time, description, member }: MemberItemProps) => {
    const [opened, { open, close }] = useDisclosure(false);

    function interested() {
        console.log("interested");
    }

    return (
        <>
            <UnstyledButton className="memberItem" onClick={open}>
                {time!==undefined ? 
                <p className="nowrap">{time}</p> 
                : <></>}
                <h3 className="memberName nowrap">{name}</h3>
                <div className="memberItemImageContainer">
                    <div className="memberItemButton">
                        <img className="memberItemImage" src={Info.src} />
                    </div>
                </div>
            </UnstyledButton>
            <Modal opened={opened} onClose={close} title={name} onClick={interested}>
                {time ? 
                <p>Time {member ? "Joined" : "Requested"}: {time}</p> 
                : <></>}
                {description ? 
                <p>Message: {description}</p> 
                : <></>}
            </Modal>
        </>
    )
}

export default TeamMember;