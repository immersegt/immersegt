import '../styles/index.css';
import '../styles/eventcard.css';

import { Card, Badge, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface EventCardProps {
  none: boolean,
  title: string,
  time: string,
  location: string,
  description: string,
  soon: boolean,
  host: string
}

const EventCard = ({none, title, time, location, description, soon, host }: EventCardProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  function interested() {
    console.log("interested");
  }

  return none ? (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="eventCard center">
      <p>There are no more events planned. Thanks for attending ImmerseGT 2024!</p>
    </Card>
  ) : (
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
        <p>{description}</p>
      </Modal>
    </section>
  )
}

export default EventCard;