'use client';

import { Container, Group, Anchor } from '@mantine/core';
import '../styles/footer.css';

const links = [
  { link: '/', label: 'About' },
  { link: '/register', label: 'Register' },
  { link: '/team', label: 'Team' },
  { link: '/schedule', label: 'Schedule' },
  { link: 'https://discord.com/', label: 'Discord' },
];

const Footer = () => {
  const items = links.map((link) => (
    <Anchor<'a'>
      c="dimmed"
      key={link.label}
      href={link.link}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className="footer">
      <Container className="inner">
        <div className="title"><b>ImmerseGT</b></div>
        <Group className="links">{items}</Group>
      </Container>
    </div>
  );
}

export default Footer;