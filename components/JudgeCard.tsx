import '../styles/index.css';
import '../styles/judgecard.css';

interface judgeCardProps {
    name: string,
    company: string,
    image: any
}

const JudgeCard = ({ name, company, image }: judgeCardProps) => {
    return (
        <section className="judgeCard">
            <img src={image} className="judgeCardImage"/>
            <h2><b>{name}</b></h2>
            <p>{company}</p>
        </section>
    )
}

export default JudgeCard;