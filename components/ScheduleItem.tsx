import '../styles/index.css';
import '../styles/scheduleitem.css';

import { UnstyledButton, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import Info from '../public/info.png';
import Check from '../public/check.png';

interface ScheduleItemProps {
    title: string,
    time: string,
    location: string,
    description: string,
    save: boolean,
    longDescription: string,
    host: string
}

const ScheduleItem = ({ title, time, location, description, save, longDescription, host }: ScheduleItemProps) => {
    const [opened, { open, close }] = useDisclosure(false);

    function interested() {
        console.log("interested");
    }

    return (
        <>
            <div className="scheduleItem">
                <p className="nowrap">{time}</p>
                <h3 className="nowrap">{title}</h3>
                {description === "" ? (
                    <div />
                ) : (
                    <p className="scheduleItemDescription">
                        |&nbsp;&nbsp;<i>{description}</i>
                    </p>
                )}

                <div className="scheduleItemImageContainer">
                    {save ? (
                        <UnstyledButton className="scheduleItemButton dark" onClick={interested}>
                            <img className="scheduleItemImage" src={Check.src} />
                        </UnstyledButton>
                    ) : (<div />)}
                    <UnstyledButton className="scheduleItemButton light" onClick={open}>
                        <img className="scheduleItemImage" src={Info.src} />
                    </UnstyledButton>
                </div>
            </div>
            <Modal opened={opened} onClose={close} title={title}>
                <p>Time: {time}</p>
                <p>Location: {location}</p>
                {host === undefined ? <></> : (
                    <p>Host: {host}</p>
                )}
                <br />
                <p>{longDescription === undefined ? description : longDescription}</p>
            </Modal>
        </>
    )
}

export default ScheduleItem;