'use client';

import '../styles/index.css';
import '../styles/footer.css';

import { Container, Group } from '@mantine/core';
import Link from 'next/link';

const links = [
  { link: '/', label: 'About' },
  { link: '/register', label: 'Register' },
  { link: '/team', label: 'Team' },
  { link: '/schedule', label: 'Schedule' },
  { link: 'https://discord.com/', label: 'Discord' },
];

const Footer = () => {
  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className="footerLink noLine"
    >
      {link.label}
    </Link>
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