import '../styles/index.css';
import '../styles/eventcard.css';

import {Card, Badge, Group, Button} from '@mantine/core';

interface EventCardProps {
    title: string,
    time: string,
    location: string,
    description: string,
    soon: boolean
}

const EventCard = ({title, time, location, description, soon} : EventCardProps) => {
    return (
        <section>
            <Card shadow="sm" padding="lg" radius="md" withBorder className="eventCard">
                <div className="eventCardHeader">
                    <h3 className="eventTitle">{title}</h3>
                    {soon ? <Badge variant="light" color="orange">SOON</Badge> : <div/>}
                </div>
                <p>{time} | {location}</p>
                <p className="small">{description}</p>
                <div className="buttonRowStyle">
              <Button variant="light" color="grape" mt="md" radius="md" className="buttonStyle">
                INTERESTED
              </Button>
              <Button variant="light" color="gray" mt="md" radius="md" className="buttonStyle">
                MORE INFO
              </Button>
            </div>
            </Card>
        </section>
    )
}

export default EventCard;