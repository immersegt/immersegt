import '../styles/faq.css';

import { Accordion, Container } from '@mantine/core';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const faqQuestions = [
  {
    id: "1",
    question: "What is ImmerseGT?",
    content: "ImmerseGT is a hackathon event happening April 5th-7th at Georgia Tech, focused on creating innovative applications in Extended Reality (XR), Virtual Reality (VR), or Mixed Reality (MR)."
  },
  {
    id: "2",
    question: "Who is eligible to participate in ImmerseGT?",
    content: "The event is free and open to everyone, from college students to graduates and professionals in the workforce, regardless of coding or XR experience. Teams can consist of up to six members."
  },
  {
    id: "3",
    question: "What are the competition categories at ImmerseGT?",
    content: "There are multiple diverse categories for participants to choose from. Further details about these categories will be released soon. For now, you can view last year’s tracks on our landing page."
  },
  {
    id: "4",
    question: "Where will ImmerseGT take place?",
    content: "The hackathon is accessible in person at Georgia Tech's main campus."
  },
  {
    id: "5",
    question: "How do I participate in ImmerseGT?",
    content: "Applications can be submitted through our event platform.  All interested individuals or teams are welcome to apply. If you are a solo hacker looking for a team, you can use our event platform to create or join a team."
  },
  {
    id: "6",
    question: "What resources will be provided during ImmerseGT?",
    content: "Participants will have access to VR headsets lent by ImmerseGT, along with other resources such as software, mentorship, and workshops."
  },
  {
    id: "7",
    question: "How will judging and prizes work at ImmerseGT?",
    content: "Projects will be evaluated by industry professionals through a short elevator pitch format. Prizes for each category will be announced shortly."
  },
  {
    id: "8",
    question: "What is the schedule for the ImmerseGT hackathon?",
    content: "The detailed event schedule will be released shortly under the Schedule tab on our event platform."
  },
  {
    id: "9",
    question: "What should participants bring to the hackathon?",
    content: "Participants should bring essentials like laptops and chargers. VR headsets will be provided by ImmerseGT."
  },
  {
    id: "10",
    question: "Who is running the ImmerseGT event?",
    content: "ImmerseGT is a collaborative effort organized jointly by the GTXR club, a student club at Georgia Tech. GTXR club is dedicated to bringing together students passionate about Extended Reality (XR) technologies, providing a platform for networking and building innovative projects."
  },
  {
    id: "11",
    question: "Who can I contact for more information about ImmerseGT?",
    content: "For further inquiries or assistance, please contact immersegt@gmail.com."
  },
  {
    id: "12",
    question: "Want to sponsor ImmerseGT?",
    content: "We are always eager to collaborate with sponsors interested in supporting and benefiting students and professionals in the XR space. Sponsoring ImmerseGT is an excellent opportunity to engage with a passionate and innovative community. Potential sponsors are invited to contact us at immersegt@gmail.com to discuss sponsorship opportunities and how they can contribute to the success of this event."
  },
];

export function FAQ() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Container size="xl" className="faqwrapper">
      <div className="faqInfo">
        <h2 className="faqTitle">FAQ</h2>
        <p className="faqSubtitle">Still have some questions?<br />Feel free to <a href="mailto:immersegt@gmail.com">get in touch</a> with us.</p>
      </div>
      <div className="questions">
        <Accordion variant="separated">
          {faqQuestions.map((val) => (
            <Accordion.Item className="faqitem" value={val.id} key={val.id} data-aos="fade-left" data-aos-easing="ease-sine" data-aos-anchor-placement="center-bottom" data-aos-once="true">
              <Accordion.Control>{val.question}</Accordion.Control>
              <Accordion.Panel>
                <p className="accordionParagraph">{val.content}</p>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </Container>
  );
}

export default FAQ;