import '../styles/index.css';
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
            <p className="nowrap">{date}</p>
            <h3 className="nowrap">{title}</h3>
            {description === "" ? (
                <div />
            ) : (
                <p className="scheduleItemDescription">
                    |&nbsp;&nbsp;<i>{description}</i>
                </p>
            )}

            <div className="scheduleItemImageContainer">
                {save ? (<img className="scheduleItemImage" src={Check.src} />) : (<div />)}
                <img className="scheduleItemImage" src={Info.src} />
            </div>
        </div>
    )
}

export default ScheduleItem;