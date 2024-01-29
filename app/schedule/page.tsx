'use client';

import 'styles/index.css'
import 'styles/schedule.css';

import ScheduleItem from 'components/ScheduleItem';
import EventCard from 'components/EventCard';
import Countdown from 'components/Countdown';

const startDate = "2024-04-19T19:00:00";
const endDate = "2024-04-21T08:00:00";

const hackingSchedule = [
    {
        date: "November 10th",
        events: [
            {
                title: "Opening Ceremony",
                time: "5:00PM",
            },
            {
                title: "Hacking Starts",
                time: "7:00PM",
            }
        ]
    },
    {
        date: "November 12th",
        events: [
            {
                title: "Projects Due",
                time: "9:00AM",
            },
            {
                title: "Judging",
                time: "10:00AM",
            },
            {
                title: "Closing Ceremony",
                time: "12:00PM",
            }
        ]
    },
];

const eventSchedule = [
    {
        date: "November 10th",
        events: [
            {
                title: "UX Workshop",
                time: "5:00PM",
            },
        ]
    }
];

const Schedule = () => {
    return (
        <div className="schedule">
            <aside className="scheduleAside">
                <h3>Countdown</h3>
                <Countdown target1={startDate} target2={endDate} />
                <br />
                <h3>Hackathon Schedule</h3>
                <div className="scheduleContainer2">
                    {hackingSchedule.map((val) => (
                        <div key={val.date}>
                            <p>{val.date}</p>
                            {val.events.map((event) => (
                                <ScheduleItem title={event.title} time={event.time} description="This is where the description goes" save={true} location="KLAUS 1234" />
                            ))}
                            <br />
                        </div>
                    ))}
                </div>
            </aside>
            <main className="scheduleMain">
                <h3>Upcoming Events</h3>
                <div className="eventContainer">
                    <EventCard title="UX Workshop" time="5:00PM" location="KLAUS 1234" description="Join us for an interactive and engaging workshop with industry professionals as we learn to design UI. This workshop will be hosted by GTXR and is targeted to beginners and experts alike." soon={true} />
                    <EventCard title="UX Workshop" time="5:00PM" location="KLAUS 1234" description="Join us for an interactive and engaging workshop with industry professionals as we learn to design UI. This workshop will be hosted by GTXR and is targeted to beginners and experts alike." soon={true} />
                </div>
                <br />
                <h3>Event Schedule</h3>
                <div className="scheduleContainer">
                    {eventSchedule.map((val) => (
                        <div key={val.date}>
                            <p>{val.date}</p>
                            {val.events.map((event) => (
                                <ScheduleItem title={event.title} time={event.time} description="This is where the description goes" save={true} location="KLAUS 1234" />
                            ))}
                            <br />
                        </div>
                    ))}
                </div>

            </main>
        </div>
    )
}

export default Schedule;