'use client';
import { Card, Text, Badge, Button, Group, CardSection, Textarea } from '@mantine/core';
import '../styles/teamcard.css';
import { useState } from "react";

interface cardProps {
  name: string,
  description: string,
  members: Array<string>,
  joined: boolean,
  disabled: boolean
}

const TeamCard = ({ name, description, members, joined, disabled }: cardProps) => {
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

      <Group justify="space-between" mb="xs">
        <Text fw={500} className={joined ? "titleStyle2" : "titleStyle"}><b>{name}</b></Text>
        {joined ? (
          <Badge color="orange" variant="light" size="lg">JOINED</Badge>
        ) : members.length === 6 ? (
          <Badge color="red" variant="light" size="lg">CLOSED</Badge>
        ) : (
          <Badge color="green" variant="light" size="lg">OPEN</Badge>
        )}

      </Group>
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
          <Text size="sm" c="dimmed" className="descriptionStyle">{description}</Text>
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
              <Button variant="light" color="gray" mt="md" radius="md" className="buttonStyle" disabled={members.length === 6}>
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