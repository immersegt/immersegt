import '../styles/index.css';
import '../styles/eventcard.css';

import { Card, Badge, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface EventCardProps {
  title: string,
  time: string,
  location: string,
  description: string,
  soon: boolean,
  longDescription: string,
  host: string
}

const EventCard = ({ title, time, location, description, soon, longDescription, host }: EventCardProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  function interested() {
    console.log("interested");
  }

  return (
    <section>
      <Card shadow="sm" padding="lg" radius="md" withBorder className="eventCard">
        <div className="eventCardHeader">
          <h3 className="eventTitle">{title}</h3>
          {soon ? <Badge variant="light" color="orange">SOON</Badge> : <div />}
        </div>
        <p>{time} | {location}</p>
        <p className="small">{description}</p>
        <div className="buttonRowStyle">
          <Button variant="light" color="grape" mt="md" radius="md" className="buttonStyle" onClick={interested}>
            INTERESTED
          </Button>
          <Button variant="light" color="gray" mt="md" radius="md" className="buttonStyle" onClick={open}>
            MORE INFO
          </Button>
        </div>
      </Card>
      <Modal opened={opened} onClose={close} title={title}>
        <p>Time: {time}</p>
        <p>Location: {location}</p>
        {host === undefined ? <></> : (
          <p>Host: {host}</p>
        )}
        <br />
        <p>{longDescription === undefined ? description : longDescription}</p>
      </Modal>
    </section>
  )
}

export default EventCard;