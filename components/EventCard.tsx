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
        <div>
            <Card shadow="sm" padding="lg" radius="md" withBorder className="eventCard">
                <div className="eventCardHeader">
                    <div className="eventTitle">
                        <b>{title}</b>
                    </div>
                    {soon ? <Badge variant="light" color="orange">SOON</Badge> : <div/>}
                </div>
                <div className="eventCardSubheader">
                    {time} | {location}
                </div>
                <div className="eventDescription">
                    {description}
                </div>
                <div className="buttonRowStyle">
              <Button variant="light" color="grape" mt="md" radius="md" className="buttonStyle">
                INTERESTED
              </Button>
              <Button variant="light" color="gray" mt="md" radius="md" className="buttonStyle">
                MORE INFO
              </Button>
            </div>
            </Card>
        </div>
    )
}

export default EventCard;