import '../styles/index.css';
import '../styles/teammember.css';

import { UnstyledButton, Modal, Badge, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications'

import { sendTeamRequest } from 'utils/Utils';

import { useAppSelector, useAppDispatch } from 'app/hooks';

import Info from '../public/info.png';

interface MemberItemProps {
    name: string,
    time: string,
    userId: string,
    description: string,
    member: boolean,
    displayAvailable: boolean,
    available: boolean
}

const TeamMember = ({ name, time, userId, description, member, displayAvailable, available }: MemberItemProps) => {
    const team = useAppSelector((state) => state.team);
    const [opened, { open, close }] = useDisclosure(false);

    function invite () {
        if (userId != null && userId != ""){
        sendTeamRequest(userId, team.teamId, name, team.teamName);
        }
        console.log("sent invite");
        notifications.show({
          title: 'Invite Sent',
          message: 'You have invited ' + name + ' to be a member of your team',
          color: 'grape.5'
        });
      }

    return (
        <>
            <UnstyledButton className="memberItem" onClick={open}>
                {time !== undefined ?
                    <p className="nowrap">{time}</p>
                    : <></>}
                {displayAvailable ?
                    available ? (
                        <Badge className="availableBadge" color="green" variant="light" size="lg">AVAILABLE</Badge>
                    ) : (
                        <Badge className="availableBadge" color="red" variant="light" size="lg">ON TEAM</Badge>
                    ) : (
                        <></>
                    )}
                <h3 className="memberName nowrap">{name}</h3>
                <div className="memberItemImageContainer">
                    <div className="memberItemButton">
                        <img className="memberItemImage" src={Info.src} />
                    </div>
                </div>
            </UnstyledButton>
            <Modal opened={opened} onClose={close} title={name}>
                {displayAvailable ?
                    <div>
                        <p>{available ? "Not Currently on A Team" : "Currently On A Team"}</p>
                        {available ? (
                            <Button variant="light" color="grape" mt="md" radius="md" className="buttonStyle" onClick={invite}>
                                INVITE TO TEAM
                            </Button>
                        ) : (<></>)}
                    </div>
                    : <></>}
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