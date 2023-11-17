import '../styles/trackcard.css';
import {Paper} from '@mantine/core';

interface trackCardProps {
    title: string,
    description: string
    active: boolean
}

const TrackCard = ({ title, description, active }: trackCardProps) => {
    return (
        <div>
        <div className={active ? "trackCardActive" : "trackCard"}>
            <div className="trackCardTitle"><b>{title}</b></div>
            <div className="trackCardContent">{description}</div>
        </div>
        </div>
    )
}

export default TrackCard;