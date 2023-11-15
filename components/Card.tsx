'use client';
import { Card, Image, Text, Badge, Button, Group, CardSection } from '@mantine/core';

interface cardProps {
  name: string,
  description: string,
  members: Array<string>,
  joined: boolean
}

const cardStyle = {
  backgroundColor: 'rgba(50, 55, 58, 1)',
  borderRadius: '10px',
  flexGrow: 1,
  textAlign: "center" as "center",
  height: "300px"
}
const cardStyle2 = {
  maxWidth: "400px",
  backgroundColor: "rgba(26, 27, 30, 1)"
}
const cardStyle3 = {
  maxWidth: "400px",
  backgroundColor: "rgba(26, 27, 30, 1)",
  border: "1px solid rgb(251, 176, 59)"
}

const buttonRowStyle = {
  display: "flex"
}
const buttonStyle = {
  flexGrow: 1
}
const nameStyle = {
  margin: "10px",
  display: "flex",
  flexWrap: "wrap" as "wrap",
  gap: "10px",
}
const titleStyle = {
  fontSize: "18px"
}
const titleStyle2 = {
  fontSize: "18px",
  color: "rgb(251, 176, 59)"
}
const testStyle = {
  backgroundColor: "rgba(16, 17, 20, 1)"
}

const TeamCard = ({ name, description, members, joined }: cardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={joined ? cardStyle3 : cardStyle2}>

      <Group justify="space-between" mb="xs">
        <Text fw={500} style={joined ? titleStyle2 : titleStyle}><b>{name}</b></Text>
        {joined ? (
          <Badge color="orange" variant="light" size="lg">JOINED</Badge>
        ) : members.length === 6 ? (
          <Badge color="red" variant="light" size="lg">CLOSED</Badge>
        ) : (
          <Badge color="green" variant="light" size="lg">OPEN</Badge>
        )}

      </Group>

      <Text size="sm" c="dimmed">{description}</Text>
      <CardSection withBorder mt="sm" style={testStyle}>
        <div style={nameStyle}>
          {members.map((val) => (
            <Badge color="gray" variant="light">
              {val}
            </Badge>
          ))}
        </div>
      </CardSection>
      {joined ? (
        <Group justify="space-between" style={buttonRowStyle}>
          <Button variant="light" color="grape" mt="md" radius="md" style={buttonStyle}>
            EDIT TEAM
          </Button>
          <Button variant="light" color="red" mt="md" radius="md" style={buttonStyle}>
            LEAVE TEAM
          </Button>
        </Group>
      ) : (
        <Group justify="space-between" style={buttonRowStyle}>
          <Button variant="light" color="grape" mt="md" radius="md" style={buttonStyle} disabled={members.length === 6}>
            ASK TO TEAM
          </Button>
          <Button variant="light" color="gray" mt="md" radius="md" style={buttonStyle} disabled={members.length === 6}>
            SAVE TEAM
          </Button>
        </Group>
      )}

    </Card>
  )
}

export default TeamCard;