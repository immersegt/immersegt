'use client';

import 'styles/index.css'
import 'styles/schedule.css';

import ScheduleItem from 'components/ScheduleItem';
import EventCard from 'components/EventCard';
import Countdown from 'components/Countdown';

const Schedule = () => {
    return (
        <section>
            Schedule Page
            <Countdown days={5} hours={21} minutes={13} seconds={52} past={false}/>
            <div className="scheduleContainer">
                <ScheduleItem title="Opening Ceremony" time="5:00PM" description="Join us for an interactive and engaging
                workshop with industry professionals where we will" save={true} location="KLAUS 1234" />
            </div>
            <EventCard title="UX Workshop" time="5:00PM" location="KLAUS 1234" description="Join us for an interactive and engaging workshop with industry professionals as we learn to design UI. This workshop will be hosted by GTXR and is targeted to beginners and experts alike." soon={true}/>
        </section>
    )
}

export default Schedule;