import '../styles/index.css';
import '../styles/trackcard.css';

interface trackCardProps {
    title: string,
    description: string
    active: boolean
}

const TrackCard = ({ title, description, active }: trackCardProps) => {
    return (
        <section>
            {active ? (
                <div className="trackCard active">
                    <h3 className="light-purple">{title}</h3>
                    <p className="light-purple">{description}</p>
                </div>
            ) : (
                <div className="trackCard">
                    <h3 className="purple">{title}</h3>
                    <p className="purple">{description}</p>
                </div>
            )}

        </section>
    )
}

export default TrackCard;