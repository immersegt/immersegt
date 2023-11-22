import '../styles/scheduleitem.css';
import Info from '../public/info.png';
import Check from '../public/check.png';

interface ScheduleItemProps {
    title: string,
    date: string,
    description: string,
    save: boolean
}

const ScheduleItem = ({ title, date, description, save }: ScheduleItemProps) => {
    return (
        <div className="scheduleItem">
            <div className="scheduleItemTime">
                {date}
            </div>
            <div className="scheduleItemTitle">
                {title}
            </div>
            <div className={description === "" ? "hidden" : "scheduleItemDescription"}>
                |&nbsp;&nbsp;<em>{description}</em>
            </div>
            <div className="scheduleItemImageContainer">
                {save ? (<img className="scheduleItemImage" src={Check.src} />) : (<div/>)}
                <img className="scheduleItemImage" src={Info.src} />
            </div>
        </div>
    )
}

export default ScheduleItem;