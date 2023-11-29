'use client';

import '../styles/teamcard.css';
import '../styles/index.css';

import { Badge, Button, Group, Textarea, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications'
import { useState } from "react";

import Link from 'next/link';

import { FaStar } from "react-icons/fa";

interface cardProps {
  name: string,
  description: string,
  members: Array<string>,
  joined: boolean,
  disabled: boolean,
  saved: boolean,
  toggleSave: any
}

const TeamCard = ({ name, description, members, joined, disabled, saved, toggleSave }: cardProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [confirmLeave, { open: openLeave, close: closeLeave }] = useDisclosure(false);

  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');

  const startEdit = (disabled: boolean) => {
    if (!disabled) {
      setEditing(true);
    }
  }
  const stopEdit = () => {
    setEditing(false);
    setMessage('');
  }

  function submit () {
    console.log("sent message");
    notifications.show({
      title: 'Request Sent',
      message: 'You have requested to be a member of ' + name,
      color: 'grape.5'
    });
    setEditing(false);
    setMessage('');
  }

  function leaveTeam () {
    console.log("left team");
    notifications.show({
      title: 'Left Team',
      message: 'You are no longer a member of ' + name,
      color: 'red'
    });
    closeLeave();
  }

  function save () {
    if (!saved){
      console.log("saved team");
      notifications.show({
        title: 'Team Saved',
        message: 'You have saved ' + name ,
        color: 'gray.5'
      });
    }else{
      console.log("unsaved team");
      notifications.show({
        title: 'Team Unsaved',
        message: 'You have unsaved ' + name,
        color: 'gray.5'
      });
    }
    toggleSave();

  }

  return (
    <>
      <div
        className={joined ? "cardStyle gold" : "cardStyle"}
      >

        <div className="titleStyle">
          {saved ? <FaStar className="starStyle" /> : <span />}
          <h3 className={joined ? "cardTitle highlight" : "cardTitle"}><b>{name}</b></h3>
          {joined ? (
            <Badge color="orange" variant="light" size="lg" className="badgeStyle">JOINED</Badge>
          ) : members.length === 6 ? (
            <Badge color="red" variant="light" size="lg" className="badgeStyle">CLOSED</Badge>
          ) : (
            <Badge color="green" variant="light" size="lg" className="badgeStyle">OPEN</Badge>
          )}

        </div>
        {editing ? (
          <div>
            <Textarea placeholder="Attach a brief message to your join request..." radius="md" autosize minRows={7} maxRows={7} onChange={(event) => setMessage(event.currentTarget.value)} />
            <Group justify="space-between" className="buttonRowStyle">
              <Button variant="light" color="grape" mt="md" radius="md" className="buttonStyle" onClick={submit}>
                SEND REQUEST
              </Button>
              <Button variant="light" color="red" mt="md" radius="md" className="buttonStyle" onClick={stopEdit}>
                CANCEL
              </Button>
            </Group>
          </div>
        ) : (
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
            {joined ? (
              <>
                <Link href="/team" className="noLine"><Button variant="light" color="grape" mt="md" radius="md" className="buttonStyle" fullWidth>
                  EDIT TEAM
                </Button></Link>
                <Button variant="light" color="red" mt="md" radius="md" className="buttonStyle" fullWidth onClick={openLeave}>
                  LEAVE TEAM
                </Button>
              </>
            ) : (
              <>
                <Button variant="light" color="grape" mt="md" radius="md" className="buttonStyle" fullWidth onClick={() => { startEdit(disabled) }} disabled={members.length === 6}>
                  ASK TO TEAM
                </Button>
                <Group justify="space-between" className="buttonRowStyle">
                  <Button variant="light" color="gray" mt="md" radius="md" className="buttonStyle row" disabled={members.length === 6} onClick={save}>
                    {saved?"UN" : ""}SAVE TEAM
                  </Button>
                  <Button variant="light" color="gray" mt="md" radius="md" className="buttonStyle row" disabled={members.length === 6} onClick={open}>
                    MORE INFO
                  </Button>
                </Group>
              </>
            )}
          </div>
        )}
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
      <Modal opened={confirmLeave} onClose={closeLeave} title="Leave Team">
        <h3>Are you sure you want to leave {name}?</h3>
        <p>This cannot be undone.</p>
        <Group justify="space-between" className="buttonRowStyle">
          <Button variant="light" color="red" mt="md" radius="md" className="buttonStyle" onClick={leaveTeam}>
            LEAVE TEAM
          </Button>
          <Button variant="light" color="gray" mt="md" radius="md" className="buttonStyle" disabled={members.length === 6} onClick={closeLeave}>
            CANCEL
          </Button>
        </Group>
      </Modal>
    </>
  )
}

export default TeamCard;