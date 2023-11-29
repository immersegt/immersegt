'use client';

import '../styles/index.css';
import '../styles/footer.css';
import { Text, Container, ActionIcon, Group, rem } from '@mantine/core';
import { IconBrandDiscord, IconBrandGithub, IconBrandInstagram } from '@tabler/icons-react';
import Link from 'next/link';

const data = [
  {
    title: 'Overview',
    links: [
      { label: 'Sponsors', link: '#sponsors' },
      { label: 'About', link: '#tracks' },
      { label: 'Judges', link: '#judges' },
      { label: 'FAQ', link: '#faq' },
    ],
  },
  {
    title: 'Pages',
    links: [
      { label: 'Home', link: '/' },
      { label: 'Register', link: '/register' },
      { label: 'Team', link: '/team' },
      { label: 'Schedule', link: '/schedule' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Code of Conduct', link: '#' },
      { label: 'Devpost Page', link: '#' },
      { label: 'Discord Community', link: '#' },
      { label: 'Contact Us', link: '#' },
    ],
  },
];

const Footer = () => {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Link
        key={index}
        className="footerLink"
        href={link.link}
      >
        {link.label}
      </Link>
    ));

    return (
      <div className="footerWrapper" key={group.title}>
        <span className="footerTitle">{group.title}</span>
        {links}
      </div>
    );
  });

  return (
    <footer className="footer">
      <Container className="footerInner">
        <div className="footerLogo">
        <span className="title"><b>ImmerseGT</b></span>
          <div className="footerDescription">
          In-person and virtual XR hackathon hosted by GTXR and Startup Exchange, featuring over $20,000 in prizes
          </div>
        </div>
        <div className="footerGroups">{groups}</div>
      </Container>
      <Container className="footerAfter">
        <Text c="dimmed" size="sm">
          © 2023 ImmerseGT. All rights reserved.
        </Text>

        <Group gap={0} className="footerSocial" justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandDiscord style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandGithub style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}

export default Footer;