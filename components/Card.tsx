'use client';

import '../styles/teamcard.css';
import '../styles/index.css';

import { Card, Text, Badge, Button, Group, CardSection, Textarea } from '@mantine/core';
import { useState } from "react";
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
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');

  const startEdit = (disabled: boolean) => {
    if (!disabled){
      setEditing(true);
    }
  }
  const submit = () => {
    setEditing(false);
    setMessage('');
  }
  const stopEdit = () => {
    setEditing(false);
    setMessage('');
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className={joined ? "cardStyle3" : "cardStyle2"}>

      <div className="titleStyle">
      {saved ? <FaStar className="starStyle"/> : <span/>}
        <h3 className={joined ? "highlight" : ""}><b>{name}</b></h3>
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
          <Textarea placeholder="Attach a brief message to your join request..." radius="md" autosize minRows={4} maxRows={4} onChange={(event) => setMessage(event.currentTarget.value)}/>
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
          <p className="small">{description}</p>
          <CardSection withBorder mt="sm" className="badgeHolder">
            <div className="nameStyle">
              {members.map((val) => (
                <Badge color="gray" variant="light">
                  {val}
                </Badge>
              ))}
            </div>
          </CardSection>
          {joined ? (
            <Group justify="space-between" className="buttonRowStyle">
              <Button variant="light" color="grape" mt="md" radius="md" className="buttonStyle" component="a" href="/team">
                EDIT TEAM
              </Button>
              <Button variant="light" color="red" mt="md" radius="md" className="buttonStyle">
                LEAVE TEAM
              </Button>
            </Group>
          ) : (
            <Group justify="space-between" className="buttonRowStyle">
              <Button variant="light" color="grape" mt="md" radius="md" className="buttonStyle" onClick={()=> {startEdit(disabled)}} disabled={members.length === 6}>
                ASK TO TEAM
              </Button>
              <Button variant="light" color="gray" mt="md" radius="md" className="buttonStyle" disabled={members.length === 6} onClick={toggleSave}>
                SAVE TEAM
              </Button>
            </Group>
          )}
        </div>
      )}


    </Card>
  )
}

export default TeamCard;