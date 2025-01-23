'use client';

import '../styles/index.css';
import '../styles/navbar.css';

import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import Link from 'next/link';

import Logo from '../public/ImmerseGTLogo.svg';


const LinkStyle = {
  padding: "0.625rem 1rem"
}

const Navbar = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <Box>
      <header id="header" className="header">
        <Group justify="space-between" h="100%">
          <Link className="title noLine headerSideItem" href="/">
            <img src={Logo.src} width="30px" />
            <span><b>ImmerseGT</b></span>
          </Link>
          <Group h="100%" gap={0} visibleFrom="md">
            <Link href="/" className="link">
              Home
            </Link>
            <Link href="/apply" className="link">
              Apply
            </Link>
            <Link href="/schedule" className="link">
              Schedule
            </Link>
          </Group>
          <div className="headerSideItem"/>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="md" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="md"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <Link href="/" className="link" onClick={closeDrawer}>
            Home
          </Link>
          <Link href="/apply" className="link" onClick={closeDrawer}>
            Apply
          </Link>
          <Link href="/schedule" className="link" onClick={closeDrawer}>
            Schedule
          </Link>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
export default Navbar;