'use client';

import '../styles/teamcard.css';
import '../styles/index.css';

import { Badge, Button, Group, Textarea, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FaStar } from "react-icons/fa";
import { useState } from 'react';

interface cardProps {
  name: string,
  description: string,
  members: Array<string>,
}

const TeamCard = ({ name, description, members }: cardProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [saved, setSaved] = useState(false);

  return (
    <>
      <div
        className={"cardStyle"}
      >

        <div className="titleStyle">
          {saved ? <FaStar className="starStyle" /> : <span />}
          <h3 className="cardTitle"><b>{name}</b></h3>
          <Badge color="green" variant="light" size="lg" className="badgeStyle">OPEN</Badge>
        </div>

        <div>
          <p className="small cardDescription">{description}</p>
          <div className="badgeHolder">
            <div className="nameStyle">
              {members.map((val, ind) => (
                <Badge key={ind} color="gray" variant="light" className="nameBadge">
                  {val}
                </Badge>
              ))}
            </div>
          </div>

          <Button variant="light" color="grape" mt="md" radius="md" className="buttonStyle" fullWidth>
            ASK TO TEAM
          </Button>
          <Group justify="space-between" className="buttonRowStyle">
            <Button variant="light" color="gray" mt="md" radius="md" className="buttonStyle row" onClick={() => { setSaved(!saved) }}>
              SAVE TEAM
            </Button>
            <Button variant="light" color="gray" mt="md" radius="md" className="buttonStyle row" disabled={members.length === 6} onClick={open}>
              MORE INFO
            </Button>
          </Group>
        </div>

      </div>
      <Modal opened={opened} onClose={close} title="Team Info">
        <h3>Name:</h3>
        <p>{name}</p>
        <br />
        <h3>Members:</h3>
        <ul className="memberList">
          {members.map((val, ind) => (
            <li key={ind}>{val}</li>
          ))}
        </ul>
        <h3>Description:</h3>
        <p>{description}</p>
      </Modal>
    </>
  )
}

export default TeamCard;