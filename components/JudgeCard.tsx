import '../styles/judgecard.css';

interface judgeCardProps {
    name: string,
    company: string,
    image: any
}

const JudgeCard = ({ name, company, image }: judgeCardProps) => {
    return (
        <div className="judgeCard">
            <img src={image} className="judgeCardImage"/>
            <div className="judgeCardName"><b>{name}</b></div>
            <div className="judgeCardCompany">{company}</div>
        </div>
    )
}

export default JudgeCard;