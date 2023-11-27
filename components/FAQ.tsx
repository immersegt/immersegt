import '../styles/index.css';
import '../styles/faq.css';

import { Container, Accordion, Divider } from '@mantine/core';

import {useEffect} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const faqQuestions = [
  {
    id: "1",
    question: "When is ImmerseGT?",
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus urna vel condimentum varius. Aenean condimentum id ante id pellentesque. Maecenas dignissim felis non felis lobortis, quis pellentesque mi gravida. Integer efficitur accumsan tincidunt. Fusce sit amet lobortis nisi. Quisque malesuada felis non magna imperdiet, at finibus elit ornare.'
  },
  {
    id: "2",
    question: "Will ImmerseGT be fully in-person?",
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus urna vel condimentum varius. Aenean condimentum id ante id pellentesque. Maecenas dignissim felis non felis lobortis, quis pellentesque mi gravida. Integer efficitur accumsan tincidunt. Fusce sit amet lobortis nisi. Quisque malesuada felis non magna imperdiet, at finibus elit ornare.'
  },
  {
    id: "3",
    question: "What tracks can we expect?",
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus urna vel condimentum varius. Aenean condimentum id ante id pellentesque. Maecenas dignissim felis non felis lobortis, quis pellentesque mi gravida. Integer efficitur accumsan tincidunt. Fusce sit amet lobortis nisi. Quisque malesuada felis non magna imperdiet, at finibus elit ornare.'
  },
  {
    id: "4",
    question: "What's the cost?",
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus urna vel condimentum varius. Aenean condimentum id ante id pellentesque. Maecenas dignissim felis non felis lobortis, quis pellentesque mi gravida. Integer efficitur accumsan tincidunt. Fusce sit amet lobortis nisi. Quisque malesuada felis non magna imperdiet, at finibus elit ornare.'
  },
  {
    id: "5",
    question: "Who can attend?",
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus urna vel condimentum varius. Aenean condimentum id ante id pellentesque. Maecenas dignissim felis non felis lobortis, quis pellentesque mi gravida. Integer efficitur accumsan tincidunt. Fusce sit amet lobortis nisi. Quisque malesuada felis non magna imperdiet, at finibus elit ornare.'
  },
  {
    id: "6",
    question: "How do I apply?",
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus urna vel condimentum varius. Aenean condimentum id ante id pellentesque. Maecenas dignissim felis non felis lobortis, quis pellentesque mi gravida. Integer efficitur accumsan tincidunt. Fusce sit amet lobortis nisi. Quisque malesuada felis non magna imperdiet, at finibus elit ornare.'
  },
  {
    id: "7",
    question: "How do I form a team?",
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus urna vel condimentum varius. Aenean condimentum id ante id pellentesque. Maecenas dignissim felis non felis lobortis, quis pellentesque mi gravida. Integer efficitur accumsan tincidunt. Fusce sit amet lobortis nisi. Quisque malesuada felis non magna imperdiet, at finibus elit ornare.'
  },
];

export function FAQ() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Container size="md" className="faqwrapper" data-aos="fade-up" data-aos-easing="ease-sine" data-aos-anchor-placement="top-center" data-aos-once="true" data-aos-offset="0">
      <Divider my="sm" />
      <h2>Frequently Asked Questions</h2>

      <Accordion variant="separated">
        {faqQuestions.map((val) => (
          <Accordion.Item className="faqitem" value={val.id}>
            <Accordion.Control>{val.question}</Accordion.Control>
            <Accordion.Panel>{val.content}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}

export default FAQ;