'use client';

import '../styles/index.css';
import '../styles/footer.css';

import { Container, Group, Anchor } from '@mantine/core';

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
    <footer className="footer">
      <Container className="inner">
        <span className="title"><b>ImmerseGT</b></span>
        <Group className="links">{items}</Group>
      </Container>
    </footer>
  );
}

export default Footer;