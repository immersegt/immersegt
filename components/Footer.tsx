'use client';

import '../styles/index.css';
import '../styles/footer.css';
import { Text, Container, ActionIcon, Group, rem } from '@mantine/core';
import { IconBrandDiscord, IconBrandGithub, IconBrandInstagram } from '@tabler/icons-react';
import Link from 'next/link';

import Logo from '../public/ImmerseGTLogo.svg';

const data = [
  {
    title: 'Overview',
    links: [
      { label: 'Sponsors', link: '/#sponsors' },
      { label: 'About', link: '/#tracks' },
      { label: 'Judges', link: '/#judges' },
      { label: 'FAQ', link: '/#faq' },
    ],
  },
  {
    title: 'Pages',
    links: [
      { label: 'Home', link: '/' },
      { label: 'Apply', link: '/apply' },
      { label: 'Team', link: '/team' },
      { label: 'Schedule', link: '/schedule' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Code of Conduct', link: '/rules' },
      { label: 'Privacy policy', link: '/privacy-policy' },
      { label: 'Devpost Page', link: 'https://immersegt.devpost.com/' },
      { label: 'Discord Community', link: 'https://discord.gg/bwnbCMDzxK' },
      { label: 'Contact Us', link: 'mailto:contact@gtxr.com' },
    ],
  },
];

const Footer = () => {
  const groups = data.map((group, ind) => {
    const links = group.links.map((link, index) => (
      <Link
        key={index}
        className="footerLink"
        href={link.link}
        target={ind === 2 ? "_blank" : ""} rel={ind === 2 ? "noopener noreferrer" : ""}
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
        <div className="footerHolder">
          <img src={Logo.src} width="50px" />
          <div className="footerLogo">
            <span className="title"><b>ImmerseGT</b></span>
            <div className="footerDescription">
              In-person XR hackathon hosted by GTXR. Participate at Georgia Tech from April 4th-6th, 2025.
            </div>
          </div>
        </div>
        <div className="footerGroups">{groups}</div>
      </Container>
      <Container className="footerAfter">
        <Text c="dimmed" size="sm">
          © 2024 ImmerseGT. All rights reserved.
        </Text>

        <Group gap={0} className="footerSocial" justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle" component="a" href="https://discord.gg/bwnbCMDzxK" target="_blank" rel="noopener noreferrer">
            <IconBrandDiscord style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle" component="a" href="https://github.com/AlexT101/ImmerseGT" target="_blank" rel="noopener noreferrer">
            <IconBrandGithub style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}

export default Footer;