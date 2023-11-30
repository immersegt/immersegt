'use client';

import 'styles/index.css'
import 'styles/schedule.css';

import ScheduleItem from 'components/ScheduleItem';
import EventCard from 'components/EventCard';
import Countdown from 'components/Countdown';

const startDate = "2024-04-19T19:00:00";
const endDate = "2024-04-21T08:00:00";

const Schedule = () => {
    return (
        <section>
            Schedule Page
            <Countdown target1={startDate} target2={endDate}/>
            <div className="scheduleContainer">
                <ScheduleItem title="Opening Ceremony" time="5:00PM" description="Join us for an interactive and engaging
                workshop with industry professionals where we will" save={true} location="KLAUS 1234" />
            </div>
            <EventCard title="UX Workshop" time="5:00PM" location="KLAUS 1234" description="Join us for an interactive and engaging workshop with industry professionals as we learn to design UI. This workshop will be hosted by GTXR and is targeted to beginners and experts alike." soon={true}/>
        </section>
    )
}

export default Schedule;