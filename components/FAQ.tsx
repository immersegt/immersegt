import '../styles/index.css';
import '../styles/faq.css';

import { Container, Accordion, Divider } from '@mantine/core';

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
  return (
    <Container size="md" className="faqwrapper">
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